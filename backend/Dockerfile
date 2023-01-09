# syntax=docker/dockerfile:1

FROM python:3.8-alpine

WORKDIR /app

ARG env
ARG DB_USER
ARG DB_PWD
ARG DB_HOSTNAME
ARG DB_PORT
ARG DB_SCHEMA

ENV PORT=8080
ENV DB_USER=${DB_USER}
ENV DB_HOSTNAME=${DB_HOSTNAME}
ENV DB_PORT=${DB_PORT}
ENV DB_SCHEMA=${DB_SCHEMA}
ENV DB_PWD=${DB_PWD}

RUN touch .env | echo -e "DB_USER=$DB_USER \nDB_HOSTNAME=$DB_HOSTNAME \nDB_PORT=$DB_PORT \nDB_SCHEMA=$DB_SCHEMA \nDB_PWD=$DB_PWD" > .env

RUN apk add gcc musl-dev mariadb-connector-c-dev

COPY requirements.txt requirements.txt

RUN python -m pip install -r requirements.txt --upgrade pip

COPY ./ ./
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh", "entrypoint.sh"]

# COPY . .
# CMD [ "python3", "-m", "uvicorn", "main:app", "--port ", PORT, "--host", "0.0.0.0", "--reload" ]
# CMD exec python3 -m uvicorn main:app --host 0.0.0.0 --port ${PORT} 
