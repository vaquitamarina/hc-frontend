import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';
import { useDerivacion, useMutateDerivacion } from '@hooks/useDiagnostico';
import { useForm } from '@stores/useForm';

export default function DerivacionClinicas() {
  const { id } = useParams();
  const { isFormMode, setFormMode, setViewMode } = useForm();

  const { data, isLoading } = useDerivacion(id);
  const { mutate: save, isPending } = useMutateDerivacion();

  const [formData, setFormData] = useState({
    destinos: {},
    observaciones: '',
    fechaDerivacion: '',
    alumno: '',
    docente: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        destinos: data.destinos || {},
        observaciones: data.observaciones || '',
        fechaDerivacion: data.fechaDerivacion
          ? data.fechaDerivacion.split('T')[0]
          : '',
        alumno: data.alumno || '',
        docente: data.docente || '',
      });
    }
  }, [data]);

  const handleCheckbox = (key) => {
    setFormData((prev) => ({
      ...prev,
      destinos: { ...prev.destinos, [key]: !prev.destinos[key] },
    }));
  };

  const handleSubmit = () => {
    save(
      { idHistory: id, data: formData },
      {
        onSuccess: () => {
          alert('Derivación guardada');
          setViewMode();
        },
        onError: () => alert('Error al guardar'),
      }
    );
  };

  const clinicasOptions = [
    { key: 'periodoncia', label: 'Periodoncia' },
    { key: 'cirugia', label: 'Cirugía bucal' },
    { key: 'estomatologia', label: 'Estomatología Rehabilitación' },
    { key: 'integral_nino', label: 'Clínica integral del niño' },
    { key: 'integral_adulto', label: 'Clínica Integral del Adulto' },
  ];

  if (isLoading) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] uppercase border-l-4 border-[var(--color-primary)] pl-4">
          IV. Derivado a Clínicas
        </h2>
        {!isFormMode && <Button onClick={setFormMode}>Editar</Button>}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-6">
        {/* Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinicasOptions.map((opt) => (
            <label
              key={opt.key}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-md border ${formData.destinos[opt.key] ? 'bg-blue-50 border-blue-200' : 'border-transparent hover:bg-gray-50'} transition-colors`}
            >
              <input
                type="checkbox"
                checked={!!formData.destinos[opt.key]}
                onChange={() => handleCheckbox(opt.key)}
                disabled={!isFormMode}
                className="w-5 h-5 accent-[var(--color-primary)]"
              />
              <span className="text-gray-700 font-medium">{opt.label}</span>
            </label>
          ))}
        </div>

        <div className="border-t pt-6">
          <label
            htmlFor="observaciones-textarea"
            className="block font-bold text-gray-700 mb-2"
          >
            Observaciones:
          </label>
          <textarea
            id="observaciones-textarea"
            className="w-full p-3 border-2 border-gray-200 rounded-lg h-24 resize-none focus:border-[var(--color-primary)] outline-none disabled:bg-gray-50"
            value={formData.observaciones}
            onChange={(e) =>
              setFormData({ ...formData, observaciones: e.target.value })
            }
            disabled={!isFormMode}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TextInput
            label="Fecha:"
            type="date"
            value={formData.fechaDerivacion}
            onChange={(e) =>
              setFormData({ ...formData, fechaDerivacion: e.target.value })
            }
            disabled={!isFormMode} // En modo vista usa tu componente TextInput que soporta disabled? Si no, avísame.
          />
          <TextInput
            label="Alumno:"
            value={formData.alumno}
            onChange={(e) =>
              setFormData({ ...formData, alumno: e.target.value })
            }
            disabled={!isFormMode}
          />
          <TextInput
            label="Docente:"
            value={formData.docente}
            onChange={(e) =>
              setFormData({ ...formData, docente: e.target.value })
            }
            disabled={!isFormMode}
          />
        </div>

        {isFormMode && (
          <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={setViewMode}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Guardando...' : 'Guardar Derivación'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
