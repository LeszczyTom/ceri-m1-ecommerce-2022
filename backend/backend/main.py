import backend.models as models

import uvicorn
from fastapi import FastAPI
from sqlmodel import Session, select

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/artists")
def read_artists():
    with Session(models.engine) as session:
        artists = session.exec(select(models.Artist)).all()
        return artists

@app.get("/albums")
def read_artists():
    with Session(models.engine) as session:
        albums = session.exec(select(models.Album)).all()
        return albums


@app.get("/songs")
def read_artists():
    with Session(models.engine) as session:
        songs = session.exec(select(models.Song)).all()
        return songs

def start():
    """Launched with `poetry run start` at root level"""
    uvicorn.run("backend.main:app", host="localhost", port=8000, reload=True)


