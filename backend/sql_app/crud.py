from sqlalchemy.orm import Session

from sql_app import models


def get_artists(db: Session):
    """
    Returns all artists in the database
    """
    return db.query(models.Artist).all()


def get_artist_by_id(db: Session, artist_id: int):
    """
    Returns an artist by id
    """
    return db.query(models.Artist).filter(models.Artist.id == artist_id).first()


def get_artist_by_name(db: Session, artist_name: str):
    """
    Returns an artist by name
    """
    return db.query(models.Artist).filter(models.Artist.name.like(artist_name)).first()


def get_albums(db: Session):
    """
    Returns all albums in the database
    """
    return db.query(models.Album).all()


def get_album_by_id(db: Session, album_id: int):
    """
    Returns an album by id
    """
    return db.query(models.Album).filter(models.Album.id == album_id).first()


def get_album_by_name(db: Session, album_name: str):
    """
    Returns an album by name
    """
    return db.query(models.Album).filter(models.Album.name.like(album_name)).first()


def get_album_by_artist_id(db: Session, artist_id: int):
    """
    Returns an album by artist id
    """
    return db.query(models.Album).filter(models.Album.artists_id == artist_id).first()


def get_songs(db: Session):
    """
    Returns all songs in the database
    """
    return db.query(models.Song).all()


def get_song_by_id(db: Session, song_id: int):
    """
    Returns a song by id
    """
    return db.query(models.Song).filter(models.Song.id == song_id).first()


def get_song_by_name(db: Session, song_name: str):
    """
    Returns a song by name
    """
    return db.query(models.Song).filter(models.Song.name.like(song_name)).first()


def get_song_by_album_id(db: Session, album_id: int):
    """
    Returns a song by album id
    """
    return db.query(models.Song).filter(models.Song.albums_id == album_id).first()


def get_song_info_by_id(db: Session, song_id: int):
    """
    Returns this song's info:
        songs.name, albums.name, artists.name, songs.genre, albums.year, songs.duration, albums.cover, albums.price
    """
    return db.execute(
        """
        SELECT  songs.name, albums.name, artists.name, songs.genre, albums.year, songs.duration, albums.cover, albums.price
            from songs 
            INNER JOIN albums ON albums.id = songs.albums_id
            INNER JOIN artists ON artists.id = albums.artists_id
            WHERE songs.id = {}
        """.format(
            song_id
        )  # type: ignore
    ).first()


def check_credentials(db: Session, email: str, pwd: str):
    """
    Returns true if credentials are correct
    """
    if (
        db.query(models.User)
        .filter(models.User.email == email)
        .filter(models.User.pwd == pwd)
        .first()
        != None
    ):
        return True

    return False


def add_album_to_cart(db: Session, user_id: int, album_id: int, quantity: int):
    """
    Adds an album to the cart
    """
    status_msg = {}

    album_stock = db.query(models.Album).filter(models.Album.id == album_id).first()
    album_to_add = (
        db.query(models.Cart)
        .filter(models.Cart.users_id == user_id)
        .filter(models.Cart.albums_id == album_id)
        .first()
    )

    if album_stock is None:
        return {"message": "Album does not exist"}

    if quantity <= 0:
        return {"message": "Quantity must be greater than 0, dumbass"}

    if quantity > album_stock.stock:
        return {"message": "Not enough stock"}

    if album_to_add is None:  # If item is not in cart, then we just add the line
        db.add(models.Cart(users_id=user_id, albums_id=album_id, quantity=quantity))
        album_stock.stock -= quantity
        db.commit()
        return {"message": "Item added to cart"}
    elif album_to_add is not None:  # If item is already in cart, we increment quantity
        album_to_add.quantity += quantity
        album_stock.stock -= quantity
        db.commit()
        status_msg = {"message": f"{quantity} added to item in cart"}

    return status_msg


def rem_album_from_cart(db: Session, user_id: int, album_id: int, quantity: int):
    """
    Remove item from cart
    """
    status_msg = {}

    album_stock = db.query(models.Album).filter(models.Album.id == album_id).first()
    album_to_remove = (
        db.query(models.Cart)
        .filter(models.Cart.users_id == user_id)
        .filter(models.Cart.albums_id == album_id)
        .first()
    )

    if album_stock is None:
        return {"message": "Album does not exist"}

    if quantity <= 0:
        return {"message": "Quantity must be greater than 0, dumbass"}

    if album_to_remove is None:  # Verify that item is in cart
        return {"message": "Item not in cart"}

    if album_to_remove.quantity > quantity:
        album_to_remove.quantity -= quantity
        album_stock.stock += quantity
        db.commit()
        status_msg = {"message": "{} item(s) removed from cart".format(quantity)}
    elif album_to_remove.quantity <= quantity:
        db.delete(album_to_remove)
        album_stock.stock += album_to_remove.quantity
        db.commit()
        status_msg = {"message": "Item removed from cart"}

    return status_msg


def get_cart_price(db: Session, user_id: int):
    """
    Returns the price of the cart
    """
    cart_price = 0
    cart_items = (
        db.query(models.Cart, models.Album)
        .join(models.Album, models.Album.id == models.Cart.albums_id)
        .filter(models.Cart.users_id == user_id)
        .all()
    )

    for item in cart_items:
        cart_price += item.Album.price * item.Cart.quantity

    return {"price": cart_price}


def pay_cart(db: Session, user_id: int):
    """
    Pays the cart
    """

    price_to_pay = get_cart_price(db, user_id)["price"]

    cart_items = db.query(models.Cart).filter(models.Cart.users_id == user_id).all()

    for item in cart_items:
        db.delete(item)
        db.commit()

    return {"message": "paid {}, emptying cart".format(price_to_pay)}
