# User Management CRUD Application

## Descripción

Esta es una aplicación CRUD (Create, Read, Update, Delete) construida con Node.js y Express, conectada a una base de datos MySQL. Permite crear, eliminar, actualizar y listar usuarios. Utiliza bcrypt para encriptar contraseñas y dotenv para manejar variables de entorno. La aplicación emplea server-side rendering (SSR), Bootstrap para el diseño del frontend y SweetAlert2 para las alertas informativas. También incluye funcionalidad de inicio de sesión utilizando JWT (JSON Web Tokens), almacenando el token en una cookie para mayor seguridad.

## Tecnologías Utilizadas

- Node.js
- Express
- MySQL2
- bcrypt
- dotenv
- Bootstrap
- SweetAlert2
- JWT
- Cookie-parser

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. Navega hasta el directorio del proyecto y ejecuta:

   ```bash
   npm install
   ```

3. Dentro de la carpeta config crea un archivo llamado development.env
   y configura las variables de entorno:
   ```development.env
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=tu_base_de_datos
   SECRET_KEY=tu_clave_secreta
   SECRET_KEY=tu_jwt_secreto
   ```
4. Luego incia la aplicacion:

   ```bash
   npm run start
   ```

5. Abre tu navegador y visita http://localhost:3100 para ver la aplicación en acción.

##Funcionalidades

    - Crear Usuario: Añade un nuevo usuario con un nombre y contraseña encriptada.
    - Listar Usuarios: Muestra una lista de todos los usuarios registrados.
    - Actualizar Usuario: Permite modificar la información de un usuario existente.
    - Eliminar Usuario: Elimina un usuario de la base de datos.
    - Iniciar Sesión: Permite a los usuarios autenticarse utilizando JWT, almacenando el token en una cookie.

##Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

    1. Haz un fork del repositorio.
    2. Crea una nueva rama (git checkout -b feature-nueva-funcionalidad).
    3. Realiza tus cambios y haz un commit (git commit -m 'Añade nueva funcionalidad').
    4. Envía tus cambios (git push origin feature-nueva-funcionalidad).
    5. Crea un nuevo Pull Request.
