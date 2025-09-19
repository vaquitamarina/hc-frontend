# Button

## Descripción

El componente `Button` es un botón reutilizable que permite aplicar diferentes estilos visuales según su variante, controlar su estado de deshabilitado y ejecutar funciones al hacer clic. Es ideal para interfaces que requieren consistencia visual y funcionalidad dinámica.

## Props

- `variant` (string) → Define el estilo visual del botón. Puede ser `"primary"`, `"secondary"` o `"danger"`. Por defecto es `"primary"`.
- `onClick` (function) → Función que se ejecuta cuando el usuario hace clic en el botón.
- `disabled` (boolean) → Si es `true`, el botón se muestra deshabilitado y no responde al clic. Por defecto es `false`.
- `children` (ReactNode) → Contenido que se muestra dentro del botón. Usualmente texto, pero puede incluir íconos u otros elementos.

## Uso

```jsx
import Button from './Button';

<Button
  variant="danger"
  onClick={() => alert('Acción peligrosa')}
  disabled={false}
>
  Eliminar
</Button>;
```
