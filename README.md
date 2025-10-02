# 🚀 Project Manager - Angular Technical Test

**Prueba Técnica Frontend para Quasar Dynamics**

Una aplicación web completa desarrollada en Angular 20 para la gestión de proyectos, tareas y empleados, con sistema de autenticación y operaciones CRUD.

## 🔑 CREDENCIALES DE ACCESO

> **⚠️ IMPORTANTE**: Para acceder a la aplicación, utiliza estas credenciales:

| Campo | Valor |
|-------|-------|
| **Usuario** | `admin` |
| **Contraseña** | `Test1234!` |

> Estas son credenciales simuladas para la prueba técnica.

## 📋 Tabla de Contenidos

- [Credenciales de Acceso](#-credenciales-de-acceso)
- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Componentes Reutilizables](#-componentes-reutilizables)
- [Diseño Responsivo](#-diseño-responsivo)
- [Desarrollo](#-desarrollo)

## ✨ Características

- 🔐 **Sistema de Autenticación** con credenciales simuladas
- 📊 **Gestión Completa de Proyectos** con CRUD operations
- ✅ **Sistema de Tareas** con estados y asignaciones
- 👥 **Administración de Empleados** con relaciones
- 📱 **Diseño Responsivo** para mobile, tablet y desktop
- 🎨 **Componentes Reutilizables** para mejor mantenibilidad
- 🔄 **Navegación Intuitiva** entre secciones
- 💾 **Persistencia Local** con localStorage

## 🛠 Tecnologías Utilizadas

- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje de programación
- **SCSS** - Preprocesador CSS
- **Angular Signals** - Gestión de estado reactivo
- **Angular Reactive Forms** - Formularios reactivos
- **Angular Router** - Navegación
- **Angular Guards** - Protección de rutas
- **LocalStorage** - Persistencia de datos

> **📝 Nota técnica**: Se utilizó Angular 20 (versión más reciente) en lugar de Angular 17 para aprovechar las últimas características y mejoras de performance, incluyendo Angular Signals más maduros, optimizaciones del framework y mejores prácticas de desarrollo.

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/AndresLabat/project-manager.git
   cd project-manager
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**
   ```bash
   ng serve
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── auth/                    # Módulo de autenticación
│   │   └── login/
│   ├── employees/               # Gestión de empleados
│   │   ├── employee-detail/
│   │   ├── employee-edit/
│   │   ├── employee-form/
│   │   ├── employees-list/
│   │   ├── employee.model.ts
│   │   └── employees.service.ts
│   ├── projects/                # Gestión de proyectos
│   │   ├── project-detail/
│   │   ├── project-edit/
│   │   ├── project-form/
│   │   ├── projects-list/
│   │   ├── project.model.ts
│   │   └── projects.service.ts
│   ├── tasks/                   # Gestión de tareas
│   │   ├── task-detail/
│   │   ├── task-edit/
│   │   ├── task-form/
│   │   ├── tasks-list/
│   │   ├── task.model.ts
│   │   └── tasks.service.ts
│   ├── shared/                  # Componentes reutilizables
│   │   ├── back-button/
│   │   ├── button/
│   │   ├── clickable-link/
│   │   ├── detail-card/
│   │   ├── empty-state/
│   │   ├── form-input/
│   │   ├── form-select/
│   │   ├── list-card/
│   │   ├── list-header/
│   │   └── status-badge/
│   ├── styles/                  # Variables SCSS
│   │   └── _variables.scss
│   ├── validators/              # Validadores personalizados
│   │   ├── employee.validators.ts
│   │   ├── project.validators.ts
│   │   └── task.validators.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.scss
├── styles.scss
└── index.html
```

## 🎯 Funcionalidades

### 🔐 Autenticación
- **Login seguro** con credenciales simuladas
- **Protección de rutas** con Angular Guards
- **Persistencia de sesión** con localStorage
- **Logout automático** al cerrar sesión

### 📊 Gestión de Proyectos
- **Listado completo** con información detallada
- **Crear proyectos** con formularios validados
- **Editar proyectos** existentes
- **Eliminar proyectos** con confirmación
- **Vista detallada** con tareas y empleados asignados
- **Asignación de empleados** a proyectos

### ✅ Gestión de Tareas
- **Estados de tareas**: Pendiente, En Progreso, Completada
- **Prioridades**: Baja, Media, Alta
- **Asignación de empleados** a tareas
- **Fechas límite** con validación
- **Filtrado por estado** y prioridad

### 👥 Gestión de Empleados
- **Perfiles completos** con información de contacto
- **Asignación a proyectos** y tareas
- **Vista detallada** con proyectos y tareas asignadas
- **Gestión de roles** y responsabilidades

## 🧩 Componentes Reutilizables

La aplicación incluye varios componentes reutilizables que mejoran la mantenibilidad:

- **`FormInputComponent`** - Inputs con validación integrada
- **`FormSelectComponent`** - Selects y textareas reutilizables
- **`ListHeaderComponent`** - Cabeceras de listas con acciones
- **`ListCardComponent`** - Tarjetas de listado uniformes
- **`DetailCardComponent`** - Tarjetas de detalle consistentes
- **`StatusBadgeComponent`** - Badges de estado y prioridad
- **`ClickableLinkComponent`** - Enlaces navegables
- **`EmptyStateComponent`** - Estados vacíos informativos

## 📱 Diseño Responsivo

- **Mobile First** - Diseño optimizado para móviles
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Navegación adaptativa** con menú hamburguesa en móvil
- **Formularios optimizados** para diferentes pantallas

## 🛠 Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
ng serve

# Build para producción
ng build

# Build para desarrollo
ng build --configuration development

# Tests unitarios
ng test

# Linting
ng lint
```

### Estructura de Datos

#### Proyecto
```typescript
interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}
```

#### Tarea
```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedEmployeeId?: number;
  projectId: number;
  dueDate: string;
  createdAt: string;
}
```

#### Empleado
```typescript
interface Employee {
  id: number;
  fullName: string;
  email: string;
  role: string;
  assignedProjects: number[];
  assignedTasks: number[];
}
```

## 🎨 Características de Diseño

- **Paleta de colores** consistente y profesional
- **Tipografía** clara y legible
- **Espaciado** uniforme con sistema de variables SCSS
- **Animaciones** sutiles para mejor UX
- **Iconografía** coherente en toda la aplicación

## 🔧 Validaciones

- **Formularios reactivos** con validación en tiempo real
- **Validadores personalizados** para fechas y rangos
- **Mensajes de error** descriptivos y útiles
- **Validación de campos requeridos**

## 📈 Mejoras Futuras

- [ ] Integración con API REST
- [ ] Autenticación JWT
- [ ] Filtros avanzados
- [ ] Exportación de datos
- [ ] Notificaciones en tiempo real
- [ ] Dashboard con métricas

## 👨‍💻 Autor

**Andrés Labat**
- GitHub: [@AndresLabat](https://github.com/AndresLabat)
- LinkedIn: [Andrés Labat](https://linkedin.com/in/andreslabat)
- Email: andres.labat89@gmail.com

---

> **Nota**: Este proyecto fue desarrollado como prueba técnica para Quasar Dynamics, demostrando habilidades en Angular 20, TypeScript, SCSS y mejores prácticas de desarrollo frontend.

## 📄 Licencia

Este proyecto es parte de una prueba técnica y está destinado únicamente para fines de evaluación.
