import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Button from '@ui/Button';
import TextInput from '@ui/TextInput';
import SectionTitle from '@ui/SectionTitle';
import {
  useDiagnosticoClinicasCompleto,
  useMutateDiagnosticoClinicasCompleto,
} from '@hooks/useDiagnostico';
import { useForm } from '@stores/useForm';

// Componente auxiliar para fila de "Checkbox + Texto"
const ExamRow = ({
  label,
  checked,
  text,
  onChangeCheck,
  onChangeText,
  disabled,
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
    <label
      className={`flex items-center gap-2 min-w-[200px] cursor-pointer ${disabled ? 'opacity-70' : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChangeCheck(e.target.checked)}
        disabled={disabled}
        className="accent-[var(--color-primary)] w-5 h-5"
      />
      <span className="text-gray-700 font-medium">{label}</span>
    </label>
    {checked && (
      <input
        type="text"
        placeholder="Especifique..."
        value={text || ''}
        onChange={(e) => onChangeText(e.target.value)}
        disabled={disabled}
        className="flex-1 p-2 border border-gray-300 rounded-md outline-none focus:border-[var(--color-primary)] transition-colors"
      />
    )}
  </div>
);

export default function DiagnosticoClinicas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFormMode, setFormMode, setViewMode } = useForm();

  // Hooks
  const { data, isLoading } = useDiagnosticoClinicasCompleto(id);
  const { mutate: save, isPending } = useMutateDiagnosticoClinicasCompleto();

  // Estado del Formulario
  const [form, setForm] = useState({
    // Sección V
    fechaRespuesta: '',
    clinicaRespuesta: '', // "Clínica de:"

    // Plan de Trabajo - Exámenes (JSON)
    examenes: {
      radiograficos: { checked: false, texto: '' },
      laboratorio: { checked: false, texto: '' },
      modelos: { checked: false, texto: '' },
      fotografia: { checked: false, texto: '' },
    },

    // Plan de Trabajo - Interconsulta
    interconsultaTipo: '',
    interconsultaFecha: '',
    interconsultaClinica: '',

    // Plan de Trabajo - Cierre
    diagnosticoDefinitivo: '',
    tratamiento: '',
    pronostico: '',
    alumnoTratante: '',
  });

  // Cargar datos
  useEffect(() => {
    if (data) {
      setForm({
        fechaRespuesta: data.fecha_respuesta
          ? data.fecha_respuesta.split('T')[0]
          : '',
        clinicaRespuesta: data.clinica_respuesta || '',

        examenes: data.examenes_auxiliares || {
          radiograficos: { checked: false, texto: '' },
          laboratorio: { checked: false, texto: '' },
          modelos: { checked: false, texto: '' },
          fotografia: { checked: false, texto: '' },
        },

        interconsultaTipo: data.interconsulta_detalle || '',
        interconsultaFecha: data.fecha_interconsulta
          ? data.fecha_interconsulta.split('T')[0]
          : '',
        interconsultaClinica: data.clinica_interconsulta || '',

        diagnosticoDefinitivo: data.diagnostico_definitivo || '',
        tratamiento: data.tratamiento_realizar || '',
        pronostico: data.pronostico || '',
        alumnoTratante: data.alumno_tratante || '',
      });
    }
  }, [data]);

  // Manejadores
  const handleExamChange = (key, field, value) => {
    setForm((prev) => ({
      ...prev,
      examenes: {
        ...prev.examenes,
        [key]: { ...prev.examenes[key], [field]: value },
      },
    }));
  };

  const handleSubmit = () => {
    save(
      { idHistory: id, data: form },
      {
        onSuccess: () => {
          alert('Información clínica guardada correctamente');
          setViewMode();
        },
        onError: () => alert('Error al guardar'),
      }
    );
  };

  if (isLoading) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] uppercase border-l-4 border-[var(--color-primary)] pl-4">
          V. Diagnóstico en Clínicas y Plan de Trabajo
        </h2>
        {!isFormMode && <Button onClick={setFormMode}>Editar</Button>}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-8">
        {/* --- SECCIÓN V: DIAGNÓSTICO EN CLÍNICAS --- */}
        <section>
          <SectionTitle title="V. Diagnóstico en Clínicas" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Fecha:"
              type="date"
              value={form.fechaRespuesta}
              onChange={(e) =>
                setForm({ ...form, fechaRespuesta: e.target.value })
              }
              disabled={!isFormMode}
            />
            <TextInput
              label="Clínica de:"
              placeholder="Especifique la clínica..."
              value={form.clinicaRespuesta}
              onChange={(e) =>
                setForm({ ...form, clinicaRespuesta: e.target.value })
              }
              disabled={!isFormMode}
            />
          </div>
        </section>

        {/* --- PLAN DE TRABAJO --- */}
        <section>
          <SectionTitle title="Plan de Trabajo para el Diagnóstico Definitivo" />

          {/* Exámenes Auxiliares */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase">
              Exámenes Auxiliares
            </h4>
            <div className="pl-4 border-l-2 border-gray-100">
              <ExamRow
                label="Exámenes radiográficos"
                checked={form.examenes.radiograficos.checked}
                text={form.examenes.radiograficos.texto}
                onChangeCheck={(v) =>
                  handleExamChange('radiograficos', 'checked', v)
                }
                onChangeText={(v) =>
                  handleExamChange('radiograficos', 'texto', v)
                }
                disabled={!isFormMode}
              />
              <ExamRow
                label="Exámenes de laboratorio"
                checked={form.examenes.laboratorio.checked}
                text={form.examenes.laboratorio.texto}
                onChangeCheck={(v) =>
                  handleExamChange('laboratorio', 'checked', v)
                }
                onChangeText={(v) =>
                  handleExamChange('laboratorio', 'texto', v)
                }
                disabled={!isFormMode}
              />
              <ExamRow
                label="Modelos de estudio"
                checked={form.examenes.modelos.checked}
                text={form.examenes.modelos.texto}
                onChangeCheck={(v) => handleExamChange('modelos', 'checked', v)}
                onChangeText={(v) => handleExamChange('modelos', 'texto', v)}
                disabled={!isFormMode}
              />
              <ExamRow
                label="Fotografía"
                checked={form.examenes.fotografia.checked}
                text={form.examenes.fotografia.texto}
                onChangeCheck={(v) =>
                  handleExamChange('fotografia', 'checked', v)
                }
                onChangeText={(v) => handleExamChange('fotografia', 'texto', v)}
                disabled={!isFormMode}
              />
            </div>
          </div>

          {/* Interconsulta */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-bold text-[var(--color-primary)] mb-3 text-sm uppercase">
              Interconsulta
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <TextInput
                  label="Tipo / Motivo:"
                  value={form.interconsultaTipo}
                  onChange={(e) =>
                    setForm({ ...form, interconsultaTipo: e.target.value })
                  }
                  disabled={!isFormMode}
                />
              </div>
              <TextInput
                label="Fecha:"
                type="date"
                value={form.interconsultaFecha}
                onChange={(e) =>
                  setForm({ ...form, interconsultaFecha: e.target.value })
                }
                disabled={!isFormMode}
              />
              <div className="md:col-span-2">
                <TextInput
                  label="Clínica:"
                  value={form.interconsultaClinica}
                  onChange={(e) =>
                    setForm({ ...form, interconsultaClinica: e.target.value })
                  }
                  disabled={!isFormMode}
                />
              </div>
            </div>
          </div>

          {/* Cierre del Diagnóstico */}
          <div className="grid grid-cols-1 gap-6">
            <TextInput
              label="Diagnóstico definitivo:"
              value={form.diagnosticoDefinitivo}
              onChange={(e) =>
                setForm({ ...form, diagnosticoDefinitivo: e.target.value })
              }
              disabled={!isFormMode}
            />
            <TextInput
              label="Tratamiento a realizar:"
              value={form.tratamiento}
              onChange={(e) =>
                setForm({ ...form, tratamiento: e.target.value })
              }
              disabled={!isFormMode}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="Pronóstico:"
                value={form.pronostico}
                onChange={(e) =>
                  setForm({ ...form, pronostico: e.target.value })
                }
                disabled={!isFormMode}
              />
              <TextInput
                label="Alumno tratante:"
                value={form.alumnoTratante}
                onChange={(e) =>
                  setForm({ ...form, alumnoTratante: e.target.value })
                }
                disabled={!isFormMode}
              />
            </div>
          </div>
        </section>

        {/* Botones de Acción */}
        {isFormMode && (
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <Button
              variant="secondary"
              onClick={() => {
                setViewMode();
                navigate(-1);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Guardando...' : 'Guardar Todo'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
