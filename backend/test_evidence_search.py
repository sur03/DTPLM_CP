import json

from evidence_search import get_evidence


claim = "Aaditya Thackeray is the son of Uddhav Thackeray."

result = get_evidence(claim)

print(json.dumps(result, indent=2, ensure_ascii=False))