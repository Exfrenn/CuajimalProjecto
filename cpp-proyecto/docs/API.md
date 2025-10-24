# Documentación de API - Backend CPP Proyecto

Esta documentación describe todos los endpoints disponibles en el API REST del proyecto CPP.

## 📡 Información General

- **URL Base:** `http://localhost:3000`
- **Formato de respuesta:** JSON
- **Autenticación:** JWT (JSON Web Token)
- **Puerto:** 3000

## 🔐 Autenticación

### Header de Autenticación

Para endpoints protegidos, incluye el token JWT en el header:

```
Authorization: Bearer <token>
```

### Sistema de Permisos

El sistema utiliza un modelo de permisos basado en roles con el formato:
- **resource**: El recurso al que se accede (ej: `usuarios`, `reportes_urbanos`)
- **action**: La acción a realizar (ej: `list`, `show`, `create`, `edit`, `delete`)

---

## 🔑 Autenticación y Registro

### POST `/login`
Autentica un usuario y devuelve un token JWT.

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": 1,
  "email": "usuario@ejemplo.com",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol_id": 2,
  "turno_id": 1,
  "tipo_servicio": "urbano",
  "permisos": [...]
}
```

**Errores:**
- `401`: Email no encontrado o contraseña incorrecta

---

### POST `/registrarse`
Registra un nuevo usuario en el sistema.

**Body:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "usuario": "jperez",
  "email": "jperez@ejemplo.com",
  "password": "contraseña123",
  "rol_id": 3,
  "turno_id": 1
}
```

**Respuesta exitosa:** `201 Created`

**Errores:**
- `403`: Usuario ya existe

---

## 👥 Usuarios

### GET `/usuarios`
Lista todos los usuarios (con paginación).

**Requiere autenticación:** ✅  
**Permisos requeridos:** `usuarios` + `list`

**Query Parameters:**
- `_start`: Índice de inicio (para paginación)
- `_end`: Índice de fin (para paginación)
- `_sort`: Campo para ordenar
- `_order`: Dirección de ordenamiento (`ASC` o `DESC`)
- Filtros adicionales por cualquier campo

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "usuario": "jperez",
    "email": "jperez@ejemplo.com",
    "rol_id": 2,
    "turno_id": 1,
    "tipo_servicio": "urbano",
    "operadores_id": [3, 4]
  }
]
```

**Headers de respuesta:**
- `X-Total-Count`: Total de registros
- `Access-Control-Expose-Headers`: Expone el header X-Total-Count

---

### GET `/usuarios/:id`
Obtiene un usuario específico por ID.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `usuarios` + `show`

**Respuesta:**
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "usuario": "jperez",
  "email": "jperez@ejemplo.com",
  "rol_id": 2,
  "turno_id": 1
}
```

---

### POST `/usuarios`
Crea un nuevo usuario.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `usuarios` + `create`

**Body:**
```json
{
  "nombre": "María",
  "apellido": "García",
  "usuario": "mgarcia",
  "email": "mgarcia@ejemplo.com",
  "password": "contraseña123",
  "rol_id": 3,
  "turno_id": 2
}
```

**Respuesta:** Usuario creado con ID asignado automáticamente

---

### PUT `/usuarios/:id`
Actualiza un usuario existente.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `usuarios` + `edit`

**Body:** Campos a actualizar (puede ser parcial)

**Nota:** Si se incluye `password`, será encriptado con Argon2

---

### DELETE `/usuarios/:id`
Elimina un usuario.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `usuarios` + `delete`

**Respuesta:** Resultado de la operación de eliminación

---

## 🎭 Roles

### GET `/roles`
Lista todos los roles del sistema.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `roles` + `list`

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Administrador",
    "permisos": [
      { "resource": "usuarios", "action": "list" },
      { "resource": "usuarios", "action": "create" },
      { "resource": "usuarios", "action": "edit" },
      { "resource": "usuarios", "action": "delete" }
    ]
  }
]
```

---

### GET `/roles/:id`
Obtiene un rol específico.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `roles` + `show`

---

### POST `/roles`
Crea un nuevo rol.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `roles` + `create`

**Body:**
```json
{
  "nombre": "Supervisor",
  "permisos": [
    { "resource": "reportes_urbanos", "action": "list" },
    { "resource": "reportes_urbanos", "action": "show" }
  ]
}
```

---

### PUT `/roles/:id`
Actualiza un rol existente.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `roles` + `edit`

---

### DELETE `/roles/:id`
Elimina un rol.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `roles` + `delete`

---

## ⏰ Turnos

### GET `/turnos`
Lista todos los turnos disponibles.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `turnos` + `list`

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Matutino",
    "hora_inicio": "07:00",
    "hora_fin": "15:00"
  }
]
```

