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


class User(BaseModel):
    id: int
    fname: str
    lname: str
    email: str
    pwd: str

    class Config:
        orm_mode = True


class LoginCredential(BaseModel):
    email: str
    pwd: str

    class Config:
        orm_mode = True
