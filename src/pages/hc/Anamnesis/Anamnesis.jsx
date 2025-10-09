import Card from '@ui/Card';
import './Anamnesis.css';

export function Anamnesis() {
  const data = [
    { title: 'Filiacion', path: `filiacion` },
    {
      title: 'Motivo de consulta',
      path: ``,
    },
    {
      title: 'Enfermedad actual',
      path: ``,
    },
    { title: 'Antecedente', path: `` },
  ];

  return (
    <div className="anamnesis">
      <div className="anamnesis__cards">
        {data.map((item, index) => (
          <Card key={index} path={item.path}>
            {item.title}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Anamnesis;
