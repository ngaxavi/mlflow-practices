FROM python:3.8-slim-buster
ARG VERSION=1.10

ENV PORT 5000

RUN apt-get update -y && apt-get install -y build-essential libpq-dev

RUN echo "Installing MLFlow ${VERSION}"
# Add database driver to enable a connection: MySQL and PostgresSQl
RUN pip3 install mlflow==${VERSION} boto3 pymysql psycopg2

EXPOSE 5000

ADD run.sh /run.sh
RUN chmod +x /run.sh
CMD ["/run.sh"]