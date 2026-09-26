import json

from fact_checker import search_fact_checks

print("Starting test...")

claim = claim = "Aaditya Thackeray is the son of Uddhav Thackeray."

result = search_fact_checks(claim)

print(json.dumps(result, indent=2, ensure_ascii=False))