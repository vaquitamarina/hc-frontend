import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useHigieneOral, useMutateHigieneOral } from '@hooks/useExamenFisico';
import Button from '@ui/Button';
import RadioGroup from '@ui/RadioGroup';

export default function ExamenHigiene() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: higieneData, isLoading } = useHigieneOral(id);
  const { mutate: saveHigiene, isPending } = useMutateHigieneOral();

  const [estadoHigiene, setEstadoHigiene] = useState('');

  useEffect(() => {
    if (higieneData?.estadoHigiene) {
      setEstadoHigiene(higieneData.estadoHigiene);
    }
  }, [higieneData]);

  const handleSubmit = () => {
    if (!estadoHigiene) return;

    saveHigiene(
      { idHistory: id, data: { estadoHigiene } },
      {
        onSuccess: () => {
          alert('Higiene bucal guardada correctamente');
        },
        onError: () => {
          alert('Error al guardar');
        },
      }
    );
  };

  if (isLoading) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tarjeta Principal */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        {/* ENCABEZADO CORREGIDO */}
        <div className="flex justify-between items-center mb-6">
          {/* CAMBIO CLAVE:
              Usamos border-[var(--color-primary)] en lugar de border-blue-600 
          */}
          <h2 className="text-xl font-bold text-gray-800 uppercase border-l-4 border-[var(--color-primary)] pl-4">
            4. Higiene Bucal
          </h2>

          <Button variant="secondary" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>

        {/* Contenido */}
        <div className="mb-8 pl-4">
          <RadioGroup
            label="Evaluación Clínica de la Higiene:"
            name="higiene"
            options={['Bueno', 'Regular', 'Deficiente']}
            value={estadoHigiene}
            onChange={setEstadoHigiene}
            row={true}
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Guardando...' : 'Guardar Evaluación'}
          </Button>
        </div>
      </div>
    </div>
  );
}
