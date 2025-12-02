import { useState } from 'react';
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
    fecha: new Date().toISOString().split('T')[0], // Fecha de hoy por defecto
    actividad: '',
    alumno: '',
  });

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
          // Limpiamos el formulario para poder agregar otra si se desea
          setNewEvolucion({
            fecha: new Date().toISOString().split('T')[0],
            actividad: '',
            alumno: '',
          });
          // Opcional: salir del modo edición
          // setViewMode();
        },
        onError: () => alert('Error al registrar'),
      }
    );
  };

  if (isLoading)
    return <div className="p-8 text-center">Cargando historial...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] uppercase border-l-4 border-[var(--color-primary)] pl-4">
          VI. Evolución
        </h2>
        {!isFormMode && (
          <Button onClick={setFormMode}>+ Nueva Evolución</Button>
        )}
      </div>

      {/* 1. FORMULARIO DE NUEVA EVOLUCIÓN (Solo en Modo Edición) */}
      {isFormMode && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8 shadow-sm animate-in fade-in slide-in-from-top-2">
          <h4 className="font-bold text-[var(--color-primary)] mb-4">
            Registrar Nueva Actividad
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

          <div className="mb-4">
            <label
              htmlFor="actividad-textarea"
              className="block font-bold text-gray-700 mb-2"
            >
              Actividad realizada:
            </label>
            <textarea
              id="actividad-textarea"
              className="w-full p-3 border-2 border-gray-200 rounded-lg h-24 resize-none focus:border-[var(--color-primary)] outline-none bg-white"
              placeholder="Describa el procedimiento..."
              value={newEvolucion.actividad}
              onChange={(e) =>
                setNewEvolucion({ ...newEvolucion, actividad: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={setViewMode}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Registrando...' : 'Agregar a la Historia'}
            </Button>
          </div>
        </div>
      )}

      {/* 2. TABLA DE HISTORIAL (Siempre visible) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-gray-700">
          Historial Clínico
        </div>

        {evoluciones && evoluciones.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-sm text-gray-500 border-b">
                  <th className="p-4 font-bold w-32">Fecha</th>
                  <th className="p-4 font-bold">Actividad Realizada</th>
                  <th className="p-4 font-bold w-48">Alumno Tratante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {evoluciones.map((item) => (
                  <tr key={item.id_evolucion} className="hover:bg-gray-50/50">
                    <td className="p-4 align-top text-gray-600 font-medium">
                      {item.fecha
                        ? new Date(item.fecha).toLocaleDateString('es-PE')
                        : '-'}
                    </td>
                    <td className="p-4 align-top text-gray-800 whitespace-pre-wrap">
                      {item.actividad}
                    </td>
                    <td className="p-4 align-top text-gray-600">
                      {item.alumno}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-400 italic">
            No hay evoluciones registradas.
          </div>
        )}
      </div>
    </div>
  );
}
