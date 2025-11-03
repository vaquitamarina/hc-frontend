import { useFiliation } from '@hooks/usePatients';
import { useForm } from '@stores/useForm';
import FormField from '@ui/FormField/FormField';
import Button from '@ui/Button';
import { usePatientByHistory } from '@hooks/useHistoria';
import { useParams } from 'react-router';
import './Filiacion.css';

export function Filiation() {
  const { id } = useParams();
  const { data: patient } = usePatientByHistory(id);
  const { data: filiation } = useFiliation(id);
  const isFormMode = useForm((state) => state.isFormMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form data submitted:', Object.fromEntries(formData));
    alert('Funcionalidad de guardado no implementada aún.');
  };

  const content = (
    <div className="filiation">
      <div className="filiation__info">
        <div className="filiation__info__header">
          {isFormMode ? 'Formulario de Filiación' : 'Filiación'}
        </div>

        {/* Nombre y Apellido */}
        <FormField
          label="Nombre y Apellido"
          value={
            patient?.nombre && patient?.apellido
              ? `${patient.nombre} ${patient.apellido}`
              : '-'
          }
          name="nombre_apellido"
          isFormMode={isFormMode}
        />

        {/* Edad, Sexo, Raza */}
        <div className="filiation__info__container">
          <FormField
            label="Edad"
            value={patient?.edad}
            name="edad"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Sexo"
            value={patient?.sexo}
            name="sexo"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Raza"
            value={filiation?.raza}
            name="raza"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>

        {/* Fecha Nacimiento, Lugar */}
        <div className="filiation__info__container">
          <FormField
            label="Fecha de Nacimiento"
            value={filiation?.fecha_nacimiento}
            name="fecha_nacimiento"
            type="date"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Lugar"
            value={filiation?.lugar}
            name="lugar"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>

        {/* Estado Civil, Nombre Cónyuge */}
        <div className="filiation__info__container">
          <FormField
            label="Estado Civil"
            value={filiation?.estado_civil}
            name="estado_civil"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Nombre del Cónyuge"
            value={filiation?.nombre_conyuge}
            name="nombre_conyuge"
            variant="alt"
            flex="3"
            isFormMode={isFormMode}
          />
        </div>

        {/* Ocupación, Lugar Procedencia */}
        <div className="filiation__info__container">
          <FormField
            label="Ocupación"
            value={filiation?.ocupacion}
            name="ocupacion"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Lugar de Procedencia"
            value={filiation?.lugar_procedencia}
            name="lugar_procedencia"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>

        {/* Dirección */}
        <FormField
          label="Dirección"
          value={filiation?.direccion}
          name="direccion"
          isFormMode={isFormMode}
        />

        {/* Tiempo Residencia, Teléfono */}
        <div className="filiation__info__container">
          <FormField
            label="Tiempo de Residencia en Tacna"
            value={filiation?.tiempo_residencia_tacna}
            name="tiempo_residencia_tacna"
            flex="3"
            isFormMode={isFormMode}
          />
          <FormField
            label="Teléfono"
            value={patient?.telefono}
            name="telefono"
            type="tel"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>

        {/* Última Visita Dentista, Motivo */}
        <div className="filiation__info__container">
          <FormField
            label="Última Visita al Dentista"
            value={filiation?.ultima_visita_dentista}
            name="ultima_visita_dentista"
            type="date"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Motivo"
            value={filiation?.motivo_visita_dentista}
            name="motivo_visita_dentista"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>

        {/* Última Visita Médico, Motivo */}
        <div className="filiation__info__container">
          <FormField
            label="Última Visita al Médico"
            value={filiation?.ultima_visita_medico}
            name="ultima_visita_medico"
            type="date"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Motivo"
            value={filiation?.motivo_visita_medico}
            name="motivo_visita_medico"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>
      </div>

      {isFormMode && (
        <div className="filiation__form-actions">
          <Button type="submit">Guardar cambios</Button>
          <Button variant="secondary" type="button">
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );

  return isFormMode ? <form onSubmit={handleSubmit}>{content}</form> : content;
}

export default Filiation;
