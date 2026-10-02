# Guía para agentes

## Proyecto

Catálogo de biblioteca para listar, buscar y añadir libros. El frontend presenta la colección y el backend expone la API de libros.

## Stack y estructura

- `frontend/`: React, TypeScript y Vite. La pantalla principal está en `src/App.tsx`; componentes en `src/components/`; llamadas HTTP en `src/services/`; tipo `Book` en `src/types/`.
- `backend/`: Python, FastAPI, Pydantic y Uvicorn. La aplicación está en `app/main.py`; modelos en `app/models/`; rutas en `app/routes/`; lógica de libros en `app/services/`.
- `docker-compose.yml` levanta los servicios. El frontend se publica en el puerto `5173` y el backend en `8000`.

## Comandos

Desde la raíz:

```bash
docker compose up --build
docker compose down
curl http://localhost:8000/api/health
```

La ruta de salud debe responder `{"status":"ok"}`. La aplicación web está en `http://localhost:5173`.

Desde `frontend/`, los scripts definidos en `package.json` son:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Convenciones

- Mantén las llamadas HTTP y el manejo de respuestas en `frontend/src/services/books.ts`; los componentes consumen esas funciones.
- `App` mantiene la colección y el formulario comunica un alta mediante `onCreated`. Si cambias ese contrato, actualiza ambos lados.
- Mantén las rutas backend enfocadas en HTTP y delega la lógica de libros a `app/services/book_service.py`.
- Usa los modelos Pydantic y los `response_model` de FastAPI para preservar la validación y el formato de las respuestas.
- Si cambias la ruta o el puerto de la API, revisa juntos `frontend/src/services/books.ts`, `frontend/vite.config.ts` y `docker-compose.yml`.

## Reglas de dominio

- Un libro contiene `id`, `title`, `author`, `year`, `available` y `genre`.
- `title` y `author` requieren al menos un carácter; `year` es entero; `available` es booleano y su valor predeterminado es `true`; `genre` tiene un valor predeterminado.
- La API lista libros (`GET /api/books`), consulta por ID (`GET /api/books/{book_id}`) y crea libros (`POST /api/books`). La creación responde `201`; un ID inexistente responde `404`.
- `GET /api/books/genres/summary` devuelve hasta 3 géneros con más libros (género, cantidad y porcentaje) del conjunto filtrado por el parámetro opcional `title`.
- El servicio calcula el siguiente ID como el máximo actual más uno. No dependas de este mecanismo si introduces concurrencia o persistencia distinta.

## Forma de trabajar

- Antes de trabajar en `frontend/`, lee y sigue `.agents/rules/frontend.md`.
- Antes de trabajar en `backend/`, lee y sigue `.agents/rules/backend.md`.
- Antes de cambiar un contrato, sigue el flujo completo: formulario o pantalla, servicio frontend, ruta backend, modelo y servicio backend.
- Mantén alineados los campos de `frontend/src/types/book.ts` y `backend/app/models/book.py` cuando cambie la estructura de un libro.
- Para cambios de integración, comprueba el proxy Vite y la configuración de Compose además de la URL consumida por el frontend.
- No afirmes que un comando o flujo funciona sin ejecutarlo; distingue entre lo definido en los archivos y lo verificado en ejecución.

## Límites

- El servicio de libros modifica una colección importada `BOOKS` y calcula IDs a partir de sus elementos actuales. La definición de esa colección y cualquier persistencia externa no se verificaron; no prometas supervivencia de datos tras reinicios ni afirmes que no existe una base de datos en otra parte.
- Las rutas revisadas no implementan edición ni eliminación. No las presentes como funciones existentes sin implementar y verificar el flujo completo.
- No inventes comandos de pruebas backend: no se verificó un comando de test para ese servicio.

## Verificación

- Ejecuta `docker compose up --build`; comprueba la respuesta de `/api/health` y abre `http://localhost:5173`.
- En la interfaz, comprueba la carga del catálogo, la búsqueda por parte del título y el alta de un libro.
- Para cambios del frontend, ejecuta `npm run build` y `npm run lint` desde `frontend/`.
- Al modificar rutas, modelos o proxy, comprueba ambos lados del contrato y la configuración de Compose.

## Mantenimiento del contexto

- Cuando implementes una funcionalidad o un cambio relevante, revisa si ese cambio afecta al contexto documentado del proyecto.
- Actualiza únicamente los archivos que hayan quedado desactualizados por el cambio.
- Revisa especialmente:
  - `memory-bank/` si cambia el estado actual del proyecto, la arquitectura, decisiones técnicas, funcionalidades disponibles o trabajo pendiente.
  - `.agents/rules/` si el cambio introduce o modifica una convención, patrón, restricción o forma de trabajar que los agentes deban seguir en futuras tareas.
  - `AGENTS.md` si cambia una regla global del proyecto, el stack, la estructura, los comandos, los contratos principales o el flujo general de trabajo.
  - `README.md` u otra documentación funcional si cambia algo que un desarrollador o usuario necesite conocer.

- No actualices estos archivos por rutina si el cambio no modifica la información que contienen.
- No dupliques información innecesariamente entre `AGENTS.md`, `.agents/rules/` y `memory-bank/`; actualiza el archivo que sea responsable de ese tipo de conocimiento.
- Antes de finalizar una tarea relevante, comprueba si la documentación de contexto sigue representando correctamente el estado real del código.
- No documentes como implementado o verificado algo que no hayas comprobado en el código o en ejecución.