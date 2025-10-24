# Documentación de Base de Datos - MongoDB

Esta documentación describe el esquema de la base de datos MongoDB utilizada en el proyecto CPP.

## 📊 Información General

- **Motor de Base de Datos:** MongoDB 6.0+
- **Nombre de la Base de Datos:** `ProyectoCPP`
- **Host:** 127.0.0.1
- **Puerto:** 27017
- **URI de Conexión:** `mongodb://127.0.0.1:27017/ProyectoCPP`

---

## 📋 Colecciones

La base de datos contiene **9 colecciones principales** y **1 colección de logs**:

1. `usuarios` - Usuarios del sistema
2. `roles` - Roles y permisos
3. `turnos` - Turnos de trabajo
4. `reportes_urbanos` - Reportes de servicio urbano
5. `reportes_prehospitalarios` - Reportes de servicio prehospitalario
6. `lugares_ocurrencia` - Catálogo de lugares de ocurrencia
7. `instituciones` - Catálogo de instituciones (hospitales, clínicas)
8. `agentes_causal` - Catálogo de agentes causales
9. `origen_probable` - Catálogo de orígenes probables
10. `logs` - Registro de auditoría (generado automáticamente)

---

## 👥 Colección: `usuarios`

Almacena información de los usuarios del sistema.

### Esquema

```javascript
{
  "_id": ObjectId,          // ID de MongoDB (auto-generado)
  "id": Number,             // ID secuencial personalizado (único)
  "nombre": String,         // Nombre del usuario
  "apellido": String,       // Apellido del usuario
  "usuario": String,        // Nombre de usuario (único)
  "email": String,          // Correo electrónico (único)
  "password": String,       // Contraseña encriptada con Argon2
  "rol_id": Number,         // Referencia a roles.id
  "turno_id": Number,       // Referencia a turnos.id
  "tipo_servicio": String,  // OPCIONAL: "urbano" | "prehospitalario"
  "operadores_id": [Number] // OPCIONAL: Array de IDs de operadores asignados
}
```

### Ejemplo de Documento

```json
{
  "_id": ObjectId("68f64b28a973ec70605b5542"),
  "id": 1,
  "nombre": "Jefe Semanal",
  "apellido": "Matutino",
  "usuario": "JefeSemMat",
  "email": "jefeSemMatOp@gmail.com",
  "password": "$argon2id$v=19$m=19456,t=2,p=1$KYC/qM1we2bjuomzKvR7UA$fAPNcxr4HJDMlHBSMNk3xVS7NXFv4zTr8Xpqh4SH8LA",
  "rol_id": 2,
  "turno_id": 1,
  "operadores_id": [3],
  "tipo_servicio": "urbano"
}
```

### Índices Recomendados

```javascript
db.usuarios.createIndex({ "email": 1 }, { unique: true })
db.usuarios.createIndex({ "usuario": 1 }, { unique: true })
db.usuarios.createIndex({ "id": 1 }, { unique: true })
db.usuarios.createIndex({ "rol_id": 1 })
```

### Relaciones

- `rol_id` → `roles.id`
- `turno_id` → `turnos.id`
- `operadores_id[]` → `usuarios.id` (auto-referencia)

---

## 🎭 Colección: `roles`

Define los roles del sistema y sus permisos asociados.

### Esquema

```javascript
{
  "_id": ObjectId,
  "id": Number,           // ID secuencial (único)
  "nombre": String,       // Nombre del rol
  "permisos": [           // Array de objetos de permisos
    {
      "resource": String, // Recurso (ej: "usuarios", "reportes_urbanos")
      "action": String    // Acción (ej: "list", "show", "create", "edit", "delete")
    }
  ]
}
```

### Ejemplo de Documento

```json
{
  "_id": ObjectId("68f64a1ba973ec70605b5540"),
  "id": 1,
  "nombre": "Administrador",
  "permisos": [
    { "resource": "usuarios", "action": "list" },
    { "resource": "usuarios", "action": "show" },
    { "resource": "usuarios", "action": "create" },
    { "resource": "usuarios", "action": "edit" },
    { "resource": "usuarios", "action": "delete" },
    { "resource": "roles", "action": "list" },
    { "resource": "roles", "action": "show" },
    { "resource": "reportes_urbanos", "action": "list" },
    { "resource": "reportes_prehospitalarios", "action": "list" }
  ]
}
```

