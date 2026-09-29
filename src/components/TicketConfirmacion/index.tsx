// Ticket que se muestra cuando la inscripción se confirmó.
// IMPORTANTE: no tiene estado propio (no usa useState).
// Todos los datos le llegan por props desde la pantalla padre (InscripcionScreen).
import { View, Text, Button } from 'react-native';
import { DatosInscripcion } from '../../tipos';
import estilos from './styles';

type PropsTicketConfirmacion = {
  datos: DatosInscripcion; // los datos que cargó la persona en el formulario
  alVolver: () => void;    // función del padre que limpia el formulario y lo vuelve a mostrar
};

export default function TicketConfirmacion({ datos, alVolver }: PropsTicketConfirmacion) {
  return (
    <View style={estilos.ticket}>
      <Text style={estilos.titulo}>🎟️ Sonido Sur</Text>

      {/* Datos de la persona inscripta */}
      <Text style={estilos.dato}>Nombre: {datos.nombreCompleto}</Text>
      <Text style={estilos.dato}>Email: {datos.email}</Text>
      <Text style={estilos.dato}>Edad: {datos.edad}</Text>
      <Text style={estilos.dato}>Entrada: {datos.tipoEntrada.toUpperCase()}</Text>

      {/* El teléfono es opcional: solo lo mostramos si lo completó */}
      {datos.telefono ? <Text style={estilos.dato}>Teléfono: {datos.telefono}</Text> : null}

      {/* Botón para volver al formulario vacío */}
      <View style={estilos.contenedorBoton}>
        <Button title="Volver a inscribir a otra persona" onPress={alVolver} />
      </View>
    </View>
  );
}
