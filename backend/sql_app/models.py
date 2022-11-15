from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
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

    artists_id = Column(Integer, ForeignKey("artists.id"))


class Song(Base):
    __tablename__ = "songs"
    id = Column(Integer, primary_key=True)
    name = Column(String)

    albums_id = Column(Integer, ForeignKey("albums.id"))


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    fname = Column(String)
    lname = Column(String)
    email = Column(String)
    pwd = Column(String)


# from sqlalchemy.orm import sessionmaker

# Session = sessionmaker(bind=engine)
# session = Session()
