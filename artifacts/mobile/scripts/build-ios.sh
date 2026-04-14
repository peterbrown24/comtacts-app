#!/bin/bash
set -e
echo "=== Checking credentials ==="
ls -la certs/
echo "=== credentials.json ==="
cat credentials.json | sed 's/password": "[^"]*"/password": "***"/'
echo "=== eas.json ==="
cat eas.json
echo "=== app.json (expo section) ==="
node -e "const a=require('./app.json');console.log(JSON.stringify({slug:a.expo.slug,version:a.expo.version,ios:a.expo.ios,extra:a.expo.extra},null,2))"
echo "=== Running eas build ==="
eas build --platform ios --profile production --non-interactive 2>&1 || {
  echo "=== BUILD FAILED ==="
  exit 1
}
