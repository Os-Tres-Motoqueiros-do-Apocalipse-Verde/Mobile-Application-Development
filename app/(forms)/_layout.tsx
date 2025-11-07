import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../src/context/ThemeContext";

export default function AuthLayout() {

  const { colors } = useTheme();

  const { t } = useTranslation();
  
  return (
    <Stack>
      <Stack.Screen name="cadastro-filial" options={{
        title:t("titleRegisterFilial"), 
        headerStyle: {
          backgroundColor: colors.button, 
        }, 
      }}/>
      <Stack.Screen name="cadastro-modelo" options={{
        title:t("titleRegisterModel"), 
        headerStyle: {
          backgroundColor: colors.button, 
        }, 
      }}/>
      <Stack.Screen name="cadastro-moto" options={{
        title:t("titleRegisterBike"), 
        headerStyle: {
          backgroundColor: colors.button, 
        }, 
        }}/>      
      <Stack.Screen name="cadastro-motorista" options={{
        title:t("titleRegisterBiker"), 
        headerStyle: {
          backgroundColor: colors.button, 
        }, 
      }}/>
      <Stack.Screen name="cadastro-patio" options={{
        title:t("titleRegisterPatio"), 
        headerStyle: {
          backgroundColor: colors.button, 
        }, 
      }}/>
      <Stack.Screen name="cadastro-setor" options={{
        title:t("titleRegisterSector"), 
        headerStyle: {
          backgroundColor: colors.button, 
        }, 
      }}/>
      <Stack.Screen name="cadastro-situacao" options={{
        title:t("titleRegisterSituation"), 
        headerStyle: {
          backgroundColor: colors.button, 
        }, 
      }}/>
      <Stack.Screen name="editar-filial" options={{
        title:t("titleEditFilial"), 
        headerStyle: {
          backgroundColor: colors.button,
        }, }}/>
      <Stack.Screen name="editar-modelo" options={{
        title:t("titleEditModel"), 
        headerStyle: {
          backgroundColor: colors.button,
        }, }}/>
      <Stack.Screen name="editar-funcionario" options={{
        title:t("titleEditAccount"), 
        headerStyle: {
          backgroundColor:colors.button,
        }, }}/>
      <Stack.Screen name="editar-moto" options={{
        title:t("titleEditBike"),
        headerStyle: {
          backgroundColor: colors.button,
        }, }}/>      
      <Stack.Screen name="editar-motorista" options={{
        title:t("titleEditBiker"), 
        headerStyle: {
          backgroundColor: colors.button,
        }, }}/>      
      <Stack.Screen name="editar-patio" options={{
        title:t("titleEditPatio"), 
        headerStyle: {
          backgroundColor: colors.button,
        }, }}/>      
      <Stack.Screen name="editar-setor" options={{
        title:t("titleEditSector"), 
        headerStyle: {
          backgroundColor: colors.button,
        }, }}/>      
      <Stack.Screen name="editar-situacao" options={{
        title:t("titleEditSituation"), 
        headerStyle: {
          backgroundColor: colors.button,
        }, }}/>      
    </Stack>
  );
}