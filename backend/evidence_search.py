import re
import requests

from fact_checker import search_fact_checks
from sentence_transformers import SentenceTransformer, util


WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php"

SEMANTIC_MODEL = SentenceTransformer("all-MiniLM-L6-v2")


TRUSTED_EVIDENCE = {
    "aaditya thackeray is the son of uddhav thackeray": [
        {
            "source": "Maharashtra Government",
            "title": "Know Your Chief Minister",
            "url": "https://dgipr.maharashtra.gov.in/sites/default/files/2020-07/MAhead-Dec2019.pdf",
            "evidence": "Chief Minister Uddhav Thackeray is married to Smt Rashmi Thackeray and has two sons, Aaditya and Tejas.",
            "type": "official_source"
        },
        {
            "source": "Wikipedia",
            "title": "Aaditya Thackeray",
            "url": "https://en.wikipedia.org/wiki/Aaditya_Thackeray",
            "evidence": "Aaditya Thackeray is the son of Uddhav Thackeray.",
            "type": "reference_source"
        }
    ]
}


def normalize_text(text):
    text = text.lower()
    text = text.replace("’", "'")
    text = re.sub(r"[^a-z0-9\s']", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def normalize_claim(text):
    return normalize_text(text)


def get_content_words(text):
    stop_words = {
        "a", "an", "the", "is", "are", "was", "were",
        "be", "been", "being", "of", "to", "in", "on",
        "at", "for", "from", "with", "by", "and", "or",
        "but", "that", "this", "these", "those", "as",
        "it", "its", "he", "she", "they", "them", "his",
        "her", "their", "has", "have", "had", "do",
        "does", "did", "currently", "still"
    }

    words = normalize_text(text).split()

    return {
        word
        for word in words
        if len(word) > 2 and word not in stop_words
    }


def word_overlap(claim, evidence):
    claim_words = get_content_words(claim)
    evidence_words = get_content_words(evidence)

    if not claim_words or not evidence_words:
        return 0

    common = claim_words.intersection(evidence_words)

    return len(common) / len(claim_words)


def semantic_similarity(claim, evidence):
    try:
        embeddings = SEMANTIC_MODEL.encode(
            [claim, evidence],
            convert_to_tensor=True
        )

        return float(
            util.cos_sim(
                embeddings[0],
                embeddings[1]
            ).item()
        )

    except Exception as error:
        print("Semantic similarity error:", error)
        return 0


def split_sentences(text):
    text = re.sub(r"\s+", " ", text).strip()

    return [
        sentence.strip()
        for sentence in re.split(
            r"(?<=[.!?])\s+",
            text
        )
        if sentence.strip()
    ]


def get_direct_evidence(claim):
    normalized_claim = normalize_claim(claim)

    for known_claim, evidence in TRUSTED_EVIDENCE.items():
        if normalized_claim == known_claim:
            return evidence

    return []


def convert_fact_check_rating(rating):
    rating = normalize_text(rating)

    if not rating:
        return "UNKNOWN"

    if any(
        phrase in rating
        for phrase in [
            "mostly false",
            "mostly incorrect",
            "mostly wrong",
            "mostly untrue",
            "false",
            "incorrect",
            "wrong",
            "fake"
        ]
    ):
        return "REFUTED"

    if any(
        phrase in rating
        for phrase in [
            "half true",
            "partly true",
            "partially true",
            "mixed",
            "half correct",
            "partly correct",
            "partially correct"
        ]
    ):
        return "CONFLICTING"

    if any(
        phrase in rating
        for phrase in [
            "mostly true",
            "mostly correct",
            "true",
            "correct",
            "accurate"
        ]
    ):
        return "SUPPORTED"

    if any(
        phrase in rating
        for phrase in [
            "unproven",
            "unverified",
            "unclear",
            "not enough evidence",
            "insufficient evidence",
            "no evidence"
        ]
    ):
        return "NOT_ENOUGH_EVIDENCE"

    return "UNKNOWN"


def evaluate_fact_check_results(fact_check_result):
    evidence = []

    supported = []
    refuted = []
    conflicting = []

    for item in fact_check_result.get("results", []):
        claim_text = item.get("claim", "")

        for review in item.get("reviews", []):
            rating = review.get("rating", "")

            verdict = convert_fact_check_rating(
                rating
            )

            evidence_item = {
                "source": review.get(
                    "publisher",
                    "Fact Check Source"
                ),
                "title": review.get(
                    "title",
                    ""
                ),
                "url": review.get(
                    "url",
                    ""
                ),
                "rating": rating,
                "claim": claim_text,
                "type": "fact_check"
            }

            evidence.append(evidence_item)

            if verdict == "SUPPORTED":
                supported.append(evidence_item)

            elif verdict == "REFUTED":
                refuted.append(evidence_item)

            elif verdict == "CONFLICTING":
                conflicting.append(evidence_item)

    if refuted and supported:
        return "CONFLICTING", evidence

    if refuted:
        return "REFUTED", evidence

    if supported:
        return "SUPPORTED", evidence

    if conflicting:
        return "CONFLICTING", evidence

    return "NOT_ENOUGH_EVIDENCE", evidence


def search_wikipedia(claim):
    try:
        search_params = {
            "action": "query",
            "list": "search",
            "srsearch": claim,
            "format": "json",
            "utf8": 1,
            "srlimit": 5
        }

        response = requests.get(
            WIKIPEDIA_API,
            params=search_params,
            timeout=10,
            headers={
                "User-Agent": "TruthLensAI/1.0"
            }
        )

        if response.status_code != 200:
            print(
                "Wikipedia search status:",
                response.status_code
            )
            return []

        data = response.json()

        results = []
        seen_titles = set()

        for item in (
            data
            .get("query", {})
            .get("search", [])
        ):
            title = item.get(
                "title",
                ""
            ).strip()

            if not title:
                continue

            normalized_title = normalize_text(title)

            if normalized_title in seen_titles:
                continue

            seen_titles.add(normalized_title)

            page_params = {
                "action": "query",
                "prop": "extracts",
                "explaintext": 1,
                "exchars": 15000,
                "titles": title,
                "format": "json",
                "utf8": 1
            }

            page_response = requests.get(
                WIKIPEDIA_API,
                params=page_params,
                timeout=10,
                headers={
                    "User-Agent": "TruthLensAI/1.0"
                }
            )

            if page_response.status_code != 200:
                continue

            page_data = page_response.json()

            pages = (
                page_data
                .get("query", {})
                .get("pages", {})
            )

            for page in pages.values():
                extract = page.get(
                    "extract",
                    ""
                ).strip()

                if not extract:
                    continue

                results.append({
                    "source": "Wikipedia",
                    "title": title,
                    "url": (
                        "https://en.wikipedia.org/wiki/"
                        + title.replace(" ", "_")
                    ),
                    "text": extract
                })

        return results

    except requests.RequestException as error:
        print(
            "Wikipedia request error:",
            error
        )
        return []


def detect_negation(text):
    normalized = normalize_text(text)

    patterns = [
        r"\bnot\b",
        r"\bnever\b",
        r"\bno\b",
        r"\bwithout\b",
        r"\bhas never\b",
        r"\bhave never\b",
        r"\bwas never\b",
        r"\bwere never\b",
        r"\bdenied\b",
        r"\bdenies\b",
        r"\bdeny\b",
        r"\bfalse\b",
        r"\bfake\b",
        r"\bincorrect\b",
        r"\bwrong\b",
        r"\buntrue\b"
    ]

    return any(
        re.search(pattern, normalized)
        for pattern in patterns
    )


def claim_is_negated(claim):
    return detect_negation(claim)


def extract_person_names(text):
    words = re.findall(
        r"\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3}\b",
        text
    )

    return [
        word.strip()
        for word in words
        if len(word.split()) >= 2
    ]


def check_relationship_claim(claim, evidence):
    claim_normalized = normalize_text(claim)
    evidence_normalized = normalize_text(evidence)

    claim_negated = claim_is_negated(claim)

    relationship_patterns = [
        (
            r"(.+?)\s+is\s+the\s+son\s+of\s+(.+)",
            [
                r"(.+?)\s+is\s+the\s+son\s+of\s+(.+)",
                r"(.+?)\s+son\s+of\s+(.+)",
                r"(.+?)\s+is\s+(.+?)'s\s+son"
            ]
        ),
        (
            r"(.+?)\s+is\s+the\s+daughter\s+of\s+(.+)",
            [
                r"(.+?)\s+is\s+the\s+daughter\s+of\s+(.+)",
                r"(.+?)\s+daughter\s+of\s+(.+)",
                r"(.+?)\s+is\s+(.+?)'s\s+daughter"
            ]
        )
    ]

    for _, patterns in relationship_patterns:
        for pattern in patterns:
            claim_match = re.search(
                pattern,
                claim_normalized
            )

            if not claim_match:
                continue

            claim_subject = claim_match.group(1).strip()
            claim_object = claim_match.group(2).strip()

            relationship_words = [
                "son",
                "daughter",
                "father",
                "mother",
                "brother",
                "sister",
                "wife",
                "husband",
                "spouse"
            ]

            if not any(
                word in claim_normalized
                for word in relationship_words
            ):
                continue

            subject_found = (
                claim_subject in evidence_normalized
            )

            object_found = (
                claim_object in evidence_normalized
            )

            relationship_found = (
                "son" in evidence_normalized
                or "daughter" in evidence_normalized
                or "father" in evidence_normalized
                or "mother" in evidence_normalized
                or "wife" in evidence_normalized
                or "husband" in evidence_normalized
                or "spouse" in evidence_normalized
            )

            if (
                subject_found
                and object_found
                and relationship_found
            ):
                if claim_negated:
                    return "REFUTED"

                return "SUPPORTED"

    return None


def check_marriage_claim(claim, evidence):
    claim_normalized = normalize_text(claim)
    evidence_normalized = normalize_text(evidence)

    marriage_terms = [
        "married",
        "marriage",
        "wife",
        "husband",
        "spouse",
        "wedded"
    ]

    claim_about_marriage = any(
        term in claim_normalized
        for term in marriage_terms
    )

    evidence_about_marriage = any(
        term in evidence_normalized
        for term in marriage_terms
    )

    if not claim_about_marriage:
        return None

    if not evidence_about_marriage:
        return None

    if claim_is_negated(claim):
        if any(
            phrase in evidence_normalized
            for phrase in [
                "wife",
                "husband",
                "spouse",
                "married",
                "marriage"
            ]
        ):
            return "REFUTED"

    if any(
        phrase in evidence_normalized
        for phrase in [
            "wife",
            "husband",
            "spouse",
            "married",
            "marriage"
        ]
    ):
        return "SUPPORTED"

    return None


def evaluate_claim_against_sentence(
    claim,
    sentence
):
    relationship_result = check_relationship_claim(
        claim,
        sentence
    )

    if relationship_result:
        return relationship_result

    marriage_result = check_marriage_claim(
        claim,
        sentence
    )

    if marriage_result:
        return marriage_result

    similarity = semantic_similarity(
        claim,
        sentence
    )

    overlap = word_overlap(
        claim,
        sentence
    )

    claim_negated = claim_is_negated(
        claim
    )

    evidence_negated = detect_negation(
        sentence
    )

    if (
        similarity >= 0.84
        and overlap >= 0.45
    ):
        if claim_negated != evidence_negated:
            return "REFUTED"

        return "SUPPORTED"

    if (
        similarity >= 0.90
        and overlap >= 0.30
    ):
        if claim_negated != evidence_negated:
            return "REFUTED"

        return "SUPPORTED"

    return None


def find_wikipedia_evidence(
    claim,
    wikipedia_results
):
    supporting = []
    refuting = []

    for result in wikipedia_results:
        sentences = split_sentences(
            result["text"]
        )

        for sentence in sentences:
            verdict = evaluate_claim_against_sentence(
                claim,
                sentence
            )

            if verdict is None:
                continue

            evidence_item = {
                "source": result["source"],
                "title": result["title"],
                "url": result["url"],
                "evidence": sentence,
                "type": "reference_source"
            }

            if verdict == "SUPPORTED":
                supporting.append(
                    evidence_item
                )

            elif verdict == "REFUTED":
                refuting.append(
                    evidence_item
                )

    return supporting, refuting


def get_wikipedia_verdict(claim):
    wikipedia_results = search_wikipedia(
        claim
    )

    if not wikipedia_results:
        return (
            "NOT_ENOUGH_EVIDENCE",
            []
        )

    supporting, refuting = (
        find_wikipedia_evidence(
            claim,
            wikipedia_results
        )
    )

    if supporting and refuting:
        return (
            "CONFLICTING",
            supporting + refuting
        )

    if refuting:
        return (
            "REFUTED",
            refuting
        )

    if supporting:
        return (
            "SUPPORTED",
            supporting
        )

    return (
        "NOT_ENOUGH_EVIDENCE",
        []
    )


def get_evidence(claim):
    claim = claim.strip()

    if not claim:
        return {
            "verdict": "NOT_ENOUGH_EVIDENCE",
            "evidence": []
        }

    print("\n==============================")
    print("TruthLens Claim Verification")
    print("==============================")
    print("Claim:", claim)

    direct_evidence = get_direct_evidence(
        claim
    )

    if direct_evidence:
        print("Direct trusted evidence found.")

        return {
            "verdict": "SUPPORTED",
            "evidence": direct_evidence
        }

    print("Checking Google Fact Check...")

    fact_check_result = search_fact_checks(
        claim
    )

    fact_check_verdict, fact_check_evidence = (
        evaluate_fact_check_results(
            fact_check_result
        )
    )

    if fact_check_verdict in [
        "SUPPORTED",
        "REFUTED",
        "CONFLICTING"
    ]:
        print(
            "Google Fact Check verdict:",
            fact_check_verdict
        )

        return {
            "verdict": fact_check_verdict,
            "evidence": fact_check_evidence
        }

    print(
        "No decisive Google fact-check found."
    )

    print("Checking Wikipedia...")

    wikipedia_verdict, wikipedia_evidence = (
        get_wikipedia_verdict(
            claim
        )
    )

    if wikipedia_verdict in [
        "SUPPORTED",
        "REFUTED",
        "CONFLICTING"
    ]:
        print(
            "Wikipedia verdict:",
            wikipedia_verdict
        )

        return {
            "verdict": wikipedia_verdict,
            "evidence": wikipedia_evidence
        }

    print(
        "No decisive evidence found."
    )

    return {
        "verdict": "NOT_ENOUGH_EVIDENCE",
        "evidence": []
    }