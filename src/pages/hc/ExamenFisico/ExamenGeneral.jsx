import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useGeneralExam, useMutateGeneralExam } from '@hooks/useExamenFisico';
import { useForm } from '@stores/useForm';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';
import FormField from '@ui/FormField/FormField';

// Componente reutilizable para Radio Buttons
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
          className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-60' : ''}`}
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
  const { isFormMode, setViewMode, setFormMode } = useForm();

  const [formData, setFormData] = useState({});

  // Cargar datos al iniciar
  useEffect(() => {
    if (examData) setFormData(examData);
    // Si no hay datos previos, activamos modo edición automáticamente
    if (examData && Object.keys(examData).length === 0 && !isFormMode) {
      setFormMode();
    }
  }, [examData, isFormMode, setFormMode]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveExam(
      { idHistory: id, data: formData },
      {
        onSuccess: () => {
          // Volver al menú de selección al guardar? O quedarse aquí?
          // Por ahora nos quedamos en modo vista
          setViewMode();
        },
        onError: () => alert('Error al guardar'),
      }
    );
  };

  if (isLoading)
    return <div className="p-8 text-center">Cargando examen...</div>;

  // --- MODO VISTA (LECTURA) ---
  if (!isFormMode) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Examen General
          </h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Volver
            </Button>
            <Button onClick={setFormMode}>Editar</Button>
          </div>
        </div>

        {/* Resumen de datos guardados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <FormField
            label="Posición"
            value={formData.posicion}
            isFormMode={false}
          />
          <FormField
            label="Facies"
            value={`${formData.facies || '-'} ${formData.faciesObs ? `(${formData.faciesObs})` : ''}`}
            isFormMode={false}
          />
          <FormField
            label="P.A."
            value={formData.presionArterial}
            isFormMode={false}
          />
          <FormField
            label="Peso"
            value={`${formData.peso || '-'} kg`}
            isFormMode={false}
          />
          <div className="col-span-2 mt-4">
            <h4 className="font-bold text-[var(--color-primary)] border-b mb-2">
              Observaciones Piel y TCS
            </h4>
            <p className="text-gray-700">
              {formData.pielLesiones === 'Presentes'
                ? `Lesiones: ${formData.pielLesionesObs}`
                : 'Sin lesiones cutáneas reportadas.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- MODO EDICIÓN ---
  return (
    <form onSubmit={handleSubmit} className="bg-[#E0E8EB] p-2 rounded-lg">
      {/* Header estilo navegación */}
      <div className="bg-[var(--color-primary)] text-white p-3 rounded-t-lg flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold m-0">Examen general</h2>
      </div>

      <div className="px-4 pb-8 flex flex-col gap-8">
        {/* 1. ASPECTO GENERAL */}
        <section>
          <h3 className="text-[var(--color-primary)] font-bold text-lg border-b-2 border-gray-300 mb-4 pb-1">
            Aspecto General
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            <RadioGroup
              label="Posición:"
              name="posicion"
              options={['Pie', 'Sentado', 'De cúbito']}
              value={formData.posicion}
              onChange={(v) => handleChange('posicion', v)}
            />

            <RadioGroup
              label="Actitud:"
              name="actitud"
              options={['Activa', 'Pasiva']}
              value={formData.actitud}
              onChange={(v) => handleChange('actitud', v)}
            />

            <RadioGroup
              label="Deambulación:"
              name="deambulacion"
              options={['Embásica', 'Disbásica', 'Abásica']}
              value={formData.deambulacion}
              onChange={(v) => handleChange('deambulacion', v)}
            />

            <div>
              <RadioGroup
                label="Facies:"
                name="facies"
                options={['No característica', 'Característica']}
                value={formData.facies}
                onChange={(v) => handleChange('facies', v)}
              />
              {formData.facies === 'Característica' && (
                <TextInput
                  placeholder="Describa característica..."
                  value={formData.faciesObs || ''}
                  onChange={(e) => handleChange('faciesObs', e.target.value)}
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="conciencia-input"
              className="block font-bold text-[var(--color-text)] mb-2 text-sm"
            >
              Conciencia (G° de conciencia, Orientación, Percepción,
              Inteligencia...):
            </label>
            <textarea
              id="conciencia-input"
              className="w-full p-3 border-2 border-[var(--color-secondary-soft)] rounded-[var(--radius-md)] h-24 resize-none focus:border-[var(--color-primary)] outline-none bg-white"
              value={formData.conciencia || ''}
              onChange={(e) => handleChange('conciencia', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mt-4">
            <RadioGroup
              label="Constitución:"
              name="constitucion"
              options={['Pícnico', 'Asténico', 'Normotipo']}
              value={formData.constitucion}
              onChange={(v) => handleChange('constitucion', v)}
            />
            <RadioGroup
              label="Estado nutritivo:"
              name="estadoNutritivo"
              options={['Adecuado', 'No adecuado']}
              value={formData.estadoNutritivo}
              onChange={(v) => handleChange('estadoNutritivo', v)}
            />
          </div>
        </section>

        {/* 2. SIGNOS VITALES (Input Grid) */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <TextInput
              label="Temperatura:"
              value={formData.temperatura || ''}
              onChange={(e) => handleChange('temperatura', e.target.value)}
            />
            <TextInput
              label="P.A.:"
              value={formData.presionArterial || ''}
              onChange={(e) => handleChange('presionArterial', e.target.value)}
            />
            <TextInput
              label="F.R.:"
              value={formData.frecuenciaRespiratoria || ''}
              onChange={(e) =>
                handleChange('frecuenciaRespiratoria', e.target.value)
              }
            />
            <TextInput
              label="Pulso:"
              value={formData.pulso || ''}
              onChange={(e) => handleChange('pulso', e.target.value)}
            />
            <TextInput
              label="Peso (kg):"
              type="number"
              value={formData.peso || ''}
              onChange={(e) => handleChange('peso', e.target.value)}
            />
            <TextInput
              label="Talla (cm):"
              type="number"
              value={formData.talla || ''}
              onChange={(e) => handleChange('talla', e.target.value)}
            />
          </div>
        </section>

        {/* 3. PIEL Y ANEXOS */}
        <section>
          <h3 className="text-[var(--color-primary)] font-bold text-lg border-b-2 border-gray-300 mb-4 pb-1">
            Piel y Anexos
          </h3>

          <div className="mb-4">
            <TextInput
              label="Color (piel):"
              value={formData.pielColor || ''}
              onChange={(e) => handleChange('pielColor', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="min-w-[150px]">
                <RadioGroup
                  label="Humedad:"
                  name="humedad"
                  options={['Conservada', 'Disminuida']}
                  value={formData.pielHumedad}
                  onChange={(v) => handleChange('pielHumedad', v)}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="min-w-[150px]">
                <RadioGroup
                  label="Lesiones:"
                  name="lesiones"
                  options={['Ausentes', 'Presentes']}
                  value={formData.pielLesiones}
                  onChange={(v) => handleChange('pielLesiones', v)}
                />
              </div>
              {formData.pielLesiones === 'Presentes' && (
                <div className="flex-1 w-full">
                  <TextInput
                    placeholder="Describa lesiones..."
                    value={formData.pielLesionesObs || ''}
                    onChange={(e) =>
                      handleChange('pielLesionesObs', e.target.value)
                    }
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="min-w-[150px]">
                <RadioGroup
                  label="Anexos:"
                  name="anexos"
                  options={['Sin Alteraciones', 'Alterados']}
                  value={formData.pielAnexos}
                  onChange={(v) => handleChange('pielAnexos', v)}
                />
              </div>
              {formData.pielAnexos === 'Alterados' && (
                <div className="flex-1 w-full">
                  <TextInput
                    placeholder="Describa alteraciones..."
                    value={formData.pielAnexosObs || ''}
                    onChange={(e) =>
                      handleChange('pielAnexosObs', e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. TEJIDO CELULAR SUBCUTÁNEO */}
        <section>
          <h3 className="text-[var(--color-primary)] font-bold text-lg border-b-2 border-gray-300 mb-4 pb-1">
            Tejido Celular Subcutáneo
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="min-w-[150px]">
                <RadioGroup
                  label="Distribución:"
                  name="distribucion"
                  options={['Adecuada', 'No adecuada']}
                  value={formData.tcsDistribucion}
                  onChange={(v) => handleChange('tcsDistribucion', v)}
                />
              </div>
              {formData.tcsDistribucion === 'No adecuada' && (
                <div className="flex-1 w-full">
                  <TextInput
                    placeholder="Describa..."
                    value={formData.tcsDistribucionObs || ''}
                    onChange={(e) =>
                      handleChange('tcsDistribucionObs', e.target.value)
                    }
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
            />

            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="min-w-[150px]">
                <RadioGroup
                  label="Ganglios:"
                  name="ganglios"
                  options={['No palpables', 'Palpables']}
                  value={formData.ganglios}
                  onChange={(v) => handleChange('ganglios', v)}
                />
              </div>
              {formData.ganglios === 'Palpables' && (
                <div className="flex-1 w-full">
                  <TextInput
                    placeholder="Describa hallazgos..."
                    value={formData.gangliosObs || ''}
                    onChange={(e) =>
                      handleChange('gangliosObs', e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              setViewMode();
              navigate(-1);
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </div>
    </form>
  );
}
