import React from "react";
import { Stack } from "expo-router";

export default function MotoListLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="moto" options={{ title: "Moto", headerShown:true }} />
    </Stack>
  );
}
