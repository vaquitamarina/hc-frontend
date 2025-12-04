import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';
import {
  useDerivacion,
  useMutateRespuestaDerivacion,
} from '@hooks/useDiagnostico'; // Reusamos el hook de lectura
import { useForm } from '@stores/useForm';

export default function RespuestaClinicas() {
  const { id } = useParams();
  const { isFormMode, setFormMode, setViewMode } = useForm();

  const { data, isLoading } = useDerivacion(id); // Lee de la misma tabla derivacion_clinicas
  const { mutate: save, isPending } = useMutateRespuestaDerivacion();

  const [formData, setFormData] = useState({
    fechaRespuesta: '',
    clinicaRespuesta: '',
    descripcionRespuesta: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        fechaRespuesta: data.fechaRespuesta
          ? data.fechaRespuesta.split('T')[0]
          : '',
        clinicaRespuesta: data.clinicaRespuesta || '',
        descripcionRespuesta: data.descripcionRespuesta || '',
      });
    }
  }, [data]);

  const handleSubmit = () => {
    save(
      {
        idHistory: id,
        data: {
          fecha: formData.fechaRespuesta,
          clinica: formData.clinicaRespuesta,
          descripcion: formData.descripcionRespuesta,
        },
      },
      {
        onSuccess: () => {
          toast.success('Respuesta guardada');
          setViewMode();
        },
        onError: () => toast.error('Error al guardar'),
      }
    );
  };

  if (isLoading) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] uppercase border-l-4 border-[var(--color-primary)] pl-4">
          V. Diagnóstico en Clínicas
        </h2>
        {!isFormMode && <Button onClick={setFormMode}>Editar</Button>}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Fecha de Respuesta:"
            type="date"
            value={formData.fechaRespuesta}
            onChange={(e) =>
              setFormData({ ...formData, fechaRespuesta: e.target.value })
            }
            disabled={!isFormMode}
          />
          {/* Espacio vacío o info adicional si quisieras */}
        </div>

        <div>
          <label
            htmlFor="clinica-respuesta"
            className="block font-bold text-gray-700 mb-2"
          >
            Clínica de:
          </label>
          <textarea
            id="clinica-respuesta"
            className="w-full p-3 border-2 border-gray-200 rounded-lg h-20 resize-none focus:border-[var(--color-primary)] outline-none disabled:bg-gray-50 mb-4"
            placeholder="Ej: Periodoncia..."
            value={formData.clinicaRespuesta}
            onChange={(e) =>
              setFormData({ ...formData, clinicaRespuesta: e.target.value })
            }
            disabled={!isFormMode}
          />

          <label
            htmlFor="diagnostico-respuesta"
            className="block font-bold text-gray-700 mb-2"
          >
            Diagnóstico / Respuesta Recibida:
          </label>
          <textarea
            id="diagnostico-respuesta"
            className="w-full p-3 border-2 border-gray-200 rounded-lg h-32 resize-none focus:border-[var(--color-primary)] outline-none disabled:bg-gray-50"
            value={formData.descripcionRespuesta}
            onChange={(e) =>
              setFormData({ ...formData, descripcionRespuesta: e.target.value })
            }
            disabled={!isFormMode}
          />
        </div>

        {isFormMode && (
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={setViewMode}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Guardando...' : 'Guardar Respuesta'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
