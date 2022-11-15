from fastapi import FastAPI, Depends, Request

from sqlalchemy.orm import Session

import sql_app.crud as crud
import sql_app.models as models
import sql_app.schemas as schemas
from sql_app.database import SessionLocal, engine
app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/artists", summary="Returns all artists")
def read_artists(db: Session = Depends(get_db)):
    artists = crud.get_artists(db)
    return artists

@app.get("/artists/{artist_id}", summary="Returns a specific artist by id")
def read_artist_by_id(artist_id: int, db: Session = Depends(get_db)):
    artist = crud.get_artist_by_id(db, artist_id)
    return artist

@app.get("/artists/name/{artist_name}", summary="Returns a specific artist by name")
def read_artist_by_name(artist_name: str, db: Session = Depends(get_db)):
    artist = crud.get_artist_by_name(db, artist_name)
    return artist

@app.get("/albums", summary="Returns all albums")
def read_artists(db: Session = Depends(get_db)):
    albums = crud.get_albums(db)
    return albums

@app.get("/albums/{album_id}", summary="Returns a specific album by id")
def read_album_by_id(album_id: int, db: Session = Depends(get_db)):
    album = crud.get_album_by_id(db, album_id)
    return album

@app.get("/albums/name/{album_name}", summary="Returns a specific album by name")
def read_album_by_name(album_name: str, db: Session = Depends(get_db)):
    album = crud.get_album_by_name(db, album_name)
    return album

@app.get("/albums/artist/{artist_id}", summary="Returns all albums by artist id")
def read_album_by_artist_id(artist_id: int, db: Session = Depends(get_db)):
    album = crud.get_album_by_artist_id(db, artist_id)
    return album

@app.get("/songs", summary="Returns all songs")
def read_artists(db: Session = Depends(get_db)):
    songs = crud.get_songs(db)
    return songs

@app.get("/songs/{song_id}", summary="Returns a specific song by id")
def read_song_by_id(song_id: int, db: Session = Depends(get_db)):
    song = crud.get_song_by_id(db, song_id)
    return song

@app.get("/songs/name/{song_name}", summary="Returns a specific song by name")
def read_song_by_name(song_name: str, db: Session = Depends(get_db)):
    song = crud.get_song_by_name(db, song_name)
    return song

@app.get("/songs/album/{album_id}", summary="Returns all songs by album id")
def read_song_by_album_id(album_id: int, db: Session = Depends(get_db)):
    song = crud.get_song_by_album_id(db, album_id)
    return song

@app.get("/songs/info/{song_id}", summary="Returns info about a specific song by id")
def read_song_info_by_id(song_id: int, db: Session = Depends(get_db)):
    song = crud.get_song_info_by_id(db, song_id)
    return song

@app.post("/login", summary="Returns true if credentials are correct")
def login(login_credential: schemas.LoginCredential, db: Session = Depends(get_db)):
    return crud.check_credentials(db, login_credential.email, login_credential.pwd)