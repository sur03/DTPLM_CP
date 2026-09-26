from flask import Flask, jsonify, request
from flask_cors import CORS
from evidence_search import get_evidence

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "success",
        "message": "TruthLens AI backend is running"
    })


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    })


@app.route("/api/analyze-text", methods=["POST"])
def analyze_text():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({
            "status": "error",
            "message": "Text is required"
        }), 400

    text = data["text"].strip()

    if not text:
        return jsonify({
            "status": "error",
            "message": "Text cannot be empty"
        }), 400

    result = get_evidence(text)

    return jsonify({
        "status": "success",
        "claim": text,
        "verdict": result["verdict"],
        "evidence": result["evidence"],
        "message": "Analysis completed"
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )