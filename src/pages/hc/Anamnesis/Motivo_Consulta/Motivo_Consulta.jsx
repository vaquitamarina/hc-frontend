import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Button from '@ui/Button';
import {
  useMotivoConsulta,
  useUpdateMotivoConsulta,
  useCreateMotivoConsulta,
} from '@hooks/useAnamnesis';
import './Motivo_Consulta.css';

function Motivo_Consulta() {
  const { id } = useParams();
  const { data, isLoading } = useMotivoConsulta(id);
  const updateMotivo = useUpdateMotivoConsulta();
  const createMotivo = useCreateMotivoConsulta();
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    // Cargar motivo existente si hay datos
    if (data?.motivo) {
      setMotivo(data.motivo);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!motivo.trim()) {
      alert('Por favor, ingresa el motivo de consulta.');
      return;
    }

    try {
      if (data) {
        // Si ya existe, actualizar
        await updateMotivo.mutateAsync({ idHistoria: id, motivo });
      } else {
        // Si no existe, crear nuevo
        await createMotivo.mutateAsync({ id_historia: id, motivo });
      }
      alert('Motivo de consulta guardado exitosamente');
    } catch (error) {
      alert('Error al guardar: ' + error.message);
    }
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="motivo-consulta flex flex-col gap-6">
      {/* Header Section */}
      <div className="bg-[var(--color-primary)] text-white py-4 px-8 rounded-[var(--radius-md)] flex items-center justify-between">
        <h2 className="text-xl font-semibold">Motivo de consulta</h2>
        <div className="text-right">
          <p className="text-sm">Historia Clínica Nº:</p>
          <p className="text-lg font-bold">HC-{id}</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="motivo" className="font-medium text-lg mb-2">
            Motivo de consulta
          </label>
          <textarea
            id="motivo"
            className="w-full min-h-[120px] p-3 rounded border"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Describa el motivo de la consulta..."
            required
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="primary"
            type="submit"
            disabled={updateMotivo.isPending || createMotivo.isPending}
          >
            {updateMotivo.isPending || createMotivo.isPending
              ? 'Guardando...'
              : data
                ? 'Actualizar'
                : 'Guardar'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Motivo_Consulta;
