import { useNavigate, useParams } from 'react-router';

export default function ExamenFisicoMenu() {
  const navigate = useNavigate();
  const { id } = useParams();

  const menuOptions = [
    { title: 'Examen general', path: 'general' },
    { title: 'Examen regional', path: 'regional' },
    { title: 'Examen clínico de la boca', path: 'boca' }, // A futuro
    { title: 'Higiene bucal', path: 'higiene' }, // A futuro
    // El odontograma suele ser un módulo aparte, pero podemos ponerlo aquí si deseas
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8 p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {menuOptions.map((option, index) => (
          <button
            key={index}
            onClick={() =>
              navigate(`/historia/${id}/examen-fisico/${option.path}`)
            }
            className="bg-[var(--color-primary)] text-white text-xl font-medium py-10 px-8 rounded-[var(--radius-lg)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex items-center justify-center text-center cursor-pointer border-none"
          >
            {option.title}
          </button>
        ))}
      </div>

      {/* Botón de Odontograma separado como en tu diseño */}
      <button
        className="bg-[var(--color-primary)] text-white text-xl font-medium py-10 px-20 rounded-[var(--radius-lg)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 w-full max-w-md cursor-pointer border-none"
        onClick={() => navigate(`/historia/${id}/examen-fisico/odonto`)}
      >
        Odontograma
      </button>
    </div>
  );
}
