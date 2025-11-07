import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modelo } from "../../src/types/modelo";

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function ModeloEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); 
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const [form, setForm] = useState<Modelo | null>(null);

  useEffect(() => {
    const loadModelo = async () => {
      try {
        const data = await AsyncStorage.getItem("modelos");
        if (!data) return;

        const modelos: Modelo[] = JSON.parse(data);
        const modelo = modelos.find((m) => m.id === id);
        if (modelo) setForm(modelo);
      } catch (error) {
        console.log(error);
        Alert.alert(t("titleError"), t("alertErroLoadModel"));
      }
    };
    loadModelo();
  }, [id]);

  const handleChange = (key: keyof Modelo, value: any) => {
    if (!form) return;
    setForm((prev) => ({ ...prev!, [key]: value }));
  };

  const handleSave = async () => {
    if (!form) return;

    const erros: string[] = [];
    if (!form.nome) erros.push(t("alertErrorRegisterName"));
    if (!form.frenagem) erros.push(t("alertErrorRegisterBraking"));
    if (!form.sisPartida) erros.push(t("alertErrorRegisterStartSystem"));
    if (form.tanque <= 0 || isNaN(form.tanque))
      erros.push(t("alertErrorRegisterTank"));
    if (!form.tipoCombustivel)
      erros.push(t("alertErrorRegisterFuelType"));
    if (form.consumo <= 0 || isNaN(form.consumo))
      erros.push(t("alertErrorRegisterConsumption"));

    if (erros.length > 0) {
      Alert.alert(t("titleError"), erros.join("\n"));
      return;
    }

    try {
      const data = await AsyncStorage.getItem("modelos");
      const modelos: Modelo[] = data ? JSON.parse(data) : [];

      const index = modelos.findIndex((m) => m.id === form.id);
      if (index !== -1) {
        modelos[index] = form;
        await AsyncStorage.setItem("modelos", JSON.stringify(modelos));
        Alert.alert(t("alertSuccessEmployeeTitle"), t("alertUpdateModel"));
        router.back();
      } else {
        Alert.alert(t("titleError"), t("alertModelNotFound"));
      }
    } catch (error) {
      console.log(error);
      Alert.alert(t("titleError"), t("alertErroUpdateModel"));
    }
  };

  if (!form) {
    return (
      <SafeAreaView>
        <Text>{t("loading")}</Text>
      </SafeAreaView>
    );
  }

  const campos = [
    { key: "nome", label: t("namePlace"), placeholder: "Ex: CG 160", iconName: "bicycle-outline", keyboardType: "default" },
    { key: "frenagem", label: t("titleBraking"), placeholder: "Ex: ABS", iconName: "hand-left-outline", keyboardType: "default" },
    { key: "sisPartida", label: t("titleStartingSystem"), placeholder: "Ex: Elétrica", iconName: "flash-outline", keyboardType: "default" },
    { key: "tanque", label: t("titleTank"), placeholder: "Ex: 15", iconName: "speedometer-outline", keyboardType: "numeric" },
    { key: "tipoCombustivel", label: t("titleFuelType"), placeholder: "Ex: Gasolina", iconName: "flame-outline", keyboardType: "default" },
    { key: "consumo", label: t("titleConsumption"), placeholder: "Ex: 30", iconName: "leaf-outline", keyboardType: "numeric" },
  ];

  return (
    <SafeAreaView style={styles.profile}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            style={styles.form}
            ref={flatListRef}
            data={campos}
            keyExtractor={(item) => item.key}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <View style={{ flex:1, gap:20 }}>
                <Text style={styles.textLabel}>{item.label}</Text>
                <View style={styles.input}>
                  <Ionicons name={item.iconName as any} size={24} color="#09BC00" style={styles.iconForm}/>
                  <TextInput style={styles.textInput}
                    placeholder={item.placeholder}
                    value={
                      ["tanque", "consumo"].includes(item.key)
                        ? form[item.key as keyof Modelo]?.toString() ?? ""
                        : (form[item.key as keyof Modelo] as string)
                    }
                    keyboardType={item.keyboardType as any}
                    onChangeText={(text) => {
                      if (["tanque", "consumo"].includes(item.key)) {
                        const num = text.replace(/[^0-9.]/g, "");
                        handleChange(item.key as keyof Modelo, num ? Number(num) : 0);
                      } else {
                        handleChange(item.key as keyof Modelo, text);
                      }
                    }}
                    onFocus={() =>
                      flatListRef.current?.scrollToIndex({
                        index,
                        animated: true,
                        viewPosition: 0.3,
                      })
                    }
                  />
                </View>
              </View>
            )}
            ListFooterComponent={
              <View style={{ paddingTop: 30 }}>
                <TouchableOpacity style={styles.button}  onPress={handleSave}>
                  <Text style={styles.buttonText}>{t("titleSaveModel")}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
