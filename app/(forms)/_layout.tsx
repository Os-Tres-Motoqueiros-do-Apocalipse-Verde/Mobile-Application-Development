
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="cadastro-moto" options={{title:"Cadastro Moto"}}/>      
      <Stack.Screen name="editar-moto" options={{title:"Editar Moto"}}/>      
      <Stack.Screen name="editar-funcionario" options={{title:"Editar Conta"}}/>      
    </Stack>
  );
}
