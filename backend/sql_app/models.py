from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Artist(Base):
    __tablename__ = "artists"
    id = Column(Integer, primary_key=True)
    name = Column(String)


class Album(Base):
    __tablename__ = "albums"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    year = Column(Integer)
    price = Column(Float)
    cover = Column(String)
    stock = Column(Integer)
    year = Column(Integer)
    price = Column(Float)
    cover = Column(String)
    stock = Column(Integer)

    artists_id = Column(Integer, ForeignKey("artists.id"))


class Song(Base):
    __tablename__ = "songs"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    genre = Column(String)
    duration = Column(String)

    albums_id = Column(Integer, ForeignKey("albums.id"))


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    fname = Column(String)
    lname = Column(String)
    email = Column(String)
    pwd = Column(String)
    address = Column(String)
    zipcode = Column(String)
    city = Column(String)
    country = Column(String)
    admin = Column(Boolean)


class Cart(Base):
    __tablename__ = "carts"
    id = Column(Integer, primary_key=True)
    quantity = Column(Integer)

    users_id = Column(Integer, ForeignKey("users.id"))
    albums_id = Column(Integer, ForeignKey("albums.id"))


class Orders_items(Base):
    __tablename__ = "orders_item"
    id = Column(Integer, primary_key=True)
    quantity = Column(Integer)

    albums_id = Column(Integer, ForeignKey("albums.id"))
    orders_id = Column(Integer, ForeignKey("orders.id"))


class Orders(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    order_date = Column(String)
    total_price = Column(Float)
    state = Column(String)

    users_id = Column(Integer, ForeignKey("users.id"))
