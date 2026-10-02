from pydantic import BaseModel, Field


class BookCreate(BaseModel):
    title: str = Field(min_length=1)
    author: str = Field(min_length=1)
    year: int
    available: bool = True
    genre: str = Field(default="Sin género", min_length=1)


class Book(BookCreate):
    id: int


class GenreSummary(BaseModel):
    genre: str
    count: int
    percentage: float
