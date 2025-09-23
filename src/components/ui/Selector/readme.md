# Selector

## Descripción

El componente `Selector` es un desplegable reutilizable que permite al usuario seleccionar una opción de una lista.  
Soporta tanto arreglos simples de strings como objetos con la forma `{ label, value }`, ofreciendo flexibilidad para distintos escenarios.  
Incluye opciones de personalización mediante clases adicionales, soporte de valor por defecto y la posibilidad de deshabilitarlo.

Es ideal para formularios o interfaces que requieran seleccionar un valor de múltiples opciones de manera clara e interactiva.

---

## Props

- `options` (array, **requerido**) → Lista de opciones en formato:
  - Array de strings: `["Opción A", "Opción B"]`
  - Array de objetos: `[{ label: "Opción A", value: "a" }]`

- `onChange` (function, **requerido**) → Función callback que se ejecuta al seleccionar una opción, recibiendo el valor elegido.

- `defaultValue` (string | number, opcional) → Valor inicial que se muestra como seleccionado.

- `disabled` (boolean, opcional) → Si es `true`, el selector se muestra deshabilitado y no permite interacción.  
  Por defecto es `false`.

- `className` (string, opcional) → Clases adicionales para personalizar estilos.

---

## Funcionalidad básica

- Muestra todas las opciones recibidas en `options`.
- Permite seleccionar **una sola opción**.
- Al cambiar de opción, ejecuta `onChange` con el valor elegido.
- Destaca la opción seleccionada como activa.
- Puede estar deshabilitado mediante la prop `disabled`.

---

## Uso

```jsx
import Selector from './Selector';

const opciones = [
  { label: 'Opción A', value: 'a' },
  { label: 'Opción B', value: 'b' },
  { label: 'Opción C', value: 'c' },
];

function App() {
  return (
    <div>
      <h2>Ejemplo de uso del Selector</h2>
      <Selector
        options={opciones}
        defaultValue="b"
        onChange={(valor) => console.log('Seleccionado:', valor)}
      />
    </div>
  );
}
```
