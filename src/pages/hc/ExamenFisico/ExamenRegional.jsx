import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useRegionalExam, useMutateRegionalExam } from '@hooks/useExamenFisico';
import { useForm } from '@stores/useForm';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';
import FormField from '@ui/FormField/FormField';

// Componentes auxiliares para limpieza
const SectionTitle = ({ title }) => (
  <h3 className="text-[var(--color-primary)] font-bold text-lg border-b-2 border-gray-300 mb-4 mt-6 pb-1 uppercase">
    {title}
  </h3>
);

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

// Componente especial para la fila de movimientos ATM
const AtmMovementRow = ({ label, prefix, data, onChange, disabled }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-2 border-b border-gray-100">
    <div className="font-medium text-gray-700">{label}</div>

    {/* Dolor */}
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500">Dolor:</span>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name={`${prefix}Dolor`}
          checked={data[`${prefix}Dolor`] === true}
          onChange={() => onChange(`${prefix}Dolor`, true)}
          disabled={disabled}
        />{' '}
        Si
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name={`${prefix}Dolor`}
          checked={data[`${prefix}Dolor`] === false}
          onChange={() => onChange(`${prefix}Dolor`, false)}
          disabled={disabled}
        />{' '}
        No
      </label>
    </div>

    {/* Ruido */}
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500">Ruido:</span>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name={`${prefix}Ruido`}
          checked={data[`${prefix}Ruido`] === true}
          onChange={() => onChange(`${prefix}Ruido`, true)}
          disabled={disabled}
        />{' '}
        Si
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name={`${prefix}Ruido`}
          checked={data[`${prefix}Ruido`] === false}
          onChange={() => onChange(`${prefix}Ruido`, false)}
          disabled={disabled}
        />{' '}
        No
      </label>
    </div>

    {/* Salto */}
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500">Salto:</span>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name={`${prefix}Salto`}
          checked={data[`${prefix}Salto`] === true}
          onChange={() => onChange(`${prefix}Salto`, true)}
          disabled={disabled}
        />{' '}
        Si
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name={`${prefix}Salto`}
          checked={data[`${prefix}Salto`] === false}
          onChange={() => onChange(`${prefix}Salto`, false)}
          disabled={disabled}
        />{' '}
        No
      </label>
    </div>
  </div>
);

