// Estilos del componente TicketConfirmacion.
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  // Recuadro con borde punteado para que parezca un ticket
  ticket: {
    padding: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#6a1b9a',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dato: {
    fontSize: 16,
    marginBottom: 6,
  },
  contenedorBoton: {
    marginTop: 16,
  },
});

export default estilos;
