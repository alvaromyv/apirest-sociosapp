
# 🛠️ API REST - SociosApp

Esta es la API REST del proyecto **SociosApp**, una solución de gestión de socios para una peña sevillista. La API permite realizar operaciones CRUD sobre usuarios y socios, gestionar autenticaciones y proveer respuestas multilingües. Está desarrollada en **Node.js** con **Express** y utiliza **Sequelize** como ORM para interactuar con una base de datos **MySQL**.

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- Sequelize + MySQL2
- JWT (JsonWebToken)
- Multer (gestión de imágenes)
- Cors
- Dotenv
- AJV (validación de esquemas JSON)
- I18N (internacionalización)

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/alvaromyv/apirest-sociosapp.git
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env` con los siguientes datos:
   ```env
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=sociosdb
   API_KEY=clave_api
   JWT_SECRET=clave_secreta
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

## 📄 Endpoints principales

- `POST /auth/login` → Inicia sesión.
- `GET /usuarios` → Lista de usuarios (requiere autenticación).
- `POST /usuarios` → Crea un nuevo usuario (Admin).
- `PUT /usuarios/:id` → Modifica usuario.
- `DELETE /usuarios/:id` → Elimina usuario.

- `GET /socios` → Lista de socios.
- `POST /socios` → Crea nuevo socio.
- `PUT /socios/:id` → Modifica socio.
- `DELETE /socios/:id` → Elimina socio.
- `POST /socios/reasignar` → Reasigna numeración de socios.

> Todos los endpoints están protegidos con autenticación y verificación de roles.

## 🌐 Características adicionales

- Soporte multilenguaje (español e inglés).
- Gestión de sesiones con expiración por JWT.
- Subida y visualización de avatares.
- Validación estructural de datos vía JSON Schema.
- Respuestas adaptadas al idioma del cliente mediante cabeceras.

## 🧾 Licencia

Este proyecto se ha desarrollado como parte del **Proyecto Final de Grado Superior de Desarrollo de Aplicaciones Multiplataforma (FP DAM)** – IES Torre del Rey (Curso 24-25).

## 📂 Repositorio APP Fronted

👉 [SocioMultiplatformApp](https://github.com/alvaromyv/SocioMultiplatformApp)
