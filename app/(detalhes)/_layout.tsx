import React from "react";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";


export default function MotoListLayout() {

  const { t } = useTranslation();
  
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="moto" options={{ 
        title: t("titleBike"), 
        headerShown:true, 
        headerStyle: {
          backgroundColor: "#099302",
        },  }} />
    </Stack>
  );
}
