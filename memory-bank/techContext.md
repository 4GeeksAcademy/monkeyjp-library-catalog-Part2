# Contexto técnico

## Stack y estructura

- **Frontend:** React 19, React DOM, TypeScript, Vite 8, Tailwind CSS 4 y Lucide. Dependencias declaradas en [frontend/package.json](../frontend/package.json). El arranque de Vite está en [frontend/src/main.tsx](../frontend/src/main.tsx), la aplicación en [frontend/src/App.tsx](../frontend/src/App.tsx), componentes en [frontend/src/components/](../frontend/src/components/) y peticiones HTTP en [frontend/src/services/books.ts](../frontend/src/services/books.ts).
- **Backend:** Python 3.13 en la imagen, FastAPI, Pydantic y Uvicorn, declarados en [backend/Dockerfile](../backend/Dockerfile) y [backend/requirements.txt](../backend/requirements.txt). La aplicación se configura en [backend/app/main.py](../backend/app/main.py), con modelos en [backend/app/models/book.py](../backend/app/models/book.py), rutas en [backend/app/routes/books.py](../backend/app/routes/books.py) y lógica en [backend/app/services/book_service.py](../backend/app/services/book_service.py).
- **Contenedores:** [docker-compose.yml](../docker-compose.yml) levanta ambos servicios, publica el frontend en `5173` y el backend en `8000`, y configura `host.docker.internal` para el contenedor frontend.

## Comunicación frontend-backend

- El frontend hace peticiones relativas a `/api/books` desde [frontend/src/services/books.ts](../frontend/src/services/books.ts): `GET` para listar (acepta el parámetro opcional `title`), `GET /api/books/{id}` para consultar por ID, `POST` para crear y `GET /api/books/genres/summary` para el resumen de géneros (acepta `title`).
- [frontend/vite.config.ts](../frontend/vite.config.ts) reenvía `/api` a `http://host.docker.internal:8000`.
- [backend/app/main.py](../backend/app/main.py) monta el router de libros bajo `/api`, permite CORS desde `http://localhost:5173` y define `GET /api/health`.
- [backend/app/routes/books.py](../backend/app/routes/books.py) define el contrato HTTP: la creación responde `201` y un ID inexistente responde `404`.

## Comandos definidos

Desde la raíz, [README.md](../README.md) indica:

```bash
docker compose up --build
```

Para detener los servicios y comprobar la salud del backend, [AGENTS.md](../AGENTS.md) documenta:

```bash
docker compose down
curl http://localhost:8000/api/health
```

La respuesta esperada para la comprobación de salud es `{"status":"ok"}`; los servicios se exponen en `http://localhost:5173` y `http://localhost:8000` según [docker-compose.yml](../docker-compose.yml).

Desde `frontend/`, [frontend/package.json](../frontend/package.json) define `npm run dev`, `npm run build`, `npm run lint` y `npm run preview`.

## Comprobaciones observadas

- Los comandos de Compose se documentan en los archivos citados.
- En esta revisión, `docker compose up --build backend` respondió `{"status":"ok"}` en `/api/health`, y el backend sirvió `GET /api/books` con y sin `title`, filtrando por título en ejecución.
- En esta revisión, `npm run build` y `npm run lint` pasaron ejecutados dentro del contenedor del frontend (`docker compose run --rm --no-deps frontend ...`). En el host, `frontend/node_modules` está vacío y es propiedad de root, por lo que npm no puede instalar allí.
- En esta revisión, el frontend sirvió en `5173` y el proxy de Vite reenvió `/api/books` con y sin `title` al backend.
- No se verificó un comando de pruebas para el backend; el proyecto no declara uno.