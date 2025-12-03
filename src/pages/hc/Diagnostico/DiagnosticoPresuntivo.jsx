import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
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

  // Determinamos si ya existe información guardada en la BD
  const hasSavedData = Boolean(data?.descripcion);

  useEffect(() => {
    if (data) {
      setDescripcion(data.descripcion || '');

      // Auto-activar edición SOLO si está vacío.
      // IMPORTANTE: Quitamos 'isFormMode' de las dependencias para evitar
      // que al guardar (y pasar a ViewMode) nos regrese a EditMode por tener data antigua.
      if (!data.descripcion) {
        setFormMode();
      }
    }
    return () => {
      setViewMode();
    };
  }, [data, setFormMode, setViewMode]);

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
    <div className="w-full rounded-lg shadow-sm border border-gray-100 bg-white">
      {/* HEADER DINÁMICO */}
      <div className="bg-[var(--color-primary)] text-white px-8 py-5 rounded-t-lg flex justify-between items-center">
        {/* IZQUIERDA */}
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold">Diagnósticos Presuntivos</h2>

          {/* CASO GUARDADO: El ID se mueve aquí, al lado izquierdo junto al título */}
          {hasSavedData && (
            <>
              <div className="h-8 w-px bg-white/30 hidden md:block"></div>
              <div className="flex flex-col justify-center">
                <span className="text-[11px] opacity-80 uppercase tracking-wider leading-tight">
                  Historia Clínica Nº
                </span>
                <span className="text-lg font-bold leading-tight">HC-{id}</span>
              </div>
            </>
          )}
        </div>

        {/* DERECHA */}
        <div>
          {hasSavedData ? (
            // CASO GUARDADO: Botón Editar a la derecha
            !isFormMode && (
              <button
                onClick={setFormMode}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-md transition-colors text-sm font-semibold tracking-wide cursor-pointer uppercase"
              >
                Editar
              </button>
            )
          ) : (
            // CASO NUEVO (Vacío): El ID toma el lugar del botón Editar a la derecha
            <div className="text-right">
              <span className="block text-[11px] opacity-80 uppercase tracking-wider leading-tight">
                Historia Clínica Nº
              </span>
              <span className="block text-xl font-bold leading-tight">
                HC-{id}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="p-8">
        <label
          htmlFor="diagnostico-descripcion"
          className="block font-bold text-gray-700 mb-3"
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
          <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
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
