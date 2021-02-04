#!/usr/bin/env bash
set -e
npm i
npm prune --production
sam deploy
