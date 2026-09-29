// Componente reutilizable para cualquier campo de texto del formulario.
// Muestra: una etiqueta arriba, el input en el medio y el error (si hay) abajo.
import { View, Text, TextInput, TextInputProps } from 'react-native';
import estilos from './styles';

// Props que recibe el componente.
// Extiende TextInputProps para poder pasarle cosas extra como keyboardType o autoCapitalize.
type PropsCampoFormulario = TextInputProps & {
  etiqueta: string;                       // texto que aparece arriba del input
  valor: string;                          // lo que está escrito en el input (campo controlado)
  alCambiarTexto: (texto: string) => void; // se llama cada vez que el usuario escribe
  alSalir?: () => void;                   // se llama cuando el input pierde el foco
  error?: string;                         // mensaje de error a mostrar debajo (si existe)
};

export default function CampoFormulario({
  etiqueta,
  valor,
  alCambiarTexto,
  alSalir,
  error,
  ...restoDeProps // cualquier otra prop se le pasa directo al TextInput
}: PropsCampoFormulario) {
  return (
    <View style={estilos.contenedor}>
      {/* Etiqueta del campo */}
      <Text style={estilos.etiqueta}>{etiqueta}</Text>

      {/* Input controlado: su valor siempre viene de afuera (value + onChangeText) */}
      <TextInput
        style={[estilos.input, error ? estilos.inputConError : null]}
        value={valor}
        onChangeText={alCambiarTexto}
        onBlur={alSalir}
        {...restoDeProps}
      />

      {/* Mensaje de error: solo se muestra si hay uno */}
      {error ? <Text style={estilos.textoError}>{error}</Text> : null}
    </View>
  );
}
