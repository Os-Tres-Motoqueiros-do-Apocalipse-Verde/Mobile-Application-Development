import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Patio } from "../../src/types/patio";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function PatioDetails() {
  const [openOptions, setOpenOptions] = useState(false);
  const [patio, setPatio] = useState<Patio | null>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    loadPatio();
  }, []);

  const loadPatio = async () => {
    try {
      const data = await AsyncStorage.getItem("patios");
      const list: Patio[] = data ? JSON.parse(data) : [];
      const found = list.find((p) => p.id === params.id);
      if (found) setPatio(found);
      else Alert.alert(t("titleError"), t("alertContextErroFindAnyPatios"));
    } catch (error) {
      Alert.alert(t("titleError"), t("alertContextErroLoadingPatios"));
    }
  };

  const handleDelete = () => {
    Alert.alert(t("titleDelete"), t("contextDeletePatios"), [
      { text: t("titleCancel") },
      {
        text: t("titleDelete"),
        style: "destructive",
        onPress: async () => {
          try {
            const data = await AsyncStorage.getItem("patios");
            let list: Patio[] = data ? JSON.parse(data) : [];
            list = list.filter((p) => p.id !== patio?.id);
            await AsyncStorage.setItem("patios", JSON.stringify(list));
            Alert.alert(t("alertSuccessEmployeeTitle"), t("alertConfirmedPatios"));
            router.back();
          } catch (error) {
            Alert.alert(t("titleError"), t("alertContextErroDeletedPatios"));
          }
        },
      },
    ]);
  };

  if (!patio) return null;

  const displayOptional = (value: string | number | undefined, fallback: string) =>
    value !== undefined && value !== null && value.toString().trim() !== "" ? value.toString() : fallback;

  return (
    <SafeAreaView style={styles.profile}>
      <ScrollView contentContainerStyle={styles.profile}>

        {/* Localização do Pátio */}
        <View style={styles.motoStatus}>
          <Text style={{ fontSize: 30, color: "#fff" }}>{displayOptional(patio.localizacao, "-")}</Text>
        </View>

        {/* Dados do Pátio */}
        <View style={styles.dadosProfile}>
          <View style={styles.dadosPreenchidos}>
            <Ionicons name="bicycle-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleTotalMotos")}: {displayOptional(patio.totalMotos, "-")}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="cube-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleCapacity")}: {displayOptional(patio.capacidadeMoto, "-")}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="business-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleFilial")}: {displayOptional(patio.filial.nome, "-")}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="navigate-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t("titleFilialAddress")}: {displayOptional(patio.filial.endereco.rua, "-")}, {displayOptional(patio.filial.endereco.numero, "-")}</Text>
          </View>
        </View>

        {/* Botão de opções */}
        <TouchableOpacity
          style={{ backgroundColor: colors.button, width: 100, marginLeft: 40, borderTopEndRadius: 20, borderTopStartRadius: 20 }}
          onPress={() => setOpenOptions(!openOptions)}
        >
          <Image style={{ alignSelf: "center" }} source={require("../../assets/profile/white-logo.png")} />
        </TouchableOpacity>

        {openOptions && (
          <View style={styles.config}>
            {/* Editar Pátio */}
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() =>
                router.push({
                  pathname: "/editar-patio",
                  params: { id: patio?.id },
                })
              }
            >
              <Ionicons name="pencil-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleUpdate")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t("contextUpdatePatios")}</Text>
              </View>
            </TouchableOpacity>

            {/* Cadastrar novo Pátio */}
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() => router.push("/cadastro-patio")}
            >
              <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleRegister")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t("contextRegisterPatios")}</Text>
              </View>
            </TouchableOpacity>

            {/* Deletar Pátio */}
            <TouchableOpacity style={styles.botoesConf} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleDelete")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t("contextDeletePatios")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
