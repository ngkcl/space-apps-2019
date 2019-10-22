FROM python:3

RUN mkdir /app && cd /app && pip install poetry && poetry config settings.virtualenvs.create false
RUN apt update && apt-get install libopenblas-dev -y
RUN apt install python-scipy -y

COPY pyproject.toml /app

WORKDIR "/app"

RUN poetry install

COPY ./* /app


EXPOSE 9999
EXPOSE 5000
EXPOSE 8888

ENTRYPOINT bash ./run.sh
