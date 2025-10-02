
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="cadastro-moto" options={{
        title:"Cadastro Moto", 
        headerStyle: {
          backgroundColor: "#099302", // cor de fundo do header
        }, 
        }}/>      
      <Stack.Screen name="editar-moto" options={{
        title:"Editar Moto", 
        headerStyle: {
          backgroundColor: "#099302", // cor de fundo do header
        }, }}/>      
      <Stack.Screen name="editar-funcionario" options={{
        title:"Editar Conta", 
        headerStyle: {
          backgroundColor: "#099302", // cor de fundo do header
        }, }}/>      
    </Stack>
  );
}
