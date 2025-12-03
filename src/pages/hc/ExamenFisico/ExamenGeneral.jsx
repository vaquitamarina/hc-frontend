import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useGeneralExam, useMutateGeneralExam } from '@hooks/useExamenFisico';
import { useForm } from '@stores/useForm';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';

const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  disabled,
  row = true,
}) => (
  <div className="mb-4">
    <label className="block font-bold text-[var(--color-text)] mb-2 text-sm">
      {label}
    </label>
    <div
      className={`flex ${row ? 'flex-row flex-wrap gap-6' : 'flex-col gap-2'}`}
    >
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="accent-[var(--color-primary)] w-5 h-5"
          />
          <span className="text-gray-700">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

export default function ExamenGeneral() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: examData, isLoading } = useGeneralExam(id);
  const { mutate: saveExam, isPending } = useMutateGeneralExam();
  const { isFormMode, setFormMode, setViewMode } = useForm();

  const [formData, setFormData] = useState({});

  // Determinamos si ya hay datos guardados (usamos un campo clave como 'posicion' o simplemente si el objeto tiene keys)
  const hasSavedData =
    examData && Object.keys(examData).length > 0 && examData.posicion;

  // Cargar datos al iniciar
  useEffect(() => {
    if (examData) {
      setFormData(examData);

      // Si es un registro nuevo (vacío), activamos edición automáticamente
      if (Object.keys(examData).length === 0 || !examData.posicion) {
        setFormMode();
      }
    }

    // CLEANUP: Cerrar modo edición al salir de la pantalla
    return () => {
      setViewMode();
    };
  }, [examData, setFormMode, setViewMode]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveExam(
      { idHistory: id, data: formData },
      {
        onSuccess: () => {
          alert('Examen General guardado correctamente');
          setViewMode();
        },
        onError: () => alert('Error al guardar'),
      }
    );
  };

  if (isLoading)
    return <div className="p-8 text-center">Cargando examen...</div>;

  return (
    <div className="w-full rounded-lg shadow-sm border border-gray-100 bg-white">
      {/* HEADER FIJO (ID SIEMPRE A LA IZQUIERDA) */}
      <div className="bg-[var(--color-primary)] text-white px-8 py-5 rounded-t-lg flex justify-between items-center">
        {/* IZQUIERDA: Título + ID */}
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold">Examen General</h2>
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

      <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-8">
        {/* 1. ASPECTO GENERAL */}
        <section>
          <h3 className="text-[var(--color-primary)] font-bold text-lg border-b-2 border-gray-100 mb-6 pb-2 uppercase tracking-wide">
            Aspecto General
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <RadioGroup
              label="Posición:"
              name="posicion"
              options={['Pie', 'Sentado', 'De cúbito']}
              value={formData.posicion}
              onChange={(v) => handleChange('posicion', v)}
              disabled={!isFormMode}
            />

            <RadioGroup
              label="Actitud:"
              name="actitud"
              options={['Activa', 'Pasiva']}
              value={formData.actitud}
              onChange={(v) => handleChange('actitud', v)}
              disabled={!isFormMode}
            />

            <RadioGroup
              label="Deambulación:"
              name="deambulacion"
              options={['Embásica', 'Disbásica', 'Abásica']}
              value={formData.deambulacion}
              onChange={(v) => handleChange('deambulacion', v)}
              disabled={!isFormMode}
            />

            <div>
              <RadioGroup
                label="Facies:"
                name="facies"
                options={['No característica', 'Característica']}
                value={formData.facies}
                onChange={(v) => handleChange('facies', v)}
                disabled={!isFormMode}
              />
              {formData.facies === 'Característica' && (
                <div className="mt-2">
                  <TextInput
                    placeholder="Describa característica..."
                    value={formData.faciesObs || ''}
                    onChange={(e) => handleChange('faciesObs', e.target.value)}
                    disabled={!isFormMode}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="conciencia-input"
              className="block font-bold text-[var(--color-text)] mb-2 text-sm"
            >
              Conciencia (G° de conciencia, Orientación, Percepción,
              Inteligencia...):
            </label>
            <textarea
              id="conciencia-input"
              className="w-full p-4 border-2 border-[var(--color-surface)] bg-white rounded-lg h-24 resize-none focus:border-[var(--color-primary-soft)] outline-none transition-all shadow-sm disabled:bg-gray-100 disabled:text-gray-500"
              value={formData.conciencia || ''}
              onChange={(e) => handleChange('conciencia', e.target.value)}
              disabled={!isFormMode}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-6">
            <RadioGroup
              label="Constitución:"
              name="constitucion"
              options={['Pícnico', 'Asténico', 'Normotipo']}
              value={formData.constitucion}
              onChange={(v) => handleChange('constitucion', v)}
              disabled={!isFormMode}
            />
            <RadioGroup
              label="Estado nutritivo:"
              name="estadoNutritivo"
              options={['Adecuado', 'No adecuado']}
              value={formData.estadoNutritivo}
              onChange={(v) => handleChange('estadoNutritivo', v)}
              disabled={!isFormMode}
            />
          </div>
        </section>

        {/* 2. SIGNOS VITALES */}
        <section>
          <h3 className="text-[var(--color-primary)] font-bold text-lg border-b-2 border-gray-100 mb-6 pb-2 uppercase tracking-wide">
            Signos Vitales
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-end">
            <TextInput
              label="Temperatura:"
              value={formData.temperatura || ''}
              onChange={(e) => handleChange('temperatura', e.target.value)}
              disabled={!isFormMode}
            />
            <TextInput
              label="P.A.:"
              value={formData.presionArterial || ''}
              onChange={(e) => handleChange('presionArterial', e.target.value)}
              disabled={!isFormMode}
            />
            <TextInput
              label="F.R.:"
              value={formData.frecuenciaRespiratoria || ''}
              onChange={(e) =>
                handleChange('frecuenciaRespiratoria', e.target.value)
              }
              disabled={!isFormMode}
            />
            <TextInput
              label="Pulso:"
              value={formData.pulso || ''}
              onChange={(e) => handleChange('pulso', e.target.value)}
              disabled={!isFormMode}
            />
            <TextInput
              label="Peso (kg):"
              type="number"
              value={formData.peso || ''}
              onChange={(e) => handleChange('peso', e.target.value)}
              disabled={!isFormMode}
            />
            <TextInput
              label="Talla (cm):"
              type="number"
              value={formData.talla || ''}
              onChange={(e) => handleChange('talla', e.target.value)}
              disabled={!isFormMode}
            />
          </div>
        </section>

        {/* 3. PIEL Y ANEXOS */}
        <section>
          <h3 className="text-[var(--color-primary)] font-bold text-lg border-b-2 border-gray-100 mb-6 pb-2 uppercase tracking-wide">
            Piel y Anexos
          </h3>

          <div className="mb-6 max-w-md">
            <TextInput
              label="Color (piel):"
              value={formData.pielColor || ''}
              onChange={(e) => handleChange('pielColor', e.target.value)}
              disabled={!isFormMode}
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="min-w-[200px]">
                <RadioGroup
                  label="Humedad:"
                  name="humedad"
                  options={['Conservada', 'Disminuida']}
                  value={formData.pielHumedad}
                  onChange={(v) => handleChange('pielHumedad', v)}
                  disabled={!isFormMode}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="min-w-[200px]">
                <RadioGroup
                  label="Lesiones:"
                  name="lesiones"
                  options={['Ausentes', 'Presentes']}
                  value={formData.pielLesiones}
                  onChange={(v) => handleChange('pielLesiones', v)}
                  disabled={!isFormMode}
                />
              </div>
              {formData.pielLesiones === 'Presentes' && (
                <div className="flex-1 w-full pt-2">
                  <TextInput
                    placeholder="Describa lesiones..."
                    value={formData.pielLesionesObs || ''}
                    onChange={(e) =>
                      handleChange('pielLesionesObs', e.target.value)
                    }
                    disabled={!isFormMode}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="min-w-[200px]">
                <RadioGroup
                  label="Anexos:"
                  name="anexos"
                  options={['Sin Alteraciones', 'Alterados']}
                  value={formData.pielAnexos}
                  onChange={(v) => handleChange('pielAnexos', v)}
                  disabled={!isFormMode}
                />
              </div>
              {formData.pielAnexos === 'Alterados' && (
                <div className="flex-1 w-full pt-2">
                  <TextInput
                    placeholder="Describa alteraciones..."
                    value={formData.pielAnexosObs || ''}
                    onChange={(e) =>
                      handleChange('pielAnexosObs', e.target.value)
                    }
                    disabled={!isFormMode}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. TEJIDO CELULAR SUBCUTÁNEO */}
        <section>
          <h3 className="text-[var(--color-primary)] font-bold text-lg border-b-2 border-gray-100 mb-6 pb-2 uppercase tracking-wide">
            Tejido Celular Subcutáneo
          </h3>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="min-w-[200px]">
                <RadioGroup
                  label="Distribución:"
                  name="distribucion"
                  options={['Adecuada', 'No adecuada']}
                  value={formData.tcsDistribucion}
                  onChange={(v) => handleChange('tcsDistribucion', v)}
                  disabled={!isFormMode}
                />
              </div>
              {formData.tcsDistribucion === 'No adecuada' && (
                <div className="flex-1 w-full pt-2">
                  <TextInput
                    placeholder="Describa..."
                    value={formData.tcsDistribucionObs || ''}
                    onChange={(e) =>
                      handleChange('tcsDistribucionObs', e.target.value)
                    }
                    disabled={!isFormMode}
                  />
                </div>
              )}
            </div>

            <RadioGroup
              label="Cantidad:"
              name="cantidad"
              options={['Regular', 'Escasa', 'Abundante']}
              value={formData.tcsCantidad}
              onChange={(v) => handleChange('tcsCantidad', v)}
              disabled={!isFormMode}
            />

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="min-w-[200px]">
                <RadioGroup
                  label="Ganglios:"
                  name="ganglios"
                  options={['No palpables', 'Palpables']}
                  value={formData.ganglios}
                  onChange={(v) => handleChange('ganglios', v)}
                  disabled={!isFormMode}
                />
              </div>
              {formData.ganglios === 'Palpables' && (
                <div className="flex-1 w-full pt-2">
                  <TextInput
                    placeholder="Describa hallazgos..."
                    value={formData.gangliosObs || ''}
                    onChange={(e) =>
                      handleChange('gangliosObs', e.target.value)
                    }
                    disabled={!isFormMode}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Botones de Acción (Solo visibles en modo edición) */}
        {isFormMode && (
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                setViewMode();
                navigate(-1); // Opcional: Si quieres que cancelar regrese al menú anterior
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
