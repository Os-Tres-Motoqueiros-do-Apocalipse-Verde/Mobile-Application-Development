
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0BA70F" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" />
    </Stack>
  );
}
