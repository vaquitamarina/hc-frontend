import { useState, useEffect } from 'react';
import { useParams } from 'react-router'; // Corregido para React Router v7
import Button from '@ui/Button';
import {
  useDiagnosticoPresuntivo,
  useMutateDiagnosticoPresuntivo,
} from '@hooks/useDiagnostico';
import { useForm } from '@stores/useForm';

export default function DiagnosticoPresuntivo() {
  const { id } = useParams();
  const { isFormMode, setFormMode, setViewMode } = useForm();

  const { data, isLoading } = useDiagnosticoPresuntivo(id);
  const { mutate: save, isPending } = useMutateDiagnosticoPresuntivo();

  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (data) setDescripcion(data.descripcion || '');
    if (data && !data.descripcion && !isFormMode) setFormMode(); // Auto-edit si está vacío
  }, [data, isFormMode, setFormMode]);

  const handleSubmit = () => {
    save(
      { idHistory: id, descripcion },
      {
        onSuccess: () => {
          alert('Guardado correctamente');
          setViewMode();
        },
        onError: () => alert('Error al guardar'),
      }
    );
  };

  if (isLoading) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] uppercase border-l-4 border-[var(--color-primary)] pl-4">
          III. Diagnósticos Presuntivos
        </h2>
        {!isFormMode && <Button onClick={setFormMode}>Editar</Button>}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <label
          htmlFor="diagnostico-descripcion"
          className="block font-bold text-gray-700 mb-2"
        >
          Descripción del diagnóstico:
        </label>
        <textarea
          id="diagnostico-descripcion"
          className="w-full p-4 border-2 border-gray-200 rounded-lg h-48 resize-none focus:border-[var(--color-primary)] outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-600"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          disabled={!isFormMode}
          placeholder="Escriba aquí los diagnósticos presuntivos..."
        />

        {isFormMode && (
          <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={setViewMode}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
