# Progreso del proyecto

## Funciona

Hechos verificados en el código y, donde se indica, en ejecución:

- La aplicación frontend carga el catálogo mediante `GET /api/books` y muestra los libros como tarjetas.
- La búsqueda del catálogo consulta la API con `GET /api/books?title=<texto>`; el backend filtra únicamente por parte del título, sin distinguir mayúsculas, ignorando espacios exteriores y devolviendo todos los libros si el texto está vacío o no hay coincidencias.
- Cuando la respuesta de búsqueda está vacía, la interfaz muestra exactamente `No se encontraron libros`.
- El formulario envía libros con título, autor, año y disponibilidad inicial `true`.
- El frontend permite consultar un libro por ID mediante `getBookById` y la interfaz `BookLookup` muestra estados de carga, no encontrado y error.
- El backend define `GET /api/books`, `GET /api/books/{book_id}` y `POST /api/books`.
- El backend define `GET /api/books/genres/summary` (acepta `title` opcional): devuelve hasta 3 géneros con más libros del conjunto filtrado, con cantidad y porcentaje; la interfaz lo muestra y añade una nota cuando hay menos de 3.
- La consulta de un ID inexistente responde `404` y la creación responde `201`.
- Las rutas backend delegan la lógica en `book_service` y usan modelos Pydantic para las respuestas.
- Docker Compose define los servicios frontend y backend, publicados en los puertos `5173` y `8000`.
- Vite configura el reenvío de `/api` hacia el backend mediante `host.docker.internal:8000`.
- El backend define `GET /api/health` y permite CORS desde `http://localhost:5173`.

Verificado en ejecución (2026-10-02): `docker compose up --build backend` responde `{"status":"ok"}` en `/api/health`; los criterios de aceptación de `specs/001-title-search/spec.md` a nivel de API pasaron con los libros de ejemplo insertados vía `POST`; `npm run build` y `npm run lint` pasan ejecutados en el contenedor del frontend; el frontend sirve en `5173` y su proxy reenvía `/api/books` con y sin `title` al backend.

## Limitaciones actuales

Hechos comprobables:

- En el host, `npm ci`/`npm run build` fallan porque `frontend/node_modules` está vacío y es propiedad de root; build y lint se ejecutan en el contenedor del frontend y pasan.
- No se verificó mediante una prueba end-to-end en navegador el flujo de búsqueda en la interfaz (teclear y ver resultados renderizados); se verificó la API, el proxy, el bundle construido y el código.
- No se verificó un comando de pruebas automatizadas para el backend; el proyecto no declara uno.
- El servicio de libros modifica la colección importada `BOOKS` y calcula el siguiente ID a partir del máximo actual; no se verificó la definición de esa colección ni si existe persistencia externa.
- Las rutas backend revisadas no implementan edición ni eliminación.
- `BookForm` no captura ni muestra errores del servicio `createBook` y no tiene un estado de envío documentado para impedir envíos duplicados.

## Próximos pasos sugeridos

Sugerencias derivadas de las limitaciones anteriores:

- Si el host debe poder ejecutar npm directamente, corregir los permisos de `frontend/node_modules` (propiedad de root, vacío); hasta entonces, usar el contenedor para `npm run build` y `npm run lint`.
- Ejecutar una prueba end-to-end en navegador de la búsqueda por título (teclear y ver resultados) si el proyecto adopta un framework de pruebas E2E.
- Probar desde la interfaz un ID existente y otro inexistente, además de conservar las comprobaciones de búsqueda y creación.
- Añadir pruebas backend si el proyecto adopta un framework y comando de pruebas; actualmente no hay uno verificado.
- Definir y documentar la estrategia de persistencia y concurrencia si los libros deben sobrevivir a reinicios o recibir altas simultáneas.
- Si el producto lo requiere, diseñar e implementar rutas y UI para edición o eliminación manteniendo alineados el frontend, los modelos, las rutas y el servicio backend.
- Mejorar `BookForm` para capturar errores de creación y bloquear envíos duplicados.