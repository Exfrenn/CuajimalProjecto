# 🔐 Configuración Final de Permisos

## ✅ Cambios Implementados

### 1. Backend
- ✅ Middleware actualizado para soportar permisos granulares `{action, resource}`
- ✅ Filtrado de reportes por `tipo_servicio` del usuario (no del turno)
- ✅ Jefes de turno con `tipo_servicio: 'urbano'` solo ven reportes urbanos
- ✅ Jefes de turno con `tipo_servicio: 'prehospitalario'` solo ven reportes prehospitalarios

### 2. Frontend
- ✅ `authProvider.canAccess()` verifica permisos granulares
- ✅ Componente `PermisosInput` con tabla de checkboxes
- ✅ Recursos sin permiso `list` NO aparecen en el menú

## 📋 Ejecutar en MongoDB

```javascript
use ProyectoCPP

// ===== ROL 1: ADMINISTRADOR =====
db.roles.updateOne(
  { "id": 1 },
  {
    $set: {
      "nombre": "Administrador",
      "permisos": [
        { "action": "list", "resource": "tablero" },
        { "action": "list", "resource": "turnos" },
        { "action": "show", "resource": "turnos" },
        { "action": "create", "resource": "turnos" },
        { "action": "edit", "resource": "turnos" },
        { "action": "delete", "resource": "turnos" },
        { "action": "list", "resource": "roles" },
        { "action": "show", "resource": "roles" },
        { "action": "create", "resource": "roles" },
        { "action": "edit", "resource": "roles" },
        { "action": "delete", "resource": "roles" },
        { "action": "list", "resource": "usuarios" },
        { "action": "show", "resource": "usuarios" },
        { "action": "create", "resource": "usuarios" },
        { "action": "edit", "resource": "usuarios" },
        { "action": "delete", "resource": "usuarios" },
        { "action": "list", "resource": "reportes_urbanos" },
        { "action": "show", "resource": "reportes_urbanos" },
        { "action": "create", "resource": "reportes_urbanos" },
        { "action": "edit", "resource": "reportes_urbanos" },
        { "action": "delete", "resource": "reportes_urbanos" },
        { "action": "list", "resource": "reportes_prehospitalarios" },
        { "action": "show", "resource": "reportes_prehospitalarios" },
        { "action": "create", "resource": "reportes_prehospitalarios" },
        { "action": "edit", "resource": "reportes_prehospitalarios" },
        { "action": "delete", "resource": "reportes_prehospitalarios" }
      ]
    }
  }
)

// ===== ROL 2: JEFE DE TURNO =====
// SOLO ve Dashboard, Usuarios y Reportes
// NO ve menú de Turnos ni Roles
// Reportes filtrados por su tipo_servicio
db.roles.updateOne(
  { "id": 2 },
  {
    $set: {
      "nombre": "Jefe de turno",
      "permisos": [
        // Dashboard
        { "action": "list", "resource": "tablero" },
        
        // Usuarios - Ver y editar (incluye perfil)
        { "action": "list", "resource": "usuarios" },
        { "action": "show", "resource": "usuarios" },
        { "action": "edit", "resource": "usuarios" },
        
        // Reportes Urbanos - Ver y editar
        { "action": "list", "resource": "reportes_urbanos" },
        { "action": "show", "resource": "reportes_urbanos" },
        { "action": "edit", "resource": "reportes_urbanos" },
        
        // Reportes Prehospitalarios - Ver y editar
        { "action": "list", "resource": "reportes_prehospitalarios" },
        { "action": "show", "resource": "reportes_prehospitalarios" },
        { "action": "edit", "resource": "reportes_prehospitalarios" },
        
        // Solo SHOW (sin list = sin menú, pero funciona en formularios)
        { "action": "show", "resource": "roles" },
        { "action": "show", "resource": "turnos" }
      ]
    }
  }
)

// ===== ROL 3: PARAMÉDICO =====
// SOLO reportes prehospitalarios
db.roles.updateOne(
  { "id": 3 },
  {
    $set: {
      "nombre": "Paramedico",
      "permisos": [
        // Reportes Prehospitalarios - Crear y ver
        { "action": "list", "resource": "reportes_prehospitalarios" },
        { "action": "show", "resource": "reportes_prehospitalarios" },
        { "action": "create", "resource": "reportes_prehospitalarios" },
        
        // Editar perfil propio
        { "action": "edit", "resource": "usuarios" },
        
        // Referencias (sin menú)
        { "action": "show", "resource": "roles" },
        { "action": "show", "resource": "turnos" },
        { "action": "list", "resource": "usuarios" },
        { "action": "show", "resource": "usuarios" }
      ]
    }
  }
)

// ===== ROL 4: OPERADOR =====
// SOLO reportes urbanos
db.roles.updateOne(
  { "id": 4 },
  {
    $set: {
      "nombre": "Operador",
      "permisos": [
        // Reportes Urbanos - Crear y ver
        { "action": "list", "resource": "reportes_urbanos" },
        { "action": "show", "resource": "reportes_urbanos" },
        { "action": "create", "resource": "reportes_urbanos" },
        
        // Editar perfil propio
        { "action": "edit", "resource": "usuarios" },
        
        // Referencias (sin menú)
        { "action": "show", "resource": "roles" },
        { "action": "show", "resource": "turnos" },
        { "action": "list", "resource": "usuarios" },
        { "action": "show", "resource": "usuarios" }
      ]
    }
  }
)
```

