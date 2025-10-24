# Documentación del Frontend - React Admin

Esta documentación describe la arquitectura, componentes y funcionamiento del frontend del proyecto CPP.

## 🎨 Tecnologías Utilizadas

- **React** 19.0.0 - Biblioteca de UI
- **React Admin** 5.11.0 - Framework de administración
- **Material-UI (MUI)** 7.0.1 - Componentes de diseño
- **TypeScript** 5.1.6 - Tipado estático
- **Vite** 6.2.6 - Build tool y dev server
- **React Router** 7.1.3 - Enrutamiento
- **Leaflet** 1.9.4 - Mapas interactivos
- **Recharts** 3.3.0 - Gráficas y visualización

---

## 📁 Estructura de Carpetas

```
frontend/
├── public/               # Archivos estáticos
│   ├── alcaldiasCDMX.geojson  # Mapa de alcaldías
│   ├── manifest.json
│   └── img/
├── src/
│   ├── App.tsx          # Componente principal
│   ├── index.tsx        # Punto de entrada
│   ├── Dashboard.tsx    # Panel principal
│   ├── MyLayout.tsx     # Layout personalizado
│   ├── Layout.tsx       # Layout base
│   ├── theme.ts         # Tema personalizado
│   ├── dataProvider.ts  # Proveedor de datos (API)
│   ├── authProvider.tsx # Proveedor de autenticación
│   ├── i18nProvider.ts  # Internacionalización
│   ├── spanishMessages.ts # Mensajes en español
│   │
│   ├── custom_layout/   # Layout personalizado
│   │   ├── CustomAppBar.tsx
│   │   └── CustomLayout.tsx
│   │
│   ├── login/           # Módulo de login
│   │   └── LoginPage.tsx
│   │
│   ├── usuarios/        # Módulo de usuarios
│   │   ├── usuarios.tsx
│   │   ├── roles.tsx
│   │   ├── turnos.tsx
│   │   ├── perfil.tsx
│   │   ├── registrarse.tsx
│   │   ├── PermisosInput.tsx
│   │   └── choices.ts
│   │
│   ├── reportes/        # Módulo de reportes
│   │   ├── componentes/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── reporte_urbano/
│   │   │   ├── reportes_urbanos.tsx
│   │   │   ├── hooks/
│   │   │   ├── metodos/
│   │   │   └── misc/
│   │   └── reporte_prehospitalario/
│   │       ├── reportes_prehospitalarios.tsx
│   │       ├── hooks/
│   │       ├── metodos/
│   │       └── misc/
│   │
│   ├── estadisticas/    # Módulo de estadísticas
│   │   ├── Estadisticas.tsx
│   │   ├── RankingEmergencias.tsx
│   │   ├── ReportesTotales.tsx
│   │   └── TiempoRespuesta.tsx
│   │
│   ├── leaflet/         # Componentes de mapas
│   │   ├── ClusteredMap.tsx
│   │   ├── ClusteredMapWrapper.tsx
│   │   ├── SingleMarkerMap.tsx
│   │   ├── AlcaldiasLayer.tsx
│   │   ├── MakeClusterGroup.ts
│   │   └── styles.css
│   │
│   └── styles/          # Estilos CSS
│       ├── acc.css
│       ├── dash.css
│       ├── sidebar.css
│       └── sidexd.css
```

---

## 🚀 Componente Principal: App.tsx

El componente `App` es el punto de entrada de la aplicación React Admin.

### Configuración Principal

```tsx
<Admin 
  dataProvider={dataProvider}
  authProvider={authProvider}
  i18nProvider={i18nProvider}
  dashboard={Dashboard}
  layout={CustomLayout}
  loginPage={LoginPage}
  theme={customTheme}
>
  {/* Recursos y rutas */}
</Admin>
```

### Recursos Disponibles

- **usuarios** - Gestión de usuarios
- **roles** - Gestión de roles y permisos
- **turnos** - Gestión de turnos de trabajo
- **reportes_urbanos** - Reportes de servicio urbano
- **reportes_prehospitalarios** - Reportes de servicio prehospitalario

---

## 🔐 Autenticación: authProvider.tsx

Maneja la autenticación mediante JWT.

### Métodos Principales

#### `login(params)`
Autentica al usuario y almacena el token.

```typescript
login: async ({ username, password }) => {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({ email: username, password }),
    headers: { 'Content-Type': 'application/json' }
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data));
  return Promise.resolve();
}
```

#### `checkAuth()`
Verifica si el usuario está autenticado.

