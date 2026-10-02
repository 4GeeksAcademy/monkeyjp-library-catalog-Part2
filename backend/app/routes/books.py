from fastapi import APIRouter, HTTPException, status

from app.models.book import Book, BookCreate
from app.services.book_service import add_book, get_book, list_books

router = APIRouter(prefix="/books", tags=["books"])


@router.get("", response_model=list[Book])
def get_books(title: str | None = None):
    return list_books(title)


@router.get("/{book_id}", response_model=Book)
def get_book_by_id(book_id: int):
    book = get_book(book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    return book


@router.post("", response_model=Book, status_code=status.HTTP_201_CREATED)
def create_book(payload: BookCreate):
    return add_book(payload)
