#!/bin/bash
set -e

function log() {
  echo "================================================"
  echo "$1"
  echo "================================================"
}

log "Running in $PWD"

# log "Clearing caches"
# pod cache clean --all

log "Deleting dependencies and lock files"
rm -rf node_modules package-lock.json ios/Pods ios/Podfile.lock

log "Installing NPM dependencies"
npm install

log "Cleaning iOS Project"
cd ios && pod install --repo-update 

cd ..

if [[ "$1" != "--skip-android" ]]; then
  log "Cleaning Android Project"
  cd android && ./gradlew clean && cd ..
fi
