import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Setor } from "../../src/types/setor";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function SetorDetails() {
  const [openOptions, setOpenOptions] = useState(false);
  const [setor, setSetor] = useState<Setor | null>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();

  useEffect(() => {
    loadSetor();
  }, []);

  const loadSetor = async () => {
    try {
      const data = await AsyncStorage.getItem("setores");
      const list: Setor[] = data ? JSON.parse(data) : [];
      const found = list.find((s) => s.id === params.id);
      if (found) setSetor(found);
      else Alert.alert(t("titleError"), t("alertContextErroFindSetores"));
    } catch (error) {
      Alert.alert(t("titleError"), t("alertContextErroLoadSetores"));
    }
  };

  const handleDelete = () => {
    Alert.alert(t("titleDelete"), t("contextDeleteSetor"), [
      { text: t("titleCancel") },
      {
        text: t("titleDelete"),
        style: "destructive",
        onPress: async () => {
          try {
            const data = await AsyncStorage.getItem("setores");
            let list: Setor[] = data ? JSON.parse(data) : [];
            list = list.filter((s) => s.id !== setor?.id);
            await AsyncStorage.setItem("setores", JSON.stringify(list));
            Alert.alert(t("alertSuccessTitle"), t("alertConfirmedSetor"));
            router.back();
          } catch (error) {
            Alert.alert(t("titleError"), t("alertContextErroDeletedSetor"));
          }
        },
      },
    ]);
  };

  if (!setor) return null;

  const displayOptional = (value: string | number | undefined, fallback: string) =>
    value !== undefined && value !== null && String(value).trim() !== "" ? value : fallback;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.profile}>

        {/* Nome do Setor */}
        <View style={styles.motoStatus}>
          <Text style={{ fontSize: 30, color: "#fff" }}>{displayOptional(setor.nome, "-")}</Text>
        </View>

        {/* Dados do Setor */}
        <View style={styles.dadosProfile}>
          <View style={styles.dadosPreenchidos}>
            <Ionicons name="reader-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleDescricao")}: {displayOptional(setor.descricao, "-")}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="cube-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleCapacidade")}: {displayOptional(setor.capacidade, "-")}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="bicycle-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleQtdMoto")}: {displayOptional(setor.qtdMoto, "-")}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="color-palette-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleCor")}: {displayOptional(setor.cor, "-")}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="navigate-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleLocalizacao")}: {displayOptional(setor.localizacao, "-")}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="navigate-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titlePatio")}: {displayOptional(setor.patio?.localizacao, "-")}</Text>
          </View>
        </View>

        {/* Botão de opções */}
        <TouchableOpacity
          style={{ backgroundColor: "#099302", width: 100, marginLeft: 40, borderTopEndRadius: 20, borderTopStartRadius: 20 }}
          onPress={() => setOpenOptions(!openOptions)}
        >
          <Image style={{ alignSelf: "center" }} source={require("../../assets/profile/white-logo.png")} />
        </TouchableOpacity>

        {openOptions && (
          <View style={styles.config}>
            {/* Editar Setor */}
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() =>
                router.push({
                  pathname: "/setor-edit",
                  params: { id: setor?.id },
                })
              }
            >
              <Ionicons name="pencil-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleUpdate")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t("contextUpdateSetor")}</Text>
              </View>
            </TouchableOpacity>

            {/* Cadastrar novo Setor */}
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() => router.push("/setor-register")}
            >
              <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleRegister")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t("contextRegisterSetor")}</Text>
              </View>
            </TouchableOpacity>

            {/* Deletar Setor */}
            <TouchableOpacity style={styles.botoesConf} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleDelete")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t("contextDeleteSetor")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
