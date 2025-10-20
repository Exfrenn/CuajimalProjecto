# Permisos Actualizados para Roles

## IMPORTANTE: Actualizar estos permisos en tu base de datos MongoDB

Ejecuta estos comandos en MongoDB para actualizar los permisos de cada rol:

```javascript
// 1. Administrador - Acceso completo
db.roles.updateOne(
  { "id": 1 },
  {
    $set: {
      "permisos": [
        "tablero",
        "turnos",
        "roles",
        "usuarios",
        "reportes_urbanos",
        "reportes_prehospitalarios",
        "mapas",
        "list",
        "show",
        "edit",
        "create",
        "delete"
      ]
    }
  }
)

// 2. Jefe de turno - Puede ver reportes y usuarios, requiere acceso de lectura a roles/turnos
db.roles.updateOne(
  { "id": 2 },
  {
    $set: {
      "permisos": [
        "tablero",
        "reportes_prehospitalarios",
        "reportes_urbanos",
        "usuarios",
        "roles",      // Acceso de lectura (necesario para relaciones)
        "turnos",     // Acceso de lectura (necesario para relaciones)
        "list",
        "show",
        "edit"
      ]
    }
  }
)

// 3. Paramédico - Solo reportes prehospitalarios
db.roles.updateOne(
  { "id": 3 },
  {
    $set: {
      "permisos": [
        "reportes_prehospitalarios",
        "roles",      // Acceso de lectura (necesario para ver referencias)
        "turnos",     // Acceso de lectura (necesario para ver referencias)
        "usuarios",   // Acceso de lectura (necesario para ver referencias)
        "list",
        "show",
        "create"
      ]
    }
  }
)

// 4. Operador - Solo reportes urbanos
db.roles.updateOne(
  { "id": 4 },
  {
    $set: {
      "permisos": [
        "reportes_urbanos",
        "roles",      // Acceso de lectura (necesario para ver referencias)
        "turnos",     // Acceso de lectura (necesario para ver referencias)
        "usuarios",   // Acceso de lectura (necesario para ver referencias)
        "list",
        "show",
        "create"
      ]
    }
  }
)
```

## Explicación de los cambios:

1. **Agregado "tablero"** al Administrador y Jefe de turno
   - Solo estos roles pueden acceder al Dashboard

2. **Agregado permisos de lectura (roles, turnos, usuarios)** a Paramédico y Operador
   - Necesario para que las referencias (ReferenceField) funcionen correctamente
   - Por ejemplo, cuando muestran "Turno" o "Rol" de un usuario en un reporte

3. **Sistema de visibilidad:**
   - Los recursos con `options.menu = false` no aparecen en el menú lateral
   - Pero siguen siendo accesibles vía API para referencias

## Script completo para copiar y pegar en MongoDB:

```javascript
use ProyectoCPP

db.roles.updateOne({ "id": 1 }, { $set: { "permisos": ["tablero", "turnos", "roles", "usuarios", "reportes_urbanos", "reportes_prehospitalarios", "mapas", "list", "show", "edit", "create", "delete"] } })

db.roles.updateOne({ "id": 2 }, { $set: { "permisos": ["tablero", "reportes_prehospitalarios", "reportes_urbanos", "usuarios", "roles", "turnos", "list", "show", "edit"] } })

db.roles.updateOne({ "id": 3 }, { $set: { "permisos": ["reportes_prehospitalarios", "roles", "turnos", "usuarios", "list", "show", "create"] } })

db.roles.updateOne({ "id": 4 }, { $set: { "permisos": ["reportes_urbanos", "roles", "turnos", "usuarios", "list", "show", "create"] } })
```

## Verificar los cambios:

```javascript
db.roles.find({}).pretty()
```
