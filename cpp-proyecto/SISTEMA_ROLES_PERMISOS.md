# Sistema de Roles y Permisos

## Descripción General

Se ha implementado un sistema completo de roles y permisos que controla el acceso a recursos y acciones tanto en el backend como en el frontend.

## Estructura de Roles y Permisos

### Roles en la Base de Datos

La colección `roles` contiene los siguientes roles:

1. **Administrador** (id: 1)
   - Permisos: acceso completo a todos los recursos y acciones
   - Recursos: tablero, turnos, roles, usuarios, reportes_urbanos, reportes_prehospitalarios, mapas
   - Acciones: list, show, edit, create, delete

2. **Jefe de turno** (id: 2)
   - Permisos: acceso limitado a reportes y usuarios
   - Recursos: reportes_prehospitalarios, reportes_urbanos, usuarios
   - Acciones: list, show, edit

3. **Paramédico** (id: 3)
   - Permisos: solo reportes prehospitalarios
   - Recursos: reportes_prehospitalarios
   - Acciones: list, show, create

4. **Operador** (id: 4)
   - Permisos: solo reportes urbanos
   - Recursos: reportes_urbanos
   - Acciones: list, show, create

### Estructura de Usuario

Cada usuario tiene:
- `rol_id`: ID del rol asignado
- Los permisos se obtienen automáticamente del rol al hacer login

## Implementación Backend

### 1. Middlewares de Seguridad

#### `authenticateToken(req, res, next)`
- Verifica que la petición incluya un token JWT válido
- El token debe enviarse en el header `Authorization` como `Bearer <token>`
- Si el token es inválido o no existe, devuelve 401 o 403

#### `checkPermissions(resource, action)`
- Verifica que el usuario tenga permisos para acceder al recurso y realizar la acción
- Consulta el rol del usuario en la base de datos
- Comprueba que el array de permisos incluya tanto el recurso como la acción
- Devuelve 403 si no tiene los permisos necesarios

### 2. Rutas Protegidas

Todas las rutas de recursos están protegidas con ambos middlewares:

```javascript
app.get("/usuarios", authenticateToken, checkPermissions("usuarios", "list"), async (req,res)=>{ ... })
app.post("/usuarios", authenticateToken, checkPermissions("usuarios", "create"), async (req, res) => { ... })
app.put("/usuarios/:id", authenticateToken, checkPermissions("usuarios", "edit"), async (req, res) => { ... })
app.delete("/usuarios/:id", authenticateToken, checkPermissions("usuarios", "delete"), async(req,res)=>{ ... })
```

Recursos protegidos:
- `/turnos` (list, show, create, edit, delete)
- `/roles` (list, show, create, edit, delete)
- `/usuarios` (list, show, create, edit, delete)
- `/reportes_urbanos` (list, show, create, edit, delete)
- `/reportes_prehospitalarios` (list, show, create, edit, delete)

### 3. Endpoint de Login

El endpoint `/login` ha sido modificado para incluir los permisos:

```javascript
app.post("/login", async (req, res) => {
    // ... verificación de credenciales ...
    
    // Obtener los permisos del rol
    const rol = await db.collection("roles").findOne({ "id": data.rol_id });
    const permisos = rol ? rol.permisos : [];
    
    let token = jwt.sign({ "email": data.email, "rol_id": data.rol_id }, "secretKey", { expiresIn: 900 });
    res.json({ 
        "token": token, 
        "id": data.id,
        "email": data.email, 
        "nombre": data.nombre,
        "rol_id": data.rol_id,
        "turno_id": data.turno_id,
        "permisos": permisos  // ← Permisos incluidos
    });
});
```

## Implementación Frontend

### 1. AuthProvider

El `authProvider` ha sido actualizado para:

#### Login
- Guardar el token JWT en `sessionStorage.auth`
- Guardar los permisos en `sessionStorage.permisos`
- Guardar la identidad del usuario en `sessionStorage.identity`

#### Logout
- Limpiar todos los datos de sesión (auth, permisos, identity)

#### canAccess
- Verificar que el usuario tenga permiso para acceder a un recurso y realizar una acción
- Lee los permisos desde `sessionStorage.permisos`
- Comprueba que el array incluya tanto el nombre del recurso como la acción

```typescript
canAccess: async ({resource, action}) => {
    const permisosStr = sessionStorage.getItem("permisos");
    if (!permisosStr) return false;
    
    const permisos: string[] = JSON.parse(permisosStr);
    
    // Necesita ambos permisos: el recurso y la acción
    const hasResourcePermission = permisos.includes(resource);
    const hasActionPermission = permisos.includes(action);
    
    return hasResourcePermission && hasActionPermission;
}
```

### 2. DataProvider

