import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useHigieneOral, useMutateHigieneOral } from '@hooks/useExamenFisico';
import { useForm } from '@stores/useForm';
import Button from '@ui/Button';
import RadioGroup from '@ui/RadioGroup';

export default function ExamenHigiene() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFormMode, setFormMode, setViewMode } = useForm();

  const { data: higieneData, isLoading } = useHigieneOral(id);
  const { mutate: saveHigiene, isPending } = useMutateHigieneOral();

  const [estadoHigiene, setEstadoHigiene] = useState('');

  // Determinamos si ya existe información guardada
  const hasSavedData = Boolean(higieneData?.estadoHigiene);

  useEffect(() => {
    if (higieneData) {
      if (higieneData.estadoHigiene) {
        setEstadoHigiene(higieneData.estadoHigiene);
      }

      // Si es nuevo, abrimos formulario automáticamente
      if (!higieneData.estadoHigiene) {
        setFormMode();
      }
    }

    // CLEANUP: Cerrar modo edición al salir
    return () => {
      setViewMode();
    };
  }, [higieneData, setFormMode, setViewMode]);

  const handleSubmit = () => {
    if (!estadoHigiene) {
      alert('Por favor seleccione una opción');
      return;
    }

    saveHigiene(
      { idHistory: id, data: { estadoHigiene } },
      {
        onSuccess: () => {
          alert('Higiene bucal guardada correctamente');
          setViewMode();
        },
        onError: () => {
          alert('Error al guardar');
        },
      }
    );
  };

  if (isLoading) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="w-full rounded-lg shadow-sm border border-gray-100 bg-white">
      {/* HEADER FIJO (ID SIEMPRE A LA IZQUIERDA) */}
      <div className="bg-[var(--color-primary)] text-white px-8 py-5 rounded-t-lg flex justify-between items-center">
        {/* IZQUIERDA: Título + ID */}
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold">Higiene Bucal</h2>
          <div className="h-8 w-px bg-white/30 hidden md:block"></div>
          <div className="flex flex-col justify-center">
            <span className="text-[11px] opacity-80 uppercase tracking-wider leading-tight">
              Historia Clínica Nº
            </span>
            <span className="text-lg font-bold leading-tight">HC-{id}</span>
          </div>
        </div>

        {/* DERECHA: Botones de Acción */}
        <div className="flex items-center gap-4">
          {/* Botón VOLVER (Siempre visible) */}
          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-md transition-colors text-sm font-medium cursor-pointer border border-white/30"
          >
            VOLVER
          </button>

          {/* Botón EDITAR (Solo si hay datos y no estamos editando) */}
          {hasSavedData && !isFormMode && (
            <button
              onClick={setFormMode}
              className="bg-white text-[var(--color-primary)] hover:bg-gray-100 px-6 py-2 rounded-md transition-colors text-sm font-bold tracking-wide cursor-pointer uppercase shadow-sm"
            >
              Editar
            </button>
          )}
        </div>
      </div>

      {/* CONTENIDO DEL FORMULARIO */}
      <div className="p-8">
        <div className="mb-8 pl-4">
          <RadioGroup
            label="Evaluación Clínica de la Higiene:"
            name="higiene"
            options={['Bueno', 'Regular', 'Deficiente']}
            value={estadoHigiene}
            onChange={setEstadoHigiene}
            disabled={!isFormMode}
            row={true}
          />
        </div>

        {/* Botones de Guardar/Cancelar (Solo en modo edición) */}
        {isFormMode && (
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={setViewMode}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Guardando...' : 'Guardar Evaluación'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
