import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useRegionalExam, useMutateRegionalExam } from '@hooks/useExamenFisico';
import { useForm } from '@stores/useForm';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';
import FormField from '@ui/FormField/FormField';

// Componente auxiliar para títulos de sección
const SectionTitle = ({ title }) => (
  <h3 className="text-[var(--color-primary)] font-bold text-lg border-b-2 border-gray-100 mb-6 pb-2 uppercase tracking-wide">
    {title}
  </h3>
);

// RadioGroup Local
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

// Componente para fila de movimientos ATM en EDICIÓN
const AtmMovementRowEdit = ({ label, prefix, data, onChange, disabled }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-3 border-b border-gray-100 last:border-0">
    <div className="font-medium text-gray-700">{label}</div>
    {['Dolor', 'Ruido', 'Salto'].map((type) => (
      <div key={type} className="flex items-center gap-4">
        <span className="text-sm text-gray-500 font-medium">{type}:</span>
        <div className="flex gap-3">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`${prefix}${type}`}
              checked={data[`${prefix}${type}`] === true}
              onChange={() => onChange(`${prefix}${type}`, true)}
              disabled={disabled}
              className="accent-[var(--color-primary)]"
            />
            <span className="text-sm">Si</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`${prefix}${type}`}
              checked={data[`${prefix}${type}`] === false}
              onChange={() => onChange(`${prefix}${type}`, false)}
              disabled={disabled}
              className="accent-[var(--color-primary)]"
            />
            <span className="text-sm">No</span>
          </label>
        </div>
      </div>
    ))}
  </div>
);

// Componente para fila de movimientos ATM en VISTA (Resumen)
const AtmMovementRowView = ({ label, prefix, data }) => {
  const getVal = (field) => {
    const val = data[field];
    if (val === true) return 'SÍ';
    if (val === false) return 'NO';
    return '-';
  };

  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-2 font-medium text-gray-700">{label}</td>
      <td className="py-2 text-center text-gray-600">
        {getVal(`${prefix}Dolor`)}
      </td>
      <td className="py-2 text-center text-gray-600">
        {getVal(`${prefix}Ruido`)}
      </td>
      <td className="py-2 text-center text-gray-600">
        {getVal(`${prefix}Salto`)}
      </td>
    </tr>
  );
};