El `dataProvider` ha sido modificado para:
- Incluir el token JWT en todas las peticiones HTTP
- Enviar el token como `Authorization: Bearer <token>`
- Usar `fetchJsonUtil` personalizado que agrega el header automáticamente

```typescript
export const fetchJsonUtil = (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    
    const token = sessionStorage.getItem("auth");
    if (token && options.headers instanceof Headers) {
        options.headers.set("Authorization", `Bearer ${token}`);
    }
    
    return fetchUtils.fetchJson(url, options);
};
```

## Flujo de Autenticación y Autorización

1. **Login**
   ```
   Usuario → Frontend (login) → Backend (/login)
   Backend verifica credenciales
   Backend obtiene permisos del rol
   Backend devuelve: token JWT + datos usuario + permisos
   Frontend guarda en sessionStorage
   ```

2. **Acceso a Recursos**
   ```
   Usuario intenta acceder a recurso
   Frontend (canAccess) verifica permisos localmente
   Si tiene permiso → Frontend hace petición al backend con token
   Backend (authenticateToken) verifica token
   Backend (checkPermissions) verifica permisos
   Si todo OK → Backend devuelve datos
   ```

## Ejemplos de Uso

### Ejemplo 1: Operador (rol_id: 4)

Permisos: `["reportes_urbanos", "show", "list", "create"]`

- ✅ Puede listar reportes urbanos
- ✅ Puede ver detalles de reportes urbanos
- ✅ Puede crear reportes urbanos
- ❌ NO puede editar reportes urbanos (falta "edit")
- ❌ NO puede eliminar reportes urbanos (falta "delete")
- ❌ NO puede acceder a reportes prehospitalarios (falta "reportes_prehospitalarios")
- ❌ NO puede acceder a usuarios, roles, turnos

### Ejemplo 2: Paramédico (rol_id: 3)

Permisos: `["reportes_prehospitalarios", "list", "show", "create"]`

- ✅ Puede listar reportes prehospitalarios
- ✅ Puede ver detalles de reportes prehospitalarios
- ✅ Puede crear reportes prehospitalarios
- ❌ NO puede editar reportes prehospitalarios (falta "edit")
- ❌ NO puede acceder a reportes urbanos

### Ejemplo 3: Jefe de turno (rol_id: 2)

Permisos: `["reportes_prehospitalarios", "reportes_urbanos", "usuarios", "list", "show", "edit"]`

- ✅ Puede listar, ver y editar reportes prehospitalarios
- ✅ Puede listar, ver y editar reportes urbanos
- ✅ Puede listar, ver y editar usuarios
- ❌ NO puede crear nuevos reportes (falta "create")
- ❌ NO puede eliminar (falta "delete")

### Ejemplo 4: Administrador (rol_id: 1)

Permisos: `["tablero", "turnos", "roles", "usuarios", "reportes_urbanos", "reportes_prehospitalarios", "mapas", "list", "show", "edit", "create", "delete"]`

- ✅ Acceso completo a todos los recursos y acciones

## Seguridad

### Token JWT
- Expira en 900 segundos (15 minutos)
- Se firma con la clave secreta "secretKey" (⚠️ cambiar en producción)
- Se envía en cada petición al backend

### Validación en Dos Capas
1. **Frontend**: Verifica permisos antes de mostrar UI y hacer peticiones
2. **Backend**: Valida token y permisos antes de ejecutar acciones

Esto previene que usuarios modifiquen el frontend para acceder a recursos no autorizados.

## Consideraciones de Seguridad

⚠️ **IMPORTANTE**: Antes de pasar a producción:

1. Cambiar la clave secreta del JWT en `backend/index.js`:
   ```javascript
   jwt.sign({ ... }, "TU_CLAVE_SECRETA_SEGURA", { expiresIn: 900 });
   ```

2. Usar variables de entorno para configuración sensible

3. Considerar aumentar o disminuir el tiempo de expiración del token según necesidades

4. Implementar refresh tokens para mejor experiencia de usuario

5. Agregar rate limiting para prevenir ataques de fuerza bruta

## Testing

Para probar el sistema:

1. Iniciar sesión con diferentes usuarios (cada uno con diferente rol)
2. Intentar acceder a recursos para los que tienen/no tienen permiso
3. Verificar que el frontend oculta/muestra botones según permisos
4. Verificar que el backend rechaza peticiones no autorizadas

## Mantenimiento

### Agregar Nuevo Recurso

1. Agregar el nombre del recurso a los permisos del rol en la BD
2. Proteger las rutas en el backend con los middlewares
3. El frontend automáticamente usará `canAccess` para verificar acceso

### Agregar Nueva Acción

1. Agregar el nombre de la acción a los permisos del rol en la BD
2. El sistema automáticamente verificará esta acción en backend y frontend
