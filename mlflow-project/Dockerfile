FROM frolvlad/alpine-miniconda3:python3.7

RUN pip install mlflow>=1.9.0 \
    && pip install numpy>=1.17.3 \
    && pip install scipy \
    && pip install pandas==1.1.0 \
    && pip install scikit-learn==0.23.2 \
    && pip install cloudpickle \
    && pip install boto3