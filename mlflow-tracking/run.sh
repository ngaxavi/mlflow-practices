#!/bin/sh

set -e

if [ -z $AWS_BUCKET ]; then
  echo >&2 "AWS_BUCKET must be set"
  exit 1
fi

if [ -z $AWS_ACCESS_KEY_ID ]; then
  echo >&2 "AWS_ACCESS_KEY_ID must be set"
  exit 1
fi

if [ -z $AWS_SECRET_ACCESS_KEY ]; then
  echo >&2 "AWS_SECRET_ACCESS_KEY must be set"
  exit 1
fi

if [ -n $MLFLOW_S3_ENDPOINT_URL ]; then
  export MLFLOW_S3_ENDPOINT_URL=${MLFLOW_S3_ENDPOINT_URL}
fi


mlflow server \
  --backend-store-uri postgresql+psycopg2://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_DATABASE} \
  --default-artifact-root s3://${AWS_BUCKET}/artifacts \
  --host 0.0.0.0 \
  --port $PORT