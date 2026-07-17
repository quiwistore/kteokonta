#!/bin/bash
# IndexNow kteokonta.com — correr SOLO con la clave live (200)
cd "$(dirname "$0")/.."
KEY=$(python3 -c "import json; print(json.load(open('data/indexnow-payload.json'))['key'])")
CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://kteokonta.com/$KEY.txt")
echo "clave live: $CODE"
if [ "$CODE" != "200" ]; then echo "ABORTADO: clave no esta live, no quemar la verificacion"; exit 1; fi
curl -s -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json; charset=utf-8" --data @data/indexnow-payload.json -w "\nIndexNow: HTTP %{http_code}\n"
