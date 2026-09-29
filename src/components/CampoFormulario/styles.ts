// Estilos del componente CampoFormulario.
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  // Espacio entre un campo y el siguiente
  contenedor: {
    marginBottom: 14,
  },
  etiqueta: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  // Cuando hay error, el borde se pone rojo
  inputConError: {
    borderColor: 'red',
  },
  textoError: {
    color: 'red',
    marginTop: 4,
  },
});

export default estilos;
