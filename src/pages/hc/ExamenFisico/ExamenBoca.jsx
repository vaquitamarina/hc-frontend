import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useExamBoca, useMutateExamBoca } from '@hooks/useExamenFisico';
import { useForm } from '@stores/useForm';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';
import FormField from '@ui/FormField/FormField';
import SectionTitle from '@ui/SectionTitle';
import YesNoGroup from '@ui/YesNoGroup';

// --- COMPONENTES AUXILIARES EDICIÓN ---

// RadioGroup Local para control total de estilos (disabled)
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

const SoftTissueRowEdit = ({
  title,
  fieldPrefix,
  data,
  onChange,
  disabled,
}) => (
  <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
    <h4 className="font-bold text-gray-700 mb-3 uppercase text-sm border-b pb-2">
      {title}
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          className="block text-xs font-bold text-green-700 mb-1"
          htmlFor={`${fieldPrefix}Sin`}
        >
          SIN PRESENCIA DE LESIONES APARENTES
        </label>
        <textarea
          id={`${fieldPrefix}Sin`}
          className="w-full p-3 border border-green-200 rounded focus:ring-1 focus:ring-green-500 outline-none text-sm h-20 resize-none bg-green-50/30 disabled:bg-gray-100 disabled:text-gray-500"
          placeholder="Describa características normales..."
          value={data[`${fieldPrefix}Sin`] || ''}
          onChange={(e) => onChange(`${fieldPrefix}Sin`, e.target.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <label
          className="block text-xs font-bold text-red-700 mb-1"
          htmlFor={`${fieldPrefix}Con`}
        >
          LESIONES PRESENTES
        </label>
        <textarea
          id={`${fieldPrefix}Con`}
          className="w-full p-3 border border-red-200 rounded focus:ring-1 focus:ring-red-500 outline-none text-sm h-20 resize-none bg-red-50/30 disabled:bg-gray-100 disabled:text-gray-500"
          placeholder="Color, ubicación, forma, tamaño..."
          value={data[`${fieldPrefix}Con`] || ''}
          onChange={(e) => onChange(`${fieldPrefix}Con`, e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  </div>
);

const LateralidadBlockEdit = ({ title, prefix, data, onChange, disabled }) => (
  <div className="bg-white p-4 rounded-md border border-gray-200">
    <h5 className="font-bold text-sm mb-4 text-[var(--color-primary)] uppercase border-b pb-2">
      {title}
    </h5>
    <div className="flex flex-col gap-3 mb-4">
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

// --- COMPONENTES AUXILIARES VISTA (RESUMEN) ---

const SoftTissueRowView = ({ title, fieldPrefix, data }) => {
  const sin = data[`${fieldPrefix}Sin`];
  const con = data[`${fieldPrefix}Con`];
  // Solo mostramos si hay algo escrito
  if (!sin && !con) return null;

  return (
    <div className="mb-4 pb-4 border-b border-gray-100 last:border-0">
      <h4 className="font-bold text-gray-800 text-sm uppercase mb-2">
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sin && (
          <div className="bg-green-50 p-3 rounded border border-green-100">
            <span className="text-xs font-bold text-green-800 block mb-1">
              Sin Lesiones:
            </span>
            <p className="text-sm text-green-900">{sin}</p>
          </div>
        )}
        {con && (
          <div className="bg-red-50 p-3 rounded border border-red-100">
            <span className="text-xs font-bold text-red-800 block mb-1">
              Con Lesiones:
            </span>
            <p className="text-sm text-red-900">{con}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LateralidadBlockView = ({ title, prefix, data }) => (
  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
    <h5 className="font-bold text-sm mb-3 text-[var(--color-primary)] uppercase">
      {title}
    </h5>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Guía Canina:</span>
        <span className="font-medium">
          {data[`${prefix}GuiaCanina`] === true
            ? 'Sí'
            : data[`${prefix}GuiaCanina`] === false
              ? 'No'
              : '-'}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Función Grupo:</span>
        <span className="font-medium">
          {data[`${prefix}FuncionGrupo`] === true
            ? 'Sí'
            : data[`${prefix}FuncionGrupo`] === false
              ? 'No'
              : '-'}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Cont. Balance:</span>
        <span className="font-medium">
          {data[`${prefix}ContactoBalance`] === true
            ? 'Sí'
            : data[`${prefix}ContactoBalance`] === false
              ? 'No'
              : '-'}
        </span>
      </div>
      {data[`${prefix}Describa`] && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <span className="block text-xs text-gray-500 mb-1">Descripción:</span>
          <p className="text-gray-800">{data[`${prefix}Describa`]}</p>
        </div>
      )}
    </div>
  </div>
);

export default function ExamenBoca() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: examData, isLoading } = useExamBoca(id);
  const { mutate: saveExam, isPending } = useMutateExamBoca();
  const { isFormMode, setViewMode, setFormMode } = useForm();
  const [formData, setFormData] = useState({});

  // Determinamos si hay datos guardados (usando 'oclusionMolarDer' o si hay algún dato de tejido blando)
  const hasSavedData =
    examData &&
    Object.keys(examData).length > 0 &&
    (examData.oclusionMolarDer || examData.labiosSin || examData.labiosCon);

  useEffect(() => {
    if (examData) {
      setFormData(examData);
      // Si es nuevo (vacío), abrir editor automáticamente
      if (!hasSavedData) {
        setFormMode();
      }
    }
    // CLEANUP
    return () => {
      setViewMode();
    };
  }, [examData, hasSavedData, setFormMode, setViewMode]);

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

  const handleCancel = () => {
    if (hasSavedData) {
      setViewMode();
    } else {
      navigate(-1);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="w-full rounded-lg shadow-sm border border-gray-100 bg-white">
      {/* HEADER FIJO */}
      <div className="bg-[var(--color-primary)] text-white px-8 py-5 rounded-t-lg flex justify-between items-center">
        {/* IZQUIERDA */}
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold">Examen Clínico de la Boca</h2>
          <div className="h-8 w-px bg-white/30 hidden md:block"></div>
          <div className="flex flex-col justify-center">
            <span className="text-[11px] opacity-80 uppercase tracking-wider leading-tight">
              Historia Clínica Nº
            </span>
            <span className="text-lg font-bold leading-tight">HC-{id}</span>
          </div>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-md transition-colors text-sm font-medium cursor-pointer border border-white/30"
          >
            VOLVER
          </button>

          {hasSavedData && !isFormMode && (
            <button
              onClick={setFormMode}
              className="bg-white text-[var(--color-primary)] hover:bg-gray-100 px-6 py-2 rounded-md transition-colors text-sm font-bold tracking-wide cursor-pointer uppercase shadow-sm"
            >
              EDITAR
            </button>
          )}
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="p-8">
        {isFormMode ? (
          /* --- MODO EDICIÓN --- */
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* 1. TEJIDOS BLANDOS */}
            <section>
              <SectionTitle title="1. Tejidos Blandos" />
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <SoftTissueRowEdit
                  title="Labios"
                  fieldPrefix="labios"
                  data={formData}
                  onChange={handleChange}
                  disabled={!isFormMode}
                />
                <SoftTissueRowEdit
                  title="Vestíbulo"
                  fieldPrefix="vestibulo"
                  data={formData}
                  onChange={handleChange}
                  disabled={!isFormMode}
                />
                <SoftTissueRowEdit
                  title="Carrillos y Región Retromolar"
                  fieldPrefix="carrillos"
                  data={formData}
                  onChange={handleChange}
                  disabled={!isFormMode}
                />
                <SoftTissueRowEdit
                  title="Paladar Duro y Blando"
                  fieldPrefix="paladar"
                  data={formData}
                  onChange={handleChange}
                  disabled={!isFormMode}
                />
                <SoftTissueRowEdit
                  title="Orofaringe"
                  fieldPrefix="orofaringe"
                  data={formData}
                  onChange={handleChange}
                  disabled={!isFormMode}
                />
                <SoftTissueRowEdit
                  title="Piso de Boca"
                  fieldPrefix="pisoBoca"
                  data={formData}
                  onChange={handleChange}
                  disabled={!isFormMode}
                />
                <SoftTissueRowEdit
                  title="Lengua"
                  fieldPrefix="lengua"
                  data={formData}
                  onChange={handleChange}
                  disabled={!isFormMode}
                />
                <SoftTissueRowEdit
                  title="Encía"
                  fieldPrefix="encia"
                  data={formData}
                  onChange={handleChange}
                  disabled={!isFormMode}
                />
              </div>
            </section>

            {/* 2. OCLUSIÓN */}
            <section>
              <SectionTitle title="2. Oclusión" />
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-8">
                {/* RELACIÓN SAGITAL */}
                <div className="border-b-2 border-gray-100 pb-6">
                  <h4 className="font-bold text-[var(--color-primary)] text-lg mb-4">
                    Relación Sagital
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div className="bg-gray-50 p-4 rounded border border-gray-200">
                      <h5 className="font-bold text-center mb-4 text-gray-700">
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
                        disabled={!isFormMode}
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
                        disabled={!isFormMode}
                      />
                    </div>
                    <div className="bg-gray-50 p-4 rounded border border-gray-200">
                      <h5 className="font-bold text-center mb-4 text-gray-700">
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
                        disabled={!isFormMode}
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
                        disabled={!isFormMode}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <label
                      className="text-sm font-bold text-gray-700"
                      htmlFor="oclusionOverjet"
                    >
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
                      disabled={!isFormMode}
                    />
                    <span className="text-gray-500">mm</span>
                  </div>
                </div>

                {/* RELACIÓN TRANSVERSAL */}
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
                      onChange={(v) =>
                        handleChange('oclusionMordidaCruzada', v)
                      }
                      disabled={!isFormMode}
                    />
                    <YesNoGroup
                      label="Vestibuloclusión:"
                      value={formData.oclusionVestibuloclusion}
                      onChange={(val) =>
                        handleChange('oclusionVestibuloclusion', val)
                      }
                      disabled={!isFormMode}
                    />
                  </div>
                </div>

                {/* RELACIÓN VERTICAL */}
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
                        disabled={!isFormMode}
                      />
                      <span className="text-gray-500">mm</span>
                    </div>
                    <RadioGroup
                      label="Mordida Abierta:"
                      name="mordAbi"
                      options={[
                        'Sí',
                        'Anterior',
                        'Posterior',
                        'Localizada',
                        'No',
                      ]}
                      value={formData.oclusionMordidaAbierta}
                      onChange={(v) =>
                        handleChange('oclusionMordidaAbierta', v)
                      }
                      disabled={!isFormMode}
                    />
                    <YesNoGroup
                      label="Sobremordida:"
                      value={formData.oclusionSobremordida}
                      onChange={(val) =>
                        handleChange('oclusionSobremordida', val)
                      }
                      disabled={!isFormMode}
                    />
                    <YesNoGroup
                      label="Protrusión:"
                      value={formData.oclusionProtrusion}
                      onChange={(val) =>
                        handleChange('oclusionProtrusion', val)
                      }
                      disabled={!isFormMode}
                    />
                    <YesNoGroup
                      label="Guía Incisiva:"
                      value={formData.oclusionGuiaIncisiva}
                      onChange={(val) =>
                        handleChange('oclusionGuiaIncisiva', val)
                      }
                      disabled={!isFormMode}
                    />
                    <TextInput
                      label="Contacto Posterior (Describa):"
                      value={formData.oclusionContactoPosterior || ''}
                      onChange={(e) =>
                        handleChange(
                          'oclusionContactoPosterior',
                          e.target.value
                        )
                      }
                      disabled={!isFormMode}
                    />
                    <div className="md:col-span-2">
                      <TextInput
                        label="Otros:"
                        value={formData.oclusionVerticalOtros || ''}
                        onChange={(e) =>
                          handleChange('oclusionVerticalOtros', e.target.value)
                        }
                        disabled={!isFormMode}
                      />
                    </div>
                  </div>
                </div>

                {/* LATERALIDAD */}
                <div className="border-t-2 border-gray-100 pt-6">
                  <h4 className="font-bold text-[var(--color-primary)] text-lg mb-4">
                    Lateralidad
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <LateralidadBlockEdit
                      title="Derecha"
                      prefix="latDer"
                      data={formData}
                      onChange={handleChange}
                      disabled={!isFormMode}
                    />
                    <LateralidadBlockEdit
                      title="Izquierda"
                      prefix="latIzq"
                      data={formData}
                      onChange={handleChange}
                      disabled={!isFormMode}
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
              <Button variant="secondary" type="button" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </form>
        ) : (
          /* --- MODO RESUMEN (VISTA) --- */
          <div className="flex flex-col gap-10 text-gray-800">
            <section>
              <SectionTitle title="1. Tejidos Blandos" />
              <div className="grid grid-cols-1 gap-4">
                <SoftTissueRowView
                  title="Labios"
                  fieldPrefix="labios"
                  data={formData}
                />
                <SoftTissueRowView
                  title="Vestíbulo"
                  fieldPrefix="vestibulo"
                  data={formData}
                />
                <SoftTissueRowView
                  title="Carrillos y Región Retromolar"
                  fieldPrefix="carrillos"
                  data={formData}
                />
                <SoftTissueRowView
                  title="Paladar Duro y Blando"
                  fieldPrefix="paladar"
                  data={formData}
                />
                <SoftTissueRowView
                  title="Orofaringe"
                  fieldPrefix="orofaringe"
                  data={formData}
                />
                <SoftTissueRowView
                  title="Piso de Boca"
                  fieldPrefix="pisoBoca"
                  data={formData}
                />
                <SoftTissueRowView
                  title="Lengua"
                  fieldPrefix="lengua"
                  data={formData}
                />
                <SoftTissueRowView
                  title="Encía"
                  fieldPrefix="encia"
                  data={formData}
                />
                {/* Si no hay datos en ninguno */}
                {!formData.labiosSin &&
                  !formData.labiosCon &&
                  !formData.vestibuloSin &&
                  !formData.vestibuloCon && (
                    <p className="text-gray-500 italic p-4">
                      No hay observaciones registradas en tejidos blandos.
                    </p>
                  )}
              </div>
            </section>

            <section>
              <SectionTitle title="2. Oclusión" />

              {/* Relación Sagital */}
              <div className="mb-6">
                <h4 className="font-bold text-[var(--color-primary)] border-b border-gray-200 mb-4 pb-1">
                  Relación Sagital
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="p-4 bg-gray-50 rounded border border-gray-100">
                    <h5 className="font-bold text-center text-sm text-gray-700 mb-2">
                      DERECHA
                    </h5>
                    <FormField
                      label="Molar"
                      value={formData.oclusionMolarDer}
                    />
                    <div className="mt-2">
                      <FormField
                        label="Canina"
                        value={formData.oclusionCaninaDer}
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded border border-gray-100">
                    <h5 className="font-bold text-center text-sm text-gray-700 mb-2">
                      IZQUIERDA
                    </h5>
                    <FormField
                      label="Molar"
                      value={formData.oclusionMolarIzq}
                    />
                    <div className="mt-2">
                      <FormField
                        label="Canina"
                        value={formData.oclusionCaninaIzq}
                      />
                    </div>
                  </div>
                </div>
                <FormField
                  label="Overjet (OJ)"
                  value={
                    formData.oclusionOverjet
                      ? `${formData.oclusionOverjet} mm`
                      : '-'
                  }
                />
              </div>

              {/* Relación Transversal */}
              <div className="mb-6">
                <h4 className="font-bold text-[var(--color-primary)] border-b border-gray-200 mb-4 pb-1">
                  Relación Transversal
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Mordida Cruzada Post."
                    value={formData.oclusionMordidaCruzada}
                  />
                  <FormField
                    label="Vestibuloclusión"
                    value={
                      formData.oclusionVestibuloclusion === true
                        ? 'Sí'
                        : formData.oclusionVestibuloclusion === false
                          ? 'No'
                          : '-'
                    }
                  />
                </div>
              </div>

              {/* Relación Vertical */}
              <div className="mb-6">
                <h4 className="font-bold text-[var(--color-primary)] border-b border-gray-200 mb-4 pb-1">
                  Relación Vertical
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    label="Overbite (OB)"
                    value={
                      formData.oclusionOverbite
                        ? `${formData.oclusionOverbite} mm`
                        : '-'
                    }
                  />
                  <FormField
                    label="Mordida Abierta"
                    value={formData.oclusionMordidaAbierta}
                  />
                  <FormField
                    label="Sobremordida"
                    value={
                      formData.oclusionSobremordida === true
                        ? 'Sí'
                        : formData.oclusionSobremordida === false
                          ? 'No'
                          : '-'
                    }
                  />
                  <FormField
                    label="Protrusión"
                    value={
                      formData.oclusionProtrusion === true
                        ? 'Sí'
                        : formData.oclusionProtrusion === false
                          ? 'No'
                          : '-'
                    }
                  />
                  <FormField
                    label="Guía Incisiva"
                    value={
                      formData.oclusionGuiaIncisiva === true
                        ? 'Sí'
                        : formData.oclusionGuiaIncisiva === false
                          ? 'No'
                          : '-'
                    }
                  />
                  <FormField
                    label="Cont. Posterior"
                    value={formData.oclusionContactoPosterior}
                  />
                  <div className="col-span-full">
                    <FormField
                      label="Otros"
                      value={formData.oclusionVerticalOtros}
                    />
                  </div>
                </div>
              </div>

              {/* Lateralidad */}
              <div>
                <h4 className="font-bold text-[var(--color-primary)] border-b border-gray-200 mb-4 pb-1">
                  Lateralidad
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LateralidadBlockView
                    title="Derecha"
                    prefix="latDer"
                    data={formData}
                  />
                  <LateralidadBlockView
                    title="Izquierda"
                    prefix="latIzq"
                    data={formData}
                  />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
