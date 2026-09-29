// Pantalla principal de inscripción.
// Es el "padre" del formulario y del ticket: acá vive el estado real (lifting state up).
// - Si todavía no se envió el formulario, se muestra el formulario.
// - Si ya se envió, se muestra el TicketConfirmacion con los datos (renderizado condicional).
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CampoFormulario from '../../components/CampoFormulario';
import TicketConfirmacion from '../../components/TicketConfirmacion';
import { DatosInscripcion } from '../../tipos';
import estilos from './styles';

// ---------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------

// Valores con los que arranca el formulario (todo vacío)
const VALORES_INICIALES: DatosInscripcion = {
  nombreCompleto: '',
  email: '',
  edad: '',
  tipoEntrada: '',
  telefono: '',
};

// Regex simple de email: algo + @ + algo + . + algo (ej: ana@mail.com)
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex de "solo números" (acepta vacío, porque el teléfono es opcional)
const REGEX_SOLO_NUMEROS = /^\d*$/;

// Clave con la que guardamos el último email en AsyncStorage
const CLAVE_ULTIMO_EMAIL = 'ultimoEmail';

// Las dos opciones posibles de entrada
const OPCIONES_ENTRADA = ['general', 'vip'] as const;

export default function InscripcionScreen() {
  // ---------------------------------------------------------------
  // Estado
  // ---------------------------------------------------------------

  // Datos de la persona inscripta. Si es null, todavía no se envió el formulario.
  const [datosInscriptos, setDatosInscriptos] = useState<DatosInscripcion | null>(null);

  // true mientras simulamos el envío al servidor (para mostrar el loading)
  const [enviando, setEnviando] = useState(false);

  // useForm maneja TODOS los campos del formulario en un solo lugar.
  // Renombramos lo que devuelve a nombres en español para que se entienda mejor.
  const {
    control, // conecta cada campo (Controller) con el formulario
    handleSubmit: validarYEnviar, // valida todo y, si está ok, llama a nuestra función
    reset: reiniciarFormulario, // vuelve el formulario a sus valores iniciales
    setValue: asignarValor, // cambia el valor de un campo desde el código
    formState: { errors: errores, isValid: esValido }, // errores de cada campo y si el form está ok
  } = useForm<DatosInscripcion>({
    mode: 'onChange', // valida mientras el usuario escribe
    defaultValues: VALORES_INICIALES,
  });

  // ---------------------------------------------------------------
  // Bonus AsyncStorage: al abrir la app, precargamos el último email usado
  // ---------------------------------------------------------------
  useEffect(() => {
    AsyncStorage.getItem(CLAVE_ULTIMO_EMAIL).then((emailGuardado) => {
      if (emailGuardado) {
        asignarValor('email', emailGuardado, { shouldValidate: true });
      }
    });
  }, []);

  // ---------------------------------------------------------------
  // Funciones
  // ---------------------------------------------------------------

  // Se ejecuta solo si el formulario pasó todas las validaciones
  const alConfirmar = async (datos: DatosInscripcion) => {
    setEnviando(true);

    // Bonus: simulamos que el envío al servidor tarda 1 segundo
    await new Promise((resolver) => setTimeout(resolver, 1000));

    // Bonus: guardamos el email para precargarlo la próxima vez
    await AsyncStorage.setItem(CLAVE_ULTIMO_EMAIL, datos.email);

    setEnviando(false);
    setDatosInscriptos(datos); // al tener datos, se muestra el ticket
  };

  // Limpia el formulario y vuelve a mostrarlo (lo usa el botón del ticket)
  const inscribirOtraPersona = () => {
    reiniciarFormulario(VALORES_INICIALES);
    setDatosInscriptos(null); // al no tener datos, se muestra el formulario
  };

  // ---------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------
  return (
    // Evita que el teclado tape los campos.
    // iOS usa 'padding' y Android usa 'height' (es el comportamiento correcto en cada uno).
    <KeyboardAvoidingView
      style={estilos.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ScrollView para poder bajar si los campos no entran en la pantalla */}
      <ScrollView contentContainerStyle={estilos.contenedor} keyboardShouldPersistTaps="handled">
        <Text style={estilos.titulo}>Inscripción Sonido Sur</Text>

        {/* Renderizado condicional: ticket si ya se inscribió, formulario si no */}
        {datosInscriptos ? (
          <TicketConfirmacion datos={datosInscriptos} alVolver={inscribirOtraPersona} />
        ) : (
          <View>
            {/* ----- Nombre completo: obligatorio, mínimo 3 letras (sin contar espacios) ----- */}
            <Controller
              control={control}
              name="nombreCompleto"
              rules={{
                // .trim() saca los espacios del principio y del final,
                // así alguien que escribe solo espacios no pasa la validación
                validate: (valor) => valor.trim().length >= 3 || 'Ingresá tu nombre completo',
              }}
              render={({ field: { onChange: alCambiar, onBlur: alSalir, value: valor } }) => (
                <CampoFormulario
                  etiqueta="Nombre completo"
                  valor={valor}
                  alCambiarTexto={alCambiar}
                  alSalir={alSalir}
                  error={errores.nombreCompleto?.message}
                />
              )}
            />

            {/* ----- Email: obligatorio y con formato válido ----- */}
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Ingresá un email válido',
                pattern: { value: REGEX_EMAIL, message: 'Ingresá un email válido' },
              }}
              render={({ field: { onChange: alCambiar, onBlur: alSalir, value: valor } }) => (
                <CampoFormulario
                  etiqueta="Email"
                  valor={valor}
                  alCambiarTexto={alCambiar}
                  alSalir={alSalir}
                  error={errores.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />

            {/* ----- Edad: obligatoria, número entero entre 12 y 99 ----- */}
            <Controller
              control={control}
              name="edad"
              rules={{
                validate: (valor) => {
                  const esNumero = /^\d+$/.test(valor);
                  const edad = Number(valor);
                  return (esNumero && edad >= 12 && edad <= 99) || 'La edad tiene que ser mayor a 12';
                },
              }}
              render={({ field: { onChange: alCambiar, onBlur: alSalir, value: valor } }) => (
                <CampoFormulario
                  etiqueta="Edad"
                  valor={valor}
                  alCambiarTexto={alCambiar}
                  alSalir={alSalir}
                  error={errores.edad?.message}
                  keyboardType="numeric"
                />
              )}
            />

            {/* ----- Tipo de entrada: obligatorio, dos botones (GENERAL / VIP) ----- */}
            <Controller
              control={control}
              name="tipoEntrada"
              rules={{ required: 'Elegí un tipo de entrada' }}
              render={({ field: { onChange: alCambiar, value: valor } }) => (
                <View style={estilos.contenedorTipoEntrada}>
                  <Text style={estilos.etiqueta}>Tipo de entrada</Text>

                  <View style={estilos.filaOpciones}>
                    {OPCIONES_ENTRADA.map((opcion) => {
                      const estaElegida = valor === opcion;
                      return (
                        <Pressable
                          key={opcion}
                          onPress={() => alCambiar(opcion)}
                          style={[estilos.opcion, estaElegida ? estilos.opcionElegida : null]}
                        >
                          <Text style={estaElegida ? estilos.textoOpcionElegida : null}>
                            {opcion.toUpperCase()}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  {errores.tipoEntrada ? (
                    <Text style={estilos.textoError}>{errores.tipoEntrada.message}</Text>
                  ) : null}
                </View>
              )}
            />

            {/* ----- Teléfono: opcional, pero si se completa solo puede tener números ----- */}
            <Controller
              control={control}
              name="telefono"
              rules={{
                pattern: { value: REGEX_SOLO_NUMEROS, message: 'Solo se permiten números' },
              }}
              render={({ field: { onChange: alCambiar, onBlur: alSalir, value: valor } }) => (
                <CampoFormulario
                  etiqueta="Teléfono (opcional)"
                  valor={valor}
                  alCambiarTexto={alCambiar}
                  alSalir={alSalir}
                  error={errores.telefono?.message}
                  keyboardType="phone-pad"
                />
              )}
            />

            {/* ----- Botón de envío ----- */}
            {/* Mientras "enviamos" mostramos un loading (bonus).
                El botón queda deshabilitado mientras haya algún error (esValido = false). */}
            {enviando ? (
              <ActivityIndicator size="large" />
            ) : (
              <Button
                title="Confirmar inscripción"
                onPress={validarYEnviar(alConfirmar)}
                disabled={!esValido}
              />
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
