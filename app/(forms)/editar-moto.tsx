import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";
import { MotoForm, CampoForm } from "../../src/types/motos";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MotoEdit() {
  const [form, setForm] = useState<MotoForm>({
    placa: "",
    chassi: "",
    condicao: "",
    modelo: "",
    frenagem: "",
    sistemaPartida: "",
    tanque: "",
    tipoCombustivel: "",
    consumo: "",
  });

  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadMoto();
  }, []);

  const loadMoto = async () => {
    try {
      const data = await AsyncStorage.getItem("motos");
      const motos: MotoForm[] = data ? JSON.parse(data) : [];
      const found = motos.find((m) => m.placa === params.placa);
      if (found) setForm(found);
      else Alert.alert(t('titleError'), t('alertMotoNotFound') || "Moto não encontrada");
    } catch (error) {
      Alert.alert(t('titleError'), t('alertErroLoadMoto') || "Não foi possível carregar os dados");
    }
  };

  const handleChange = (key: keyof MotoForm, value: string) => {
    setForm((prev: MotoForm) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const data = await AsyncStorage.getItem("motos");
      let motos: MotoForm[] = data ? JSON.parse(data) : [];

      motos = motos.map((m) => (m.placa === form.placa ? form : m));

      await AsyncStorage.setItem("motos", JSON.stringify(motos));
      Alert.alert(t('alertSuccessEmployeeTitle'), t('alertUpdateMoto'));

      router.back();
    } catch (error) {
      Alert.alert(t('titleError'), t('alertErroUpdateMoto'));
    }
  };

  const campos: CampoForm[] = [
    { key: "placa", label: t('titlePlate'), placeholder: t('placeholderPlate'), keyboardType: "default", iconName: "card-outline" },
    { key: "chassi", label: t('titleChassis'), placeholder: t('placeholderChassis'), keyboardType: "default", iconName: "barcode-outline" },
    { key: "condicao", label: t('titleCondition'), placeholder: t('placeholderCondition'), keyboardType: "default", iconName: "checkmark-circle-outline" },
    { key: "modelo", label: t('titleModel'), placeholder: t('placeholderModel'), keyboardType: "default", iconName: "bicycle-outline" },
    { key: "frenagem", label: t('titleBraking'), placeholder: t('placeholderBraking'), keyboardType: "default", iconName: "speedometer-outline" },
    { key: "sistemaPartida", label: t('titleStartingSystem'), placeholder: t('placeholderStartingSystem'), keyboardType: "default", iconName: "battery-charging-outline" },
    { key: "tanque", label: t('titleTank'), placeholder: t('placeholderTank'), keyboardType: "numeric", iconName: "water-outline" },
    { key: "tipoCombustivel", label: t('titleFuelType'), placeholder: t('placeholderFuelType'), keyboardType: "default", iconName: "flame-outline" },
    { key: "consumo", label: t('titleConsumption'), placeholder: t('Km/L'), keyboardType: "numeric", iconName: "speedometer-outline" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            ref={flatListRef}
            data={campos}
            keyExtractor={(item) => item.key}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item, index }) => (
              <View style={styles.form}>
                <Text style={{ color: colors.text }}>{item.label}</Text>
                <View style={styles.inputForm}>
                  <Ionicons name={item.iconName} size={30} color="green" style={styles.iconForm} />
                  <TextInput
                    value={form[item.key as keyof MotoForm]}
                    style={{ color: colors.text, flex: 1 }}
                    onChangeText={(text) => handleChange(item.key, text)}
                    placeholder={item.placeholder || `Digite ${item.label.toLowerCase()}`}
                    keyboardType={item.keyboardType || "default"}
                    placeholderTextColor={colors.textSecondary || "#888"}
                    onFocus={() => {
                      flatListRef.current?.scrollToIndex({
                        index,
                        animated: true,
                        viewPosition: 0.3,
                      });
                    }}
                  />
                </View>
              </View>
            )}
            ListFooterComponent={
              <View style={{ height: 120 }}>
                <TouchableOpacity style={styles.botao} onPress={handleSave}>
                  <Text style={{ color: "#fff" }}>{t("titleSaveBike")}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