```typescript
checkAuth: () => {
  return localStorage.getItem('token') 
    ? Promise.resolve() 
    : Promise.reject();
}
```

#### `logout()`
Cierra sesión y limpia el localStorage.

#### `checkError(error)`
Maneja errores de autenticación (401, 403).

#### `getIdentity()`
Obtiene información del usuario actual.

#### `getPermissions()`
Obtiene los permisos del usuario para control de acceso.

---

## 📊 Proveedor de Datos: dataProvider.ts

Conecta React Admin con el API REST del backend.

### Configuración

```typescript
export const dataProvider = jsonServerProvider(
  "http://localhost:3000",
  httpClient
);
```

### HTTP Client Personalizado

Agrega el token JWT a todas las peticiones:

```typescript
const httpClient = (url, options = {}) => {
  const token = localStorage.getItem('token');
  const customHeaders = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };
  return fetchUtils.fetchJson(url, { ...options, headers: customHeaders });
};
```

### Métodos Soportados

- `getList` - Obtener lista de recursos
- `getOne` - Obtener un recurso
- `create` - Crear un recurso
- `update` - Actualizar un recurso
- `delete` - Eliminar un recurso
- `getMany` - Obtener múltiples recursos por ID

---

## 🎨 Tema Personalizado: theme.ts

Define la apariencia visual de la aplicación.

### Características

```typescript
const customTheme = {
  ...defaultTheme,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'url(/img/r.jpg)',
          backgroundSize: 'cover',
          backdropFilter: 'blur(5px)',
        }
      }
    }
  }
};
```

---

## 👥 Módulo: Usuarios

### Componentes Principales

#### `UsuarioList` - Lista de usuarios
Muestra todos los usuarios del sistema en formato de tabla/datagrid.

**Campos mostrados:**
- ID
- Nombre completo
- Email
- Rol
- Turno

#### `UsuarioShow` - Detalle de usuario
Vista detallada de un usuario específico.

#### `UsuarioCreate` - Crear usuario
Formulario para crear nuevos usuarios.

**Campos:**
- Nombre
- Apellido
- Usuario
- Email
- Contraseña
- Rol (selección)
- Turno (selección)
- Tipo de servicio (opcional)
- Operadores asignados (opcional)

#### `UsuarioEdit` - Editar usuario
Formulario para editar usuarios existentes.

### Componentes Adicionales

- **`Perfil.tsx`** - Página de perfil del usuario actual
- **`PermisosInput.tsx`** - Input personalizado para gestionar permisos
- **`registrarse.tsx`** - Página de registro de nuevos usuarios

---

## 🎭 Módulo: Roles

Gestión de roles y permisos del sistema.

### Estructura de Permisos

```typescript
{
  resource: string,  // Recurso (ej: "usuarios", "reportes_urbanos")
  action: string     // Acción (ej: "list", "show", "create", "edit", "delete")
}
```

### Componentes

- `RolList` - Lista de roles
- `RolShow` - Detalle de rol
- `RolCreate` - Crear rol
- `RolEdit` - Editar rol

---

## ⏰ Módulo: Turnos

Gestión de turnos de trabajo.

### Componentes

- `TurnoList` - Lista de turnos
- `TurnoShow` - Detalle de turno
- `TurnoCreate` - Crear turno
- `TurnoEdit` - Editar turno

### Campos

- Nombre del turno
- Hora de inicio
- Hora de fin

---

## 🏙️ Módulo: Reportes Urbanos

Gestión de reportes de servicios urbanos.

### Archivo Principal

`src/reportes/reporte_urbano/reportes_urbanos.tsx`

### Componentes

#### `ReporteUrbanoList`
Lista de reportes urbanos con:
- Filtros por fecha, turno, tipo de servicio
- Vista de tabla con datos principales
- Paginación

#### `ReporteUrbanoShow`
Vista detallada del reporte con:
- Datos generales
- Personal y activación
- Acciones realizadas
- Mapa con ubicación
- Fotos y documentos adjuntos

#### `ReporteUrbanoCreate`
Formulario dividido en secciones:
1. **Datos Generales**
   - Turno
   - Folio
   - Fecha y hora

2. **Personal y Activación**
   - Personal a cargo (multi-select)
   - Modo de activación
   - Tipo y subtipo de servicio

3. **Acciones Realizadas**
   - Observaciones (con fotos)
   - Trabajos realizados
   - Recursos empleados
   - Resultado

4. **Coordenadas y Mapa**
   - Mapa interactivo
   - Latitud y longitud
   - Dirección
   - Alcaldía y colonia