---

### GET `/turnos/:id`
Obtiene un turno específico.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `turnos` + `show`

---

### POST `/turnos`
Crea un nuevo turno.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `turnos` + `create`

---

### PUT `/turnos/:id`
Actualiza un turno existente.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `turnos` + `edit`

---

### DELETE `/turnos/:id`
Elimina un turno.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `turnos` + `delete`

---

## 🏙️ Reportes Urbanos

### GET `/reportes_urbanos`
Lista reportes urbanos. Los usuarios ven reportes según su rol:
- **Jefe de turno (rol_id = 2):** Reportes de operadores asignados
- **Operador (rol_id = 4):** Solo sus propios reportes
- **Otros roles:** Todos los reportes

**Requiere autenticación:** ✅  
**Permisos requeridos:** `reportes_urbanos` + `list`

**Respuesta:**
```json
[
  {
    "id": 1,
    "datos_generales": {
      "turno_id": 1,
      "folio": "URB-2025-001",
      "fecha": "2025-10-23T14:30"
    },
    "personal_y_activacion": {
      "personal_a_cargo": [3, 4],
      "modo_activacion": "Llamada telefónica",
      "tipo_servicio": "Prevencion",
      "subtipo_servicio": "Rescate animal"
    },
    "acciones_realizadas": {
      "observaciones": [],
      "trabajos_realizados": "Se rescató un gato de árbol",
      "recursos_empleados": "Escalera, red de seguridad"
    },
    "coordenadas": {
      "latitud": 19.432608,
      "longitud": -99.133209,
      "direccion": "Avenida Insurgentes Sur 123"
    }
  }
]
```

---

### GET `/reportes_urbanos/:id`
Obtiene un reporte urbano específico.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `reportes_urbanos` + `show`

---

### POST `/reportes_urbanos`
Crea un nuevo reporte urbano.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `reportes_urbanos` + `create`

**Body:** Objeto con la estructura del reporte (ver ejemplo de GET)

---

### PUT `/reportes_urbanos/:id`
Actualiza un reporte urbano existente.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `reportes_urbanos` + `edit`

---

### DELETE `/reportes_urbanos/:id`
Elimina un reporte urbano.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `reportes_urbanos` + `delete`

---

## 🚑 Reportes Prehospitalarios

### GET `/reportes_prehospitalarios`
Lista reportes prehospitalarios. Los usuarios ven reportes según su rol:
- **Jefe de turno (rol_id = 2):** Reportes de paramédicos asignados (si `tipo_servicio` es `prehospitalario`)
- **Paramédico (rol_id = 3):** Solo sus propios reportes
- **Otros roles:** Todos los reportes

**Requiere autenticación:** ✅  
**Permisos requeridos:** `reportes_prehospitalarios` + `list`

**Respuesta:**
```json
[
  {
    "id": 1,
    "control": {
      "operador": 3,
      "folio": "PREH-2025-001",
      "fecha": "2025-10-23T10:15"
    },
    "datos_generales": {
      "turno_id": 1,
      "lugar_ocurrencia": "Vía pública",
      "tipo_servicio": "Urgencia"
    },
    "paciente": {
      "nombre": "Carlos López",
      "edad": 45,
      "sexo": "M"
    }
  }
]
```

---

### GET `/reportes_prehospitalarios/:id`
Obtiene un reporte prehospitalario específico.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `reportes_prehospitalarios` + `show`

---

### POST `/reportes_prehospitalarios`
Crea un nuevo reporte prehospitalario.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `reportes_prehospitalarios` + `create`

---

### PUT `/reportes_prehospitalarios/:id`
Actualiza un reporte prehospitalario existente.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `reportes_prehospitalarios` + `edit`

---

### DELETE `/reportes_prehospitalarios/:id`
Elimina un reporte prehospitalario.

**Requiere autenticación:** ✅  
**Permisos requeridos:** `reportes_prehospitalarios` + `delete`

---

## 📍 Lugares de Ocurrencia

### GET `/lugares_ocurrencia`
Lista todos los lugares de ocurrencia.

