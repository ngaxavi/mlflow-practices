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
tell docker build -t mlflow-docker-env -f Dockerfile .

explain "Set Tracking endpoint"
tell export MLFLOW_TRACKING_URI=http://127.0.0.1:5000

explain "Run many experiments"
tell mlflow run . -P alpha=0.1
tell mlflow run . -P alpha=0.2
tell mlflow run . -P alpha=0.3
tell mlflow run . -P alpha=0.4
tell mlflow run . -P alpha=0.5
tell mlflow run . -P alpha=0.6
tell mlflow run . -P alpha=0.7
tell mlflow run . -P alpha=0.8
tell mlflow run . -P alpha=0.9
tell mlflow run . -P alpha=0.1 -P l1_ratio=0.2
tell mlflow run . -P alpha=0.2 -P l1_ratio=0.2
tell mlflow run . -P alpha=0.3 -P l1_ratio=0.2
tell mlflow run . -P alpha=0.4 -P l1_ratio=0.2

