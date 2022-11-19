# syntax=docker/dockerfile:1

FROM python:3.8-alpine

WORKDIR /app

RUN apk add gcc musl-dev mariadb-connector-c-dev

COPY requirements.txt requirements.txt

RUN python -m pip install -r requirements.txt --upgrade pip

COPY . .

CMD [ "python3", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--reload" ]