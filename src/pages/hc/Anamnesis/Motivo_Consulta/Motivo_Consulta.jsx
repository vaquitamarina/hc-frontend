import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
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
    // Backend returns { message, data } on success — unwrap safely
    const payload = data?.data ?? data;
    if (payload?.motivo) {
      setMotivo(payload.motivo);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!motivo.trim()) {
      toast.error('Por favor, ingresa el motivo de consulta.');
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
      // Optimistically update local state and notify user
      setMotivo(motivo);
      toast.success('Motivo de consulta guardado exitosamente');
    } catch (error) {
      toast.error(
        'Error al guardar: ' + (error?.message || 'Error desconocido')
      );
    }
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="motivo-consulta-container">
      {/* Header Section */}
      <div className="motivo-header">
        <h2 className="motivo-header-title">Motivo de consulta</h2>
        <div className="motivo-header-info">
          <p className="motivo-header-label">Historia Clínica Nº:</p>
          <p className="motivo-header-value">HC-{id}</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="motivo-form">
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
            disabled={updateMotivo.isLoading || createMotivo.isLoading}
          >
            {updateMotivo.isLoading || createMotivo.isLoading
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
