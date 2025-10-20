# Sistema de Filtros por Rol

## Descripción General

Este documento describe cómo funciona el sistema de filtrado de datos según el rol del usuario. En lugar de ocultar secciones completas, el sistema muestra solo los datos relevantes para cada usuario según su rol.

## Roles del Sistema

| ID | Nombre | Descripción |
|----|--------|-------------|
| 1 | Admin | Acceso completo a todos los datos |
| 2 | Jefe de Turno | Ve solo los datos de su turno y operadores asignados |
| 3 | Paramédico | Ve solo sus propios datos y reportes |
| 4 | Operador | Ve solo sus propios datos y reportes |

## Filtrado por Sección

### 1. **Roles** (`/roles`)

**Filtrado Frontend:**
- **Admin (rol_id = 1)**: Ve todos los roles
- **Jefe, Paramédico, Operador**: Solo ven su propio rol

**Implementación:**
```tsx
// frontend/src/usuarios/roles.tsx
const { data: identity } = useGetIdentity();
const filter = identity?.rol_id !== 1 ? { id: identity?.rol_id } : {};

<List filter={filter}>
```

**Ejemplo:**
- Un Paramédico (rol_id = 3) solo verá "Paramédico" en la lista de roles
- Un Admin verá: Admin, Jefe de Turno, Paramédico, Operador

---

### 2. **Turnos** (`/turnos`)

**Filtrado Frontend:**
- **Admin (rol_id = 1)**: Ve todos los turnos
- **Jefe, Paramédico, Operador**: Solo ven su propio turno

**Implementación:**
```tsx
// frontend/src/usuarios/turnos.tsx
const { data: identity } = useGetIdentity();
const filter = identity?.rol_id !== 1 ? { id: identity?.turno_id } : {};

<List filter={filter}>
```

**Ejemplo:**
- Un Operador en Turno Matutino solo verá "Turno Matutino"
- Un Admin verá: Turno Matutino, Turno Vespertino, Turno Nocturno

---

### 3. **Usuarios** (`/usuarios`)

**Filtrado Frontend + Backend:**

#### Frontend:
```tsx
// frontend/src/usuarios/usuarios.tsx
const { data: identity } = useGetIdentity();

let filter = {};

if (identity?.rol_id === 3 || identity?.rol_id === 4) {
    // Paramédico u Operador: solo se ven a sí mismos
    filter = { id: identity.id };
} else if (identity?.rol_id === 2) {
    // Jefe de turno: el backend filtra por operadores_id
    filter = {};
}
// Admin (rol_id === 1): ve todos (sin filtro)

<List filter={filter}>
```

#### Backend:
```javascript
// backend/index.js - GET /usuarios
if (usuario.rol_id === 2) { // Jefe de turno
    filter = { 
        _id: { 
            $in: usuario.operadores_id.map(id => new ObjectId(id)) 
        } 
    };
} else if (usuario.rol_id === 3 || usuario.rol_id === 4) {
    // Paramédico u Operador: solo su propio usuario
    filter = { _id: new ObjectId(usuario.id) };
}
```

**Resultado:**
- **Admin**: Ve todos los usuarios
- **Jefe de Turno**: Ve solo los operadores/paramédicos asignados en su campo `operadores_id`
- **Paramédico/Operador**: Solo se ven a sí mismos

**Ejemplo:**
- Jefe tiene `operadores_id = [5, 7, 9]` → verá solo los usuarios con ID 5, 7 y 9
- Paramédico con `id = 5` → solo verá su propio perfil

---

### 4. **Reportes Urbanos** (`/reportes_urbanos`)

**Filtrado Backend:**

```javascript
// backend/index.js - GET /reportes_urbanos
if (usuario.rol_id === 2) { // Jefe de turno
    // Ve reportes donde personal_a_cargo incluye alguno de sus operadores
    filter = {
        'personal_y_activacion.personal_a_cargo': {
            $in: usuario.operadores_id.map(id => new ObjectId(id))
        }
    };
} else if (usuario.rol_id === 4) { // Operador
    // Ve solo reportes donde él está en personal_a_cargo
    filter = {
        'personal_y_activacion.personal_a_cargo': new ObjectId(usuario.id)
    };
}
// Admin (rol_id === 1): ve todos
```