### Roles Predefinidos

1. **Administrador (id: 1):** Acceso completo a todo el sistema
2. **Jefe de Turno (id: 2):** Gestión de su equipo y reportes
3. **Paramédico (id: 3):** Creación y edición de reportes prehospitalarios
4. **Operador (id: 4):** Creación y edición de reportes urbanos

### Índices Recomendados

```javascript
db.roles.createIndex({ "id": 1 }, { unique: true })
db.roles.createIndex({ "nombre": 1 })
```

---

## ⏰ Colección: `turnos`

Almacena los turnos de trabajo disponibles.

### Esquema

```javascript
{
  "_id": ObjectId,
  "id": Number,           // ID secuencial (único)
  "nombre": String,       // Nombre del turno
  "hora_inicio": String,  // Hora de inicio (formato HH:MM)
  "hora_fin": String      // Hora de fin (formato HH:MM)
}
```

### Ejemplo de Documento

```json
{
  "_id": ObjectId("68f649fea973ec70605b553f"),
  "id": 1,
  "nombre": "Matutino",
  "hora_inicio": "07:00",
  "hora_fin": "15:00"
}
```

### Índices Recomendados

```javascript
db.turnos.createIndex({ "id": 1 }, { unique: true })
```

---

## 🏙️ Colección: `reportes_urbanos`

Almacena los reportes de servicios urbanos (prevención, mitigación, etc.).

### Esquema

```javascript
{
  "_id": ObjectId,
  "id": Number,
  "datos_generales": {
    "turno_id": Number,           // Referencia a turnos.id
    "folio": String,              // Número de folio único
    "fecha": String               // Fecha y hora (formato ISO)
  },
  "personal_y_activacion": {
    "personal_a_cargo": [Number], // Array de IDs de usuarios
    "modo_activacion": String,    // Cómo se activó el servicio
    "tipo_servicio": String,      // "Prevencion" | "Mitigacion" | etc.
    "subtipo_servicio": String    // Detalles del tipo de servicio
  },
  "acciones_realizadas": {
    "observaciones": [            // Array de observaciones
      {
        "texto": String,
        "fotos": [                // Array de fotos
          {
            "src": String,        // URL de la imagen
            "title": String       // Nombre del archivo
          }
        ]
      }
    ],
    "trabajos_realizados": String,
    "recursos_empleados": String,
    "resultado": String
  },
  "coordenadas": {
    "latitud": Number,
    "longitud": Number,
    "direccion": String,
    "alcaldia": String,
    "colonia": String,
    "codigo_postal": String
  }
}
```

### Ejemplo de Documento

```json
{
  "_id": ObjectId("68f64f333e11108e9699dbf2"),
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
    "observaciones": [
      {
        "texto": "Gato atrapado en árbol de 5 metros",
        "fotos": [
          {
            "src": "http://localhost:3000/uploads/images-1760972595066-298971574.png",
            "title": "foto_rescate.png"
          }
        ]
      }
    ],
    "trabajos_realizados": "Rescate exitoso con escalera",
    "recursos_empleados": "Escalera extensible, guantes, red",
    "resultado": "Exitoso"
  },
  "coordenadas": {
    "latitud": 19.432608,
    "longitud": -99.133209,
    "direccion": "Avenida Insurgentes Sur 123",
    "alcaldia": "Benito Juárez",
    "colonia": "Nápoles",
    "codigo_postal": "03810"
  }
}
```

### Índices Recomendados

```javascript
db.reportes_urbanos.createIndex({ "id": 1 }, { unique: true })
db.reportes_urbanos.createIndex({ "datos_generales.folio": 1 })
db.reportes_urbanos.createIndex({ "datos_generales.fecha": -1 })
db.reportes_urbanos.createIndex({ "personal_y_activacion.personal_a_cargo": 1 })
db.reportes_urbanos.createIndex({ "coordenadas.latitud": 1, "coordenadas.longitud": 1 })
```

### Relaciones

- `datos_generales.turno_id` → `turnos.id`
- `personal_y_activacion.personal_a_cargo[]` → `usuarios.id`

---

## 🚑 Colección: `reportes_prehospitalarios`

Almacena los reportes de servicios médicos prehospitalarios.

### Esquema

