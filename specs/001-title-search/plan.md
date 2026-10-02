# 001 — Plan de implementación: búsqueda por título

## Estado

Implementado y verificado (T1–T7 completadas).

## Backend

1. Modificar `backend/app/routes/books.py` para aceptar `title` como parámetro opcional en `GET /api/books`.

2. Modificar `backend/app/services/book_service.py` para:
   - filtrar únicamente por título;
   - realizar coincidencia parcial;
   - ignorar mayúsculas y minúsculas;
   - ignorar espacios exteriores;
   - devolver todos los libros si `title` está vacío;
   - devolver `[]` si no hay coincidencias.

3. Verificar el comportamiento del endpoint con y sin `title`.

## Frontend

1. Modificar `frontend/src/services/books.ts` para permitir:

   `getBooks(title)`

   y enviar el parámetro `title` a la API.

2. Modificar `frontend/src/App.tsx` para:
   - eliminar el filtrado local por título o autor;
   - consultar la API cuando cambie el buscador;
   - mostrar la respuesta recibida;
   - mostrar todos los libros cuando el buscador esté vacío;
   - mostrar `No se encontraron libros` cuando no haya resultados.

## Archivos afectados

- `backend/app/routes/books.py`
- `backend/app/services/book_service.py`
- `frontend/src/services/books.ts`
- `frontend/src/App.tsx`

## Verificación

Comprobar los criterios de aceptación definidos en `spec.md`.

## Orden recomendado

1. Backend.
2. Verificar endpoint.
3. Frontend.
4. Verificar la funcionalidad completa.