FROM python:3.8-slim-buster
ARG VERSION=1.8.0

RUN apt-get update -y && apt-get install -y build-essential libpq-dev

RUN echo "Installing MLFlow ${VERSION}"
# Add database driver to enable a connection: MySQL and PostgresSQl
RUN pip3 install mlflow==${VERSION} boto3 pymsql psycopg2
EXPOSE 5000
ADD run.sh /root/run.sh
CMD ["/root/run.sh"]