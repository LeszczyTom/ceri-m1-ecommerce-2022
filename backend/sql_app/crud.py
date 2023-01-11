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
        if db.query(models.User).filter(models.User.email == email).first().admin == 1:  # type: ignore
            return "admin"
        return db.query(models.User).filter(models.User.email == email).filter(models.User.pwd == pwd).first().id

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


def get_user_cart(db: Session, user_id):
    """
    Return user cart
    """
    albums_in_cart = db.query(models.Album, models.Cart.quantity).join(models.Cart, models.Album.id == models.Cart.albums_id).filter(models.Cart.users_id == user_id).all()
    
    
    return albums_in_cart
    

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


from datetime import datetime


def pay_cart(db: Session, user_id: int):
    """
    Pays the cart
    """

    cart_items = db.query(models.Cart).filter(models.Cart.users_id == user_id).all()

    if len(cart_items) == 0:
        return {"message": "Cart is empty"}

    now = datetime.now()

    price_to_pay = get_cart_price(db, user_id)["price"]

    new_order = models.Orders(
        order_date=now.strftime("%d/%m/%Y"),
        total_price=price_to_pay,
        state="pending",
        users_id=user_id,
    )

    db.add(new_order)
    db.flush()
    db.refresh(new_order)

    for item in cart_items:
        db.add(
            models.Orders_items(
                quantity=item.quantity, albums_id=item.albums_id, orders_id=new_order.id
            )
        )
        db.delete(item)

    db.commit()

    return {"message": "paid {}, emptying cart".format(price_to_pay)}


def user_registration(db: Session, email: str, pwd: str):
    """
    Registers a new user
    """
    exists = db.query(models.User.email).filter_by(email=email).first() is not None
    if exists:
        return False

    db.add(models.User(email=email, pwd=pwd))
    db.commit()
    return True


def get_orders(db: Session, user_id: int):
    """
    Returns all orders
    Also return user_id item if not None
    """

    if user_id is None:
        orders_vanilla = db.query(models.Orders).all()
    elif user_id is not None:
        orders_vanilla = (
            db.query(models.Orders).filter(models.Orders.users_id == user_id).all()
        )

    to_return = []

    for order in orders_vanilla:
        # print("order id : ", order.id)
        obj = {
            "customerId": order.users_id,
            "orderNumber": order.id,
            "total": order.total_price,
            "status": order.state,
        }
        items = []
        order_items = (
            db.query(models.Orders_items)
            .filter(models.Orders_items.orders_id == order.id)
            .all()
        )
        for item in order_items:
            album = (
                db.query(models.Album).filter(models.Album.id == item.albums_id).first()
            )
            print(album.__dict__)
            items.append(
                {
                    "productId": album.id,  # type: ignore
                    "name": album.name,  # type: ignore
                    "quantity": item.quantity,  # type: ignore
                    "price": album.price,  # type: ignore
                }
            )

            obj["items"] = items
        to_return.append(obj)

    return to_return


def update_stock(db: Session, album_id: int, stock: int):
    """
    Updates the stock of an album
    """
    album = db.query(models.Album).filter(models.Album.id == album_id).first()
    if album is None:
        return {"message": "Album does not exist"}

    if stock <= 0:
        return {"message": "Quantity must be greater than 0, dumbass"}

    album.stock = stock
    db.commit()
    return {"message": "Stock updated"}


def delete_album(db: Session, album_id: int):
    """
    Delete an album from db
    """
    album = db.query(models.Album).filter(models.Album.id == album_id).first()
    if album is None:
        return {"message": "Album not found"}
    db.delete(album)

    db.commit()

    album = db.query(models.Album).filter(models.Album.id == album_id).first()

    if album is None:
        return {"message": "Album deleted"}

    return {"message": "Something wrong happened"}


def add_album(db: Session, album):

    exists = db.query(models.Album).filter_by(name=album.name).first()
    artist_id = (
        db.query(models.Artist).filter(models.Artist.name.ilike(album.artist)).first()
    )

    if artist_id is None:
        new_artist = models.Artist(name=album.artist)
        db.add(new_artist)
        db.commit()
        
        artist_id = (
        db.query(models.Artist).filter(models.Artist.name.ilike(album.artist)).first()
    )

    print("##################### exists", exists)
    if exists:
        return {"message": "Album already in db"}

    album_to_add = models.Album(
        name=album.name,
        artists_id=artist_id.id,  # type: ignore
        year=album.year,
        price=album.price,
        cover=album.cover,
        stock=album.stock,
    )

    db.add(album_to_add)
    db.commit()
    
    print("##################### album added", album_to_add)

    return {"message": "Album added"}


def update_order(db: Session, order):
    """
    Updates an order
    """

    order_to_edit = db.query(models.Orders).filter(models.Orders.id == order.id).first()

    if order_to_edit is None:
        return {"message": "Order not found"}

    order_to_edit.state = order.state

    print("type", type(order_to_edit))
    db.commit()

    return {"message": "Order updated"}


def delete_order(db: Session, order_id):
    """
    Delete an order with a giving id
    """
    print("order id ==", order_id)
    
    order_items = db.query(models.Orders_items).filter(models.Orders_items.orders_id == order_id).all()
    
    for item in order_items:
        db.delete(item)
        db.commit()
    
    order = db.query(models.Orders).filter(models.Orders.id == order_id).first()

    if order is None:
        return {"message": "Order not found"}

    db.delete(order)
    db.commit()

    return {"message": "Order deleted"}