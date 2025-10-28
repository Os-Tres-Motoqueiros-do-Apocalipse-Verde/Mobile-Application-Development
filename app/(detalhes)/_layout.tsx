import React from "react";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";


export default function MotoListLayout() {

  const { t } = useTranslation();
  
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="filial" options={{ 
        title: t("titleFilial"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: "#099302",
        },  }} />
      <Stack.Screen name="modelo" options={{ 
        title: t("titleJustModel"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: "#099302",
        },  }} />
      <Stack.Screen name="moto" options={{ 
        title: t("titleBike"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: "#099302",
        },  }} />
      <Stack.Screen name="motorista" options={{ 
        title: t("titleBikers"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: "#099302",
        },  }} />
      <Stack.Screen name="situacao" options={{ 
        title: t("titleSituation"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: "#099302",
        },  }} />
    </Stack>
  );
}
