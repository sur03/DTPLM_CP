import os
import re
import requests
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer, util

load_dotenv()

API_KEY = os.getenv("FACT_CHECK_API_KEY")

model = SentenceTransformer("all-MiniLM-L6-v2")

STOP_WORDS = {
    "a",
    "an",
    "the",
    "is",
    "are",
    "was",
    "were",
    "am",
    "be",
    "been",
    "being",
    "of",
    "to",
    "in",
    "on",
    "at",
    "for",
    "from",
    "with",
    "by",
    "and",
    "or",
    "but",
    "that",
    "this",
    "these",
    "those",
    "as",
    "it",
    "its",
    "he",
    "she",
    "they",
    "them",
    "his",
    "her",
    "their",
    "has",
    "have",
    "had",
    "do",
    "does",
    "did",
    "not"
}


def normalize_text(text):
    text = text.lower()
    text = text.replace("’", "'")
    text = re.sub(r"[^a-z0-9\s']", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def get_content_words(text):
    normalized = normalize_text(text)
    words = normalized.split()

    return {
        word
        for word in words
        if len(word) > 2 and word not in STOP_WORDS
    }


def get_entities(text):
    normalized = normalize_text(text)
    words = normalized.split()

    entities = set()

    for i in range(len(words) - 1):
        if words[i] not in STOP_WORDS and words[i + 1] not in STOP_WORDS:
            entities.add(words[i] + " " + words[i + 1])

    for word in words:
        if word not in STOP_WORDS and len(word) > 4:
            entities.add(word)

    return entities


def calculate_word_overlap(user_claim, returned_claim):
    user_words = get_content_words(user_claim)
    returned_words = get_content_words(returned_claim)

    if not user_words or not returned_words:
        return 0

    common_words = user_words.intersection(returned_words)

    return len(common_words) / len(user_words)


def calculate_entity_overlap(user_claim, returned_claim):
    user_entities = get_entities(user_claim)
    returned_entities = get_entities(returned_claim)

    if not user_entities or not returned_entities:
        return 0

    common_entities = user_entities.intersection(returned_entities)

    return len(common_entities) / len(user_entities)


def is_relevant_claim(user_claim, returned_claim):
    embeddings = model.encode(
        [user_claim, returned_claim],
        convert_to_tensor=True
    )

    similarity = util.cos_sim(
        embeddings[0],
        embeddings[1]
    ).item()

    word_overlap = calculate_word_overlap(
        user_claim,
        returned_claim
    )

    entity_overlap = calculate_entity_overlap(
        user_claim,
        returned_claim
    )

    print("Similarity:", similarity)
    print("Content word overlap:", word_overlap)
    print("Entity overlap:", entity_overlap)
    print("Returned claim:", returned_claim)

    if similarity >= 0.82 and word_overlap >= 0.60:
        return True

    if similarity >= 0.75 and word_overlap >= 0.70 and entity_overlap >= 0.50:
        return True

    return False


def convert_rating_to_verdict(rating):
    rating = rating.lower().strip()

    if any(word in rating for word in [
        "false",
        "fake",
        "incorrect",
        "misleading",
        "wrong"
    ]):
        return "REFUTED"

    if any(word in rating for word in [
        "true",
        "correct",
        "accurate"
    ]):
        return "SUPPORTED"

    if any(word in rating for word in [
        "partly true",
        "partially true",
        "half true",
        "mostly true",
        "mostly correct"
    ]):
        return "CONFLICTING"

    if any(word in rating for word in [
        "unproven",
        "unverified",
        "unclear",
        "not proven",
        "no evidence"
    ]):
        return "NOT_ENOUGH_EVIDENCE"

    return "NOT_ENOUGH_EVIDENCE"


def determine_verdict(results):
    verdicts = []

    for result in results:
        for review in result.get("reviews", []):
            verdict = convert_rating_to_verdict(
                review.get("rating", "")
            )

            verdicts.append(verdict)

    if not verdicts:
        return "NOT_ENOUGH_EVIDENCE"

    unique_verdicts = set(verdicts)

    if "REFUTED" in unique_verdicts and "SUPPORTED" in unique_verdicts:
        return "CONFLICTING"

    if "REFUTED" in unique_verdicts:
        return "REFUTED"

    if "SUPPORTED" in unique_verdicts:
        return "SUPPORTED"

    if "CONFLICTING" in unique_verdicts:
        return "CONFLICTING"

    return "NOT_ENOUGH_EVIDENCE"


def search_fact_checks(claim):
    if not API_KEY:
        return {
            "status": "error",
            "message": "Fact Check API key is not configured",
            "verdict": "NOT_ENOUGH_EVIDENCE",
            "results": []
        }

    url = "https://factchecktools.googleapis.com/v1alpha1/claims:search"

    params = {
        "query": claim,
        "key": API_KEY,
        "pageSize": 10
    }

    try:
        response = requests.get(
            url,
            params=params,
            timeout=15
        )

        if response.status_code != 200:
            return {
                "status": "error",
                "message": f"Fact Check API returned status {response.status_code}: {response.text}",
                "verdict": "NOT_ENOUGH_EVIDENCE",
                "results": []
            }

        data = response.json()

        results = []
        seen_claims = set()

        for item in data.get("claims", []):
            claim_text = item.get("text", "").strip()

            if not claim_text:
                continue

            if not is_relevant_claim(claim, claim_text):
                continue

            normalized_claim = normalize_text(claim_text)

            if normalized_claim in seen_claims:
                continue

            seen_claims.add(normalized_claim)

            reviews = []
            seen_reviews = set()

            for review in item.get("claimReview", []):
                publisher = review.get("publisher", {})

                review_data = {
                    "publisher": publisher.get("name", ""),
                    "url": review.get("url", ""),
                    "title": review.get("title", ""),
                    "rating": review.get("textualRating", "")
                }

                review_key = (
                    review_data["publisher"],
                    review_data["url"],
                    review_data["title"],
                    review_data["rating"]
                )

                if review_key in seen_reviews:
                    continue

                seen_reviews.add(review_key)
                reviews.append(review_data)

            results.append({
                "claim": claim_text,
                "reviews": reviews
            })

        verdict = determine_verdict(results)

        return {
            "status": "success",
            "claim": claim,
            "verdict": verdict,
            "results": results,
            "message": "Fact check search completed"
        }

    except requests.RequestException as error:
        return {
            "status": "error",
            "message": str(error),
            "verdict": "NOT_ENOUGH_EVIDENCE",
            "results": []
        }