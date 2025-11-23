import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import {
  useFiliation,
  useMutateFiliation,
  useCreatePatient,
  useUpdatePatient,
} from '@hooks/usePatients';
import { usePatientByHistory, useAssignPatient } from '@hooks/useHistoria';
import { useForm } from '@stores/useForm';
import FormField from '@ui/FormField/FormField';
import Button from '@ui/Button';
import './Filiacion.css';

export function Filiation() {
  const { id } = useParams(); // ID de la Historia (draft o real)
  const queryClient = useQueryClient();

  // 1. Obtener datos (si existen)
  const { data: patient, isLoading: loadingPatient } = usePatientByHistory(id);
  const { data: filiation } = useFiliation(id);

  // 2. Hooks de Acción
  const createPatientMutation = useCreatePatient();
  const updatePatientMutation = useUpdatePatient(); // <--- Nuevo hook
  const assignPatientMutation = useAssignPatient();
  const saveFiliationMutation = useMutateFiliation();

  const { isFormMode, setViewMode, setFormMode } = useForm();
  const [isSaving, setIsSaving] = useState(false);

  // Si entramos y la historia no tiene paciente (es un borrador nuevo),
  // forzamos el modo edición automáticamente para que el usuario empiece a escribir.
  useEffect(() => {
    if (!loadingPatient && !patient && !isFormMode) {
      setFormMode();
    }
  }, [patient, loadingPatient, isFormMode, setFormMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      let currentPatientId = patient?.id_paciente;

      // === PASO A: GESTIÓN DEL PACIENTE ===
      if (!currentPatientId) {
        // CASO 1: PACIENTE NUEVO (La historia estaba vacía)
        // 1. Crear Paciente en BD
        const newPatient = await createPatientMutation.mutateAsync({
          nombre: data.nombre,
          apellido: data.apellido,
          dni: data.dni,
          fechaNacimiento: data.fechaNacimiento,
          sexo: data.sexo,
          telefono: data.telefono,
          email: data.email,
        });
        currentPatientId = newPatient.id;

        // 2. Asignar este paciente nuevo a la historia (draft)
        await assignPatientMutation.mutateAsync({
          idHistory: id,
          idPatient: currentPatientId,
        });
      } else {
        // CASO 2: PACIENTE EXISTENTE (Actualización)
        // Si el usuario corrigió el nombre o teléfono, actualizamos
        await updatePatientMutation.mutateAsync({
          id: currentPatientId,
          data: {
            nombre: data.nombre,
            apellido: data.apellido,
            telefono: data.telefono,
            email: data.email,
            // Nota: Por seguridad y consistencia, DNI y Sexo suelen ser inmutables
            // o requerir procesos especiales, así que no los enviamos al update aquí.
          },
        });
      }

      // === PASO B: GESTIÓN DE FILIACIÓN ===
      // Guardar los datos específicos de la ficha clínica
      await saveFiliationMutation.mutateAsync({
        idHistory: id,
        data: data,
      });

      // === FINALIZAR ===
      // Refrescar los datos en pantalla
      await queryClient.invalidateQueries({
        queryKey: ['patient-by-history', id],
      });
      // Salir del modo edición
      setViewMode();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar: ' + (error.message || 'Verifique los datos'));
    } finally {
      setIsSaving(false);
    }
  };

  // Renderizado del formulario
  const content = (
    <div className="filiation">
      <div className="filiation__info">
        <div className="filiation__info__header">
          {isFormMode ? 'Ficha de Filiación (Edición)' : 'Ficha de Filiación'}
        </div>

        {/* --- SECCIÓN 1: DATOS DEL PACIENTE (Tabla Paciente) --- */}
        <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 mt-2 border-b pb-2">
          Identificación del Paciente
        </h3>

        <div className="filiation__info__container">
          <FormField
            label="Nombre"
            name="nombre"
            value={patient?.nombre}
            isFormMode={isFormMode} // Ahora sí editable
            required
            flex="1"
          />
          <FormField
            label="Apellido"
            name="apellido"
            value={patient?.apellido}
            isFormMode={isFormMode} // Ahora sí editable
            required
            flex="1"
          />
          <FormField
            label="DNI"
            name="dni"
            value={patient?.dni}
            // El DNI solo es editable si es un paciente NUEVO (para evitar errores en pacientes históricos)
            isFormMode={isFormMode && !patient}
            required
            flex="1"
            placeholder={patient ? 'No editable' : '8 dígitos'}
            title={patient ? 'El DNI no se puede cambiar una vez creado' : ''}
          />
        </div>

        <div className="filiation__info__container">
          <FormField
            label="Fecha Nacimiento"
            name="fechaNacimiento"
            value={patient?.fecha_nacimiento}
            type="date"
            // Fecha nac. y sexo definen la historia clínica, mejor bloquearlos si ya existen
            isFormMode={isFormMode && !patient}
            required
            flex="1"
          />
          <FormField
            label="Sexo"
            name="sexo"
            value={patient?.sexo}
            placeholder="Masculino/Femenino"
            isFormMode={isFormMode && !patient}
            required
            flex="1"
          />
          <FormField
            label="Teléfono"
            name="telefono"
            value={patient?.telefono}
            type="tel"
            isFormMode={isFormMode} // Teléfono siempre editable
            variant="alt"
            flex="1"
          />
        </div>

        {/* --- SECCIÓN 2: DATOS DE FILIACIÓN (Tabla Filiacion) --- */}
        <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 mt-6 border-b pb-2">
          Datos Sociodemográficos
        </h3>

        <div className="filiation__info__container">
          <FormField
            label="Raza"
            value={filiation?.raza}
            name="raza"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Lugar Nacimiento"
            value={filiation?.lugar}
            name="lugar"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>

        <div className="filiation__info__container">
          <FormField
            label="Estado Civil"
            value={filiation?.estado_civil}
            name="estadoCivil"
            placeholder="Ej: Soltero"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Cónyuge"
            value={filiation?.nombre_conyuge}
            name="nombreConyuge"
            variant="alt"
            flex="2"
            isFormMode={isFormMode}
          />
        </div>

        <div className="filiation__info__container">
          <FormField
            label="Grado Instrucción"
            value={filiation?.grado_instruccion}
            name="gradoInstruccion"
            placeholder="Ej: Secundaria completa"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Ocupación"
            value={filiation?.ocupacion}
            name="ocupacion"
            placeholder="Ej: Estudiante"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>

        <div className="filiation__info__container">
          <FormField
            label="Dirección"
            value={filiation?.direccion}
            name="direccion"
            flex="2"
            isFormMode={isFormMode}
          />
          <FormField
            label="Lugar Procedencia"
            value={filiation?.lugar_procedencia}
            name="lugarProcedencia"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>

        <div className="filiation__info__container">
          <FormField
            label="Tiempo en Tacna"
            value={filiation?.tiempo_residencia_tacna}
            name="tiempoResidencia"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Acompañante"
            value={filiation?.acompaniante}
            name="acompaniante"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>

        <div className="filiation__info__container">
          <FormField
            label="Contacto Emergencia"
            value={filiation?.contacto_emergencia}
            name="contactoEmergencia"
            flex="2"
            isFormMode={isFormMode}
          />
          <FormField
            label="Teléfono Emergencia"
            value={filiation?.telefono_emergencia}
            name="telefonoEmergencia"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>

        <div className="filiation__info__container">
          <FormField
            label="Última Visita Dentista"
            value={filiation?.ultima_visita_dentista}
            name="ultimaVisitaDentista"
            type="date"
            flex="1"
            isFormMode={isFormMode}
          />
          <FormField
            label="Motivo Visita"
            value={filiation?.motivo_visita_dentista}
            name="motivoVisitaDentista"
            variant="alt"
            flex="1"
            isFormMode={isFormMode}
          />
        </div>
      </div>

      {isFormMode && (
        <div className="filiation__form-actions p-4 flex justify-end gap-4 bg-white mt-4 rounded-[var(--radius-lg)] shadow-md">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Procesando...' : 'Guardar Todo'}
          </Button>

          <Button
            variant="secondary"
            type="button"
            onClick={() => setViewMode()}
            disabled={isSaving}
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );

  return isFormMode ? (
    <form onSubmit={handleSubmit} className="w-full">
      {content}
    </form>
  ) : (
    content
  );
}

export default Filiation;