**Resultado:**
- **Admin**: Ve todos los reportes urbanos
- **Jefe de Turno**: Ve reportes donde el personal a cargo es alguno de sus operadores asignados
- **Operador**: Ve solo reportes donde él aparece como personal a cargo

**Ejemplo:**
```javascript
// Reporte Urbano:
{
    datos_generales: { folio: "URB-001" },
    personal_y_activacion: {
        personal_a_cargo: [5, 7] // IDs de operadores
    }
}

// ¿Quién lo ve?
- Admin: ✅ Sí
- Jefe con operadores_id = [5, 7, 9]: ✅ Sí (tiene a 5 y 7)
- Jefe con operadores_id = [10, 11]: ❌ No
- Operador con id = 5: ✅ Sí (está en personal_a_cargo)
- Operador con id = 10: ❌ No
```

---

### 5. **Reportes Prehospitalarios** (`/reportes_prehospitalarios`)

**Filtrado Backend:**

```javascript
// backend/index.js - GET /reportes_prehospitalarios
if (usuario.rol_id === 2) { // Jefe de turno
    // Ve reportes donde operador incluye alguno de sus paramédicos
    filter = {
        'control.operador': {
            $in: usuario.operadores_id.map(id => new ObjectId(id))
        }
    };
} else if (usuario.rol_id === 3) { // Paramédico
    // Ve solo reportes donde él es operador
    filter = {
        'control.operador': new ObjectId(usuario.id)
    };
}
// Admin (rol_id === 1): ve todos
```

**Resultado:**
- **Admin**: Ve todos los reportes prehospitalarios
- **Jefe de Turno**: Ve reportes donde el operador es alguno de sus paramédicos asignados
- **Paramédico**: Ve solo reportes donde él aparece como operador

**Ejemplo:**
```javascript
// Reporte Prehospitalario:
{
    preambulo: { folio: "PRE-001" },
    control: {
        operador: [3, 8] // IDs de paramédicos
    }
}

// ¿Quién lo ve?
- Admin: ✅ Sí
- Jefe con operadores_id = [3, 8, 12]: ✅ Sí (tiene a 3 y 8)
- Jefe con operadores_id = [15, 16]: ❌ No
- Paramédico con id = 3: ✅ Sí (está en operador)
- Paramédico con id = 10: ❌ No
```

---

## Auto-asignación en Formularios

Cuando un Paramédico u Operador crea un reporte, el sistema auto-completa:

### Reportes Urbanos (Operadores)
- **Campo**: `personal_y_activacion.personal_a_cargo`
- **Valor**: `[identity.id]` (el ID del operador actual)
- **Campo**: `datos_generales.turno_id`
- **Valor**: `identity.turno_id` (su turno asignado)

### Reportes Prehospitalarios (Paramédicos)
- **Campo**: `control.operador`
- **Valor**: `[identity.id]` (el ID del paramédico actual)
- **Campo**: `preambulo.turno_id`
- **Valor**: `identity.turno_id` (su turno asignado)

### Componentes de Auto-asignación
1. **PersonalACargo** - Para reportes urbanos
2. **OperadorPrehospitalario** - Para reportes prehospitalarios
3. **TurnoInput** - Para ambos tipos de reportes

---

## Flujo de Datos

```
┌─────────────────────────────────────────────────┐
│              Usuario Inicia Sesión              │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│     Backend valida credenciales y devuelve:     │
│  - token JWT                                    │
│  - identity: {id, nombre, apellido, rol_id,     │
│               turno_id, tipo_servicio}          │
│  - permisos: [{action, resource}, ...]          │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│    Frontend almacena en sessionStorage         │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│    Usuario navega a una sección (ej: /roles)   │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  Frontend usa useGetIdentity() para obtener     │
│  rol_id, turno_id, etc.                         │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  Frontend aplica filtro en <List filter={...}>  │
│  Ej: filter = { id: identity.rol_id }           │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  React-Admin hace GET request al backend        │
│  con query params del filtro                    │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  Backend verifica JWT token en header           │
│  Authorization: Bearer <token>                  │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  Backend aplica filtros adicionales según       │
│  rol_id del usuario (si aplica)                 │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  Backend devuelve solo los datos autorizados    │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  Frontend renderiza los datos en la interfaz    │
└─────────────────────────────────────────────────┘
```

