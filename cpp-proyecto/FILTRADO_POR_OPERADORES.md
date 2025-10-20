# 🎯 Sistema de Filtrado por Operadores/Paramédicos

## ✅ Implementación Completa

### 1. **Frontend - Auto-asignación del usuario**

Creados dos componentes que automáticamente asignan al usuario actual cuando crea un reporte:

#### `PersonalACargo.tsx` (Reportes Urbanos)
- **Operadores (rol_id = 4)**: Se auto-asignan automáticamente
- **Otros roles**: Pueden seleccionar manualmente

#### `OperadorPrehospitalario.tsx` (Reportes Prehospitalarios)  
- **Paramédicos (rol_id = 3)**: Se auto-asignan automáticamente
- **Otros roles**: Pueden seleccionar manualmente

### 2. **Backend - Filtrado Inteligente**

#### Para Reportes Urbanos (`/reportes_urbanos`):
```javascript
// Jefe de Turno (rol_id = 2) con tipo_servicio = 'urbano'
// → Ve reportes donde personal_a_cargo incluya algún ID de su operadores_id[]

// Operador (rol_id = 4)
// → Ve solo sus propios reportes (donde personal_a_cargo = su ID)

// Admin (rol_id = 1)
// → Ve todos los reportes
```

#### Para Reportes Prehospitalarios (`/reportes_prehospitalarios`):
```javascript
// Jefe de Turno (rol_id = 2) con tipo_servicio = 'prehospitalario'
// → Ve reportes donde control.operador incluya algún ID de su operadores_id[]

// Paramédico (rol_id = 3)
// → Ve solo sus propios reportes (donde control.operador = su ID)

// Admin (rol_id = 1)
// → Ve todos los reportes
```

#### Para Usuarios (`/usuarios`):
```javascript
// Jefe de Turno (rol_id = 2)
// → Ve solo: él mismo + sus operadores/paramédicos asignados (operadores_id[])

// Admin (rol_id = 1)
// → Ve todos los usuarios
```

## 📊 Estructura de Datos

### Usuario (Jefe de Turno):
```json
{
  "id": 5,
  "nombre": "Juan",
  "email": "jefe@ejemplo.com",
  "rol_id": 2,
  "turno_id": 1,
  "tipo_servicio": "urbano",
  "operadores_id": [6, 7, 8]
}
```

### Reporte Urbano:
```json
{
  "personal_y_activacion": {
    "personal_a_cargo": [6, 7],  // IDs de operadores
    "modo_activacion": "...",
    "tipo_servicio": "..."
  }
}
```

### Reporte Prehospitalario:
```json
{
  "control": {
    "operador": [10, 11],  // IDs de paramédicos
    "ambulancia_numero": "...",
    "tum": "..."
  }
}
```

## 🔄 Flujo de Trabajo

### Escenario 1: Operador crea reporte urbano
1. Operador ID=6 hace login
2. Va a "Crear Reporte Urbano"
3. **Automáticamente** `personal_a_cargo = [6]`
4. Completa el formulario y guarda
5. El reporte queda guardado con su ID

### Escenario 2: Jefe de Turno revisa reportes
1. Jefe ID=5 con `operadores_id: [6, 7, 8]` hace login
2. Va a "Reportes Urbanos"
3. Backend filtra: `WHERE personal_a_cargo IN [6, 7, 8]`
4. **Solo ve reportes creados por sus 3 operadores**

### Escenario 3: Operador ve sus reportes
1. Operador ID=6 hace login
2. Va a "Reportes Urbanos"  
3. Backend filtra: `WHERE personal_a_cargo = 6`
4. **Solo ve sus propios reportes**

### Escenario 4: Admin ve todo
1. Admin ID=1 hace login
2. Va a "Reportes Urbanos"
3. Backend **NO aplica filtros**
4. **Ve todos los reportes del sistema**

## 🎨 Experiencia de Usuario

### Para Operador/Paramédico:
- ✅ Formulario simplificado
- ✅ No necesita seleccionar "Personal a cargo"
- ✅ Mensaje informativo: "Personal a cargo: Juan Pérez (Tú)"
- ✅ Solo ve sus propios reportes