export default function ExamenRegional() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: examData, isLoading } = useRegionalExam(id);
  const { mutate: saveExam, isPending } = useMutateRegionalExam();
  const { isFormMode, setFormMode, setViewMode } = useForm();

  const [formData, setFormData] = useState({});

  // Determinamos si ya existe información guardada (usando 'cabezaPosicion' como flag)
  const hasSavedData =
    examData && Object.keys(examData).length > 0 && examData.cabezaPosicion;

  useEffect(() => {
    if (examData) {
      setFormData(examData);

      // Si es nuevo (vacío), abrir editor automáticamente
      if (Object.keys(examData).length === 0 || !examData.cabezaPosicion) {
        setFormMode();
      }
    }

    // CLEANUP: Cerrar modo edición al salir
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
          alert('Examen Regional guardado correctamente');
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
          <h2 className="text-2xl font-bold">Examen Regional</h2>
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

      {/* CONTENIDO */}
      <div className="p-8">
        {isFormMode ? (
          /* --- MODO EDICIÓN --- */
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* 1. CABEZA */}
            <section>
              <SectionTitle title="1. Cabeza" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RadioGroup
                  label="Posición:"
                  name="cabezaPosicion"
                  options={['Erecta', 'Deflexión']}
                  value={formData.cabezaPosicion}
                  onChange={(v) => handleChange('cabezaPosicion', v)}
                  disabled={!isFormMode}
                />

                <div>
                  <RadioGroup
                    label="Mov. Anormales:"
                    name="cabezaMov"
                    options={['Tic', 'Temblor', 'Otros']}
                    value={formData.cabezaMovimientos}
                    onChange={(v) => handleChange('cabezaMovimientos', v)}
                    disabled={!isFormMode}
                  />
                  {formData.cabezaMovimientos === 'Otros' && (
                    <TextInput
                      placeholder="Especifique..."
                      value={formData.cabezaMovimientosObs || ''}
                      onChange={(e) =>
                        handleChange('cabezaMovimientosObs', e.target.value)
                      }
                      disabled={!isFormMode}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold mb-3 text-[var(--color-primary)]">
                    Cráneo
                  </h4>
                  <RadioGroup
                    label="Tamaño:"
                    name="craneoTam"
                    options={['Mesaticéfalo', 'Macrocéfalo', 'Microcéfalo']}
                    value={formData.craneoTamano}
                    onChange={(v) => handleChange('craneoTamano', v)}
                    disabled={!isFormMode}
                  />
                  <RadioGroup
                    label="Forma:"
                    name="craneoForma"
                    options={['Braquicéfalo', 'Mesocéfalo', 'Dolicocéfalo']}
                    value={formData.craneoForma}
                    onChange={(v) => handleChange('craneoForma', v)}
                    disabled={!isFormMode}
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold mb-3 text-[var(--color-primary)]">
                    Cara
                  </h4>
                  <RadioGroup
                    label="Forma de frente:"
                    name="caraFrente"
                    options={['Braquifacial', 'Mesofacial', 'Dolicofacial']}
                    value={formData.caraFormaFrente}
                    onChange={(v) => handleChange('caraFormaFrente', v)}
                    disabled={!isFormMode}
                  />
                  <RadioGroup
                    label="Forma de perfil:"
                    name="caraPerfil"
                    options={['Recto', 'Cóncavo', 'Convexo']}
                    value={formData.caraFormaPerfil}
                    onChange={(v) => handleChange('caraFormaPerfil', v)}
                    disabled={!isFormMode}
                  />
                </div>
              </div>
            </section>

            {/* 2. ÓRGANOS DE LOS SENTIDOS */}
            <section>
              <SectionTitle title="2. Órganos de los Sentidos" />

              {/* Ojos */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3 ml-1">Ojos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <RadioGroup
                      label="Implantación cejas/pestañas:"
                      name="ojosImp"
                      options={['Adecuada', 'Alterada']}
                      value={
                        formData.ojosCejasAdecuada === true
                          ? 'Adecuada'
                          : formData.ojosCejasAdecuada === false
                            ? 'Alterada'
                            : ''
                      }
                      onChange={(v) =>
                        handleChange('ojosCejasAdecuada', v === 'Adecuada')
                      }
                      disabled={!isFormMode}
                    />
                    {formData.ojosCejasAdecuada === false && (
                      <TextInput
                        placeholder="Especifique alteración..."
                        value={formData.ojosImplantacionObs || ''}
                        onChange={(e) =>
                          handleChange('ojosImplantacionObs', e.target.value)
                        }
                        disabled={!isFormMode}
                      />
                    )}
                  </div>

                  <RadioGroup
                    label="Escleróticas:"
                    name="ojosEsc"
                    options={['Limpias', 'Pigmentadas']}
                    value={formData.ojosEscleroticas}
                    onChange={(v) => handleChange('ojosEscleroticas', v)}
                    disabled={!isFormMode}
                  />

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm">
                      Agudeza visual conservada:
                    </span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="ojosAgu"
                          checked={formData.ojosAgudezaVisual === true}
                          onChange={() =>
                            handleChange('ojosAgudezaVisual', true)
                          }
                          disabled={!isFormMode}
                        />{' '}
                        Si
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="ojosAgu"
                          checked={formData.ojosAgudezaVisual === false}
                          onChange={() =>
                            handleChange('ojosAgudezaVisual', false)
                          }
                          disabled={!isFormMode}
                        />{' '}
                        No
                      </label>
                    </div>
                  </div>

                  <TextInput
                    label="Iris (Color):"
                    value={formData.ojosIrisColor || ''}
                    onChange={(e) =>
                      handleChange('ojosIrisColor', e.target.value)
                    }
                    disabled={!isFormMode}
                  />

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-[var(--color-primary)]">
                    <input
                      type="checkbox"
                      checked={formData.ojosArcoSenil || false}
                      onChange={(e) =>
                        handleChange('ojosArcoSenil', e.target.checked)
                      }
                      disabled={!isFormMode}
                      className="w-5 h-5 accent-[var(--color-primary)]"
                    />
                    Arco Senil
                  </label>
                </div>
              </div>

              {/* Nariz */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3 ml-1">Nariz</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <TextInput
                    label="Forma:"
                    value={formData.narizForma || ''}
                    onChange={(e) => handleChange('narizForma', e.target.value)}
                    disabled={!isFormMode}
                  />

                  <div className="flex flex-col gap-3">
                    {/* Permeables */}
                    <div className="flex items-center justify-between max-w-xs">
                      <span className="text-sm font-bold">Permeables:</span>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            name="narizPer"
                            checked={formData.narizPermeables === true}
                            onChange={() =>
                              handleChange('narizPermeables', true)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          Si
                        </label>{' '}
                        <label>
                          <input
                            type="radio"
                            name="narizPer"
                            checked={formData.narizPermeables === false}
                            onChange={() =>
                              handleChange('narizPermeables', false)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          No
                        </label>
                      </div>
                    </div>
                    {/* Secreciones */}
                    <div className="flex items-center justify-between max-w-xs">
                      <span className="text-sm font-bold">Secreciones:</span>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            name="narizSec"
                            checked={formData.narizSecreciones === true}
                            onChange={() =>
                              handleChange('narizSecreciones', true)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          Si
                        </label>{' '}
                        <label>
                          <input
                            type="radio"
                            name="narizSec"
                            checked={formData.narizSecreciones === false}
                            onChange={() =>
                              handleChange('narizSecreciones', false)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          No
                        </label>
                      </div>
                    </div>
                    {/* Senos */}
                    <div className="flex items-center justify-between max-w-xs">
                      <span className="text-sm font-bold">
                        Senos dolorosos:
                      </span>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            name="narizDol"
                            checked={formData.narizSenosDolorosos === true}
                            onChange={() =>
                              handleChange('narizSenosDolorosos', true)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          Si
                        </label>{' '}
                        <label>
                          <input
                            type="radio"
                            name="narizDol"
                            checked={formData.narizSenosDolorosos === false}
                            onChange={() =>
                              handleChange('narizSenosDolorosos', false)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Oídos */}
              <div>
                <h4 className="font-bold text-gray-700 mb-3 ml-1">Oídos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-bold">
                        Pabellones (Anomalías):
                      </span>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            name="oidosAno"
                            checked={
                              formData.oidosAnomaliasMorfologicas === false
                            }
                            onChange={() =>
                              handleChange('oidosAnomaliasMorfologicas', false)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          No
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="oidosAno"
                            checked={
                              formData.oidosAnomaliasMorfologicas === true
                            }
                            onChange={() =>
                              handleChange('oidosAnomaliasMorfologicas', true)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          Si
                        </label>
                      </div>
                    </div>
                    {formData.oidosAnomaliasMorfologicas === true && (
                      <TextInput
                        placeholder="Especifique anomalía..."
                        value={formData.oidosAnomaliasObs || ''}
                        onChange={(e) =>
                          handleChange('oidosAnomaliasObs', e.target.value)
                        }
                        disabled={!isFormMode}
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between max-w-xs">
                      <span className="text-sm font-bold">Secreciones:</span>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            name="oidosSec"
                            checked={formData.oidosSecreciones === true}
                            onChange={() =>
                              handleChange('oidosSecreciones', true)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          Si
                        </label>{' '}
                        <label>
                          <input
                            type="radio"
                            name="oidosSec"
                            checked={formData.oidosSecreciones === false}
                            onChange={() =>
                              handleChange('oidosSecreciones', false)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          No
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between max-w-xs">
                      <span className="text-sm font-bold">
                        Audición conservada:
                      </span>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            name="oidosAud"
                            checked={formData.oidosAudicionConservada === true}
                            onChange={() =>
                              handleChange('oidosAudicionConservada', true)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          Si
                        </label>{' '}
                        <label>
                          <input
                            type="radio"
                            name="oidosAud"
                            checked={formData.oidosAudicionConservada === false}
                            onChange={() =>
                              handleChange('oidosAudicionConservada', false)
                            }
                            disabled={!isFormMode}
                          />{' '}
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. ATM */}
            <section>
              <SectionTitle title="3. ATM" />
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-6">
                  <h4 className="font-bold text-gray-700 mb-2">
                    Trayectoria de Apertura
                  </h4>
                  <RadioGroup
                    label="Vista frontal:"
                    name="atmTray"
                    options={['Recta', 'Deflexión', 'Desviación']}
                    value={formData.atmTrayectoria}
                    onChange={(v) => handleChange('atmTrayectoria', v)}
                    disabled={!isFormMode}
                  />
                </div>

                {/* Movimientos (Tabla) */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-700 mb-4 pb-2 border-b">
                    Movimiento Mandibular
                  </h4>
                  <div className="flex flex-col">
                    <AtmMovementRowEdit
                      label="Lateralidad izquierda"
                      prefix="atmLatIzq"
                      data={formData}
                      onChange={handleChange}
                      disabled={!isFormMode}
                    />
                    <AtmMovementRowEdit
                      label="Lateralidad derecha"
                      prefix="atmLatDer"
                      data={formData}
                      onChange={handleChange}
                      disabled={!isFormMode}
                    />
                    <AtmMovementRowEdit
                      label="Protrusión"
                      prefix="atmProt"
                      data={formData}
                      onChange={handleChange}
                      disabled={!isFormMode}
                    />
                    <AtmMovementRowEdit
                      label="Apertura"
                      prefix="atmAper"
                      data={formData}
                      onChange={handleChange}
                      disabled={!isFormMode}
                    />
                    <AtmMovementRowEdit
                      label="Cierre"
                      prefix="atmCierre"
                      data={formData}
                      onChange={handleChange}
                      disabled={!isFormMode}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold">
                      Coordinación Mov. Condilar:
                    </span>
                    <div className="flex gap-3">
                      <label>
                        <input
                          type="radio"
                          name="atmCoord"
                          checked={formData.atmCoordinacionCondilar === true}
                          onChange={() =>
                            handleChange('atmCoordinacionCondilar', true)
                          }
                          disabled={!isFormMode}
                        />{' '}
                        Si
                      </label>{' '}
                      <label>
                        <input
                          type="radio"
                          name="atmCoord"
                          checked={formData.atmCoordinacionCondilar === false}
                          onChange={() =>
                            handleChange('atmCoordinacionCondilar', false)
                          }
                          disabled={!isFormMode}
                        />{' '}
                        No
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Apertura máxima:</span>
                    <input
                      type="number"
                      className="border rounded p-2 w-24"
                      value={formData.atmAperturaMaximaMm || ''}
                      onChange={(e) =>
                        handleChange('atmAperturaMaximaMm', e.target.value)
                      }
                      disabled={!isFormMode}
                    />{' '}
                    mm
                  </div>
                </div>
                <TextInput
                  label="Observaciones:"
                  value={formData.atmObservaciones || ''}
                  onChange={(e) =>
                    handleChange('atmObservaciones', e.target.value)
                  }
                  disabled={!isFormMode}
                />

                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-bold text-gray-700 mb-2">
                    Músculos Masticatorios (Dolor)
                  </h4>
                  <div className="flex flex-wrap gap-6 items-center">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="atmMusc"
                        checked={formData.atmMusculosDolor === false}
                        onChange={() => handleChange('atmMusculosDolor', false)}
                        disabled={!isFormMode}
                      />{' '}
                      Ausente
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="atmMusc"
                        checked={formData.atmMusculosDolor === true}
                        onChange={() => handleChange('atmMusculosDolor', true)}
                        disabled={!isFormMode}
                      />{' '}
                      Presente
                    </label>
                  </div>
                  {formData.atmMusculosDolor === true && (
                    <div className="flex gap-4 mt-2">
                      <select
                        className="border p-2 rounded"
                        value={formData.atmMusculosDolorGrado || ''}
                        onChange={(e) =>
                          handleChange('atmMusculosDolorGrado', e.target.value)
                        }
                        disabled={!isFormMode}
                      >
                        <option value="">Seleccione Grado</option>
                        <option value="Grado 1">Grado 1</option>
                        <option value="Grado 2">Grado 2</option>
                        <option value="Grado 3">Grado 3</option>
                      </select>
                      <TextInput
                        placeholder="Zona..."
                        className="flex-1"
                        value={formData.atmMusculosDolorZona || ''}
                        onChange={(e) =>
                          handleChange('atmMusculosDolorZona', e.target.value)
                        }
                        disabled={!isFormMode}
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 4. CUELLO */}
            <section>
              <SectionTitle title="4. Cuello" />
              <div className="grid grid-cols-1 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-bold w-24 text-gray-700">Forma:</span>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="cuelForm"
                      checked={formData.cuelloSimetrico === true}
                      onChange={() => handleChange('cuelloSimetrico', true)}
                      disabled={!isFormMode}
                    />{' '}
                    Simétrico
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="cuelForm"
                      checked={formData.cuelloSimetrico === false}
                      onChange={() => handleChange('cuelloSimetrico', false)}
                      disabled={!isFormMode}
                    />{' '}
                    No simétrico
                  </label>
                  {formData.cuelloSimetrico === false && (
                    <input
                      type="text"
                      placeholder="Detalle..."
                      className="border p-2 rounded flex-1 ml-4"
                      value={formData.cuelloSimetricoObs || ''}
                      onChange={(e) =>
                        handleChange('cuelloSimetricoObs', e.target.value)
                      }
                      disabled={!isFormMode}
                    />
                  )}
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-bold w-24 text-gray-700">
                    Movilidad:
                  </span>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="cuelMov"
                      checked={formData.cuelloMovilidadConservada === true}
                      onChange={() =>
                        handleChange('cuelloMovilidadConservada', true)
                      }
                      disabled={!isFormMode}
                    />{' '}
                    Conservada
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="cuelMov"
                      checked={formData.cuelloMovilidadConservada === false}
                      onChange={() =>
                        handleChange('cuelloMovilidadConservada', false)
                      }
                      disabled={!isFormMode}
                    />{' '}
                    Disminuida
                  </label>
                  {formData.cuelloMovilidadConservada === false && (
                    <input
                      type="text"
                      placeholder="Detalle..."
                      className="border p-2 rounded flex-1 ml-4"
                      value={formData.cuelloMovilidadObs || ''}
                      onChange={(e) =>
                        handleChange('cuelloMovilidadObs', e.target.value)
                      }
                      disabled={!isFormMode}
                    />
                  )}
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-bold w-24 text-gray-700">Laringe:</span>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="cuelLar"
                      checked={formData.laringeAlineada === true}
                      onChange={() => handleChange('laringeAlineada', true)}
                      disabled={!isFormMode}
                    />{' '}
                    Alineada
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="cuelLar"
                      checked={formData.laringeAlineada === false}
                      onChange={() => handleChange('laringeAlineada', false)}
                      disabled={!isFormMode}
                    />{' '}
                    No alineada
                  </label>
                  {formData.laringeAlineada === false && (
                    <input
                      type="text"
                      placeholder="Detalle..."
                      className="border p-2 rounded flex-1 ml-4"
                      value={formData.laringeAlineadaObs || ''}
                      onChange={(e) =>
                        handleChange('laringeAlineadaObs', e.target.value)
                      }
                      disabled={!isFormMode}
                    />
                  )}
                </div>

                <TextInput
                  label="Otros:"
                  value={formData.cuelloOtros || ''}
                  onChange={(e) => handleChange('cuelloOtros', e.target.value)}
                  disabled={!isFormMode}
                />
              </div>
            </section>

            <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-gray-100">
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
            {/* 1. CABEZA */}
            <section>
              <SectionTitle title="1. Cabeza" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  label="Posición"
                  value={formData.cabezaPosicion}
                  flex="1"
                />
                <FormField
                  label="Mov. Anormales"
                  value={
                    formData.cabezaMovimientos === 'Otros' &&
                    formData.cabezaMovimientosObs
                      ? `Otros (${formData.cabezaMovimientosObs})`
                      : formData.cabezaMovimientos
                  }
                  flex="1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold mb-3 text-sm text-[var(--color-primary)]">
                    CRÁNEO
                  </h4>
                  <div className="flex flex-col gap-3">
                    <FormField
                      label="Tamaño"
                      value={formData.craneoTamano}
                      flex="1"
                    />
                    <FormField
                      label="Forma"
                      value={formData.craneoForma}
                      flex="1"
                    />
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold mb-3 text-sm text-[var(--color-primary)]">
                    CARA
                  </h4>
                  <div className="flex flex-col gap-3">
                    <FormField
                      label="Frente"
                      value={formData.caraFormaFrente}
                      flex="1"
                    />
                    <FormField
                      label="Perfil"
                      value={formData.caraFormaPerfil}
                      flex="1"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. SENTIDOS */}
            <section>
              <SectionTitle title="2. Órganos de los Sentidos" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-1">
                  <h4 className="font-bold text-gray-700 mb-2">OJOS</h4>
                  <div className="flex flex-col gap-2">
                    <FormField
                      label="Implantación Cejas"
                      value={
                        formData.ojosCejasAdecuada
                          ? 'Adecuada'
                          : `Alterada ${formData.ojosImplantacionObs ? `(${formData.ojosImplantacionObs})` : ''}`
                      }
                    />
                    <FormField
                      label="Escleróticas"
                      value={formData.ojosEscleroticas}
                    />
                    <FormField
                      label="Agudeza Visual"
                      value={
                        formData.ojosAgudezaVisual ? 'Conservada' : 'No cons.'
                      }
                    />
                    <FormField
                      label="Arco Senil"
                      value={formData.ojosArcoSenil ? 'Presente' : 'Ausente'}
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <h4 className="font-bold text-gray-700 mb-2">NARIZ</h4>
                  <div className="flex flex-col gap-2">
                    <FormField label="Forma" value={formData.narizForma} />
                    <FormField
                      label="Permeables"
                      value={formData.narizPermeables ? 'Sí' : 'No'}
                    />
                    <FormField
                      label="Secreciones"
                      value={formData.narizSecreciones ? 'Sí' : 'No'}
                    />
                    <FormField
                      label="Senos Dolorosos"
                      value={formData.narizSenosDolorosos ? 'Sí' : 'No'}
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <h4 className="font-bold text-gray-700 mb-2">OÍDOS</h4>
                  <div className="flex flex-col gap-2">
                    <FormField
                      label="Anomalías"
                      value={
                        formData.oidosAnomaliasMorfologicas
                          ? `Sí ${formData.oidosAnomaliasObs ? `(${formData.oidosAnomaliasObs})` : ''}`
                          : 'No'
                      }
                    />
                    <FormField
                      label="Secreciones"
                      value={formData.oidosSecreciones ? 'Sí' : 'No'}
                    />
                    <FormField
                      label="Audición"
                      value={
                        formData.oidosAudicionConservada
                          ? 'Conservada'
                          : 'No cons.'
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 3. ATM (TABLA DE VISTA) */}
            <section>
              <SectionTitle title="3. ATM" />
              <div className="mb-4">
                <FormField
                  label="Trayectoria de Apertura"
                  value={formData.atmTrayectoria}
                />
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-200 mb-4">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-700 uppercase font-bold">
                    <tr>
                      <th className="py-2 px-4">Movimiento</th>
                      <th className="py-2 px-4 text-center">Dolor</th>
                      <th className="py-2 px-4 text-center">Ruido</th>
                      <th className="py-2 px-4 text-center">Salto</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <AtmMovementRowView
                      label="Lat. Izquierda"
                      prefix="atmLatIzq"
                      data={formData}
                    />
                    <AtmMovementRowView
                      label="Lat. Derecha"
                      prefix="atmLatDer"
                      data={formData}
                    />
                    <AtmMovementRowView
                      label="Protrusión"
                      prefix="atmProt"
                      data={formData}
                    />
                    <AtmMovementRowView
                      label="Apertura"
                      prefix="atmAper"
                      data={formData}
                    />
                    <AtmMovementRowView
                      label="Cierre"
                      prefix="atmCierre"
                      data={formData}
                    />
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Coord. Condilar"
                  value={formData.atmCoordinacionCondilar ? 'Sí' : 'No'}
                />
                <FormField
                  label="Apertura Máx"
                  value={
                    formData.atmAperturaMaximaMm
                      ? `${formData.atmAperturaMaximaMm} mm`
                      : '-'
                  }
                />
                <div className="col-span-full">
                  <FormField
                    label="Músculos Masticatorios"
                    value={
                      formData.atmMusculosDolor
                        ? `Dolor Presente - ${formData.atmMusculosDolorGrado || ''} (${formData.atmMusculosDolorZona || ''})`
                        : 'Dolor Ausente'
                    }
                  />
                </div>
                <div className="col-span-full">
                  <FormField
                    label="Observaciones ATM"
                    value={formData.atmObservaciones}
                  />
                </div>
              </div>
            </section>

            {/* 4. CUELLO */}
            <section>
              <SectionTitle title="4. Cuello" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Forma"
                  value={
                    formData.cuelloSimetrico
                      ? 'Simétrico'
                      : `No simétrico ${formData.cuelloSimetricoObs ? `(${formData.cuelloSimetricoObs})` : ''}`
                  }
                />
                <FormField
                  label="Movilidad"
                  value={
                    formData.cuelloMovilidadConservada
                      ? 'Conservada'
                      : `Disminuida ${formData.cuelloMovilidadObs ? `(${formData.cuelloMovilidadObs})` : ''}`
                  }
                />
                <FormField
                  label="Laringe"
                  value={
                    formData.laringeAlineada
                      ? 'Alineada'
                      : `No alineada ${formData.laringeAlineadaObs ? `(${formData.laringeAlineadaObs})` : ''}`
                  }
                />
                <FormField label="Otros" value={formData.cuelloOtros} />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