---

## Seguridad

### Doble Capa de Protección

1. **Frontend**: Filtros en `<List>` previenen que se muestren datos no autorizados
2. **Backend**: Middleware y filtros de MongoDB garantizan que solo se devuelvan datos autorizados

### Importante
⚠️ **Nunca confiar solo en el frontend**. El backend SIEMPRE debe validar y filtrar los datos, ya que el frontend puede ser manipulado.

---

## Ventajas del Sistema Actual

1. ✅ **UX Consistente**: Todos los usuarios ven las mismas secciones del menú
2. ✅ **Seguridad**: Backend filtra los datos, frontend solo mejora la experiencia
3. ✅ **Auto-completado**: Reduce errores al crear reportes
4. ✅ **Supervisión**: Jefes pueden monitorear a su equipo fácilmente
5. ✅ **Privacidad**: Cada usuario solo ve lo que debe ver

---

## Casos de Uso

### Caso 1: Operador crea reporte urbano
1. Operador inicia sesión
2. Va a `/reportes_urbanos/create`
3. El campo "Personal a Cargo" se auto-completa con su nombre
4. El campo "Turno" se auto-completa con su turno
5. Completa el resto del formulario
6. Guarda el reporte
7. El reporte queda asignado a él

### Caso 2: Jefe revisa reportes de su equipo
1. Jefe inicia sesión (tiene `operadores_id = [5, 7, 9]`)
2. Va a `/reportes_urbanos`
3. Solo ve reportes donde `personal_a_cargo` incluye 5, 7 o 9
4. Puede ver detalles y editarlos
5. No ve reportes de otros equipos

### Caso 3: Admin gestiona el sistema
1. Admin inicia sesión
2. Va a `/usuarios`
3. Ve TODOS los usuarios
4. Puede crear, editar y asignar operadores a jefes
5. Puede gestionar roles, turnos y permisos

---

## Archivos Modificados

### Frontend
- `frontend/src/usuarios/roles.tsx` - Filtro por rol propio
- `frontend/src/usuarios/turnos.tsx` - Filtro por turno propio
- `frontend/src/usuarios/usuarios.tsx` - Filtro según rol (self o equipo)
- `frontend/src/reportes/reporte_urbano/metodos/ReporteUrbanoList.tsx` - Comentarios sobre filtrado backend
- `frontend/src/reportes/reporte_prehospitalario/metodos/ReportePrehospitalarioList.tsx` - Comentarios sobre filtrado backend

### Backend
- `backend/index.js` - Filtros en endpoints GET para:
  - `/usuarios`
  - `/reportes_urbanos`
  - `/reportes_prehospitalarios`

---

## Pruebas Recomendadas

### Test 1: Filtrado de Roles
1. Login como Operador
2. Ir a `/roles`
3. ✅ Verificar que solo aparece "Operador"

### Test 2: Filtrado de Usuarios
1. Login como Jefe con `operadores_id = [5, 7]`
2. Ir a `/usuarios`
3. ✅ Verificar que solo aparecen usuarios con ID 5 y 7

### Test 3: Filtrado de Reportes
1. Login como Paramédico con `id = 3`
2. Ir a `/reportes_prehospitalarios`
3. ✅ Verificar que solo aparecen reportes donde `control.operador` incluye 3

### Test 4: Auto-completado
1. Login como Operador
2. Crear nuevo reporte urbano
3. ✅ Verificar que "Personal a Cargo" muestra su nombre automáticamente
4. ✅ Verificar que "Turno" está pre-seleccionado

---

## Notas de Desarrollo

- El filtrado se hace principalmente en el **backend** por seguridad
- El filtrado en el **frontend** mejora la UX al evitar requests innecesarios
- Usar `useGetIdentity()` para obtener información del usuario actual
- Los filtros en `<List>` se convierten en query params en la URL
- MongoDB usa `$in` para comparar arrays de IDs

