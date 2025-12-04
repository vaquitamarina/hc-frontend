# 📌 Proyecto Frontend – Sistema de Gestión de Historias Clínicas

Este repositorio contiene el frontend del sistema de gestión de historias clínicas.  
Está construido con **React + Vite + JavaScript**

## ppp

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

3. **Iniciar en local**
   `npm run dev`

---

## 🛠️ Scripts disponibles

Ejecutar en el directorio del proyecto:

- `npm install` → Instala dependencias
- `npm run dev` → Inicia el servidor de desarrollo
- `npm run build` → Genera la versión optimizada para producción
- `npm run preview` → Previsualiza el build de producción

---

## 🏗️ Flujo de Trabajo con Git

El flujo de trabajo del proyecto se basa en el uso de ramas para cada nueva tarea, ya sea una funcionalidad, un componente o un arreglo. Esto nos permite trabajar de forma paralela sin interferir en el trabajo de los demás.

**Pasos:**

1.  **Crear una nueva rama**: Antes de empezar a trabajar en una tarea, crea una rama específica desde la rama principal (`main` o `develop`).

    ```bash
    git checkout -b nombre-de-la-rama
    ```

2.  **Realizar commits**: A medida que trabajas, haz `commits` en esta nueva rama para guardar tus cambios. Utiliza mensajes de `commit` descriptivos.

    ```bash
    git commit -m "add new user"
    ```

3.  **Subir la rama**: Una vez que hayas terminado la tarea, sube tu rama al repositorio remoto para que otros la puedan ver y revisar.
    ```bash
    git push origin nombre-de-la-rama
    ```

---

## 🏷️ Convención de Nombres para Ramas

Para mantener la coherencia y la claridad, usaremos una convención de nombres para las ramas. El formato es `<tipo>/<descripcion-de-la-tarea>`.

**Tipos de ramas comunes:**

- `feat`: Para una **nueva funcionalidad** o característica.
  - **Ejemplo:** `feat/add-contact-form`
- `fix`: Para una **corrección de errores** (bug fix).
  - **Ejemplo:** `fix/correct-email-validation`
- `docs`: Para cambios en la **documentación**.
  - **Ejemplo:** `docs/update-readme`
- `refactor`: Para **refactorización** de código que no cambia la funcionalidad.
  - **Ejemplo:** `refactor/improve-button-structure`
- `chore`: Para tareas de **mantenimiento** o configuración del proyecto.
  - **Ejemplo:** `chore/update-dependencies`
- `test`: Para añadir o modificar **pruebas**.
  - **Ejemplo:** `test/add-login-unit-tests`

**Consideraciones adicionales:**

- **Minúsculas**: Usa solo letras minúsculas.
- **Guiones**: Separa las palabras con guiones (`-`).
- **Sé descriptivo**: La descripción debe ser lo suficientemente clara para que, con solo leer el nombre de la rama, se entienda de qué trata la tarea.

---

## 📖 Convenciones

### **📋 Convenciones de Nomenclatura para Front-end**

Para mantener un código limpio y consistente, seguiremos las siguientes convenciones de nomenclatura para el desarrollo del front-end.

#### **1. Nomenclatura en JavaScript**

- **Variables**: Las variables se declararán utilizando **camelCase**.
  - **Ejemplo**: `vaquitaMarina`
- **Clases**: Los nombres de las clases se escribirán en **PascalCase**.
  - **Ejemplo**: `UserModel`

---

#### **2. Componentes de React**

- Los nombres de los archivos y componentes de React se escribirán en **PascalCase**.
  - **Ejemplo**: `Button.jsx`
  - **Ejemplo**: `HomePage.jsx`

---

#### **3. Clases de CSS**

- Las clases de CSS se nombrarán utilizando la metodología **BEM (Bloque, Elemento, Modificador)**.
  - **Bloque**: Representa un componente independiente.
    - **Ejemplo**: `.componente`
  - **Elemento**: Una parte del bloque.
    - **Ejemplo**: `.componente__parte`
  - **Modificador**: Una bandera para un bloque o elemento que cambia su apariencia o comportamiento.
    - **Ejemplo**: `.componente--variación`

---

#### **4. Convención de Idioma**

- Todos los nombres de variables y clases se escribirán en **inglés** para mantener una convención global y evitar ambigüedades.
  - **Ejemplo**: Usa `userModel` en lugar de `modeloDeUsuario`.

---

## Notas

- El repo tiene autoformteo y linteo ya configurado, se activa al momento de hacer algun commit
