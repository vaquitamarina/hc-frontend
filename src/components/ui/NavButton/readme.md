# NavButton

## Descripción

El componente `NavButton` es un botón de navegación reutilizable que permite redirigir al usuario a diferentes rutas internas de la aplicación utilizando las herramientas de **React Router**.  
En lugar de un `<Link>`, este componente usa la función `useNavigate` para realizar la navegación programática cuando el usuario hace clic en el botón.

## Props

| Prop       | Tipo            | Requerido | Descripción                                                       |
| ---------- | --------------- | --------- | ----------------------------------------------------------------- |
| `to`       | string          | ✅        | Ruta de destino a la que se redirigirá al hacer clic.             |
| `children` | React.ReactNode | ✅        | Contenido que se mostrará dentro del botón (texto, iconos, etc.). |

## Uso

```jsx
import NavButton from './NavButton';

// Con texto simple
<NavButton to="/perfil">Ir al Perfil</NavButton>

// Con contenido más complejo
<NavButton to="/dashboard">
  <span>📊 Dashboard</span>
</NavButton>
```
