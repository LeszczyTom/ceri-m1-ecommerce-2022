from uvicorn import run
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


def start():
    """Launched with `poetry run start` at root level"""
    run("backend.main:app", host="localhost", port=8000, reload=True)
