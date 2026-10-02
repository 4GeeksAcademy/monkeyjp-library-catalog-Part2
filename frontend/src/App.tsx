import { useEffect, useState } from "react";
import { BookOpen, Library, Search } from "lucide-react";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import BookLookup from "./components/BookLookup";
import { getBooks, getGenresSummary } from "./services/books";
import type { Book, GenreSummary } from "./types/book";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [results, setResults] = useState<Book[]>([]);
  const [summary, setSummary] = useState<GenreSummary[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(() => setError("Could not load catalog"));
  }, []);

  useEffect(() => {
    let cancelled = false;

    getBooks(search)
      .then((data) => {
        if (!cancelled) {
          setResults(data);
          setError("");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load catalog");
        }
      });

    getGenresSummary(search)
      .then((data) => {
        if (!cancelled) {
          setSummary(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load catalog");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [search]);

  const availableBooks = books.filter((book) => book.available).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Library size={24} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Library Catalog
              </h1>
              <p className="text-sm text-slate-500">
                Manage your library collection
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total books</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {books.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Available</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {availableBooks}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Unavailable</p>
            <p className="mt-2 text-3xl font-bold text-rose-600">
              {books.length - availableBooks}
            </p>
          </div>
        </section>

        <BookForm
          onCreated={(book) => {
            setBooks((current) => [...current, book]);
            getBooks(search)
              .then(setResults)
              .catch(() => setError("Could not load catalog"));
          }}
        />

        <BookLookup />

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Top genres
            </h2>
            <p className="text-sm text-slate-500">
              Genres with more books in the current selection.
            </p>
          </div>

          {summary.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {summary.map((item) => (
                  <div
                    key={item.genre}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900">
                        {item.genre}
                      </p>
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                        {item.percentage}%
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {item.count}{" "}
                      {item.count === 1 ? "book" : "books"}
                    </p>
                  </div>
                ))}
              </div>

              {summary.length < 3 && (
                <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
                  There are less than 3 genres in the current selection.
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-10 text-center">
              <p className="font-medium text-slate-600">
                No genres to show
              </p>
            </div>
          )}
        </section>

        <section>
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Book collection
              </h2>
              <p className="text-sm text-slate-500">
                Browse the books currently registered.
              </p>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search books..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 md:w-72"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <BookOpen
                size={40}
                className="mx-auto mb-3 text-slate-300"
              />
              <p className="font-medium text-slate-600">
                No se encontraron libros
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}