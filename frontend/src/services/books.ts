import type { Book, GenreSummary } from "../types/book";

export async function getBooks(title?: string): Promise<Book[]> {
  const params = new URLSearchParams();

  if (title !== undefined) {
    params.set("title", title);
  }

  const query = params.toString();
  const response = await fetch(`/api/books${query ? `?${query}` : ""}`);

  if (!response.ok) {
    throw new Error("Could not load books");
  }

  return response.json();
}

export async function getGenresSummary(title?: string): Promise<GenreSummary[]> {
  const params = new URLSearchParams();

  if (title !== undefined) {
    params.set("title", title);
  }

  const query = params.toString();
  const response = await fetch(
    `/api/books/genres/summary${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Could not load genres summary");
  }

  return response.json();
}

export async function getBookById(bookId: number): Promise<Book | null> {
  const response = await fetch(`/api/books/${bookId}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Could not load book");
  }

  return response.json();
}

export async function createBook(
  book: Omit<Book, "id" | "genre">
): Promise<Book> {
  const response = await fetch("/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Could not create book");
  }

  return response.json();
}
