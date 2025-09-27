# Sidebar

## Descripción

El componente `Sidebar` es un menú lateral reutilizable que permite mostrar un conjunto de enlaces de navegación en forma de lista vertical.  
Su objetivo es proporcionar una navegación clara y accesible dentro de la aplicación, utilizando las herramientas de **React Router** para manejar las rutas internas.

Cada elemento del menú se define dinámicamente a partir de un arreglo de objetos, lo que hace que el componente sea fácil de extender y mantener. Internamente utiliza el componente `NavButton` para renderizar cada enlace de navegación.

## Props

| Prop    | Tipo          | Requerido | Descripción                                                                                                                |
| ------- | ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `title` | string        | ✅        | Título que se mostrará en la parte superior de la barra lateral.                                                           |
| `items` | Array<Object> | ✅        | Lista de objetos que representan cada enlace del menú. Cada objeto debe tener la forma: `{ path: string, label: string }`. |

### Estructura del objeto `items`

```javascript
{
  path: string,  // Ruta de destino para la navegación
  label: string  // Texto que se mostrará en el botón de navegación
}
```

## Uso

```jsx
import Sidebar from '@/components/ui/Sidebar/Sidebar';

const menuItems = [
  { path: '/inicio', label: 'Inicio' },
  { path: '/perfil', label: 'Perfil' },
  { path: '/configuracion', label: 'Configuración' },
];

function Example() {
  return <Sidebar title="Menú Principal" items={menuItems} />;
}
```
