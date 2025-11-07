import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Filial } from "../../src/types/filial";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function FilialDetails() {
  const [openOptions, setOpenOptions] = useState(false);
  const [filial, setFilial] = useState<Filial | null>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    loadFilial();
  }, []);

  const loadFilial = async () => {
    try {
      const data = await AsyncStorage.getItem("filiais");
      const list: Filial[] = data ? JSON.parse(data) : [];
      const found = list.find((f) => f.id === params.id);
      if (found) setFilial(found);
      else Alert.alert(t("titleError"), t("alertContextErroFindFiliais"));
    } catch (error) {
      Alert.alert(t("titleError"), t("alertContextErroLoadFiliais"));
    }
  };

  const handleDelete = () => {
    Alert.alert(t("titleDelete"), t("contextDeleteFiliais"), [
      { text: t("titleCancel") },
      {
        text: t("titleDelete"),
        style: "destructive",
        onPress: async () => {
          try {
            const data = await AsyncStorage.getItem("filiais");
            let list: Filial[] = data ? JSON.parse(data) : [];
            list = list.filter((f) => f.id !== filial?.id);
            await AsyncStorage.setItem("filiais", JSON.stringify(list));
            Alert.alert(t("alertSuccessEmployeeTitle"), t("alertConfirmedFiliais"));
            router.back();
          } catch (error) {
            Alert.alert(t("titleError"), t("alertContextErroDeletedFiliais"));
          }
        },
      },
    ]);
  };

  if (!filial) return null;

  const displayOptional = (value?: string) =>
    value && value.trim() !== "" ? value : "-";

  const endereco = filial.endereco;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.profile}>
        {/* Nome da Filial */}
        <View style={styles.motoStatus}>
          <Text style={{ fontSize: 30, color: "#fff" }}>{displayOptional(filial.nome)}</Text>
        </View>

        {/* Endereço da Filial */}
        {endereco && (
          <View style={[styles.dadosProfile, { marginTop: 10 }]}>
            <Text style={[styles.text, { fontSize: 20, fontWeight: "600", marginBottom: 8 }]}>
              {t("titleAddress")}
            </Text>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="navigate-outline" size={24} color="#099302" />
              <Text style={styles.text}>
                {t("titleStreet")}: {displayOptional(endereco.rua)}
              </Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="home-outline" size={24} color="#099302" />
              <Text style={styles.text}>
                {t("titleNumber")}: {displayOptional(endereco.numero)}
              </Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="flag-outline" size={24} color="#099302" />
              <Text style={styles.text}>
                {t("titleState")}: {displayOptional(endereco.estado)}
              </Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="globe-outline" size={24} color="#099302" />
              <Text style={styles.text}>
                {t("titleCountryCode")}: {displayOptional(endereco.codigoPais)}
              </Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="mail-outline" size={24} color="#099302" />
              <Text style={styles.text}>
                {t("titlePostalCode")}: {displayOptional(endereco.codigoPostal)}
              </Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="home-outline" size={24} color="#099302" />
              <Text style={styles.text}>
                {t("titleComplement")}: {displayOptional(endereco.complemento)}
              </Text>
            </View>
          </View>
        )}

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
            {/* Editar Filial */}
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() =>
                router.push({
                  pathname: "/editar-filial",
                  params: { id: filial?.id },
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
                  {t("contextUpdateFilial")}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Cadastrar nova Filial */}
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() => router.push("/cadastro-filial")}
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
                  {t("contextRegisterFiliais")}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Deletar Filial */}
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
                  {t("contextDeleteFiliais")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
