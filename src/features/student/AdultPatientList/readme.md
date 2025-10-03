# AdultPatientsList

Componente para listar pacientes adultos de un estudiante.

## Uso

```jsx
import AdultPatientsList from '@components/AdultPatientsList/AdultPatientsList';

function MyComponent() {
  const studentId = '123';

  return <AdultPatientsList studentId={studentId} />;
}
```

## Props

| Prop        | Tipo     | Requerido | Descripción                                          |
| ----------- | -------- | --------- | ---------------------------------------------------- |
| `studentId` | `string` | Sí        | ID del estudiante para obtener sus pacientes adultos |

## Estados

El componente maneja automáticamente tres estados:

- **Cargando**: Muestra "Cargando pacientes..."
- **Error**: Muestra mensaje de error si falla la petición
- **Sin datos**: Muestra "No hay pacientes disponibles"
- **Con datos**: Renderiza la lista de pacientes usando `PatientCard`

## Funcionamiento

1. Consume el hook `usePatients(studentId)` para obtener los datos
2. Utiliza React Query para el manejo del estado de carga y errores
3. Formatea las fechas de formato ISO a `dd/mm/yyyy`
4. Renderiza cada paciente usando el componente `PatientCard`

## Dependencias

- `usePatients` hook
- `PatientCard` component
- `@tanstack/react-query`
