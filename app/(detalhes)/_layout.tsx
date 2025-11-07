import React from "react";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";


export default function MotoListLayout() {

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const { t } = useTranslation();
  
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="filial" options={{ 
        title: t("titleFilial"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: colors.button,
        },  }} />
      <Stack.Screen name="modelo" options={{ 
        title: t("titleJustModel"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: colors.button,
        },  }} />
      <Stack.Screen name="moto" options={{ 
        title: t("titleBike"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: colors.button,
        },  }} />
      <Stack.Screen name="motorista" options={{ 
        title: t("titleBikers"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: colors.button,
        },  }} />
      <Stack.Screen name="patio" options={{ 
        title: t("titlePatio"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: colors.button,
        },  }} />
      <Stack.Screen name="setor" options={{ 
        title: t("titleSectors"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: colors.button,
        },  }} />
      <Stack.Screen name="situacao" options={{ 
        title: t("titleSituation"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: colors.button,
        },  }} />
    </Stack>
  );
}
