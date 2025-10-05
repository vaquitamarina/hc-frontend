import { useFiliation } from '@hooks/usePatients';
import { useCurrentPatientStore } from '@stores/usePatientStore';
import './Filiation.css';
export function Filiation() {
  const historyId = '0dde049b-12ec-42bd-9ed7-51cec150f4dd';
  const { data: filiation, isLoading } = useFiliation(historyId);
  const patient = useCurrentPatientStore((state) => state.currentPatient);

  if (isLoading) {
    return <div>Cargando filiacion...</div>;
  }
  return (
    <div className="filiation">
      <div className="filiation__info">
        <div className="filiation__info__header">Filiacion</div>
        <div className="filiation__info__item">
          Nombre y Apellido: {patient?.name || '-'}
        </div>
        <div className="filiation__info__container-1">
          <div className="filiation__info__item--alt">Edad: {patient.age}</div>
          <div className="filiation__info__item">Sexo: {patient.gender}</div>
          <div className="filiation__info__item--alt">
            Raza: {filiation?.raza}
          </div>
        </div>
        <div className="filiation__info__container-2">
          <div className="filiation__info__item">
            Fecha de nacimiento: {filiation?.fecha_nacimiento}
          </div>
          <div className="filiation__info__item--alt">
            Lugar de nacimiento: {filiation?.lugar}
          </div>
        </div>
        <div className="filiation__info__container-2">
          <div className="filiation__info__item">
            Estado civil: {filiation?.estado_civil}
          </div>
          <div className="filiation__info__item--alt">
            Nombre del conyuge: {filiation?.nombre_conyuge || '-'}
          </div>
        </div>
        <div className="filiation__info__container-2">
          <div className="filiation__info__item">
            Ocupacion: {filiation?.ocupacion}
          </div>
          <div className="filiation__info__item--alt">
            Lugar de procedencia: {filiation?.lugar_procedencia}
          </div>
        </div>
        <div className="filiation__info__item">
          Tiempo de residencia en Tacna: {filiation?.tiempo_residencia_tacna}
        </div>
        <div className="filiation__info__container-3">
          <div className="filiation__info__item">
            Direccion: {filiation?.direccion}
          </div>
          <div className="filiation__info__item--alt">
            Telefono: {patient?.phone}
          </div>
        </div>
        <div className="filiation__info__container-2">
          <div className="filiation__info__item">
            Ultima visita al dentista: {filiation?.ultima_visita_dentista}
          </div>
          <div className="filiation__info__item--alt">
            Motivo: {filiation?.motivo_visita_dentista}
          </div>
        </div>
        <div className="filiation__info__container-2">
          <div className="filiation__info__item">
            Ultima visita al medico: {filiation?.ultima_visita_medico}
          </div>
          <div className="filiation__info__item--alt">
            Motivo: {filiation?.motivo_visita_medico}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filiation;
