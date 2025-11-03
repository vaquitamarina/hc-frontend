import { tv } from 'tailwind-variants';

/**
 * FormField - Componente genérico para renderizar campos de formulario
 * Cambia automáticamente entre modo visualización y modo edición
 *
 * @param {string} label - Etiqueta del campo
 * @param {string} value - Valor a mostrar en modo visualización
 * @param {string} name - Nombre del campo para el formulario
 * @param {string} type - Tipo de input (text, date, email, tel, number, etc.)
 * @param {boolean} isFormMode - Indica si está en modo formulario o visualización
 * @param {string} variant - Variante de color ('default' | 'alt')
 * @param {string} flex - Valor de flex CSS (ej: '1', '2', 'auto', 'none')
 * @param {function} formatValue - Función opcional para formatear el valor en modo visualización
 */

const formFieldStyles = tv({
  slots: {
    container: '',
    label: '',
    input: '',
    viewContainer: '',
    viewLabel: '',
    viewValue: 'text-gray-800',
  },
  variants: {
    mode: {
      form: {
        container: 'flex flex-col gap-2 mb-4',
        label: 'font-medium text-gray-700 text-[0.95rem]',
        input: `px-3 py-2 border border-gray-300 rounded-md text-base transition-colors
                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                disabled:bg-gray-100 disabled:cursor-not-allowed md:text-base`,
      },
      view: {
        viewContainer: 'py-1 px-8 rounded-[var(--radius-md)]',
      },
    },
    variant: {
      default: {
        viewContainer: 'bg-[var(--color-secondary-soft)]',
      },
      alt: {
        viewContainer: 'bg-[var(--color-secondary)]',
      },
    },
  },
  defaultVariants: {
    mode: 'view',
    variant: 'default',
  },
});

export function FormField({
  label,
  value,
  name,
  type = 'text',
  isFormMode = false,
  variant = 'default',
  flex,
  formatValue,
  ...inputProps
}) {
  // Función para formatear fechas por defecto
  const defaultFormatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Determinar el valor formateado
  const getFormattedValue = () => {
    if (!value) return '-';

    // Si hay función personalizada de formato, usarla
    if (formatValue) {
      return formatValue(value);
    }

    // Si es tipo fecha, formatear automáticamente
    if (type === 'date') {
      return defaultFormatDate(value);
    }

    return value;
  };

  // Obtener los estilos según el modo y variante
  const styles = formFieldStyles({
    mode: isFormMode ? 'form' : 'view',
    variant,
  });

  // Generar estilo inline para flex si se proporciona
  const flexStyle = flex ? { flex } : {};

  // Modo formulario: renderizar input
  if (isFormMode) {
    return (
      <div className={styles.container()} style={flexStyle}>
        <label className={styles.label()} htmlFor={name}>
          {label}:
        </label>
        <input
          className={styles.input()}
          type={type}
          name={name}
          id={name}
          defaultValue={value || ''}
          {...inputProps}
        />
      </div>
    );
  }

  // Modo visualización: renderizar valor
  return (
    <div className={styles.viewContainer()} style={flexStyle}>
      <span className={styles.viewLabel()}>{label}:</span>{' '}
      <span className={styles.viewValue()}>{getFormattedValue()}</span>
    </div>
  );
}

export default FormField;
