# PatientCard

## Descripción

El componente **PatientCard** representa una tarjeta de paciente que muestra su avatar, nombre y fecha asociada. Puede mostrarse en diferentes estilos según el tipo definido (`default` o `soft`).

## Props

- `name` (string, obligatorio) → Nombre del paciente que se mostrará en la tarjeta.
- `img` (string, obligatorio) → URL de la imagen o avatar del paciente.
- `date` (string, obligatorio) → Fecha asociada al paciente (ej. última cita).
- `type` (string, opcional) → Estilo de la tarjeta. Valores posibles: `'default'` o `'soft'`. Por defecto es `'default'`.

## Uso

```jsx
import PatientCard from './PatientCard';

<PatientCard
  name="Juan Perez"
  img="https://example.com/avatar.jpg"
  date="20/09/2025"
  type="soft"
/>;
```