#### `ReporteUrbanoEdit`
Similar a Create pero para edición.

### Hooks Personalizados

- `useAutoAssignUser` - Asigna automáticamente el usuario actual al reporte

### Componentes Reutilizables

- `CoordenadasYMapa` - Selector de coordenadas con mapa
- `PersonalACargo` - Selector de personal
- `TurnoInput` - Selector de turno

---

## 🚑 Módulo: Reportes Prehospitalarios

Gestión de reportes médicos prehospitalarios.

### Archivo Principal

`src/reportes/reporte_prehospitalario/reportes_prehospitalarios.tsx`

### Componentes

Similar a reportes urbanos pero con estructura específica para reportes médicos:

1. **Control**
   - Operador (paramédico)
   - Folio
   - Fecha y hora

2. **Datos Generales**
   - Turno
   - Lugar de ocurrencia
   - Tipo de servicio
   - Dirección

3. **Paciente**
   - Nombre completo
   - Edad y sexo
   - Teléfono
   - Derechohabiencia

4. **Evaluación**
   - Agente causal
   - Origen probable
   - Signos vitales:
     - Presión arterial
     - Frecuencia cardíaca
     - Frecuencia respiratoria
     - Temperatura
     - Saturación de oxígeno
   - Escala de Glasgow
   - Observaciones

5. **Traslado**
   - Institución de destino
   - Hora de salida y llegada
   - Médico receptor

6. **Coordenadas**
   - Mapa interactivo
   - Ubicación del incidente

### Componentes Específicos

- `OperadorPrehospitalario` - Selector de paramédico operador

---

## 📊 Módulo: Estadísticas

Dashboard con visualización de datos y métricas.

### Archivo Principal

`src/estadisticas/Estadisticas.tsx`

### Componentes

#### `Estadisticas`
Componente principal que agrupa todas las estadísticas.

#### `ReportesTotales`
Muestra el total de reportes:
- Reportes urbanos
- Reportes prehospitalarios
- Gráfica de tendencias

#### `RankingEmergencias`
Ranking de tipos de emergencias más comunes.

#### `TiempoRespuesta`
Análisis de tiempos de respuesta:
- Tiempo promedio
- Gráficas por periodo
- Comparativas por turno

### Visualización

Utiliza **Recharts** para gráficas:
- `BarChart` - Gráficas de barras
- `LineChart` - Gráficas de líneas
- `PieChart` - Gráficas circulares
- `AreaChart` - Gráficas de área

---

## 🗺️ Módulo: Mapas (Leaflet)

Componentes para visualización y selección de ubicaciones.

### Componentes Principales

#### `SingleMarkerMap`
Mapa con un único marcador movible.

**Props:**
```typescript
{
  latitud: number,
  longitud: number,
  onCoordsChange: (lat: number, lng: number) => void
}
```

**Uso:**
```tsx
<SingleMarkerMap 
  latitud={19.432608}
  longitud={-99.133209}
  onCoordsChange={(lat, lng) => {
    setLatitud(lat);
    setLongitud(lng);
  }}
/>
```

#### `ClusteredMap`
Mapa con múltiples marcadores agrupados (clusters).

**Props:**
```typescript
{
  reportes: Array<{
    id: number,
    coordenadas: { latitud: number, longitud: number },
    // otros campos del reporte
  }>
}
```

**Características:**
- Agrupa marcadores cercanos
- Click en cluster para hacer zoom
- Click en marcador para ver detalle

#### `AlcaldiasLayer`
Capa de polígonos con las alcaldías de la CDMX.

**Fuente de datos:** `public/alcaldiasCDMX.geojson`

#### `MakeClusterGroup.ts`
Función auxiliar para crear grupos de clusters personalizados.

### Estilos

`src/leaflet/styles.css` - Estilos CSS para los mapas Leaflet.

---

## 🎯 Dashboard

Página principal después del login.

### Archivo: `Dashboard.tsx`

### Secciones

1. **Resumen de estadísticas**
   - Total de reportes del día
   - Reportes pendientes
   - Servicios activos

2. **Mapa general**
   - Todos los reportes activos
   - Clusters por zona

3. **Reportes recientes**
   - Lista de últimos reportes
   - Links rápidos

4. **Accesos rápidos**
   - Crear nuevo reporte
   - Ver estadísticas
   - Gestión de usuarios

---

## 🎨 Layout Personalizado

### CustomLayout

Archivo: `src/custom_layout/CustomLayout.tsx`

**Componentes:**
- `CustomAppBar` - Barra de aplicación personalizada
- Sidebar con menú de navegación
- Contenido principal

