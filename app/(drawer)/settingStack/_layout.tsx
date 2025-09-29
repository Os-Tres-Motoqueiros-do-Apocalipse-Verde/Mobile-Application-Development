import React from "react";
import { Stack } from "expo-router";

export default function SettingsStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings" options={{ title: "Configurações" }} />
      <Stack.Screen name="otherPage" options={{ title: "Outra Página" }} />
    </Stack>
  );
}
