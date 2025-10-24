# CPP Proyecto - Guía de Instalación

Este documento contiene las instrucciones para instalar y ejecutar el proyecto CPP (Cuajimalpa Proyecto) en la rama `local`.

## 📋 Prerequisitos

Este proyecto requiere conocimientos básicos de desarrollo web y las siguientes herramientas instaladas:

- **[Node.js](https://nodejs.org/)** (versión 18 o superior) - [Guía de instalación oficial](https://nodejs.org/en/download/package-manager)
- **[npm](https://www.npmjs.com/)** (incluido con Node.js)
- **[MongoDB](https://www.mongodb.com/try/download/community)** (versión 6 o superior) - Ver nuestra [guía detallada](docs/MONGODB_GUIDE.md)
- **[Git](https://git-scm.com/downloads)** - Para clonar el repositorio

> **💡 Nota:** Si no estás familiarizado con Node.js, npm o Git, te recomendamos revisar primero la documentación oficial de estas herramientas antes de continuar con la instalación del proyecto.

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd cpp-proyecto
```

### 2. Instalar dependencias del Backend

Navega a la carpeta `backend` e instala las dependencias:

```powershell
cd backend
npm install
```

Las dependencias que se instalarán incluyen:
- Express - Framework web
- MongoDB - Driver de base de datos
- Argon2 - Encriptación de contraseñas
- JWT - Autenticación con tokens
- Multer - Manejo de archivos
- CORS - Middleware para peticiones cross-origin

### 3. Instalar dependencias del Frontend

Regresa a la raíz y navega a la carpeta `frontend`:

```powershell
cd ..
cd frontend
npm install
```

Las dependencias que se instalarán incluyen:
- React - Biblioteca de UI
- React Admin - Framework de administración
- Material-UI - Componentes de diseño
- Leaflet - Mapas interactivos
- Recharts - Gráficas y visualización de datos
- Vite - Build tool y dev server

### 4. Configurar MongoDB

> **📘 ¿Primera vez usando MongoDB?**  
> Si nunca has instalado o usado MongoDB, consulta nuestra guía completa paso a paso con imágenes:  
> **[Guía de Instalación de MongoDB](docs/MONGODB_GUIDE.md)**

#### 4.1 Iniciar el servicio de MongoDB

Asegúrate de que MongoDB esté corriendo en tu sistema:

**Windows:**
```powershell
# Si MongoDB está como servicio
net start MongoDB
```

O si instalaste MongoDB sin servicio, ejecuta en una terminal:
```powershell
mongod --dbpath "C:\data\db"
```

#### 4.2 Importar los datos a MongoDB

El proyecto incluye archivos JSON en la carpeta `database/` que deben importarse a MongoDB. Cada archivo corresponde a una colección en la base de datos `ProyectoCPP`.

Puedes importar los datos usando **cualquiera de estos dos métodos**:

##### Método 1: Usando la línea de comandos (mongoimport)

Abre una nueva terminal PowerShell y ejecuta los siguientes comandos desde la raíz del proyecto:

```powershell
# Importar colección de agentes causales
mongoimport --db ProyectoCPP --collection agentes_causal --file database/ProyectoCPP.agentes_causal.json --jsonArray

# Importar colección de instituciones
mongoimport --db ProyectoCPP --collection instituciones --file database/ProyectoCPP.instituciones.json --jsonArray

# Importar colección de lugares de ocurrencia
mongoimport --db ProyectoCPP --collection lugares_ocurrencia --file database/ProyectoCPP.lugares_ocurrencia.json --jsonArray

# Importar colección de origen probable
mongoimport --db ProyectoCPP --collection origen_probable --file database/ProyectoCPP.origen_probable.json --jsonArray

# Importar colección de reportes prehospitalarios
mongoimport --db ProyectoCPP --collection reportes_prehospitalarios --file database/ProyectoCPP.reportes_prehospitalarios.json --jsonArray

# Importar colección de reportes urbanos
mongoimport --db ProyectoCPP --collection reportes_urbanos --file database/ProyectoCPP.reportes_urbanos.json --jsonArray

# Importar colección de roles
mongoimport --db ProyectoCPP --collection roles --file database/ProyectoCPP.roles.json --jsonArray

# Importar colección de turnos
mongoimport --db ProyectoCPP --collection turnos --file database/ProyectoCPP.turnos.json --jsonArray

# Importar colección de usuarios
mongoimport --db ProyectoCPP --collection usuarios --file database/ProyectoCPP.usuarios.json --jsonArray
```

**Nota:** Si `mongoimport` no es reconocido como comando, agrega la ruta de instalación de MongoDB a las variables de entorno o usa la ruta completa, por ejemplo:
```powershell
"C:\Program Files\MongoDB\Server\7.0\bin\mongoimport.exe" --db ProyectoCPP --collection usuarios --file database/ProyectoCPP.usuarios.json --jsonArray
```

##### Método 2: Usando MongoDB Compass (Interfaz Gráfica)

Si prefieres una interfaz visual, puedes usar MongoDB Compass:

1. **Abre MongoDB Compass** y conéctate a tu servidor local:
   - URI de conexión: `mongodb://localhost:27017`

2. **Crea la base de datos:**
   - Click en "Create Database"
   - Database Name: `ProyectoCPP`
   - Collection Name: `usuarios` (o cualquier colección inicial)

3. **Importar cada colección:**
   - Selecciona la base de datos `ProyectoCPP`
   - Para cada archivo JSON en la carpeta `database/`:
     - Click en "Create Collection" (si la colección no existe)
     - Nombre la colección según el archivo (ejemplo: `agentes_causal`, `instituciones`, etc.)
     - Dentro de la colección, click en "ADD DATA" → "Import JSON or CSV file"
     - Selecciona el archivo JSON correspondiente de la carpeta `database/`
     - Click en "Import"

4. **Repite el paso 3 para todos los archivos:**
   - `ProyectoCPP.agentes_causal.json` → colección `agentes_causal`
   - `ProyectoCPP.instituciones.json` → colección `instituciones`
   - `ProyectoCPP.lugares_ocurrencia.json` → colección `lugares_ocurrencia`
   - `ProyectoCPP.origen_probable.json` → colección `origen_probable`
   - `ProyectoCPP.reportes_prehospitalarios.json` → colección `reportes_prehospitalarios`
   - `ProyectoCPP.reportes_urbanos.json` → colección `reportes_urbanos`
   - `ProyectoCPP.roles.json` → colección `roles`
   - `ProyectoCPP.turnos.json` → colección `turnos`
   - `ProyectoCPP.usuarios.json` → colección `usuarios`

#### 4.3 Verificar la importación

Puedes verificar que los datos se importaron correctamente usando MongoDB Compass o el shell de MongoDB:

```bash
mongosh
use ProyectoCPP
show collections
db.usuarios.countDocuments()
```

## ▶️ Ejecución del Proyecto

Para ejecutar el proyecto, necesitas correr tanto el backend como el frontend en terminales separadas.

### Opción 1: Ejecutar Backend y Frontend por separado

#### Terminal 1 - Backend

```powershell
cd backend
node index.js
```

El backend se ejecutará en: **http://localhost:3000**

#### Terminal 2 - Frontend

Abre una nueva terminal y ejecuta:

```powershell
cd frontend
npm run dev
```

El frontend se ejecutará en: **http://localhost:5173**

### Opción 2: Ejecutar ambos simultáneamente (Recomendado)

Desde la raíz del proyecto, puedes ejecutar ambos servicios con un solo comando:

```powershell
npm run dev
```

Este comando utiliza `concurrently` para ejecutar tanto el backend como el frontend al mismo tiempo.

## 🌐 Acceso a la Aplicación

Una vez que ambos servicios estén corriendo:

1. Abre tu navegador
2. Visita: **http://localhost:5173**
3. Deberías ver la página de login del sistema

## 📁 Estructura del Proyecto

```
cpp-proyecto/
├── backend/           # Servidor Express + MongoDB
│   ├── index.js      # Archivo principal del servidor
│   ├── package.json  # Dependencias del backend
│   └── uploads/      # Carpeta para archivos subidos
├── frontend/         # Aplicación React con React Admin
│   ├── src/          # Código fuente
│   ├── package.json  # Dependencias del frontend
│   └── vite.config.ts # Configuración de Vite
└── database/         # Archivos JSON para importar a MongoDB
```

## 🔧 Configuración

### Backend

El backend está configurado para conectarse a MongoDB en:
- **Host:** 127.0.0.1
- **Puerto:** 27017
- **Base de datos:** ProyectoCPP

Si necesitas cambiar la configuración de MongoDB, edita el archivo `backend/index.js` en la línea donde se define la conexión.

### Frontend

El frontend utiliza Vite y está configurado para hacer peticiones al backend en `http://localhost:3000`. Si necesitas cambiar esta configuración, revisa el archivo `frontend/src/dataProvider.ts`.

## ❗ Solución de Problemas

### MongoDB no está corriendo
**Error:** `MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017`

**Solución:** Asegúrate de que MongoDB esté corriendo antes de iniciar el backend.

### Puerto ya en uso
**Error:** `EADDRINUSE: address already in use :::3000`

**Solución:** 
- Cierra cualquier proceso que esté usando el puerto 3000 o 5173
- O modifica el puerto en la configuración correspondiente

### Errores de importación de MongoDB
**Error:** `Failed: error connecting to db server`

**Solución:**
- Verifica que MongoDB esté corriendo
- Asegúrate de usar la ruta correcta a los archivos JSON
- Verifica que los archivos JSON tengan el formato correcto

## 📝 Comandos Útiles

```powershell
# Ver el estado de las colecciones en MongoDB
mongosh
use ProyectoCPP
show collections
db.usuarios.find().pretty()

# Limpiar la base de datos (CUIDADO: Elimina todos los datos)
mongosh
use ProyectoCPP
db.dropDatabase()

# Reinstalar dependencias
cd backend
Remove-Item node_modules -Recurse -Force
npm install

cd ../frontend
Remove-Item node_modules -Recurse -Force
npm install
```

## 📚 Documentación Adicional

Para información técnica detallada del proyecto, consulta la documentación en la carpeta `docs/`:

### Documentación Técnica
- **[API.md](docs/API.md)** - Documentación completa de endpoints del backend
- **[DATABASE.md](docs/DATABASE.md)** - Esquema de base de datos y colecciones
- **[FRONTEND.md](docs/FRONTEND.md)** - Arquitectura y componentes del frontend

### Guías de Instalación
- **[MONGODB_GUIDE.md](docs/MONGODB_GUIDE.md)** - Guía paso a paso para instalar y usar MongoDB (con imágenes)

## �👥 Contacto y Soporte

Para cualquier problema o pregunta sobre la instalación, contacta al equipo de desarrollo.

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025
