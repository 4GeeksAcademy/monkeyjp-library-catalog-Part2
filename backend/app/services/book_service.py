from app.data.books import BOOKS
from app.models.book import BookCreate, GenreSummary


def list_books(title: str | None = None):
    if title is None or not title.strip():
        return BOOKS

    term = title.strip().lower()
    return [book for book in BOOKS if term in book["title"].lower()]


def get_book(book_id: int):
    return next((book for book in BOOKS if book["id"] == book_id), None)


def add_book(data: BookCreate):
    next_id = max((book["id"] for book in BOOKS), default=0) + 1
    book = {"id": next_id, **data.model_dump()}
    BOOKS.append(book)
    return book


def genres_summary(title: str | None = None):
    books = list_books(title)
    total = len(books)

    if total == 0:
        return []

    counts: dict[str, int] = {}
    for book in books:
        genre = book.get("genre", "Sin género")
        counts[genre] = counts.get(genre, 0) + 1

    ranked = sorted(counts.items(), key=lambda item: item[1], reverse=True)[:3]

    return [
        GenreSummary(
            genre=genre,
            count=count,
            percentage=round(count * 100 / total, 2),
        )
        for genre, count in ranked
    ]
