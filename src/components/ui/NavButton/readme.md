# NavButton

## Descripción

El componente `NavButton` es un botón de navegación reutilizable que permite redirigir al usuario a diferentes rutas internas de la aplicación utilizando las herramientas de **React Router**, sin depender de `react-router-dom`.  
En lugar de un `<Link>`, este componente usa la función `useNavigate` para realizar la navegación programática cuando el usuario hace clic en el botón.

## Props

- `to` (string) → **Obligatorio**. Ruta de destino a la que se redirigirá al hacer clic.
- `label` (string) → **Obligatorio**. Texto que se muestra dentro del botón.

## Uso

```jsx
import NavButton from './NavButton';

<NavButton to="/perfil" label="Ir al Perfil" />;
```
