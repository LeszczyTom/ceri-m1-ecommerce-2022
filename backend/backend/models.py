import os
from typing import Optional

DB_USER=os.environ.get('DB_USER')
DB_PWD=os.environ.get('DB_PWD')
DB_HOSTNAME=os.environ.get('DB_HOSTNAME')
DB_PORT=os.environ.get('DB_PORT')
DB_SCHEMA=os.environ.get('DB_SCHEMA')

from sqlmodel import Field, SQLModel, create_engine


class Artist(SQLModel, table=True):
	__tablename__ = "artists"
	id: Optional[int] = Field(default=None, primary_key=True)
	name: str

class Album(SQLModel, table=True):
	__tablename__ = "albums"
	id: Optional[int] = Field(default=None, primary_key=True)
	name: str

	artists_id: Optional[int] = Field(default=None, foreign_key="artists.id")

class Song(SQLModel, table=True):
	__tablename__ = "songs"
	id: Optional[int] = Field(default=None, primary_key=True)
	name: str

	albums_id: Optional[int] = Field(default=None, foreign_key="albums.id")

# print("mysql://{}:{}@{}:{}/mydb".format(DB_USER,DB_PWD,DB_HOSTNAME,DB_PORT,DB_SCHEMA ))

engine = create_engine("mysql://{}:{}@{}:{}/mydb".format(DB_USER,DB_PWD,DB_HOSTNAME,DB_PORT,DB_SCHEMA ), echo=True)