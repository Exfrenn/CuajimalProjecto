# Actualización de Permisos - Nueva Estructura

## 🔄 Nueva Estructura de Permisos

Ahora los permisos usan objetos `{action, resource}` en lugar de un array plano de strings.

### Ventajas:
✅ **Más granular**: Control específico de qué acción en qué recurso
✅ **Más claro**: Fácil de leer y entender
✅ **Más escalable**: Fácil agregar nuevos permisos
✅ **Compatible con React-Admin**: Sigue las mejores prácticas

## 📋 Ejecutar en MongoDB

```javascript
use ProyectoCPP

// 1. ADMINISTRADOR - Acceso completo a todo
db.roles.updateOne(
  { "id": 1 },
  {
    $set: {
      "nombre": "Administrador",
      "permisos": [
        // Tablero/Dashboard
        { "action": "list", "resource": "tablero" },
        
        // Turnos
        { "action": "list", "resource": "turnos" },
        { "action": "show", "resource": "turnos" },
        { "action": "create", "resource": "turnos" },
        { "action": "edit", "resource": "turnos" },
        { "action": "delete", "resource": "turnos" },
        
        // Roles
        { "action": "list", "resource": "roles" },
        { "action": "show", "resource": "roles" },
        { "action": "create", "resource": "roles" },
        { "action": "edit", "resource": "roles" },
        { "action": "delete", "resource": "roles" },
        
        // Usuarios
        { "action": "list", "resource": "usuarios" },
        { "action": "show", "resource": "usuarios" },
        { "action": "create", "resource": "usuarios" },
        { "action": "edit", "resource": "usuarios" },
        { "action": "delete", "resource": "usuarios" },
        
        // Reportes Urbanos
        { "action": "list", "resource": "reportes_urbanos" },
        { "action": "show", "resource": "reportes_urbanos" },
        { "action": "create", "resource": "reportes_urbanos" },
        { "action": "edit", "resource": "reportes_urbanos" },
        { "action": "delete", "resource": "reportes_urbanos" },
        
        // Reportes Prehospitalarios
        { "action": "list", "resource": "reportes_prehospitalarios" },
        { "action": "show", "resource": "reportes_prehospitalarios" },
        { "action": "create", "resource": "reportes_prehospitalarios" },
        { "action": "edit", "resource": "reportes_prehospitalarios" },
        { "action": "delete", "resource": "reportes_prehospitalarios" }
      ]
    }
  }
)

// 2. JEFE DE TURNO - Dashboard + Ver y editar reportes y usuarios
db.roles.updateOne(
  { "id": 2 },
  {
    $set: {
      "nombre": "Jefe de turno",
      "permisos": [
        // Tablero/Dashboard
        { "action": "list", "resource": "tablero" },
        
        // Usuarios - Solo ver y editar
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
        
        // Roles - Solo ver (para referencias)
        { "action": "list", "resource": "roles" },
        { "action": "show", "resource": "roles" },
        
        // Turnos - Solo ver (para referencias)
        { "action": "list", "resource": "turnos" },
        { "action": "show", "resource": "turnos" }
      ]
    }
  }
)

// 3. PARAMÉDICO - Solo reportes prehospitalarios (crear y ver)
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
        
        // Roles - Solo ver (para referencias)
        { "action": "list", "resource": "roles" },
        { "action": "show", "resource": "roles" },
        
        // Turnos - Solo ver (para referencias)
        { "action": "list", "resource": "turnos" },
        { "action": "show", "resource": "turnos" },
        
        // Usuarios - Solo ver (para referencias)
        { "action": "list", "resource": "usuarios" },
        { "action": "show", "resource": "usuarios" }
      ]
    }
  }
)

// 4. OPERADOR - Solo reportes urbanos (crear y ver)
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
        
        // Roles - Solo ver (para referencias)
        { "action": "list", "resource": "roles" },
        { "action": "show", "resource": "roles" },
        
        // Turnos - Solo ver (para referencias)
        { "action": "list", "resource": "turnos" },
        { "action": "show", "resource": "turnos" },
        
        // Usuarios - Solo ver (para referencias)
        { "action": "list", "resource": "usuarios" },
        { "action": "show", "resource": "usuarios" }
      ]
    }
  }
)
```

## ✅ Verificar los cambios

```javascript
// Ver todos los roles con sus permisos
db.roles.find({}).pretty()

// Ver un rol específico
db.roles.findOne({ "id": 2 })
```

## 🎯 Cómo Funciona Ahora

### Antes (Array Plano):
```json
["reportes_urbanos", "list", "show", "create"]
```
❌ Problema: No es claro qué acción aplica a qué recurso

### Ahora (Objetos):
```json
[
  { "action": "list", "resource": "reportes_urbanos" },
  { "action": "show", "resource": "reportes_urbanos" },
  { "action": "create", "resource": "reportes_urbanos" }
]
```
✅ Solución: Cada permiso es explícito y granular

## 📊 Resumen de Permisos por Rol

| Rol | Recursos | Acciones | Dashboard |
|-----|----------|----------|-----------|
| **Administrador** | Todos | Todas (list, show, create, edit, delete) | ✅ |
| **Jefe de Turno** | Usuarios, Reportes (ambos) | list, show, edit | ✅ |
| **Paramédico** | Reportes Prehospitalarios | list, show, create | ❌ |
| **Operador** | Reportes Urbanos | list, show, create | ❌ |

## 🔐 Verificación en el Backend

El middleware `checkPermissions` ya está preparado para trabajar con esta estructura:

```javascript
function checkPermissions(resource, action) {
    return async (req, res, next) => {
        const rol = await db.collection("roles").findOne({ "id": usuario.rol_id });
        
        // Verifica que exista el permiso exacto
        const tienePermiso = rol.permisos.some(p => 
            p.resource === resource && p.action === action
        );
        
        if (tienePermiso) {
            next();
        } else {
            res.status(403).json({ error: "No tienes permisos" });
        }
    };
}
```

## 🎨 Interfaz Nueva

Ahora en el formulario de roles verás una **tabla interactiva** donde puedes:
- ✅ Seleccionar permisos específicos con checkboxes
- ✅ Ver contador de permisos por recurso
- ✅ Seleccionar/Deseleccionar todas las acciones de un recurso
- ✅ Vista visual clara de qué puede hacer cada rol

## 🚀 Pasos Siguientes

1. **Ejecuta los scripts de MongoDB** (arriba)
2. **Reinicia el backend** - para que cargue los nuevos permisos
3. **Reinicia el frontend** - debería compilar sin errores
4. **Prueba editando un rol** - verás la nueva interfaz de tabla
5. **Inicia sesión con cada usuario** - verifica que los permisos funcionen

## 🐛 Solución de Problemas

### Si el frontend no compila:
```bash
cd frontend
npm install
npm run dev
```

### Si los permisos no funcionan:
1. Verifica que los permisos en MongoDB tienen el formato correcto
2. Cierra sesión y vuelve a iniciar sesión
3. Verifica en la consola del navegador el contenido de sessionStorage:
   ```javascript
   JSON.parse(sessionStorage.getItem('permisos'))
   ```

### Si el backend da errores:
El middleware ya está actualizado para trabajar con ambos formatos (arrays planos y objetos), así que debería ser compatible.
