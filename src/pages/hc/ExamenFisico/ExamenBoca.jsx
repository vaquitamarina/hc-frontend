import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useExamBoca, useMutateExamBoca } from '@hooks/useExamenFisico';
import { useForm } from '@stores/useForm';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';
import FormField from '@ui/FormField/FormField';
import RadioGroup from '@ui/RadioGroup';
import SectionTitle from '@ui/SectionTitle';
import YesNoGroup from '@ui/YesNoGroup';

// --- COMPONENTES AUXILIARES ---
const SoftTissueRow = ({ title, fieldPrefix, data, onChange, disabled }) => (
  <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
    <h4 className="font-bold text-gray-700 mb-3 uppercase text-sm">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-xs font-bold text-green-600 mb-1">
          SIN PRESENCIA DE LESIONES APARENTES
          <textarea
            className="w-full p-2 border rounded focus:ring-1 ring-green-500 outline-none text-sm h-20 resize-none bg-green-50/50"
            placeholder="Describa características normales..."
            value={data[`${fieldPrefix}Sin`] || ''}
            onChange={(e) => onChange(`${fieldPrefix}Sin`, e.target.value)}
            disabled={disabled}
          />
        </label>
      </div>
      <div>
        <label className="block text-xs font-bold text-red-600 mb-1">
          LESIONES PRESENTES
          <textarea
            className="w-full p-2 border rounded focus:ring-1 ring-red-500 outline-none text-sm h-20 resize-none bg-red-50/50"
            placeholder="Color, ubicación, forma, tamaño..."
            value={data[`${fieldPrefix}Con`] || ''}
            onChange={(e) => onChange(`${fieldPrefix}Con`, e.target.value)}
            disabled={disabled}
          />
        </label>
      </div>
    </div>
  </div>
);

const LateralidadBlock = ({ title, prefix, data, onChange, disabled }) => (
  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
    <h5 className="font-bold text-sm mb-4 text-[var(--color-primary)] uppercase border-b pb-2">
      {title}
    </h5>
    <div className="flex flex-col gap-1 mb-4">
      <YesNoGroup
        label="Guía Canina:"
        value={data[`${prefix}GuiaCanina`]}
        onChange={(val) => onChange(`${prefix}GuiaCanina`, val)}
        disabled={disabled}
      />
      <YesNoGroup
        label="Función de Grupo:"
        value={data[`${prefix}FuncionGrupo`]}
        onChange={(val) => onChange(`${prefix}FuncionGrupo`, val)}
        disabled={disabled}
      />
      <YesNoGroup
        label="Contacto de Balance:"
        value={data[`${prefix}ContactoBalance`]}
        onChange={(val) => onChange(`${prefix}ContactoBalance`, val)}
        disabled={disabled}
      />
    </div>
    <TextInput
      label="Describa:"
      value={data[`${prefix}Describa`] || ''}
      onChange={(e) => onChange(`${prefix}Describa`, e.target.value)}
      disabled={disabled}
    />
  </div>
);

