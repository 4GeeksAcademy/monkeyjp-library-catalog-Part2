# 002 — Tareas: resumen de géneros

## Backend

- [x] T1 — Añadir `genre` al modelo `Book` en `backend/app/models/book.py` y alinear los libros de ejemplo en `backend/app/data/books.py`.
- [x] T2 — Añadir el modelo de respuesta del resumen (género, cantidad, porcentaje) en `backend/app/models/book.py`.
- [x] T3 — Implementar la función de resumen en `backend/app/services/book_service.py`: filtrar con `title` reutilizando `list_books`, contar por género, devolver hasta 3 ordenados por cantidad y calcular el porcentaje sobre el total.
- [x] T4 — Añadir `GET /api/books/genres/summary` en `backend/app/routes/books.py` (declarada antes de `/{book_id}`, con `title` opcional y `response_model`) y verificar con curl con y sin `?title`.

## Frontend

- [x] T5 — Añadir el tipo del resumen en `frontend/src/types/book.ts` y la función `getGenresSummary(title?)` en `frontend/src/services/books.ts` con `response.ok`.
- [x] T6 — Mostrar el resumen en `frontend/src/App.tsx` (o componente nuevo): consultar el endpoint al cambiar `search`, pintar nombre, cantidad y porcentaje de hasta 3 géneros y mostrar la nota cuando hay menos de 3.

## Verificación

- [x] T7 — Ejecutar `npm run build` y `npm run lint` desde `frontend/`, probar en la interfaz el filtro `princi` y limpiar el buscador, y comprobar los criterios de aceptación 1–8 de `spec.md`.