export default function ExamenRegional() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: examData, isLoading } = useRegionalExam(id);
  const { mutate: saveExam, isPending } = useMutateRegionalExam();
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
          alert('Examen Regional guardado correctamente');
          setViewMode();
        },
        onError: () => alert('Error al guardar'),
      }
    );
  };

  if (isLoading) return <div className="p-8 text-center">Cargando...</div>;

  // --- MODO VISTA ---
  if (!isFormMode) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Examen Regional
          </h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Volver
            </Button>
            <Button onClick={setFormMode}>Editar</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Cabeza Posición"
            value={formData.cabezaPosicion}
            isFormMode={false}
          />
          <FormField
            label="ATM Trayectoria"
            value={formData.atmTrayectoria}
            isFormMode={false}
          />
          <FormField
            label="Cuello Forma"
            value={
              formData.cuelloSimetrico === true
                ? 'Simétrico'
                : formData.cuelloSimetrico === false
                  ? 'No simétrico'
                  : '-'
            }
            isFormMode={false}
          />
        </div>
      </div>
    );
  }

  // --- MODO EDICIÓN ---
  return (
    <form onSubmit={handleSubmit} className="bg-[#E0E8EB] p-2 rounded-lg">
      <div className="bg-[var(--color-primary)] text-white p-3 rounded-t-lg flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold m-0">Examen Regional</h2>
      </div>

      <div className="px-4 pb-8 flex flex-col gap-6">
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
            />

            <div>
              <RadioGroup
                label="Mov. Anormales:"
                name="cabezaMov"
                options={['Tic', 'Temblor', 'Otros']}
                value={formData.cabezaMovimientos}
                onChange={(v) => handleChange('cabezaMovimientos', v)}
              />
              {formData.cabezaMovimientos === 'Otros' && (
                <TextInput
                  placeholder="Especifique..."
                  value={formData.cabezaMovimientosObs || ''}
                  onChange={(e) =>
                    handleChange('cabezaMovimientosObs', e.target.value)
                  }
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">Cráneo</h4>
              <RadioGroup
                label="Tamaño:"
                name="craneoTam"
                options={['Mesaticéfalo', 'Macrocéfalo', 'Microcéfalo']}
                value={formData.craneoTamano}
                onChange={(v) => handleChange('craneoTamano', v)}
              />
              <RadioGroup
                label="Forma:"
                name="craneoForma"
                options={['Braquicéfalo', 'Mesocéfalo', 'Dolicocéfalo']}
                value={formData.craneoForma}
                onChange={(v) => handleChange('craneoForma', v)}
              />
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">Cara</h4>
              <RadioGroup
                label="Forma de frente:"
                name="caraFrente"
                options={['Braquifacial', 'Mesofacial', 'Dolicofacial']}
                value={formData.caraFormaFrente}
                onChange={(v) => handleChange('caraFormaFrente', v)}
              />
              <RadioGroup
                label="Forma de perfil:"
                name="caraPerfil"
                options={['Recto', 'Cóncavo', 'Convexo']}
                value={formData.caraFormaPerfil}
                onChange={(v) => handleChange('caraFormaPerfil', v)}
              />
            </div>
          </div>
        </section>

        {/* 2. ÓRGANOS DE LOS SENTIDOS */}
        <section>
          <SectionTitle title="2. Órganos de los Sentidos" />

          {/* Ojos */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-2">Ojos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l-4 border-[var(--color-secondary)]">
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
                />
                {formData.ojosCejasAdecuada === false && (
                  <TextInput
                    placeholder="Especifique alteración..."
                    value={formData.ojosImplantacionObs || ''}
                    onChange={(e) =>
                      handleChange('ojosImplantacionObs', e.target.value)
                    }
                  />
                )}
              </div>

              <RadioGroup
                label="Escleróticas:"
                name="ojosEsc"
                options={['Limpias', 'Pigmentadas']}
                value={formData.ojosEscleroticas}
                onChange={(v) => handleChange('ojosEscleroticas', v)}
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
                      onChange={() => handleChange('ojosAgudezaVisual', true)}
                    />{' '}
                    Si
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="ojosAgu"
                      checked={formData.ojosAgudezaVisual === false}
                      onChange={() => handleChange('ojosAgudezaVisual', false)}
                    />{' '}
                    No
                  </label>
                </div>
              </div>

              <TextInput
                label="Iris (Color):"
                value={formData.ojosIrisColor || ''}
                onChange={(e) => handleChange('ojosIrisColor', e.target.value)}
              />

              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                <input
                  type="checkbox"
                  checked={formData.ojosArcoSenil || false}
                  onChange={(e) =>
                    handleChange('ojosArcoSenil', e.target.checked)
                  }
                  className="w-5 h-5"
                />
                Arco Senil
              </label>
            </div>
          </div>

          {/* Nariz */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-2">Nariz</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l-4 border-[var(--color-secondary)]">
              <TextInput
                label="Forma:"
                value={formData.narizForma || ''}
                onChange={(e) => handleChange('narizForma', e.target.value)}
              />

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between max-w-xs">
                  <span className="text-sm font-bold">Permeables:</span>
                  <div className="flex gap-2">
                    <label>
                      <input
                        type="radio"
                        name="narizPer"
                        checked={formData.narizPermeables === true}
                        onChange={() => handleChange('narizPermeables', true)}
                      />{' '}
                      Si
                    </label>{' '}
                    <label>
                      <input
                        type="radio"
                        name="narizPer"
                        checked={formData.narizPermeables === false}
                        onChange={() => handleChange('narizPermeables', false)}
                      />{' '}
                      No
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between max-w-xs">
                  <span className="text-sm font-bold">Secreciones:</span>
                  <div className="flex gap-2">
                    <label>
                      <input
                        type="radio"
                        name="narizSec"
                        checked={formData.narizSecreciones === true}
                        onChange={() => handleChange('narizSecreciones', true)}
                      />{' '}
                      Si
                    </label>{' '}
                    <label>
                      <input
                        type="radio"
                        name="narizSec"
                        checked={formData.narizSecreciones === false}
                        onChange={() => handleChange('narizSecreciones', false)}
                      />{' '}
                      No
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between max-w-xs">
                  <span className="text-sm font-bold">Senos dolorosos:</span>
                  <div className="flex gap-2">
                    <label>
                      <input
                        type="radio"
                        name="narizDol"
                        checked={formData.narizSenosDolorosos === true}
                        onChange={() =>
                          handleChange('narizSenosDolorosos', true)
                        }
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
            <h4 className="font-bold text-gray-700 mb-2">Oídos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l-4 border-[var(--color-secondary)]">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-bold">
                    Pabellones (Anomalías):
                  </span>
                  <div className="flex gap-2">
                    <label>
                      <input
                        type="radio"
                        name="oidosAno"
                        checked={formData.oidosAnomaliasMorfologicas === false}
                        onChange={() =>
                          handleChange('oidosAnomaliasMorfologicas', false)
                        }
                      />{' '}
                      No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="oidosAno"
                        checked={formData.oidosAnomaliasMorfologicas === true}
                        onChange={() =>
                          handleChange('oidosAnomaliasMorfologicas', true)
                        }
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
                  />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between max-w-xs">
                  <span className="text-sm font-bold">Secreciones:</span>
                  <div className="flex gap-2">
                    <label>
                      <input
                        type="radio"
                        name="oidosSec"
                        checked={formData.oidosSecreciones === true}
                        onChange={() => handleChange('oidosSecreciones', true)}
                      />{' '}
                      Si
                    </label>{' '}
                    <label>
                      <input
                        type="radio"
                        name="oidosSec"
                        checked={formData.oidosSecreciones === false}
                        onChange={() => handleChange('oidosSecreciones', false)}
                      />{' '}
                      No
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between max-w-xs">
                  <span className="text-sm font-bold">
                    Audición conservada:
                  </span>
                  <div className="flex gap-2">
                    <label>
                      <input
                        type="radio"
                        name="oidosAud"
                        checked={formData.oidosAudicionConservada === true}
                        onChange={() =>
                          handleChange('oidosAudicionConservada', true)
                        }
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
                      />{' '}
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ATM (SECCIÓN COMPLEJA) */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <SectionTitle title="3. ATM" />

          {/* Trayectoria */}
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
            />
          </div>

          {/* Movimientos (Tabla/Grid) */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-4">
              Movimiento Mandibular
            </h4>
            <AtmMovementRow
              label="Lateralidad izquierda"
              prefix="atmLatIzq"
              data={formData}
              onChange={handleChange}
            />
            <AtmMovementRow
              label="Lateralidad derecha"
              prefix="atmLatDer"
              data={formData}
              onChange={handleChange}
            />
            <AtmMovementRow
              label="Protrusión"
              prefix="atmProt"
              data={formData}
              onChange={handleChange}
            />
            <AtmMovementRow
              label="Apertura"
              prefix="atmAper"
              data={formData}
              onChange={handleChange}
            />
            <AtmMovementRow
              label="Cierre"
              prefix="atmCierre"
              data={formData}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold">
                Coordinación Mov. Condilar:
              </span>
              <div className="flex gap-2">
                <label>
                  <input
                    type="radio"
                    name="atmCoord"
                    checked={formData.atmCoordinacionCondilar === true}
                    onChange={() =>
                      handleChange('atmCoordinacionCondilar', true)
                    }
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
                  />{' '}
                  No
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">Apertura máxima:</span>
              <input
                type="number"
                className="border rounded p-1 w-20"
                value={formData.atmAperturaMaximaMm || ''}
                onChange={(e) =>
                  handleChange('atmAperturaMaximaMm', e.target.value)
                }
              />{' '}
              mm
            </div>
          </div>
          <TextInput
            label="Observaciones:"
            value={formData.atmObservaciones || ''}
            onChange={(e) => handleChange('atmObservaciones', e.target.value)}
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
                />{' '}
                Ausente
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="atmMusc"
                  checked={formData.atmMusculosDolor === true}
                  onChange={() => handleChange('atmMusculosDolor', true)}
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
                />
              </div>
            )}
          </div>
        </section>

        {/* 4. CUELLO */}
        <section>
          <SectionTitle title="4. Cuello" />

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold w-24">Forma:</span>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="cuelForm"
                  checked={formData.cuelloSimetrico === true}
                  onChange={() => handleChange('cuelloSimetrico', true)}
                />{' '}
                Simétrico
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="cuelForm"
                  checked={formData.cuelloSimetrico === false}
                  onChange={() => handleChange('cuelloSimetrico', false)}
                />{' '}
                No simétrico
              </label>
              {formData.cuelloSimetrico === false && (
                <input
                  type="text"
                  placeholder="Detalle..."
                  className="border p-1 rounded flex-1"
                  value={formData.cuelloSimetricoObs || ''}
                  onChange={(e) =>
                    handleChange('cuelloSimetricoObs', e.target.value)
                  }
                />
              )}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold w-24">Movilidad:</span>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="cuelMov"
                  checked={formData.cuelloMovilidadConservada === true}
                  onChange={() =>
                    handleChange('cuelloMovilidadConservada', true)
                  }
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
                />{' '}
                Disminuida
              </label>
              {formData.cuelloMovilidadConservada === false && (
                <input
                  type="text"
                  placeholder="Detalle..."
                  className="border p-1 rounded flex-1"
                  value={formData.cuelloMovilidadObs || ''}
                  onChange={(e) =>
                    handleChange('cuelloMovilidadObs', e.target.value)
                  }
                />
              )}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold w-24">Laringe:</span>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="cuelLar"
                  checked={formData.laringeAlineada === true}
                  onChange={() => handleChange('laringeAlineada', true)}
                />{' '}
                Alineada
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="cuelLar"
                  checked={formData.laringeAlineada === false}
                  onChange={() => handleChange('laringeAlineada', false)}
                />{' '}
                No alineada
              </label>
              {formData.laringeAlineada === false && (
                <input
                  type="text"
                  placeholder="Detalle..."
                  className="border p-1 rounded flex-1"
                  value={formData.laringeAlineadaObs || ''}
                  onChange={(e) =>
                    handleChange('laringeAlineadaObs', e.target.value)
                  }
                />
              )}
            </div>

            <TextInput
              label="Otros:"
              value={formData.cuelloOtros || ''}
              onChange={(e) => handleChange('cuelloOtros', e.target.value)}
            />
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
