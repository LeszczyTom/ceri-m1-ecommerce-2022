from datetime import date
from pydantic import BaseModel

class Artist(BaseModel):
	id: int
	name: str

	class Config:
		orm_mode = True

class Album(BaseModel):
	id: int
	name: str
	artists_id: int

	class Config:
		orm_mode = True

class Song(BaseModel):
	id: int
	name: str
	albums_id: int

	class Config:
		orm_mode = True