### Para Jefe de Turno:
- ✅ Ve lista filtrada de sus operadores
- ✅ Ve reportes solo de su equipo
- ✅ No ve operadores de otros jefes
- ✅ Dashboard con estadísticas de su equipo

### Para Administrador:
- ✅ Selector manual de personal
- ✅ Ve todos los usuarios
- ✅ Ve todos los reportes
- ✅ Control total del sistema

## 📋 Configuración Requerida

### 1. Asignar operadores a Jefes de Turno

```javascript
// Actualizar jefe de turno con sus operadores
db.usuarios.updateOne(
  { "id": 5 }, // ID del jefe
  { 
    $set: { 
      "tipo_servicio": "urbano",
      "operadores_id": [6, 7, 8] // IDs de sus operadores
    } 
  }
)
```

### 2. Verificar estructura de reportes

Los reportes ya existentes deben tener el formato correcto:

**Reportes Urbanos:**
```javascript
{
  "personal_y_activacion": {
    "personal_a_cargo": [6, 7]  // Array de IDs
  }
}
```

**Reportes Prehospitalarios:**
```javascript
{
  "control": {
    "operador": [10, 11]  // Array de IDs
  }
}
```

## 🚀 Pasos para Probar

1. **Actualiza los permisos** (del archivo PERMISOS_FINALES.md)
2. **Asigna operadores a cada Jefe**:
   ```javascript
   db.usuarios.find({ rol_id: 2 }).forEach(jefe => {
     // Encontrar operadores del mismo turno y tipo
     let operadores = db.usuarios.find({ 
       rol_id: jefe.tipo_servicio === 'urbano' ? 4 : 3,
       turno_id: jefe.turno_id 
     }).toArray();
     
     // Asignar IDs al jefe
     db.usuarios.updateOne(
       { _id: jefe._id },
       { $set: { operadores_id: operadores.map(o => o.id) } }
     );
   });
   ```

3. **Reinicia backend y frontend**

4. **Prueba cada rol**:
   - ✅ Como **Operador**: Crea reporte → Verifica auto-asignación → Ve solo tus reportes
   - ✅ Como **Jefe**: Ve lista de operadores → Ve reportes filtrados → No ves otros equipos
   - ✅ Como **Admin**: Ve todos los usuarios → Ve todos los reportes

## 🐛 Troubleshooting

### "El jefe no ve a sus operadores"
**Causa**: Campo `operadores_id` vacío o incorrecto
**Solución**: 
```javascript
db.usuarios.findOne({ id: JEFE_ID })
// Verificar que tenga operadores_id: [...]
```

### "El operador ve reportes de otros"
**Causa**: Filtro incorrecto en backend
**Solución**: Verifica que el endpoint use `personal_a_cargo: usuario.id`

### "El reporte no muestra el operador"
**Causa**: Campo `personal_a_cargo` guardado incorrectamente
**Solución**: Verificar que el componente `PersonalACargo` esté importado y usado

### "Error al crear reporte"
**Causa**: El componente intenta guardar antes de asignar el usuario
**Solución**: El `useEffect` se ejecuta automáticamente, espera 1 segundo antes de enviar

## 📊 Resumen Final

| Rol | Usuarios Visibles | Reportes Visibles | Auto-asignación |
|-----|------------------|-------------------|-----------------|
| **Admin** | Todos | Todos | ❌ Selección manual |
| **Jefe (urbano)** | Su equipo | Reportes de su equipo | ❌ Selección manual |
| **Jefe (prehospital)** | Su equipo | Reportes de su equipo | ❌ Selección manual |
| **Operador** | N/A | Solo los suyos | ✅ Automático |
| **Paramédico** | N/A | Solo los suyos | ✅ Automático |

## ✨ Beneficios

1. **Seguridad**: Cada usuario solo ve lo que le corresponde
2. **Simplicidad**: Operadores no necesitan seleccionar nada
3. **Trazabilidad**: Cada reporte tiene autor identificado
4. **Escalabilidad**: Fácil agregar más jefes y equipos
5. **Auditoría**: Se sabe quién creó cada reporte