export default function ExamenBoca() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: examData, isLoading } = useExamBoca(id);
  const { mutate: saveExam, isPending } = useMutateExamBoca();
  const { isFormMode, setViewMode, setFormMode } = useForm();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (examData) setFormData(examData);
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
          alert('Examen guardado correctamente');
          setViewMode();
        },
        onError: () => alert('Error al guardar'),
      }
    );
  };

  if (isLoading) return <div className="p-8 text-center">Cargando...</div>;

  if (!isFormMode) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Examen Clínico de la Boca
          </h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Volver
            </Button>
            <Button onClick={setFormMode}>Editar</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <p className="text-gray-500 italic">Modo lectura simplificado.</p>
          <FormField
            label="Relación Molar Der"
            value={formData.oclusionMolarDer}
            isFormMode={false}
          />
          <FormField
            label="Overjet"
            value={`${formData.oclusionOverjet || '-'} mm`}
            isFormMode={false}
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#E0E8EB] p-2 rounded-lg">
      <div className="bg-[var(--color-primary)] text-white p-3 rounded-t-lg flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold m-0">Examen Clínico de la Boca</h2>
      </div>

      <div className="px-4 pb-8">
        {/* 1. TEJIDOS BLANDOS */}
        <SectionTitle title="1. Tejidos Blandos" />
        <SoftTissueRow
          title="Labios"
          fieldPrefix="labios"
          data={formData}
          onChange={handleChange}
        />
        <SoftTissueRow
          title="Vestíbulo"
          fieldPrefix="vestibulo"
          data={formData}
          onChange={handleChange}
        />
        <SoftTissueRow
          title="Carrillos y Región Retromolar"
          fieldPrefix="carrillos"
          data={formData}
          onChange={handleChange}
        />
        <SoftTissueRow
          title="Paladar Duro y Blando"
          fieldPrefix="paladar"
          data={formData}
          onChange={handleChange}
        />
        <SoftTissueRow
          title="Orofaringe"
          fieldPrefix="orofaringe"
          data={formData}
          onChange={handleChange}
        />
        <SoftTissueRow
          title="Piso de Boca"
          fieldPrefix="pisoBoca"
          data={formData}
          onChange={handleChange}
        />
        <SoftTissueRow
          title="Lengua"
          fieldPrefix="lengua"
          data={formData}
          onChange={handleChange}
        />
        <SoftTissueRow
          title="Encía"
          fieldPrefix="encia"
          data={formData}
          onChange={handleChange}
        />

        {/* 2. OCLUSIÓN */}
        <SectionTitle title="2. Oclusión" />

        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-8">
          {/* GRUPO 1: RELACIÓN SAGITAL */}
          <div className="border-b-2 border-gray-100 pb-6">
            <h4 className="font-bold text-[var(--color-primary)] text-lg mb-4">
              Relación Sagital
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="bg-gray-50 p-4 rounded border">
                <h5 className="font-bold text-center mb-4 text-gray-600">
                  DERECHA
                </h5>
                <RadioGroup
                  label="Relación Molar"
                  name="molDer"
                  options={[
                    'Clase I',
                    'Clase II',
                    'Clase III',
                    'No registrable',
                  ]}
                  value={formData.oclusionMolarDer}
                  onChange={(v) => handleChange('oclusionMolarDer', v)}
                />
                <RadioGroup
                  label="Relación Canina"
                  name="canDer"
                  options={[
                    'Clase I',
                    'Clase II',
                    'Clase III',
                    'No registrable',
                  ]}
                  value={formData.oclusionCaninaDer}
                  onChange={(v) => handleChange('oclusionCaninaDer', v)}
                />
              </div>
              <div className="bg-gray-50 p-4 rounded border">
                <h5 className="font-bold text-center mb-4 text-gray-600">
                  IZQUIERDA
                </h5>
                <RadioGroup
                  label="Relación Molar"
                  name="molIzq"
                  options={[
                    'Clase I',
                    'Clase II',
                    'Clase III',
                    'No registrable',
                  ]}
                  value={formData.oclusionMolarIzq}
                  onChange={(v) => handleChange('oclusionMolarIzq', v)}
                />
                <RadioGroup
                  label="Relación Canina"
                  name="canIzq"
                  options={[
                    'Clase I',
                    'Clase II',
                    'Clase III',
                    'No registrable',
                  ]}
                  value={formData.oclusionCaninaIzq}
                  onChange={(v) => handleChange('oclusionCaninaIzq', v)}
                />
              </div>
            </div>

            <div className="flex gap-8 flex-wrap items-center border-t pt-4">
              <div className="flex gap-4 items-center">
                <label className="text-sm font-bold" htmlFor="oclusionOverjet">
                  Overjet (OJ):
                </label>
                <input
                  id="oclusionOverjet"
                  type="number"
                  className="border rounded p-2 w-24"
                  value={formData.oclusionOverjet || ''}
                  onChange={(e) =>
                    handleChange('oclusionOverjet', e.target.value)
                  }
                />
                <span className="text-gray-500">mm</span>
              </div>
            </div>
          </div>

          {/* GRUPO 2: RELACIÓN TRANSVERSAL */}
          <div className="border-b-2 border-gray-100 pb-6">
            <h4 className="font-bold text-[var(--color-primary)] text-lg mb-4">
              Relación Transversal
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RadioGroup
                label="Mordida cruzada posterior:"
                name="mordCruz"
                options={['Sí', 'Unilateral', 'Bilateral', 'No']}
                value={formData.oclusionMordidaCruzada}
                onChange={(v) => handleChange('oclusionMordidaCruzada', v)}
              />
              <YesNoGroup
                label="Vestibuloclusión:"
                value={formData.oclusionVestibuloclusion}
                onChange={(val) =>
                  handleChange('oclusionVestibuloclusion', val)
                }
              />
            </div>
          </div>

          {/* GRUPO 3: RELACIÓN VERTICAL */}
          <div>
            <h4 className="font-bold text-[var(--color-primary)] text-lg mb-4">
              Relación Vertical
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="flex items-center gap-4">
                <label
                  className="font-bold text-gray-700"
                  htmlFor="oclusionOverbite"
                >
                  Overbite (OB):
                </label>
                <input
                  id="oclusionOverbite"
                  type="number"
                  className="border rounded p-2 w-24"
                  value={formData.oclusionOverbite || ''}
                  onChange={(e) =>
                    handleChange('oclusionOverbite', e.target.value)
                  }
                />
                <span className="text-gray-500">mm</span>
              </div>

              <RadioGroup
                label="Mordida Abierta:"
                name="mordAbi"
                options={['Sí', 'Anterior', 'Posterior', 'Localizada', 'No']}
                value={formData.oclusionMordidaAbierta}
                onChange={(v) => handleChange('oclusionMordidaAbierta', v)}
              />

              <YesNoGroup
                label="Sobremordida:"
                value={formData.oclusionSobremordida}
                onChange={(val) => handleChange('oclusionSobremordida', val)}
              />

              <YesNoGroup
                label="Protrusión:"
                value={formData.oclusionProtrusion}
                onChange={(val) => handleChange('oclusionProtrusion', val)}
              />

              {/* ✅ CORREGIDO: GUÍA INCISIVA AHORA ES SÍ/NO */}
              <YesNoGroup
                label="Guía Incisiva:"
                value={formData.oclusionGuiaIncisiva}
                onChange={(val) => handleChange('oclusionGuiaIncisiva', val)}
              />

              <TextInput
                label="Contacto Posterior (Describa):"
                value={formData.oclusionContactoPosterior || ''}
                onChange={(e) =>
                  handleChange('oclusionContactoPosterior', e.target.value)
                }
              />

              <div className="md:col-span-2">
                <TextInput
                  label="Otros:"
                  value={formData.oclusionVerticalOtros || ''}
                  onChange={(e) =>
                    handleChange('oclusionVerticalOtros', e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* GRUPO 4: LATERALIDAD */}
          <div className="border-t-2 border-gray-100 pt-6">
            <h4 className="font-bold text-[var(--color-primary)] text-lg mb-4">
              Lateralidad
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LateralidadBlock
                title="Derecha"
                prefix="latDer"
                data={formData}
                onChange={handleChange}
              />
              <LateralidadBlock
                title="Izquierda"
                prefix="latIzq"
                data={formData}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

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
