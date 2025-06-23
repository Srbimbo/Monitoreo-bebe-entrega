import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Ocultar el header en las pantallas de experiencia completa */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="monitor" options={{ headerShown: false }} />
      {/* Las demás pantallas usarán header por defecto (visible) */}
    </Stack>
  );
}
