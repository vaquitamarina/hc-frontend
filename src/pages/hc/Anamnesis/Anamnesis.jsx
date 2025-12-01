import Card from '@ui/Card';
import './Anamnesis.css';

export function Anamnesis() {
  const data = [
    { title: 'Filiacion', path: `filiacion` },
    { title: 'Motivo de Consulta', path: `motivo-consulta` },
    { title: 'Enfermedad Actual', path: `enfermedad-actual` },
    { title: 'Antecedente Personal', path: `antecedente-personal` },
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
