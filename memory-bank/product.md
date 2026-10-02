# Resumen del producto

El proyecto implementa un catálogo web de biblioteca. La interfaz permite consultar la colección, buscar libros por parte de su título mediante `GET /api/books?title=<string>`, obtener un libro por ID, ver su disponibilidad y añadir un libro con título, autor y año.

## Hechos verificados en el código

- La interfaz muestra totales de libros disponibles y no disponibles.
- Un libro contiene `id`, `title`, `author`, `year` y `available`.
- La API define operaciones para listar libros, consultar uno por ID y crear libros. La consulta de un ID inexistente responde `404`; la creación responde `201`.
- El formulario crea libros con `available: true`.

## Límites de lo conocido

- No se verificó la definición de la colección importada `BOOKS` ni si existe persistencia externa. No se puede afirmar cuánto duran los datos ni si hay una base de datos.
- Las rutas backend revisadas no implementan edición ni eliminación.
- Estas capacidades se describen a partir del código; no se verificó el flujo completo de la aplicación en ejecución.