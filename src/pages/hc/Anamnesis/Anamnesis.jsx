import Card from '@ui/Card/Card';
import './Anamnesis.css';
import { useCurrentPatientStore } from '@stores/usePatientStore';
import { CircleUserRound } from 'lucide-react';
import { useParams } from 'react-router';

export function Anamnesis() {
  const patient = useCurrentPatientStore((state) => state.currentPatient);
  const { id } = useParams();
  const data = [
    { title: 'Filiacion', path: `filiacion` },
    {
      title: 'Motivo de consulta',
      path: `/historia/${id}/poto`,
    },
    {
      title: 'Enfermedad actual',
      path: `/historia/${id}/anamnesis/enfermedad-actual`,
    },
    { title: 'Antecedente', path: `/historia/${id}/anamnesis/antecedente` },
  ];

  return (
    <div className="anamnesis">
      <div className="anamnesis__header">
        <div>
          <CircleUserRound
            size={84}
            strokeWidth={1}
            style={{ color: 'var(--color-primary)' }}
          />
        </div>
        <h2 className="anamnesis__title">{patient?.name}</h2>
      </div>
      <div className="anamnesis__cards">
        {data.map((item) => (
          <Card key={item.path} path={item.path}>
            {item.title}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Anamnesis;
