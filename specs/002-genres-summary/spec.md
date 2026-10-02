# 002 — Resumen de géneros

## Objetivo

Permitir que un bibliotecario vea de un vistazo los géneros predominantes del catálogo, con la cantidad de libros de cada uno y su porcentaje respecto al total.

## Usuario

- Bibliotecario.

## Historia de usuario

Como bibliotecario quiero ver los principales géneros del catálogo con la cantidad de libros y el porcentaje del total para entender la composición de la colección rápidamente.

## Requisitos funcionales

- RF-1: EL SISTEMA mostrará hasta 3 géneros: los que más libros tengan del conjunto mostrado en ese momento.
- RF-2: Para cada género mostrará el nombre, la cantidad de libros y el porcentaje del total de ese conjunto.
- RF-3: Cuando cambie el texto del buscador de la búsqueda por título (Funcionalidad 1), EL SISTEMA mostrará el resumen correspondiente al resultado de ese filtro.
- RF-4: SI el conjunto mostrado contiene menos de 3 géneros —con o sin filtro—, EL SISTEMA mostrará solo los disponibles y una nota explícita indicándolo.
- RF-5: EL SISTEMA obtendrá el resumen mediante `GET /api/books/genres/summary`.
- RF-6: SI hay empate por el tercer puesto, EL SISTEMA mostrará 3 géneros; no importa cuáles se elijan entre los empatados.

## Criterios de aceptación

Usando estos libros como ejemplo:

| Título | Género |
| --- | --- |
| El Principito | Fábula |
| Principios de cocina | Cocina |
| La isla | Novela |

1. Con el catálogo completo y sin filtro, se muestran 3 géneros.
2. Cada género mostrado presenta el nombre, la cantidad de libros y el porcentaje del total.
3. Los porcentajes se calculan sobre el total de libros del conjunto mostrado en ese momento.
4. Al filtrar por título (por ejemplo `princi`), el resumen refleja solo los libros del filtro y no muestra géneros de libros descartados.
5. Al limpiar el buscador, el resumen vuelve a reflejar todos los libros del catálogo.
6. SI el conjunto mostrado contiene menos de 3 géneros —con o sin filtro—, se muestran solo los disponibles y aparece una nota explícita indicando que hay menos de 3.
7. SI hay 3 o más géneros, se muestran 3 y no aparece la nota.
8. El resumen se obtiene mediante `GET /api/books/genres/summary`.

## Fuera de alcance

- búsqueda o filtro por género;
- búsqueda o filtro por autor;
- ordenación o paginación del resumen;
- comparativas históricas o tendencias de géneros;
- cambios en creación de libros;
- edición o eliminación de libros;
- cambios de arquitectura;
- decisiones internas de implementación.
