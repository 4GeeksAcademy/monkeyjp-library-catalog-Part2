# 002 — Plan de implementación: resumen de géneros

## Estado

Pendiente de implementar.

## Backend

1. Añadir `genre` al modelo de libros en `backend/app/models/book.py` y alinearlo con el seed de `backend/app/data/books.py` (la spec y sus ejemplos exigen que los libros tengan género).

2. Añadir un modelo de respuesta en `backend/app/models/book.py` para cada elemento del resumen: género, cantidad y porcentaje.

3. Añadir una función en `backend/app/services/book_service.py` que:
   - acepte el filtro `title` opcional y reutilice el mismo filtrado de `list_books`;
   - cuente libros por género sobre el conjunto filtrado;
   - devuelva hasta 3 géneros ordenados por cantidad (con empate permitido, RF-6);
   - calcule el porcentaje sobre el total del conjunto.

4. Añadir la ruta `GET /api/books/genres/summary` en `backend/app/routes/books.py`, declarada antes de `GET /api/books/{book_id}` para evitar que `book_id` capture la ruta, con `title` como parámetro opcional y `response_model` propio.

## Frontend

1. Añadir el tipo del resumen en `frontend/src/types/book.ts`.

2. Añadir `getGenresSummary(title?)` en `frontend/src/services/books.ts`, con `response.ok` y ruta relativa `/api/books/genres/summary`.

3. Mostrar el resumen en `frontend/src/App.tsx` (sección propia o componente nuevo en `frontend/src/components/`):
   - consultar el endpoint cuando cambie `search`;
   - pintar nombre, cantidad y porcentaje de hasta 3 géneros;
   - mostrar la nota explícita cuando haya menos de 3.

## Archivos afectados

- `backend/app/models/book.py`
- `backend/app/data/books.py`
- `backend/app/services/book_service.py`
- `backend/app/routes/books.py`
- `frontend/src/types/book.ts`
- `frontend/src/services/books.ts`
- `frontend/src/App.tsx` (y/o un componente nuevo en `frontend/src/components/`)

## Orden recomendado

1. Backend: modelo, servicio, ruta.
2. Verificar el endpoint con y sin `title` (curl).
3. Frontend: tipo, servicio, UI.
4. Verificar la funcionalidad completa.

## Verificación básica

- `curl "http://localhost:8000/api/books/genres/summary"` y con `?title=princi`: comprobar géneros, cantidades, porcentajes y nota cuando hay menos de 3 (CA 1–8).
- Desde `frontend/`: `npm run build` y `npm run lint`.
- En la interfaz: buscar `princi`, comprobar que el resumen cambia; limpiar el buscador y comprobar que vuelve al total.