### CustomAppBar

Archivo: `src/custom_layout/CustomAppBar.tsx`

**Características:**
- Logo del proyecto
- Nombre del usuario
- Menú de perfil
- Botón de logout
- Notificaciones (opcional)

---

## 🌐 Internacionalización

### i18nProvider

Archivo: `src/i18nProvider.ts`

Configura el idioma de la aplicación.

### spanishMessages

Archivo: `src/spanishMessages.ts`

Traducciones al español de todos los mensajes de React Admin.

**Ejemplo:**
```typescript
const spanishMessages = {
  ra: {
    action: {
      save: 'Guardar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      // ...
    },
    // ...
  }
};
```

---

## 🔧 Hooks Personalizados

### useAutoAssignUser

Archivo: `src/reportes/hooks/useAutoAssignUser.ts`

Asigna automáticamente el usuario actual al crear un reporte.

**Uso:**
```typescript
const FormComponent = () => {
  useAutoAssignUser('personal_a_cargo');
  // ...
};
```

---

## 🎨 Estilos CSS

### Archivos de Estilos

1. **`acc.css`** - Estilos de accesibilidad
2. **`dash.css`** - Estilos del dashboard
3. **`sidebar.css`** - Estilos del menú lateral
4. **`sidexd.css`** - Estilos adicionales del sidebar

### Convenciones

- Uso de clases CSS descriptivas
- Prefijos para componentes específicos
- Variables CSS para colores y tamaños consistentes

---

## 🔒 Control de Permisos

### Verificación en Componentes

React Admin permite ocultar/mostrar componentes según permisos:

```tsx
<Resource
  name="usuarios"
  list={UsuarioList}
  show={UsuarioShow}
  create={UsuarioCreate}
  edit={UsuarioEdit}
  options={{ 
    label: 'Usuarios',
    permissions: ['usuarios.list'] 
  }}
/>
```

### Hook usePermissions

```typescript
const { permissions } = usePermissions();

if (permissions?.includes('usuarios.create')) {
  // Mostrar botón de crear
}
```

---

## 📱 Responsive Design

La aplicación es responsive y se adapta a:
- 🖥️ Desktop (1920px+)
- 💻 Laptop (1366px - 1920px)
- 📱 Tablet (768px - 1366px)
- 📱 Mobile (< 768px)

### Breakpoints de Material-UI

```typescript
theme.breakpoints.values = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}
```

---

## 🚀 Scripts de Desarrollo

### Comandos Disponibles

```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "vite build",            // Build de producción
  "serve": "vite preview",          // Preview del build
  "type-check": "tsc --noEmit",     // Verificar tipos
  "lint": "eslint --fix",           // Linter
  "format": "prettier --write"      // Formatear código
}
```

### Ejecutar en Desarrollo

```powershell
cd frontend
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 🏗️ Build de Producción

### Generar Build

```powershell
cd frontend
npm run build
```

Los archivos se generan en la carpeta `dist/`.

### Optimizaciones

- Minificación de JS y CSS
- Tree-shaking
- Code splitting
- Lazy loading de componentes
- Compresión de assets

---

## 🧪 Testing (Recomendado)

Aunque no está implementado, se recomienda agregar:

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "vitest": "^1.0.0"
  }
}
```

---

## 🎯 Mejores Prácticas

### Organización de Código

1. **Componentes reutilizables** en carpetas compartidas
2. **Hooks personalizados** en carpeta `hooks/`
3. **Tipos TypeScript** en archivos `.d.ts`
4. **Constantes** en archivos `choices.ts` o `constants.ts`

### Performance

1. Usar `React.memo()` para componentes pesados
2. Lazy loading de rutas: `React.lazy()`
3. Debounce en búsquedas y filtros
4. Paginación en listas grandes

### Seguridad

1. Validación de inputs del usuario
2. Sanitización de datos antes de mostrar
3. Control de permisos en cada vista
4. Renovación automática de tokens

---

## 🐛 Debugging

### React DevTools

Instalar extensión de React DevTools para Chrome/Firefox.

### Logs

```typescript
// En desarrollo
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

### Vite Debug

```powershell
npm run dev -- --debug
```

---

## 📚 Recursos Adicionales

- [React Admin Documentation](https://marmelab.com/react-admin/)
- [Material-UI Documentation](https://mui.com/)
- [Leaflet Documentation](https://leafletjs.com/)
- [Recharts Documentation](https://recharts.org/)
- [Vite Documentation](https://vitejs.dev/)

---

**Última actualización:** Octubre 2025