```javascript
{
  "_id": ObjectId,
  "id": Number,
  "control": {
    "operador": Number,           // ID del paramédico (referencia a usuarios.id)
    "folio": String,              // Número de folio único
    "fecha": String               // Fecha y hora (formato ISO)
  },
  "datos_generales": {
    "turno_id": Number,           // Referencia a turnos.id
    "lugar_ocurrencia_id": Number,// Referencia a lugares_ocurrencia.id
    "tipo_servicio": String,      // "Urgencia" | "Traslado" | etc.
    "direccion": String
  },
  "paciente": {
    "nombre": String,
    "edad": Number,
    "sexo": String,               // "M" | "F" | "Otro"
    "telefono": String,
    "derechohabiencia": String
  },
  "evaluacion": {
    "agente_causal_id": Number,   // Referencia a agentes_causal.id
    "origen_probable_id": Number, // Referencia a origen_probable.id
    "signos_vitales": {
      "presion_arterial": String,
      "frecuencia_cardiaca": Number,
      "frecuencia_respiratoria": Number,
      "temperatura": Number,
      "saturacion_oxigeno": Number
    },
    "glasgow": Number,
    "observaciones": String
  },
  "traslado": {
    "institucion_id": Number,     // Referencia a instituciones.id
    "hora_salida": String,
    "hora_llegada": String,
    "medico_receptor": String
  },
  "coordenadas": {
    "latitud": Number,
    "longitud": Number,
    "alcaldia": String,
    "colonia": String
  }
}
```

### Ejemplo de Documento

```json
{
  "_id": ObjectId("68f6503a3e11108e9699dbf3"),
  "id": 1,
  "control": {
    "operador": 3,
    "folio": "PREH-2025-001",
    "fecha": "2025-10-23T10:15"
  },
  "datos_generales": {
    "turno_id": 1,
    "lugar_ocurrencia_id": 1,
    "tipo_servicio": "Urgencia",
    "direccion": "Calle Reforma 456"
  },
  "paciente": {
    "nombre": "Carlos López",
    "edad": 45,
    "sexo": "M",
    "telefono": "5512345678",
    "derechohabiencia": "IMSS"
  },
  "evaluacion": {
    "agente_causal_id": 1,
    "origen_probable_id": 1,
    "signos_vitales": {
      "presion_arterial": "120/80",
      "frecuencia_cardiaca": 75,
      "frecuencia_respiratoria": 18,
      "temperatura": 36.5,
      "saturacion_oxigeno": 98
    },
    "glasgow": 15,
    "observaciones": "Paciente consciente y orientado"
  },
  "traslado": {
    "institucion_id": 1,
    "hora_salida": "10:30",
    "hora_llegada": "10:50",
    "medico_receptor": "Dr. García"
  },
  "coordenadas": {
    "latitud": 19.432608,
    "longitud": -99.133209,
    "alcaldia": "Cuauhtémoc",
    "colonia": "Centro"
  }
}
```

### Índices Recomendados

```javascript
db.reportes_prehospitalarios.createIndex({ "id": 1 }, { unique: true })
db.reportes_prehospitalarios.createIndex({ "control.folio": 1 })
db.reportes_prehospitalarios.createIndex({ "control.fecha": -1 })
db.reportes_prehospitalarios.createIndex({ "control.operador": 1 })
db.reportes_prehospitalarios.createIndex({ "paciente.nombre": 1 })
```

### Relaciones

- `control.operador` → `usuarios.id`
- `datos_generales.turno_id` → `turnos.id`
- `datos_generales.lugar_ocurrencia_id` → `lugares_ocurrencia.id`
- `evaluacion.agente_causal_id` → `agentes_causal.id`
- `evaluacion.origen_probable_id` → `origen_probable.id`
- `traslado.institucion_id` → `instituciones.id`

---

## 📍 Colección: `lugares_ocurrencia`

Catálogo de lugares donde pueden ocurrir emergencias.

### Esquema

```javascript
{
  "_id": ObjectId,
  "id": Number,
  "nombre": String,
  "descripcion": String  // OPCIONAL
}
```

### Ejemplos

```json
{ "id": 1, "nombre": "Vía pública" }
{ "id": 2, "nombre": "Domicilio particular" }
{ "id": 3, "nombre": "Establecimiento comercial" }
{ "id": 4, "nombre": "Centro educativo" }
```

---

## 🏥 Colección: `instituciones`

Catálogo de instituciones médicas para traslado de pacientes.

### Esquema

