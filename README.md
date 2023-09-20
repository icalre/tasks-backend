# Tasks Api

## Configuración del Proyecto

1. Genera una clave privada en `https://console.firebase.google.com/u/0/project/atom-fed5a/settings/serviceaccounts/adminsdk?hl=es-419`, copia el archivo descargado en la carpeta  `functions` del proyecto.
2. Renombrar el archivo `.env.example` por `.env`.
3. Reemplazar el valor de `GOOGLE_APPLICATION_CREDENTIALS` por el nombre del archivo de credenciales de firebase.


## Ejecutar localmente el proyecto

- `ng run dev` para ejecutar el proyecto localmente.
- `ng run test` para ejecutar los test.

## Endpoints

- `GET /api/tasks` Listar todas las tareas
- `GET /api/tasks/:id` Obtener una tarea
- `POST /api/tasks` Crear una tarea
- `PUT /api/tasks/:id` Actualizar una tarea
- `DELETE /api/tasks/:id` Eliminar una tarea
