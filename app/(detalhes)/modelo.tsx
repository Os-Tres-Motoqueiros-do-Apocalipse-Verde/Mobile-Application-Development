import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Modelo } from "../../src/types/modelo";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";

export default function ModeloDetails() {
  const [openOptions, setOpenOptions] = useState(false);
  const [modelo, setModelo] = useState<Modelo | null>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    loadModelo();
  }, []);

  const loadModelo = async () => {
    try {
      const data = await AsyncStorage.getItem("modelos");
      const modelos: Modelo[] = data ? JSON.parse(data) : [];
      const found = modelos.find((m) => m.id === params.id);
      if (found) setModelo(found);
      else Alert.alert(t("titleError"), t("alertContextErroFindModel"));
    } catch (error) {
      Alert.alert(t("titleError"), t("alertContextErroLoadModel"));
    }
  };

  const handleDelete = () => {
    Alert.alert(
      t("titleDelete"),
      t("contextDeleteModel"),
      [
        { text: t("titleCancel") },
        {
          text: t("titleDelete"),
          style: "destructive",
          onPress: async () => {
            try {
              const data = await AsyncStorage.getItem("modelos");
              let modelos: Modelo[] = data ? JSON.parse(data) : [];
              modelos = modelos.filter((m) => m.id !== modelo?.id);
              await AsyncStorage.setItem("modelos", JSON.stringify(modelos));
              Alert.alert(t("alertSuccessEmployeeTitle"), t("alertConfirmedModel"));
              router.back();
            } catch (error) {
              Alert.alert(t("titleError"), t("alertContextErrorDeletedModel"));
            }
          },
        },
      ]
    );
  };

  if (!modelo) return null;

  const displayOptional = (value: string | number | undefined, fallback: string) =>
    value !== undefined && value !== null && value.toString().trim() !== ""
      ? value
      : fallback;

  return (
    <SafeAreaView style={styles.profile}>
      <ScrollView contentContainerStyle={styles.profile}>
        <View style={styles.motoStatus}>
          <Text style={{ fontSize: 30, color: "#fff" }}>
            {displayOptional(modelo.nome, "-")}
          </Text>
        </View>

        {/* Dados do modelo */}
        <View style={styles.dadosProfile}>
          <View style={styles.dadosPreenchidos}>
            <Ionicons name="bicycle-outline" size={24} color="#099302" />
            <Text style={styles.text}>
              {t("titleBraking")}: {displayOptional(modelo.frenagem, "-")}
            </Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="flash-outline" size={24} color="#099302" />
            <Text style={styles.text}>
              {t("titleStartingSystem")}: {displayOptional(modelo.sisPartida, "-")}
            </Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="speedometer-outline" size={24} color="#099302" />
            <Text style={styles.text}>
              {t("titleTank")}: {displayOptional(modelo.tanque, "-")} L
            </Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="flame-outline" size={24} color="#099302" />
            <Text style={styles.text}>
              {t("titleFuelType")}: {displayOptional(modelo.tipoCombustivel, "-")}
            </Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="leaf-outline" size={24} color="#099302" />
            <Text style={styles.text}>
              {t("titleConsumption")}: {displayOptional(modelo.consumo, "-")} km/L
            </Text>
          </View>
        </View>

        {/* Botão de opções */}
        <TouchableOpacity
          style={{
            backgroundColor: "#099302",
            width: 100,
            marginLeft: 40,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
          }}
          onPress={() => setOpenOptions(!openOptions)}
        >
          <Image
            style={{ alignSelf: "center" }}
            source={require("../../assets/profile/white-logo.png")}
          />
        </TouchableOpacity>

        {openOptions && (
          <View style={styles.config}>
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() =>
                router.push({
                  pathname: "/editar-modelo",
                  params: { id: modelo?.id },
                })
              }
            >
              <Ionicons
                name="pencil-outline"
                size={30}
                color="#fff"
                style={{ alignSelf: "center" }}
              />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleUpdate")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>
                  {t("contextUpdateModel")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() => router.push("/cadastro-modelo")}
            >
              <Ionicons
                name="create-outline"
                size={30}
                color="#fff"
                style={{ alignSelf: "center" }}
              />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleRegister")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>
                  {t("contextRegisterModel")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botoesConf} onPress={handleDelete}>
              <Ionicons
                name="trash-outline"
                size={30}
                color="#fff"
                style={{ alignSelf: "center" }}
              />
              <View>
                <Text style={{ color: "#fff" }}>{t("titleDelete")}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>
                  {t("contextDeleteModel")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
