// Estilos de la pantalla InscripcionScreen.
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  // Ocupa toda la pantalla (lo usa el KeyboardAvoidingView)
  pantalla: {
    flex: 1,
  },
  contenedor: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f3e5f5',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  etiqueta: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  // Bloque del selector de tipo de entrada
  contenedorTipoEntrada: {
    marginBottom: 14,
  },
  // Fila con los dos botones (GENERAL y VIP)
  filaOpciones: {
    flexDirection: 'row',
    gap: 10,
  },
  opcion: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#6a1b9a',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  // Opción elegida: fondo violeta y texto blanco
  opcionElegida: {
    backgroundColor: '#6a1b9a',
  },
  textoOpcionElegida: {
    color: '#fff',
  },
  textoError: {
    color: 'red',
    marginTop: 4,
  },
});

export default estilos;
