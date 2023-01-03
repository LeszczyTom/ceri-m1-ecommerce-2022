# syntax=docker/dockerfile:1

FROM python:3.8-alpine

WORKDIR /app

ARG env

RUN touch .env

RUN echo "ENV=${env}" >> .env

ENV PORT 8080

RUN apk add gcc musl-dev mariadb-connector-c-dev

COPY requirements.txt requirements.txt

RUN python -m pip install -r requirements.txt --upgrade pip

COPY . .

# CMD [ "python3", "-m", "uvicorn", "main:app", "--port ", PORT, "--host", "0.0.0.0", "--reload" ]
CMD exec python3 -m uvicorn main:app --host 0.0.0.0 --port ${PORT} 