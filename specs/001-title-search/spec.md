# 001 — Búsqueda por título

## Objetivo

Permitir que un bibliotecario filtre el catálogo escribiendo una parte del título de un libro.

## Usuario

- Bibliotecario.

## Historia de usuario

Como bibliotecario quiero buscar libros por parte de su título para encontrarlos más rápidamente.

## Requisitos funcionales

- RF-1: CUANDO el usuario escriba texto en el buscador, EL SISTEMA mostrará los libros cuyo título contenga ese texto.
- RF-2: EL SISTEMA buscará únicamente por título.
- RF-3: EL SISTEMA no distinguirá entre mayúsculas y minúsculas.
- RF-4: CUANDO el buscador esté vacío o contenga solo espacios, EL SISTEMA mostrará todos los libros.
- RF-5: EL SISTEMA ignorará los espacios al principio y al final de la búsqueda.
- RF-6: CUANDO cambie el texto del buscador, EL SISTEMA actualizará automáticamente los resultados.
- RF-7: SI no existen coincidencias, EL SISTEMA mostrará exactamente `No se encontraron libros`.
- RF-8: La búsqueda utilizará `GET /api/books?title=<string>`.

## Criterios de aceptación

Usando estos libros como ejemplo:

| Título | Autor |
| --- | --- |
| El Principito | Antoine de Saint-Exupery |
| Principios de cocina | Ana Torres |
| La isla | Clara Principi |

1. Buscar `princi` muestra `El Principito` y `Principios de cocina`.
2. Buscar `Antoine` no devuelve resultados, porque no se busca por autor.
3. `princi`, `PRINCI` y `PrInCi` producen los mismos resultados.
4. Un buscador vacío muestra todos los libros.
5. Buscar `  princi  ` produce el mismo resultado que `princi`.
6. Buscar `zzzz` muestra exactamente `No se encontraron libros`.
7. `GET /api/books?title=princi` devuelve solo los libros coincidentes.
8. `GET /api/books?title=zzzz` devuelve `[]`.
9. `GET /api/books` y `GET /api/books?title=` devuelven todos los libros.

## Fuera de alcance

- búsqueda por autor;
- filtros adicionales;
- ordenación o paginación;
- cambios en el modelo `Book`;
- cambios en creación de libros;
- cambios de arquitectura;
- decisiones internas de implementación.