```javascript
{
  "_id": ObjectId,
  "id": Number,
  "nombre": String,
  "direccion": String,
  "tipo": String,         // "Público" | "Privado"
  "telefono": String,     // OPCIONAL
  "especialidades": [String] // OPCIONAL
}
```

### Ejemplos

```json
{
  "id": 1,
  "nombre": "Hospital General de México",
  "direccion": "Dr. Balmis 148, Doctores",
  "tipo": "Público",
  "telefono": "5527892000",
  "especialidades": ["Urgencias", "Cirugía", "Medicina Interna"]
}
```

---

## 🦠 Colección: `agentes_causal`

Catálogo de agentes causales (tipos de lesiones o enfermedades).

### Esquema

```javascript
{
  "_id": ObjectId,
  "id": Number,
  "nombre": String,
  "categoria": String     // "Físico" | "Químico" | "Biológico" | etc.
}
```

### Ejemplos

```json
{ "id": 1, "nombre": "Traumatismo", "categoria": "Físico" }
{ "id": 2, "nombre": "Infarto", "categoria": "Médico" }
{ "id": 3, "nombre": "Intoxicación", "categoria": "Químico" }
```

---

## 🔬 Colección: `origen_probable`

Catálogo de orígenes probables de las emergencias.

### Esquema

```javascript
{
  "_id": ObjectId,
  "id": Number,
  "nombre": String,
  "descripcion": String   // OPCIONAL
}
```

### Ejemplos

```json
{ "id": 1, "nombre": "Accidental" }
{ "id": 2, "nombre": "Intencional" }
{ "id": 3, "nombre": "Enfermedad" }
{ "id": 4, "nombre": "Desconocido" }
```

---

## 📝 Colección: `logs`

Registro de auditoría del sistema (generada automáticamente).

### Esquema

```javascript
{
  "_id": ObjectId,
  "timestamp": Date,      // Fecha y hora del evento
  "sujeto": String,       // Usuario que realizó la acción
  "objeto": String,       // Recurso afectado
  "accion": String        // Acción realizada
}
```

### Ejemplo de Documento

```json
{
  "_id": ObjectId("68f65120a973ec70605b5544"),
  "timestamp": ISODate("2025-10-23T15:30:45.123Z"),
  "sujeto": "jperez@ejemplo.com",
  "objeto": "usuario_5",
  "accion": "edit"
}
```

---

## 🔄 Migraciones y Actualizaciones

### Auto-incremento de IDs

Todos los documentos utilizan un campo `id` numérico que se calcula automáticamente:

```javascript
const last = await db.collection("nombre_coleccion")
  .find()
  .sort({ id: -1 })
  .limit(1)
  .toArray();
  
const nuevoId = last.length > 0 ? last[0].id + 1 : 1;
```

### Respaldo de la Base de Datos

```bash
# Respaldar toda la base de datos
mongodump --db ProyectoCPP --out backup/

# Restaurar desde respaldo
mongorestore --db ProyectoCPP backup/ProyectoCPP/
```

### Exportar colección a JSON

```bash
mongoexport --db ProyectoCPP --collection usuarios --out usuarios.json --jsonArray
```

---

## 🔍 Consultas Útiles

### Ver estadísticas de una colección

```javascript
db.usuarios.stats()
```

### Contar documentos por rol

```javascript
db.usuarios.aggregate([
  { $group: { _id: "$rol_id", count: { $sum: 1 } } }
])
```

### Buscar reportes por fecha

```javascript
db.reportes_urbanos.find({
  "datos_generales.fecha": {
    $gte: "2025-10-01T00:00",
    $lte: "2025-10-31T23:59"
  }
})
```

### Obtener reportes con información del operador

```javascript
db.reportes_prehospitalarios.aggregate([
  {
    $lookup: {
      from: "usuarios",
      localField: "control.operador",
      foreignField: "id",
      as: "operador_info"
    }
  }
])
```

---

## 🛡️ Seguridad

### Contraseñas

Las contraseñas se almacenan encriptadas con **Argon2id**:


### Recomendaciones

1. **Crear índices únicos** para campos como email y usuario
2. **Limitar acceso** a MongoDB solo desde localhost en producción
3. **Habilitar autenticación** de MongoDB en producción
4. **Hacer respaldos regulares** de la base de datos
5. **Validar datos** antes de insertar en el backend



**Última actualización:** Octubre 2025
