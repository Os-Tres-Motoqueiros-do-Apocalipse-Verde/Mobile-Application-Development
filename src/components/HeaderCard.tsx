import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LanguageSelector from "./language";
import { usePathname } from "expo-router";

export default function HeaderCard() {
  const pathname = usePathname();

  // mapeia os títulos com base na rota
  const titles: Record<string, string> = {
    "/login": "Login",
    "/cadastro": "Cadastro",
    "/home": "Home",
    "/profile": "Perfil",
  };

  const title = titles[pathname] || "";

  return (
    <View style={styles.card}>
      {/* seletor de idioma no canto superior direito */}
      <View style={styles.language}>
        <LanguageSelector />
      </View>

      {/* título da página */}
      <Text style={styles.title}>{title}</Text>

      {/* mascote / logo */}
      <View style={styles.mascote}>
        <Text style={{ fontSize: 28 }}>🏍️</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#009639",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  language: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
  },
  mascote: {
    position: "absolute",
    bottom: 10,
    right: 20,
  },
});
