#!/bin/sh
echo ${PORT}
uvicorn main:app --host "0.0.0.0" --port ${PORT}