import { useFiliation } from '@hooks/usePatients';
import { useCurrentPatientStore } from '@stores/usePatientStore';
import { useForm } from '@stores/useForm';
import './Filiation.css';
import Button from '@ui/Button';

export function Filiation() {
  const patient = useCurrentPatientStore((state) => state.currentPatient);
  const { data: filiation } = useFiliation(patient?.idHistory);
  const isFormMode = useForm((state) => state.isFormMode);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const Field = ({ label, value, name, type = 'text' }) => {
    if (isFormMode) {
      return (
        <div className="filiation__form-field">
          <label className="filiation__form-label">{label}:</label>
          <input className="filiation__form-input" type={type} name={name} />
        </div>
      );
    }
    return (
      <div className="filiation__info__item">
        {label}: {type === 'date' ? formatDate(value) : value || '-'}
      </div>
    );
  };

  const FieldAlt = ({ label, value, name, type = 'text' }) => {
    if (isFormMode) {
      return (
        <div className="filiation__form-field">
          <label className="filiation__form-label">{label}:</label>
          <input className="filiation__form-input" type={type} name={name} />
        </div>
      );
    }
    return (
      <div className="filiation__info__item--alt">
        {label}: {type === 'date' ? formatDate(value) : value || '-'}
      </div>
    );
  };

  const content = (
    <div className="filiation">
      <div className="filiation__info">
        <div className="filiation__info__header">
          {isFormMode ? 'Formulario de Filiación' : 'Filiación'}
        </div>
        <Field label="Nombre y Apellido" value={patient?.name} name="nombre" />

        <div className="filiation__info__container-1">
          <FieldAlt label="Edad" value={patient?.age} name="edad" />
          <Field label="Sexo" value={patient?.gender} name="sexo" />
          <FieldAlt label="Raza" value={filiation?.raza} name="raza" />
        </div>

        <div className="filiation__info__container-2">
          <Field
            label="Fecha de nacimiento"
            value={filiation?.fecha_nacimiento}
            name="fecha_nacimiento"
            type="date"
          />
          <FieldAlt
            label="Lugar de nacimiento"
            value={filiation?.lugar}
            name="lugar"
          />
        </div>

        <div className="filiation__info_container-2">
          <Field
            label="Estado civil"
            value={filiation?.estado_civil}
            name="estado_civil"
          />
          <FieldAlt
            label="Nombre del cónyuge"
            value={filiation?.nombre_conyuge}
            name="nombre_conyuge"
          />
        </div>

        <div className="filiation__info__container-2">
          <Field
            label="Ocupación"
            value={filiation?.ocupacion}
            name="ocupacion"
          />
          <FieldAlt
            label="Lugar de procedencia"
            value={filiation?.lugar_procedencia}
            name="lugar_procedencia"
          />
        </div>

        <Field
          label="Tiempo de residencia en Tacna"
          value={filiation?.tiempo_residencia_tacna}
          name="tiempo_residencia_tacna"
        />

        <div className="filiation__info__container-3">
          <Field
            label="Dirección"
            value={filiation?.direccion}
            name="direccion"
          />
          <FieldAlt label="Teléfono" value={patient?.phone} name="telefono" />
        </div>

        <div className="filiation__info__container-3">
          <Field
            label="Última visita al dentista"
            value={filiation?.ultima_visita_dentista}
            name="ultima_visita_dentista"
            type="date"
          />
          <FieldAlt
            label="Motivo"
            value={filiation?.motivo_visita_dentista}
            name="motivo_visita_dentista"
          />
        </div>

        <div className="filiation__info__container-3">
          <Field
            label="Última visita al médico"
            value={filiation?.ultima_visita_medico}
            name="ultima_visita_medico"
            type="date"
          />
          <FieldAlt
            label="Motivo"
            value={filiation?.motivo_visita_medico}
            name="motivo_visita_medico"
          />
        </div>
      </div>
      {isFormMode && (
        <div className="filiation__form-actions">
          <Button>Guardar cambios</Button>
          <Button variant={'secondary'}>Cancelar</Button>
        </div>
      )}
    </div>
  );

  return isFormMode ? <form>{content}</form> : content;
}

export default Filiation;
