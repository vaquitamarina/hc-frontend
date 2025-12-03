import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';
import { useEvolucion, useAddEvolucion } from '@hooks/useEvolucion';
import { useForm } from '@stores/useForm';

export default function Evolucion() {
  const { id } = useParams();
  const { isFormMode, setFormMode, setViewMode } = useForm();

  // Hooks
  const { data: evoluciones, isLoading } = useEvolucion(id);
  const { mutate: add, isPending } = useAddEvolucion();

  // Estado para EL NUEVO registro
  const [newEvolucion, setNewEvolucion] = useState({
    fecha: new Date().toISOString().split('T')[0],
    actividad: '',
    alumno: '',
  });

  // Determinamos si ya hay historial (datos guardados) para mostrar la tabla o el mensaje vacío
  const hasSavedData = evoluciones && evoluciones.length > 0;

  // Cleanup: cerrar formulario al salir
  useEffect(() => {
    return () => {
      setViewMode();
    };
  }, [setViewMode]);

  const handleSubmit = () => {
    if (!newEvolucion.actividad || !newEvolucion.alumno) {
      alert('Complete la actividad y el nombre del alumno');
      return;
    }

    add(
      { idHistory: id, data: newEvolucion },
      {
        onSuccess: () => {
          alert('Evolución agregada correctamente');
          setNewEvolucion({
            fecha: new Date().toISOString().split('T')[0],
            actividad: '',
            alumno: '',
          });
          setViewMode();
        },
        onError: () => alert('Error al registrar'),
      }
    );
  };

  if (isLoading)
    return <div className="p-8 text-center">Cargando historial...</div>;

  return (
    <div className="w-full rounded-lg shadow-sm border border-gray-100 bg-white">
      {/* HEADER SIEMPRE FIJO */}
      <div className="bg-[var(--color-primary)] text-white px-8 py-5 rounded-t-lg flex justify-between items-center">
        {/* IZQUIERDA: Título + ID siempre visibles */}
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold"> Evolución</h2>
          <div className="h-8 w-px bg-white/30 hidden md:block"></div>
          <div className="flex flex-col justify-center">
            <span className="text-[11px] opacity-80 uppercase tracking-wider leading-tight">
              Historia Clínica Nº
            </span>
            <span className="text-lg font-bold leading-tight">HC-{id}</span>
          </div>
        </div>

        {/* DERECHA: Botón Agregar */}
        <div>
          {!isFormMode && (
            <button
              onClick={setFormMode}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-md transition-colors text-sm font-semibold tracking-wide cursor-pointer uppercase"
            >
              + Nueva Evolución
            </button>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* 1. FORMULARIO DE NUEVA EVOLUCIÓN (Solo visible en modo edición) */}
        {isFormMode && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 shadow-inner animate-in fade-in slide-in-from-top-2">
            <h4 className="font-bold text-[var(--color-primary)] mb-4 uppercase text-sm border-b border-gray-300 pb-2">
              Registrar Nueva Actividad
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <TextInput
                label="Fecha:"
                type="date"
                value={newEvolucion.fecha}
                onChange={(e) =>
                  setNewEvolucion({ ...newEvolucion, fecha: e.target.value })
                }
              />
              <div className="md:col-span-2">
                <TextInput
                  label="Alumno tratante / Firma:"
                  placeholder="Nombre del estudiante"
                  value={newEvolucion.alumno}
                  onChange={(e) =>
                    setNewEvolucion({ ...newEvolucion, alumno: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="actividad-textarea"
                className="block font-medium text-[var(--color-text)] mb-1.5"
              >
                Actividad realizada:
              </label>
              <textarea
                id="actividad-textarea"
                className="w-full p-4 border-2 border-[var(--color-surface)] bg-white rounded-lg h-32 resize-none focus:border-[var(--color-primary-soft)] outline-none transition-all shadow-sm"
                placeholder="Describa el procedimiento..."
                value={newEvolucion.actividad}
                onChange={(e) =>
                  setNewEvolucion({
                    ...newEvolucion,
                    actividad: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <Button variant="secondary" onClick={setViewMode}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? 'Registrando...' : 'Agregar a la Historia'}
              </Button>
            </div>
          </div>
        )}

        {/* 2. TABLA DE HISTORIAL */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold tracking-wider border-b border-gray-200">
                <th className="p-4 w-32">Fecha</th>
                <th className="p-4">Actividad Realizada</th>
                <th className="p-4 w-48">Alumno Tratante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {hasSavedData ? (
                evoluciones.map((item) => (
                  <tr
                    key={item.id_evolucion}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="p-4 align-top text-gray-700 font-medium whitespace-nowrap">
                      {item.fecha
                        ? new Date(item.fecha).toLocaleDateString('es-PE')
                        : '-'}
                    </td>
                    <td className="p-4 align-top text-gray-600 whitespace-pre-wrap leading-relaxed">
                      {item.actividad}
                    </td>
                    <td className="p-4 align-top text-gray-500 text-sm">
                      {item.alumno}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-400">
                    No hay evoluciones registradas aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
