import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { usePathname } from "expo-router";
import LanguageSelector from "./language";

export default function HeaderCustom() {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/login": "Login",
    "/cadastro": "Cadastro",
    "/home": "Home",
    "/profile": "Perfil",
    "/about": "Sobre Nós",
    "/motos": "Motos",
  };

  const title = titles[pathname] || "App";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LanguageSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0a962c",
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
