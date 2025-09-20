# TextInput

## Descripción

El componente `TextInput` renderiza un campo de texto con una etiqueta, estilos consistentes y manejo de mensajes de error. Se utiliza para capturar información de entrada en formularios.

## Props

- `label` (string, requerido) → Texto de la etiqueta asociada al input.
- `placeholder` (string) → Texto que se muestra dentro del input como sugerencia.
- `value` (string, requerido) → Valor actual del input.
- `onChange` (func, requerido) → Función que se ejecuta cada vez que cambia el valor del input.
- `error` (string) → Mensaje de error a mostrar debajo del campo (opcional).
- `id` (string, requerido) → Identificador único para el input.

## Uso

```jsx
import TextInput from './TextInput';

function App() {
  return (
    <TextInput
      id="nombre"
      label="Nombre"
      placeholder="Escribe tu nombre"
      value=""
      onChange={() => {}}
      error=""
    />
  );
}
```
