import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Situacao } from "../../src/types/situacao";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function SituacaoDetails() {
  const [openOptions, setOpenOptions] = useState(false);
  const [situacao, setSituacao] = useState<Situacao | null>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    loadSituacao();
  }, []);

  const loadSituacao = async () => {
    try {
      const data = await AsyncStorage.getItem("situacoes");
      const list: Situacao[] = data ? JSON.parse(data) : [];
      const found = list.find((s) => s.id === params.id);
      if (found) setSituacao(found);
      else Alert.alert(t("titleError"), t("alertContextErroFindSituacoes"));
    } catch (error) {
      Alert.alert(t("titleError"), t("alertContextErroLoadSituacoes"));
    }
  };

  const handleDelete = () => {
    Alert.alert(t("titleDelete"), t("contextDeleteSituacoes"), [
      { text: t("titleCancel") },
      {
        text: t("titleDelete"),
        style: "destructive",
        onPress: async () => {
          try {
            const data = await AsyncStorage.getItem("situacoes");
            let list: Situacao[] = data ? JSON.parse(data) : [];
            list = list.filter((s) => s.id !== situacao?.id);
            await AsyncStorage.setItem("situacoes", JSON.stringify(list));
            Alert.alert(t("alertSuccessEmployeeTitle"), t("alertConfirmedSituacoes"));
            router.back();
          } catch (error) {
            Alert.alert(t("titleError"), t("alertContextErroDeletedSituacoes"));
          }
        },
      },
    ]);
  };

  if (!situacao) return null;

  const displayOptional = (value: string | undefined, fallback: string) =>
    value && value.trim() !== "" ? value : fallback;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.profile}>

        {/* Nome da Situação */}
        <View style={styles.motoStatus}>
          <Text style={{ fontSize: 30, color: "#fff" }}>{displayOptional(situacao.nome, "-")}</Text>
        </View>

        {/* Dados da Situação */}
        <View style={styles.dadosProfile}>
          <View style={styles.dadosPreenchidos}>
            <Ionicons name="reader-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleDescription")}: {displayOptional(situacao.descricao, "-")}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="checkmark-done-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleStatus")}: {displayOptional(situacao.status, "-")}</Text>
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
            {/* Editar Situação */}
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() =>
                router.push({
                  pathname: "/editar-situacao",
                  params: { id: situacao?.id },
                })
              }
            >
              <Ionicons name="pencil-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleUpdate")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t("contextUpdateSituacao")}</Text>
              </View>
            </TouchableOpacity>

            {/* Cadastrar nova Situação */}
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() => router.push("/cadastro-situacao")}
            >
              <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleRegister")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t("contextRegisterSituacoes")}</Text>
              </View>
            </TouchableOpacity>

            {/* Deletar Situação */}
            <TouchableOpacity style={styles.botoesConf} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleDelete")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t("contextDeleteSituacoes")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
