#!/bin/bash

set -euo pipefail

REPO=racing-tips-environment-$ENVIRONMENT
SOURCE_BRANCH=build/$CIRCLE_BUILD_NUM
rm -rf /tmp/$REPO
mkdir -p /tmp/$REPO

hub clone $REPO /tmp/$REPO
cd /tmp/$REPO
git checkout -b $SOURCE_BRANCH
node update-requirements.js
git add .
git commit -m "Updating deployment configuration"
# git push --set-upstream origin $SOURCE_BRANCH