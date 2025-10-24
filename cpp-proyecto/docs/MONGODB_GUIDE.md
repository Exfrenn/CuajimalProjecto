# Guía de Instalación y Uso de MongoDB

Esta guía paso a paso te ayudará a instalar MongoDB, MongoDB Compass y realizar la importación de datos para el proyecto CPP.

## 📋 Tabla de Contenidos

1. [Instalación de MongoDB](#1-instalación-de-mongodb)
2. [Instalación de MongoDB Compass](#2-instalación-de-mongodb-compass)
3. [Iniciar MongoDB](#3-iniciar-mongodb)
4. [Conectarse a MongoDB con Compass](#4-conectarse-a-mongodb-con-compass)
5. [Importar datos con Compass](#5-importar-datos-con-compass)
6. [Importar datos con línea de comandos](#6-importar-datos-con-línea-de-comandos)
7. [Verificar la importación](#7-verificar-la-importación)
8. [Solución de problemas](#8-solución-de-problemas)

---

## 1. Instalación de MongoDB

### Windows

#### Paso 1: Descargar MongoDB

1. Ve a la página oficial: [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Selecciona:
   - **Version:** 7.0.x (o la más reciente)
   - **Platform:** Windows
   - **Package:** msi

![Descarga de MongoDB](/cpp-proyecto/docs/imgs/MongoDBdownload.png)

#### Paso 2: Ejecutar el instalador

1. Doble clic en el archivo `.msi` descargado
2. Click en **Next** en la pantalla de bienvenida
3. Acepta los términos de licencia y click **Next**
4. Selecciona **Complete** para instalación completa

![Tipo de instalación](/cpp-proyecto/docs/imgs/MongoDBinstall.png)

#### Paso 3: Configurar como servicio

1. En "Service Configuration":
   - ✅ Marca **Install MongoDB as a Service**
   - ✅ Deja **Run service as Network Service user** seleccionado
   - ✅ Deja el **Data Directory** y **Log Directory** por defecto

![Configuración de servicio](/cpp-proyecto/docs/imgs/MongoDBconfig.png)

2. Click **Next**

#### Paso 4: Instalar MongoDB Compass (Opcional)

El instalador preguntará si deseas instalar MongoDB Compass:
- ✅ **Marca la casilla** si quieres instalarlo ahora (recomendado)
- ⬜ Desmarca si prefieres instalarlo después manualmente

![Instalar Compass](/cpp-proyecto/docs/imgs/MongoDBCompass.png)

#### Paso 5: Completar instalación

1. Click **Install**
2. Espera a que termine la instalación
3. Click **Finish**

#### Paso 6: Agregar MongoDB al PATH (Opcional pero recomendado)

Para usar `mongosh` y `mongoimport` desde cualquier ubicación:

1. Busca "Variables de entorno" en el menú de Windows
2. Click en "Variables de entorno..."
3. En "Variables del sistema", selecciona **Path** y click **Editar**
4. Click **Nuevo** y agrega:
   ```
   C:\Program Files\MongoDB\Server\7.0\bin
   ```
5. Click **Aceptar** en todas las ventanas

![Variables de entorno](/cpp-proyecto/docs/imgs/MongoDBenv.png)

---

## 2. Instalación de MongoDB Compass

Si no lo instalaste con MongoDB, sigue estos pasos:

### Descarga e Instalación

1. Ve a: [MongoDB Compass Download](/cpp-proyecto/docs/imgs/MongoDBinsCompass.png)
2. Selecciona tu sistema operativo (Windows)
3. Descarga el instalador
4. Ejecuta el instalador y sigue los pasos
5. Abre MongoDB Compass desde el menú de inicio

![MongoDB Compass](/cpp-proyecto/docs/imgs/MongoDBCompassMain.png)

---

## 3. Iniciar MongoDB

### Verificar si MongoDB está corriendo

#### Opción A: Como servicio de Windows

Abre PowerShell como administrador y ejecuta:

```powershell
Get-Service MongoDB
```

**Salida esperada:**
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Database Server
```

Si el estado es **Stopped**, inícialo:

```powershell
Start-Service MongoDB
```

#### Opción B: Manualmente (si no está como servicio)

Abre PowerShell como administrador y ejecuta:

```powershell
mongod --dbpath "C:\data\db"
```

**Nota:** Asegúrate de que la carpeta `C:\data\db` existe. Si no, créala:

```powershell
New-Item -ItemType Directory -Path "C:\data\db"
```

---

## 4. Conectarse a MongoDB con Compass

### Paso 1: Abrir MongoDB Compass

Abre la aplicación MongoDB Compass desde el menú de inicio.

### Paso 2: Configurar la conexión

En la pantalla principal verás un campo para la URI de conexión:

![Pantalla de conexión](/cpp-proyecto/docs/imgs/MongoDBCompassCon.png)

**URI de conexión:**
```
mongodb://localhost:27017
```

### Paso 3: Conectar

1. Pega la URI en el campo **"URI"**
2. (Opcional) Dale un nombre a la conexión: "Proyecto CPP - Local"
3. Click en **"Connect"**

![Conexión exitosa](/cpp-proyecto/docs/imgs/MongoDBCompassSuccess.png)

### Paso 4: Verificar conexión

Si la conexión es exitosa, verás:
- Lista de bases de datos en el panel izquierdo
- Puedes ver bases de datos por defecto como: `admin`, `config`, `local`

---

## 5. Importar datos con Compass

### Paso 1: Crear la base de datos

1. En MongoDB Compass, click en **"Create Database"** (botón verde en la esquina superior izquierda)

![Crear base de datos](/cpp-proyecto/docs/imgs/MongoDBcreateBD1.png)

2. Llena los campos:
   - **Database Name:** `ProyectoCPP`
   - **Collection Name:** `usuarios` (cualquier nombre, la borraremos después)
   
![Formulario de creación](/cpp-proyecto/docs/imgs/MongoDBcreateBD2.png)

3. Click **"Create Database"**

### Paso 2: Importar cada colección

Ahora vamos a importar los archivos JSON uno por uno:

#### 2.1 Crear colección "agentes_causal"

1. Selecciona la base de datos **ProyectoCPP** en el panel izquierdo
2. Click en el botón **"+"** junto a "Collections" o click en **"Create Collection"**

![Crear colección](/cpp-proyecto/docs/imgs/MongoDBcreateColl.png)

3. Nombre de colección: `agentes_causal`
4. Click **"Create Collection"**

#### 2.2 Importar datos a "agentes_causal"

1. Click en la colección **agentes_causal** que acabas de crear
2. En la parte superior, click en **"ADD DATA"**
3. Selecciona **"Import JSON or CSV file"**

![Importar datos](/cpp-proyecto/docs/imgs/MongoDBimport.png)

4. Click en **"Select a file"**
5. Navega a la carpeta `database/` de tu proyecto
6. Selecciona el archivo **`ProyectoCPP.agentes_causal.json`**

![Seleccionar archivo](/cpp-proyecto/docs/imgs/MongoDBselect.png)

7. Verás una vista previa de los datos
8. Click en **"Import"**

![Vista previa y confirmación](/cpp-proyecto/docs/imgs/MongoDBimportPreview.png)

9. Espera a que termine la importación
10. Verás un mensaje: "✓ Success - X documents imported"

#### 2.3 Repetir para todas las colecciones

Repite los pasos 2.1 y 2.2 para cada uno de los siguientes archivos:

| Archivo JSON | Nombre de Colección |
|--------------|---------------------|
| `ProyectoCPP.agentes_causal.json` | `agentes_causal` ✅ |
| `ProyectoCPP.instituciones.json` | `instituciones` |
| `ProyectoCPP.lugares_ocurrencia.json` | `lugares_ocurrencia` |
| `ProyectoCPP.origen_probable.json` | `origen_probable` |
| `ProyectoCPP.reportes_prehospitalarios.json` | `reportes_prehospitalarios` |
| `ProyectoCPP.reportes_urbanos.json` | `reportes_urbanos` |
| `ProyectoCPP.roles.json` | `roles` |
| `ProyectoCPP.turnos.json` | `turnos` |
| `ProyectoCPP.usuarios.json` | `usuarios` |

### Paso 3: Eliminar colección temporal (opcional)

Si creaste una colección temporal al crear la base de datos, puedes eliminarla:

1. Posiciónate sobre la colección
2. Click en el ícono de **🗑️ basura**
3. Confirma la eliminación

---

## 6. Importar datos con línea de comandos

Si prefieres usar la línea de comandos (método más rápido):

### Paso 1: Abrir PowerShell

Abre PowerShell en la carpeta raíz de tu proyecto.

**Tip:** En el explorador de archivos, mantén `Shift` + Click derecho → "Abrir ventana de PowerShell aquí"

### Paso 2: Ejecutar comandos de importación

Copia y pega estos comandos uno por uno:

```powershell
# Importar agentes_causal
mongoimport --db ProyectoCPP --collection agentes_causal --file database/ProyectoCPP.agentes_causal.json --jsonArray

# Importar instituciones
mongoimport --db ProyectoCPP --collection instituciones --file database/ProyectoCPP.instituciones.json --jsonArray

# Importar lugares_ocurrencia
mongoimport --db ProyectoCPP --collection lugares_ocurrencia --file database/ProyectoCPP.lugares_ocurrencia.json --jsonArray

# Importar origen_probable
mongoimport --db ProyectoCPP --collection origen_probable --file database/ProyectoCPP.origen_probable.json --jsonArray

# Importar reportes_prehospitalarios
mongoimport --db ProyectoCPP --collection reportes_prehospitalarios --file database/ProyectoCPP.reportes_prehospitalarios.json --jsonArray

# Importar reportes_urbanos
mongoimport --db ProyectoCPP --collection reportes_urbanos --file database/ProyectoCPP.reportes_urbanos.json --jsonArray

# Importar roles
mongoimport --db ProyectoCPP --collection roles --file database/ProyectoCPP.roles.json --jsonArray

# Importar turnos
mongoimport --db ProyectoCPP --collection turnos --file database/ProyectoCPP.turnos.json --jsonArray

# Importar usuarios
mongoimport --db ProyectoCPP --collection usuarios --file database/ProyectoCPP.usuarios.json --jsonArray
```

**Salida esperada para cada comando:**
```
2025-10-23T15:30:45.123-0600    connected to: mongodb://localhost/
2025-10-23T15:30:45.234-0600    5 document(s) imported successfully. 0 document(s) failed to import.
```

### Solución si mongoimport no se reconoce

Si obtienes el error `mongoimport : El término 'mongoimport' no se reconoce...`, usa la ruta completa:

```powershell
& "C:\Program Files\MongoDB\Server\7.0\bin\mongoimport.exe" --db ProyectoCPP --collection usuarios --file database/ProyectoCPP.usuarios.json --jsonArray
```

---

## 7. Verificar la importación

### Opción A: Con MongoDB Compass

1. En Compass, selecciona la base de datos **ProyectoCPP**
2. Deberías ver 9 colecciones:
   - agentes_causal
   - instituciones
   - lugares_ocurrencia
   - origen_probable
   - reportes_prehospitalarios
   - reportes_urbanos
   - roles
   - turnos
   - usuarios

![Colecciones importadas](/cpp-proyecto/docs/imgs/MongoDBcollections.png)

3. Click en cualquier colección para ver sus documentos
4. Verifica que los datos se vean correctos

![Vista de documentos](/cpp-proyecto/docs/imgs/MongoDBdocuments.png)

### Opción B: Con línea de comandos (mongosh)

1. Abre PowerShell y ejecuta:

```powershell
mongosh
```

2. Selecciona la base de datos:

```javascript
use ProyectoCPP
```

3. Lista las colecciones:

```javascript
show collections
```

**Salida esperada:**
```
agentes_causal
instituciones
lugares_ocurrencia
origen_probable
reportes_prehospitalarios
reportes_urbanos
roles
turnos
usuarios
```

4. Cuenta los documentos de una colección:

```javascript
db.usuarios.countDocuments()
```

5. Ve algunos documentos:

```javascript
db.usuarios.find().pretty()
```

6. Para salir:

```javascript
exit
```

---

## 8. Solución de problemas

### Problema 1: MongoDB no inicia

**Error:** `Get-Service : Cannot find any service with service name 'MongoDB'`

**Solución:**
1. MongoDB no está instalado como servicio
2. Inícialo manualmente:
   ```powershell
   mongod --dbpath "C:\data\db"
   ```
3. Deja esta ventana abierta mientras trabajas

---

### Problema 2: No puedo conectarme en Compass

**Error:** "Connection failed" o "Network error"

**Soluciones:**
1. Verifica que MongoDB esté corriendo (ver Problema 1)
2. Verifica la URI: `mongodb://localhost:27017`
3. Desactiva temporalmente el firewall
4. Intenta con: `mongodb://127.0.0.1:27017`

---

### Problema 3: Error al importar - "Failed to parse"

**Error:** `Failed: error unmarshaling bytes on document`

**Solución:**
1. Asegúrate de usar la bandera `--jsonArray`
2. Verifica que el archivo JSON sea válido
3. Abre el JSON en un editor y verifica que comience con `[` y termine con `]`

---

### Problema 4: mongoimport no encontrado

**Error:** `mongoimport : El término 'mongoimport' no se reconoce...`

**Solución 1 - Usar ruta completa:**
```powershell
& "C:\Program Files\MongoDB\Server\7.0\bin\mongoimport.exe" --db ProyectoCPP --collection usuarios --file database/ProyectoCPP.usuarios.json --jsonArray
```

**Solución 2 - Agregar al PATH:**
1. Sigue las instrucciones del [Paso 6 de Instalación](#paso-6-agregar-mongodb-al-path-opcional-pero-recomendado)
2. Cierra y vuelve a abrir PowerShell
3. Intenta nuevamente

---

### Problema 5: Error de permisos

**Error:** `Access denied` o `Permission denied`

**Solución:**
1. Ejecuta PowerShell como **Administrador**
2. Click derecho en PowerShell → "Ejecutar como administrador"

---

### Problema 6: Puerto 27017 en uso

**Error:** `Address already in use`

**Solución:**
1. Verifica si MongoDB ya está corriendo:
   ```powershell
   Get-Process mongod
   ```
2. Si hay un proceso, significa que ya está corriendo
3. No necesitas iniciarlo nuevamente

---

## 🎯 Checklist de Verificación Final

Antes de continuar con el proyecto, verifica:

- [ ] MongoDB está instalado y corriendo
- [ ] MongoDB Compass está instalado (opcional pero recomendado)
- [ ] Puedes conectarte a `mongodb://localhost:27017`
- [ ] La base de datos `ProyectoCPP` existe
- [ ] Las 9 colecciones están creadas e importadas:
  - [ ] agentes_causal
  - [ ] instituciones
  - [ ] lugares_ocurrencia
  - [ ] origen_probable
  - [ ] reportes_prehospitalarios
  - [ ] reportes_urbanos
  - [ ] roles
  - [ ] turnos
  - [ ] usuarios
- [ ] Puedes ver documentos en las colecciones

---

## 📚 Recursos Adicionales

- [Documentación oficial de MongoDB](https://www.mongodb.com/docs/)
- [MongoDB Compass Manual](https://www.mongodb.com/docs/compass/current/)
- [MongoDB Shell (mongosh) Reference](https://www.mongodb.com/docs/mongodb-shell/)
- [Guía de instalación oficial Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

---

## 🆘 ¿Aún tienes problemas?

Si después de seguir esta guía sigues teniendo problemas:

1. Revisa los logs de MongoDB:
   - Windows: `C:\Program Files\MongoDB\Server\7.0\log\mongod.log`

2. Busca tu error específico en:
   - [MongoDB Community Forums](https://www.mongodb.com/community/forums/)
   - [Stack Overflow - MongoDB](https://stackoverflow.com/questions/tagged/mongodb)

3. Contacta al equipo de desarrollo del proyecto

---

**Última actualización:** Octubre 2025
