#!/usr/bin/env bash
export STACK_NAME=$(grep STACK_NAME .env | xargs)
export S3_BUCKET=$(grep S3_BUCKET .env | xargs)
export AWS_REGION=$(grep AWS_REGION .env | xargs)
set -e
npm i
npm prune --production
sam deploy --region $AWS_REGION --s3-bucket $S3_BUCKET --stack-name $STACK_NAME
