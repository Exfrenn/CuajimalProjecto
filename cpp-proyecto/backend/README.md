# Backend - Configuración

## Requisitos para ejecutar el backend

Para utilizar el backend por separado, necesitas configurar las siguientes variables de entorno:

### Archivo `.env`

Crea un archivo `.env` en la raíz del directorio `backend` con las siguientes variables:

```env
MONGO_URI=tu_string_de_conexion_mongodb
JWT_SECRET=tu_clave_secreta_jwt
```

- **MONGO_URI**: String de conexión a tu base de datos MongoDB
- **JWT_SECRET**: Clave secreta para la generación de tokens JWT

### Certificados SSL para HTTPS

Para habilitar HTTPS, necesitas generar los siguientes archivos en el directorio `backend`:

- `backend.crt` - Certificado SSL
- `backend.key` - Llave privada SSL

#### Generar certificados autofirmados (desarrollo)

```bash
openssl req -x509 -newkey rsa:4096 -keyout backend.key -out backend.crt -days 365 -nodes
```

## Instalación

```bash
npm install
```

## Ejecutar

```bash
node index.js
```