**No requiere autenticación**

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Vía pública",
    "descripcion": "Calle o avenida"
  }
]
```

---

### GET `/lugares_ocurrencia/:id`
Obtiene un lugar de ocurrencia específico.

---

### POST `/lugares_ocurrencia`
Crea un nuevo lugar de ocurrencia.

---

### PUT `/lugares_ocurrencia/:id`
Actualiza un lugar de ocurrencia existente.

---

### DELETE `/lugares_ocurrencia/:id`
Elimina un lugar de ocurrencia.

---

## 🏥 Instituciones

### GET `/instituciones`
Lista todas las instituciones (hospitales, clínicas, etc.).

**No requiere autenticación**

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Hospital General",
    "direccion": "Av. Principal 456",
    "tipo": "Público"
  }
]
```

---

### GET `/instituciones/:id`
Obtiene una institución específica.

---

### POST `/instituciones`
Crea una nueva institución.

---

### PUT `/instituciones/:id`
Actualiza una institución existente.

---

### DELETE `/instituciones/:id`
Elimina una institución.

---

## 🦠 Agentes Causales

### GET `/agentes_causal`
Lista todos los agentes causales (tipos de emergencias médicas).

**No requiere autenticación**

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Traumatismo",
    "categoria": "Físico"
  }
]
```

---

### GET `/agentes_causal/:id`
Obtiene un agente causal específico.

---

### POST `/agentes_causal`
Crea un nuevo agente causal.

---

### PUT `/agentes_causal/:id`
Actualiza un agente causal existente.

---

### DELETE `/agentes_causal/:id`
Elimina un agente causal.

---

## 🔬 Origen Probable

### GET `/origen_probable`
Lista todos los orígenes probables de emergencias.

**No requiere autenticación**

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Accidental",
    "descripcion": "Evento no intencional"
  }
]
```

---

### GET `/origen_probable/:id`
Obtiene un origen probable específico.

---

### POST `/origen_probable`
Crea un nuevo origen probable.

---

### PUT `/origen_probable/:id`
Actualiza un origen probable existente.

---

### DELETE `/origen_probable/:id`
Elimina un origen probable.

---

## 📁 Subida de Archivos

### POST `/api/upload`
Sube múltiples imágenes al servidor.

**Body:** `multipart/form-data`
- **Campo:** `images` (array, máximo 10 archivos)
- **Formatos aceptados:** `.png`, `.jpg`, `.jpeg`, `.gif`

**Respuesta:**
```json
{
  "message": "Archivos subidos correctamente",
  "files": [
    {
      "filename": "images-1234567890123-456789012.png",
      "originalname": "foto1.png",
      "path": "uploads/images-1234567890123-456789012.png",
      "url": "http://localhost:3000/uploads/images-1234567890123-456789012.png"
    }
  ]
}
```

---

### POST `/api/upload-pdf`
Sube un archivo PDF al servidor.

**Body:** `multipart/form-data`
- **Campo:** `pdf` (archivo único)
- **Formato aceptado:** `.pdf`

**Respuesta:**
```json
{
  "message": "PDF subido correctamente",
  "file": {
    "filename": "pdf-1234567890123-456789012.pdf",
    "originalname": "documento.pdf",
    "path": "uploads/pdf-1234567890123-456789012.pdf",
    "url": "http://localhost:3000/uploads/pdf-1234567890123-456789012.pdf"
  }
}
```

---

## ⚠️ Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | Éxito |
| 201 | Recurso creado |
| 401 | No autenticado (token inválido o ausente) |
| 403 | Permisos insuficientes o recurso prohibido |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

## 🔧 Configuración

### Variables de entorno recomendadas

Aunque actualmente no se usan variables de entorno, se recomienda configurar:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/ProyectoCPP
JWT_SECRET=secretKey
JWT_EXPIRATION=900
```

### Seguridad

- **Encriptación de contraseñas:** Argon2id con parámetros:
  - Memory cost: 19456 KB
  - Time cost: 2
  - Parallelism: 1
  - Salt length: 16 bytes

- **JWT:** Token expira en 900 segundos (15 minutos)

---

## 📝 Notas Adicionales

### Sistema de Logs
El backend incluye una función `log()` que registra acciones en la colección `logs` de MongoDB:
```javascript
log(sujeto, objeto, accion)
```

### Paginación
Los endpoints de listado soportan paginación mediante:
- `_start` y `_end`: Índices para slice
- Response header `X-Total-Count`: Total de registros

### Auto-incremento de IDs
Todos los recursos generan IDs automáticamente basándose en el último ID + 1.

---

**Última actualización:** Octubre 2025
