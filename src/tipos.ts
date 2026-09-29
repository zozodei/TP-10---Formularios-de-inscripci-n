// Tipos compartidos entre la pantalla y los componentes.

// Las dos únicas opciones de entrada. El '' representa "todavía no eligió nada".
export type TipoEntrada = 'general' | 'vip' | '';

// Forma de los datos del formulario de inscripción.
// Todo es string porque los TextInput siempre devuelven texto.
export type DatosInscripcion = {
  nombreCompleto: string;
  email: string;
  edad: string;
  tipoEntrada: TipoEntrada;
  telefono: string; // opcional: puede quedar vacío
};
