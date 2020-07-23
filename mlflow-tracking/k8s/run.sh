!#/bin/bash
BACKEND_STORE_URI=""
DEFAULT_ARTIFACT_ROOT="/opt/artifact"

DB_DIALECT=""
DB_PORT=""

# build the backend store uri and the default artifact root
if [ "$DB_VENDOR" == "postgres" ]; then
  DB_DIALECT="postgresql+psycopg2"
  DB_PORT=5432
elif ["$DB_VENDOR" == 'mysql']; then
  DB_DIALECT="mysql+pymysql"
  DB_PORT=3306
else
  echo "No Database Vendor provided. You should one database vendor, e.g.: postgres"
  exit 1
fi

echo "Setting of backend store uri"
BACKEND_STORE_URI="$DB_DIALECT://$DB_USER:$DB_PASSWORD@db:$DB_PORT/$DB_DATABASE"

if [! -z "$AWS_ACCESS_KEY_ID" && ! -z "$AWS_SECRET_ACCESS_ID"]
  DEFAULT_ARTIFACT_ROOT="s3://datalake/mlflow/artifacts"
fi

if [! -z "$MLFLOW_S3_ENDPOINT_URL" && -z "$AWS_DEFAULT_REGION"]; then
 export AWS_DEFAULT_REGION="cluster_region"
fi

mlflow server --host 0.0.0.0 --backend-store-uri $BACKEND_STORE_URI --default-artifact-root $DEFAULT_ARTIFACT_ROOT