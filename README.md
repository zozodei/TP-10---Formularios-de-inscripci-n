# Sonido Sur — Inscripción

App de inscripción a un festival hecha con React Native + Expo (SDK 57) + React Hook Form.

## Cómo correrlo

```bash
npm install
npx expo start
```

Después escanear el QR con Expo Go, o apretar `a` (Android), `i` (iOS) o `w` (web).

## Validación elegida

**React Hook Form** (`useForm` + `Controller` + `rules`): maneja todo el formulario con un solo hook y da los errores y el `isValid` sin armar un objeto de errores a mano.

## Estructura

Hecho en **TypeScript**. Cada componente tiene su propia carpeta con `index.tsx` (el componente) y `styles.ts` (sus estilos).

```
App.tsx
src/
├── tipos.ts                      # tipo DatosInscripcion compartido
├── screens/
│   └── InscripcionScreen/        # pantalla padre: tiene el estado y decide qué mostrar
│       ├── index.tsx
│       └── styles.ts
└── components/
    ├── CampoFormulario/          # campo de texto reutilizable con etiqueta y error
    │   ├── index.tsx
    │   └── styles.ts
    └── TicketConfirmacion/       # muestra los datos que recibe por props
        ├── index.tsx
        └── styles.ts
```

## Bonus resueltos

- **AsyncStorage**: se guarda el email de la última persona inscripta y se precarga al abrir la app.
- **Loading simulado**: al confirmar se muestra un spinner de 1 segundo simulando el envío.

## Capturas

![Formulario con errores](screenshots/errores.png)
![Formulario válido](screenshots/valido.png)
![Ticket de confirmación](screenshots/ticket.png)
