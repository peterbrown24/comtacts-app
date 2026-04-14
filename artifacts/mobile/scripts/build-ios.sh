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

echo "=== Fixing lockfile overrides for macOS build ==="
cd ../..
node -e "
const fs = require('fs');
let lf = fs.readFileSync('pnpm-lock.yaml', 'utf8');
lf = lf.replace(/\noverrides:\n(  [^\n]+\n)+/, '\n');
fs.writeFileSync('pnpm-lock.yaml', lf);
console.log('Stripped platform overrides from lockfile');
"
pnpm install --no-frozen-lockfile
cd artifacts/mobile

echo "=== Running eas build ==="
eas build --platform ios --profile production --non-interactive 2>&1 || {
  echo "=== BUILD FAILED ==="
  exit 1
}