## 🎯 Asegúrate de configurar `tipo_servicio` en usuarios

Cada **Jefe de Turno** DEBE tener el campo `tipo_servicio` en su documento:

```javascript
// Ejemplo: Actualizar un jefe de turno para que sea de tipo urbano
db.usuarios.updateOne(
  { "email": "jefe@ejemplo.com" },
  { $set: { "tipo_servicio": "urbano" } }
)

// Ejemplo: Actualizar un jefe de turno para que sea de tipo prehospitalario
db.usuarios.updateOne(
  { "email": "otro_jefe@ejemplo.com" },
  { $set: { "tipo_servicio": "prehospitalario" } }
)
```

## 🔍 Verificar configuración

```javascript
// Ver todos los roles con permisos
db.roles.find({}).pretty()

// Ver jefes de turno con su tipo_servicio
db.usuarios.find({ "rol_id": 2 }, { nombre: 1, email: 1, tipo_servicio: 1, turno_id: 1 }).pretty()
```

## 🚀 Pasos para Probar

1. **Ejecuta los scripts de MongoDB** (arriba)
2. **Reinicia el backend**:
   ```bash
   cd backend
   node index.js
   ```
3. **Cierra sesión** en el frontend
4. **Inicia sesión** con cada rol y verifica:

### ✅ Administrador debe ver:
- ✅ Menú: Tablero, Turnos, Roles, Usuarios, Reportes Urbanos, Reportes Prehospitalarios
- ✅ Todos los reportes (sin filtro)

### ✅ Jefe de Turno (urbano) debe ver:
- ✅ Menú: Tablero, Usuarios, Reportes Urbanos, Reportes Prehospitalarios
- ❌ NO ver menú: Turnos, Roles
- ✅ Reportes Urbanos: TODOS
- ✅ Reportes Prehospitalarios: NINGUNO (lista vacía)

### ✅ Jefe de Turno (prehospitalario) debe ver:
- ✅ Menú: Tablero, Usuarios, Reportes Urbanos, Reportes Prehospitalarios
- ❌ NO ver menú: Turnos, Roles
- ✅ Reportes Urbanos: NINGUNO (lista vacía)
- ✅ Reportes Prehospitalarios: TODOS

### ✅ Paramédico debe ver:
- ✅ Menú: SOLO Reportes Prehospitalarios
- ✅ Puede crear y ver reportes prehospitalarios
- ✅ Puede editar su perfil

### ✅ Operador debe ver:
- ✅ Menú: SOLO Reportes Urbanos
- ✅ Puede crear y ver reportes urbanos
- ✅ Puede editar su perfil

## 🎨 Cómo funciona el filtrado

### Backend (`index.js`):
```javascript
// Para reportes_urbanos
if (usuario.rol_id === 2 && usuario.tipo_servicio) {
    if (usuario.tipo_servicio === 'urbano') {
        filtro = {}; // Muestra todos
    } else {
        filtro = { "_id": null }; // No muestra ninguno
    }
}

// Para reportes_prehospitalarios
if (usuario.rol_id === 2 && usuario.tipo_servicio) {
    if (usuario.tipo_servicio === 'prehospitalario') {
        filtro = {}; // Muestra todos
    } else {
        filtro = { "_id": null }; // No muestra ninguno
    }
}
```

### Frontend (`authProvider.tsx`):
```typescript
canAccess: ({ resource, action }) => {
    const permisos = JSON.parse(sessionStorage.getItem("permisos") || "[]");
    return permisos.some((p: any) => 
        p.resource === resource && p.action === action
    );
}
```

## 📊 Resumen de Permisos

| Rol | Dashboard | Turnos | Roles | Usuarios | Reportes Urbanos | Reportes Prehospitalarios |
|-----|-----------|--------|-------|----------|------------------|---------------------------|
| **Admin** | ✅ | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ CRUD |
| **Jefe (urbano)** | ✅ | ❌ | ❌ | ✅ Ver/Editar | ✅ Ver/Editar (TODOS) | ❌ (vacío) |
| **Jefe (prehospital)** | ✅ | ❌ | ❌ | ✅ Ver/Editar | ❌ (vacío) | ✅ Ver/Editar (TODOS) |
| **Paramédico** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Crear/Ver |
| **Operador** | ❌ | ❌ | ❌ | ❌ | ✅ Crear/Ver | ❌ |

## 🔧 Troubleshooting

### Problema: "No puedo ver mi perfil"
**Solución**: Verifica que el rol tenga `{ "action": "edit", "resource": "usuarios" }`

### Problema: "Veo menús que no debería"
**Solución**: El recurso NO debe tener `{ "action": "list", resource: "..." }` en sus permisos

### Problema: "El jefe ve reportes que no debe"
**Solución**: Verifica que el usuario tenga el campo `tipo_servicio` correcto en MongoDB

### Problema: "Error 403 en todas las peticiones"
**Solución**: 
1. Cierra sesión
2. Vuelve a iniciar sesión
3. Verifica que los permisos se guardaron en MongoDB
4. Verifica en la consola del navegador: `JSON.parse(sessionStorage.getItem('permisos'))`
