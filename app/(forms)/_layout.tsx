import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function AuthLayout() {

  const { t } = useTranslation();
  
  return (
    <Stack>
      <Stack.Screen name="cadastro-filial" options={{
        title:t("titleRegisterFilial"), 
        headerStyle: {
          backgroundColor: "#099302", 
        }, 
      }}/>
      <Stack.Screen name="cadastro-modelo" options={{
        title:t("titleRegisterModel"), 
        headerStyle: {
          backgroundColor: "#099302", 
        }, 
      }}/>
      <Stack.Screen name="cadastro-moto" options={{
        title:t("titleRegisterBike"), 
        headerStyle: {
          backgroundColor: "#099302", 
        }, 
        }}/>      
      <Stack.Screen name="cadastro-motorista" options={{
        title:t("titleRegisterBiker"), 
        headerStyle: {
          backgroundColor: "#099302", 
        }, 
      }}/>
      <Stack.Screen name="cadastro-patio" options={{
        title:t("titleRegisterSituation"), 
        headerStyle: {
          backgroundColor: "#099302", 
        }, 
      }}/>
      <Stack.Screen name="cadastro-setor" options={{
        title:t("titleRegisterSector"), 
        headerStyle: {
          backgroundColor: "#099302", 
        }, 
      }}/>
      <Stack.Screen name="cadastro-situacao" options={{
        title:t("titleRegisterSituation"), 
        headerStyle: {
          backgroundColor: "#099302", 
        }, 
      }}/>
      <Stack.Screen name="editar-filial" options={{
        title:t("titleEditFilial"), 
        headerStyle: {
          backgroundColor: "#099302",
        }, }}/>
      <Stack.Screen name="editar-modelo" options={{
        title:t("titleEditModel"), 
        headerStyle: {
          backgroundColor: "#099302",
        }, }}/>
      <Stack.Screen name="editar-funcionario" options={{
        title:t("titleEditAccount"), 
        headerStyle: {
          backgroundColor: "#099302",
        }, }}/>
      <Stack.Screen name="editar-moto" options={{
        title:t("titleEditBike"),
        headerStyle: {
          backgroundColor: "#099302",
        }, }}/>      
      <Stack.Screen name="editar-motorista" options={{
        title:t("titleEditBiker"), 
        headerStyle: {
          backgroundColor: "#099302",
        }, }}/>      
      <Stack.Screen name="editar-patio" options={{
        title:t("titleEditPatio"), 
        headerStyle: {
          backgroundColor: "#099302",
        }, }}/>      
      <Stack.Screen name="editar-setor" options={{
        title:t("titleEditSector"), 
        headerStyle: {
          backgroundColor: "#099302",
        }, }}/>      
      <Stack.Screen name="editar-situacao" options={{
        title:t("titleEditSituation"), 
        headerStyle: {
          backgroundColor: "#099302",
        }, }}/>      
    </Stack>
  );
}