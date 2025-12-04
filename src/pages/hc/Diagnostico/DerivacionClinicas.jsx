import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';
import FormField from '@ui/FormField/FormField'; // Para el resumen
import SectionTitle from '@ui/SectionTitle'; // Para títulos ordenados
import { useDerivacion, useMutateDerivacion } from '@hooks/useDiagnostico';
import { useForm } from '@stores/useForm';

export default function DerivacionClinicas() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  // Determinamos si ya existe información guardada
  const hasSavedData = Boolean(
    data?.fechaDerivacion ||
      (data?.destinos && Object.values(data.destinos).some((v) => v))
  );

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

      // Si es nuevo (sin datos), activamos edición automáticamente
      if (!hasSavedData) {
        setFormMode();
      }
    }

    // CLEANUP: Cerrar modo edición al salir
    return () => {
      setViewMode();
    };
  }, [data, hasSavedData, setFormMode, setViewMode]);

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

  const handleCancel = () => {
    if (hasSavedData) {
      setViewMode(); // Volver al resumen
    } else {
      navigate(-1); // Salir si es nuevo
    }
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
    <div className="w-full rounded-lg shadow-sm border border-gray-100 bg-white">
      {/* HEADER DINÁMICO */}
      <div className="bg-[var(--color-primary)] text-white px-8 py-5 rounded-t-lg flex justify-between items-center">
        {/* IZQUIERDA */}
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold">IV. Derivado a Clínicas</h2>

          {/* CASO GUARDADO: El ID se muestra aquí a la izquierda */}
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
            // CASO GUARDADO: Botón Editar
            !isFormMode && (
              <button
                onClick={setFormMode}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-md transition-colors text-sm font-semibold tracking-wide cursor-pointer uppercase"
              >
                Editar
              </button>
            )
          ) : (
            // CASO NUEVO: ID a la derecha
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

      {/* CONTENIDO PRINCIPAL */}
      <div className="p-8">
        {isFormMode ? (
          /* --- MODO EDICIÓN --- */
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-gray-700 mb-2">
              Seleccione Clínicas de Destino:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clinicasOptions.map((opt) => (
                <label
                  key={opt.key}
                  className={`flex items-center gap-3 cursor-pointer p-3 rounded-md border ${
                    formData.destinos[opt.key]
                      ? 'bg-blue-50 border-blue-200'
                      : 'border-transparent hover:bg-gray-50'
                  } transition-colors`}
                >
                  <input
                    type="checkbox"
                    checked={!!formData.destinos[opt.key]}
                    onChange={() => handleCheckbox(opt.key)}
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
                className="w-full p-3 border-2 border-gray-200 rounded-lg h-24 resize-none focus:border-[var(--color-primary)] outline-none"
                value={formData.observaciones}
                onChange={(e) =>
                  setFormData({ ...formData, observaciones: e.target.value })
                }
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
              />
              <TextInput
                label="Alumno:"
                value={formData.alumno}
                onChange={(e) =>
                  setFormData({ ...formData, alumno: e.target.value })
                }
              />
              <TextInput
                label="Docente:"
                value={formData.docente}
                onChange={(e) =>
                  setFormData({ ...formData, docente: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? 'Guardando...' : 'Guardar Derivación'}
              </Button>
            </div>
          </div>
        ) : (
          /* --- MODO RESUMEN (VISTA) --- */
          <div className="flex flex-col gap-8 text-gray-800">
            <section>
              <SectionTitle title="Destinos Seleccionados" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clinicasOptions.filter((opt) => formData.destinos[opt.key])
                  .length > 0 ? (
                  clinicasOptions
                    .filter((opt) => formData.destinos[opt.key])
                    .map((opt) => (
                      <div
                        key={opt.key}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700 font-medium flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
                        {opt.label}
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 italic p-2">
                    Ninguna clínica seleccionada.
                  </p>
                )}
              </div>
            </section>

            <section>
              <SectionTitle title="Detalles de la Derivación" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <FormField
                    label="Observaciones"
                    value={formData.observaciones}
                  />
                </div>
                <FormField
                  label="Fecha"
                  value={formData.fechaDerivacion}
                  type="date"
                />
                <FormField label="Alumno" value={formData.alumno} />
                <FormField label="Docente" value={formData.docente} />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
