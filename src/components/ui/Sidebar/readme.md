# Sidebar

## 📋 Descripción

El componente **`Sidebar`** es una barra lateral de navegación reutilizable para aplicaciones React.  
Permite mostrar un título y una lista de secciones que redirigen a diferentes rutas de la aplicación.  
El diseño mantiene una paleta azul con texto blanco y resalta la sección activa con fondo blanco y texto azul.

## ⚙️ Props

| Prop    | Tipo     | Requerido | Descripción                                                                                             |
| ------- | -------- | --------- | ------------------------------------------------------------------------------------------------------- |
| `title` | `string` | ✅        | Título que se muestra en la parte superior de la barra lateral.                                         |
| `items` | `array`  | ✅        | Lista de objetos con la forma `{ label, path }` que define el texto del enlace y la ruta de navegación. |

Cada objeto dentro de `items` debe incluir:

- **label**: Texto visible en el enlace.
- **path**: Ruta de la aplicación a la que redirige.

## 🎨 Estilos

El componente utiliza **variables globales CSS** (`:root`) para mantener la consistencia de colores y sombras:

- **Color primario:** `var(--color-primary)` → Fondo azul.
- **Color primario suave:** `var(--color-primary-soft)` → Hover de los enlaces.
- **Color blanco:** `var(--color-white)` → Texto y fondo del enlace activo.

### Comportamiento visual

- **Estado normal:** Fondo azul (`var(--color-primary)`), texto blanco.
- **Hover:** Cambio sutil a `var(--color-primary-soft)` (excepto en el enlace activo).
- **Activo:** Fondo blanco y texto azul para destacar la página actual.

## 🚀 Uso

```jsx
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <Sidebar
      title="Adulto"
      items={[
        { label: 'Anamnesis', path: '/adulto/anamnesis' },
        { label: 'Examen Físico', path: '/adulto/examen-fisico' },
        {
          label: 'Diagnóstico Definitivo',
          path: '/adulto/diagnostico-definitivo',
        },
      ]}
    />
  );
}

export default AppLayout;
```
