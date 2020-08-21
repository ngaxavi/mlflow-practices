#!/bin/bash
tell() {
  echo -e "\033[0;33m|-- ${*}\033[0m"
  "$@" || {
    echo -e "\033[0;31mFail !\033[0m" 1>&2 ;
    exit 1 ;
  }
}

explain() {
  echo -e "\033[0;34m${1}\033[0m"
}

success() {
  echo -e "\033[0;32m${1}\033[0m"
}

explain "Build environment"
tell docker build -t spacy_docker_env -f Dockerfile .

#explain "Set Tracking endpoint"
tell export MLFLOW_TRACKING_URI=http://192.168.0.133:5000 # set your ip addr mlfow-server
tell export MLFLOW_EXPERIMENT_ID=2
#
#explain "Set Credentials for access to buckets"
tell export MLFLOW_S3_ENDPOINT_URL=http://192.168.0.133:9000 # set your ip addr minio
tell export AWS_ACCESS_KEY_ID=secret_mlflow
tell export AWS_SECRET_ACCESS_KEY=secret_mlflow

explain "Run many experiments"
tell mlflow run .
tell mlflow run .

