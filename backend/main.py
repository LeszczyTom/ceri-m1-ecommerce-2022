from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import sql_app.crud as crud
import sql_app.models as models
import sql_app.schemas as schemas
from sql_app.database import SessionLocal, engine

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    # return {"message": "Hello World"}
    return { "hello", "world" }


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
def read_albums(db: Session = Depends(get_db)):
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
def read_songs(db: Session = Depends(get_db)):
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


@app.post("/add_album_cart", summary="Adds an album to the cart")
def add_album_to_cart(cart_item: schemas.Cart_item, db: Session = Depends(get_db)):
    return crud.add_album_to_cart(
        db, cart_item.user_id, cart_item.albums_id, cart_item.quantity
    )


@app.post("/rem_album_cart", summary="Removes a song from the cart of a user")
def rem_album_from_cart(cart_item: schemas.Cart_item, db: Session = Depends(get_db)):
    return crud.rem_album_from_cart(
        db, cart_item.user_id, cart_item.albums_id, cart_item.quantity
    )


@app.get("/cart/{user_id}", summary="Returns all items in the cart")
def get_user_cart(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_cart(db, user_id)


@app.get(
    "/cart_price/{user_id}",
    summary="Returns the price of the cart",
    response_model=schemas.Price,
)
def get_cart_price(user_id: int, db: Session = Depends(get_db)):
    return crud.get_cart_price(db, user_id)


@app.get("/pay_cart/{userid}", summary="Pays the cart of a user")
def pay_cart(userid: int, db: Session = Depends(get_db)):
    return crud.pay_cart(db, userid)


@app.post("/register", summary="Returns true if registration was successful")
def register(login_credential: schemas.LoginCredential, db: Session = Depends(get_db)):
    return crud.user_registration(db, login_credential.email, login_credential.pwd)


@app.get("/orders", summary="Returns all orders")
def read_orders(db: Session = Depends(get_db)):
    return crud.get_orders(db, None)


@app.get("/orders/{user_id}", summary="Returns all orders of a user")
def read_orders_by_user_id(user_id: int, db: Session = Depends(get_db)):
    return crud.get_orders(db, user_id)


@app.post("/update_stock", summary="Updates the stock of an album")
def update_stock(update_info: schemas.Update_stock, db: Session = Depends(get_db)):
    return crud.update_stock(db, update_info.album_id, update_info.stock)


@app.delete("/delete_album/{album_id}", summary="Deletes an album")
def delete_album(album_id: int, db: Session = Depends(get_db)):
    return crud.delete_album(db, album_id)


@app.post("/add_album", summary="Adds an album")
def add_album(album: schemas.Album_to_add, db: Session = Depends(get_db)):
    return crud.add_album(db, album)


@app.post("/update_order", summary="Updates an order")
def update_order(order: schemas.Order_update, db: Session = Depends(get_db)):
    return crud.update_order(db, order)


@app.delete("/delete_order/{order_id}", summary="Deletes an order")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    return crud.delete_order(db, order_id)
