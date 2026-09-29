// Punto de entrada de la app: solo muestra la pantalla de inscripción.
import { StatusBar } from 'expo-status-bar';
import InscripcionScreen from './src/screens/InscripcionScreen';

export default function App() {
  return (
    <>
      <InscripcionScreen />
      {/* Barra de estado del celular (hora, batería, etc.) */}
      <StatusBar style="auto" />
    </>
  );
}
