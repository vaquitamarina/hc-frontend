# 📌 Proyecto Frontend – Sistema de Gestión de Historias Clínicas

Este repositorio contiene el frontend del sistema de gestión de historias clínicas.  
Está construido con **React + Vite + JavaScript**

---

## 🚀 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js versión 22.19.0 o superior
- npm versión 9 o superior (incluido con Node.js)
- Git

---

## 📂 Estructura del proyecto

### 📁 Descripción de carpetas y archivos

- **public/**  
  Contiene archivos estáticos que no pasan por el proceso de compilación de Vite.  
  Ejemplos: favicon, íconos, `manifest.json` (para PWA).

- **src/**  
  Carpeta principal del código fuente de la aplicación.
  - **assets/**  
    Archivos estáticos internos.  
    Ejemplo: imágenes, fuentes, estilos globales.

  - **components/**  
    Componentes reutilizables de la aplicación.  
    Ejemplo: botones, tablas, formularios, modales.

  - **pages/**  
    Vistas principales de la aplicación. Cada página suele estar asociada a una ruta.  
    Ejemplo: `Login.jsx`, `Dashboard.jsx`, `HistoriaClinica.jsx`.

  - **layouts/**  
    Plantillas que definen la estructura general de las páginas.  
    Ejemplo: layout con menú lateral, layout público, layout para el dashboard.

  - **hooks/**  
    Custom hooks de React para encapsular lógica reutilizable.  
    Ejemplo: `useAuth`, `useFetch`, `useForm`.

  - **services/**  
    Lógica para conectarse al backend (API). Aquí se manejan las peticiones con fetch o axios.  
    Ejemplo: `authService.js`, `pacienteService.js`.

  - **utils/**  
    Funciones auxiliares que se pueden usar en todo el proyecto.  
    Ejemplo: formatear fechas, validaciones.

  - **App.jsx**  
    Componente principal de la aplicación. Define las rutas y layouts.

  - **main.jsx**  
    Punto de entrada de la aplicación. Aquí se monta React en el DOM y se configuran providers globales (ejemplo: React Router, Contexts).

- **.gitignore**  
  Define qué archivos y carpetas no deben subirse al repositorio (ejemplo: `node_modules`, `.env`).

- **index.html**  
  Archivo HTML principal donde se inyecta la aplicación React.

- **package.json**  
  Define el nombre del proyecto, dependencias, scripts y configuración básica.

- **package-lock.json**  
  Guarda las versiones exactas de las dependencias instaladas para asegurar que todo el equipo use las mismas.

- **vite.config.js**  
  Configuración de Vite (alias, plugins, optimización).

---

## ⚡ Instalación y uso

1. **Clonar el repositorio**  
   `git clone <url-del-repo>`  
   `cd hc-frontend`

2. **Instalar dependencias**  
   `npm install`

---

## 🛠️ Scripts disponibles

Ejecutar en el directorio del proyecto:

- `npm install` → Instala dependencias
- `npm run dev` → Inicia el servidor de desarrollo
- `npm run build` → Genera la versión optimizada para producción
- `npm run preview` → Previsualiza el build de producción

---

## 📌 Flujo de Git: Ship / Show / Ask

Usaremos la metodología **Ship/Show/Ask** para gestionar commits:

### 🔹 Ship

- Para cambios pequeños, simples y sin riesgo.
- Se comitea directamente en la rama `main`.

**Ejemplo:**
[SHIP]: fix typo in login validation

### 🔹 Show

- Para cambios medianos que pueden necesitar revisión ligera.
- Se trabaja en una rama nueva y se comparte con el equipo para feedback.

**Ejemplo:**
[SHOW]: add user profile card component

### 🔹 Ask

- Para cambios grandes, con riesgo o que afectan partes críticas.
- Se debe abrir un Pull Request y solicitar revisión antes de fusionar.

**Ejemplo:**
[ASK]: refactor authentication flow

---

## 📖 Convenciones

- Código en **JavaScript**
- Componentes en **PascalCase** (ejemplo: `Button.tsx`, `PacienteCard.tsx`)
- Hooks y funciones en **camelCase** (ejemplo: `useAuth.ts`, `formatDate.ts`)
