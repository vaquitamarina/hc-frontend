import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import Button from '@ui/Button';
import {
  useEnfermedadActual,
  useUpdateEnfermedadActual,
  useCreateEnfermedadActual,
} from '@hooks/useAnamnesis';
import './Enfermedad_Actual.css';

function Enfermedad_Actual() {
  const { id } = useParams();
  const { data, isLoading } = useEnfermedadActual(id);
  const updateEnfermedad = useUpdateEnfermedadActual();
  const createEnfermedad = useCreateEnfermedadActual();

  const [formData, setFormData] = useState({
    sintoma_principal: '',
    tiempo_enfermedad: '',
    forma_inicio: '',
    curso: '',
    relato: '',
    tratamiento_prev: '',
  });

  useEffect(() => {
    // Backend returns { message, data } on success — unwrap safely
    const payload = data?.data ?? data;
    if (payload) {
      setFormData({
        sintoma_principal: payload.sintoma_principal || '',
        tiempo_enfermedad: payload.tiempo_enfermedad || '',
        forma_inicio: payload.forma_inicio || '',
        curso: payload.curso || '',
        relato: payload.relato || '',
        tratamiento_prev: payload.tratamiento_prev || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data) {
        // Si ya existe, actualizar
        await updateEnfermedad.mutateAsync({ idHistoria: id, data: formData });
      } else {
        // Si no existe, crear nuevo
        await createEnfermedad.mutateAsync({ id_historia: id, ...formData });
      }
      // Optimistically update local state and notify user
      setFormData({ ...formData });
      toast.success('Enfermedad actual guardada exitosamente');
    } catch (error) {
      toast.error(
        'Error al guardar: ' + (error?.message || 'Error desconocido')
      );
    }
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="enfermedad-actual-container">
      {/* Header Section */}
      <div className="enfermedad-header">
        <h2 className="enfermedad-header-title">Enfermedad actual</h2>
        <div className="enfermedad-header-info">
          <p className="enfermedad-header-label">Historia Clínica Nº:</p>
          <p className="enfermedad-header-value">HC-{id}</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="enfermedad-form">
        {/* Síntoma principal */}
        <div className="flex flex-col gap-2">
          <label htmlFor="sintoma_principal" className="font-medium">
            a. Síntoma principal
          </label>
          <input
            id="sintoma_principal"
            type="text"
            name="sintoma_principal"
            value={formData.sintoma_principal}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Síntoma principal"
          />
        </div>

        {/* Tiempo de la enfermedad */}
        <div className="flex flex-col gap-2">
          <label htmlFor="tiempo_enfermedad" className="font-medium">
            b. Tiempo de la enfermedad
          </label>
          <input
            id="tiempo_enfermedad"
            type="text"
            name="tiempo_enfermedad"
            value={formData.tiempo_enfermedad}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Tiempo de la enfermedad"
          />
        </div>

        {/* Forma de inicio */}
        <div className="flex flex-col gap-2">
          <label htmlFor="forma_inicio" className="font-medium">
            c. Forma de inicio
          </label>
          <input
            id="forma_inicio"
            type="text"
            name="forma_inicio"
            value={formData.forma_inicio}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Forma de inicio"
          />
        </div>

        {/* Curso de la enfermedad */}
        <div className="flex flex-col gap-2">
          <label htmlFor="curso" className="font-medium">
            d. Curso de la enfermedad
          </label>
          <input
            id="curso"
            type="text"
            name="curso"
            value={formData.curso}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Curso de la enfermedad"
          />
        </div>

        {/* Relato de enfermedad */}
        <div className="flex flex-col gap-2">
          <label htmlFor="relato" className="font-medium">
            d. Relato de enfermedad (relato cronológico de signos y síntomas)
          </label>
          <textarea
            id="relato"
            name="relato"
            value={formData.relato}
            onChange={handleChange}
            className="w-full min-h-[100px] p-3 rounded border"
            placeholder="Relato cronológico de signos y síntomas"
          />
        </div>

        {/* Tratamiento recibido */}
        <div className="flex flex-col gap-2">
          <label htmlFor="tratamiento_prev" className="font-medium">
            e. Tratamiento recibido hasta el momento
          </label>
          <textarea
            id="tratamiento_prev"
            name="tratamiento_prev"
            value={formData.tratamiento_prev}
            onChange={handleChange}
            className="w-full min-h-[80px] p-3 rounded border"
            placeholder="Tratamiento recibido hasta el momento"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="primary"
            type="submit"
            disabled={updateEnfermedad.isLoading || createEnfermedad.isLoading}
          >
            {updateEnfermedad.isLoading || createEnfermedad.isLoading
              ? 'Guardando...'
              : data
                ? 'Actualizar'
                : 'Guardar'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Enfermedad_Actual;
