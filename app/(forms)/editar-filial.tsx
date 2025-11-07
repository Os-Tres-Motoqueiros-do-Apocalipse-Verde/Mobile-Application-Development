import React, { useState, useRef, useEffect } from "react";
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
import { Endereco } from "../../src/types/endereco";
import { Filial } from "../../src/types/filial";

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function FilialEdit() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const [form, setForm] = useState<Filial>({
    id: "",
    nome: "",
    endereco: {
      id: "",
      numero: "",
      estado: "",
      codigoPais: "",
      codigoPostal: "",
      complemento: "",
      rua: "",
    },
  });

  useEffect(() => {
    if (params.id) loadFilial(params.id);
  }, [params.id]);

  const loadFilial = async (id: string) => {
    try {
      const data = await AsyncStorage.getItem("filiais");
      const filiais: Filial[] = data ? JSON.parse(data) : [];
      const filial = filiais.find(f => f.id === id);
      if (!filial) {
        Alert.alert(t("titleError"), t("alertContextErroFindAnyFilial"));
        return;
      }
      setForm(filial);
    } catch (error) {
      console.log(error);
      Alert.alert(t("titleError"), t("alertContextErroLoadingFilial"));
    }
  };

  const handleChange = (key: keyof Filial | keyof Endereco, value: string) => {
    if (Object.keys(form.endereco).includes(key as string)) {
      setForm(prev => ({
        ...prev,
        endereco: { ...prev.endereco, [key as keyof Endereco]: value },
      }));
    } else {
      setForm(prev => ({ ...prev, [key as keyof Filial]: value }));
    }
  };

  const handleSave = async () => {
    const errors: string[] = [];

    if (!form.nome) errors.push(t("alertErrorRegisterName"));
    if (!form.endereco.estado) errors.push(t("alertErrorRegisterState"));
    if (!form.endereco.rua) errors.push(t("alertErrorRegisterStreet"));
    if (!form.endereco.numero) errors.push(t("alertErrorRegisterNumber"));
    if (!form.endereco.codigoPais) errors.push(t("alertErrorRegisterCountry"));
    if (!form.endereco.codigoPostal) errors.push(t("alertErrorRegisterPostal"));

    if (errors.length > 0) {
      Alert.alert(t("titleError"), errors.join("\n"));
      return;
    }

    try {
      const data = await AsyncStorage.getItem("filiais");
      const filiais: Filial[] = data ? JSON.parse(data) : [];
      const index = filiais.findIndex(f => f.id === form.id);

      if (index === -1) {
        Alert.alert(t("titleError"), t("alertContextErroFindAnyFilial"));
        return;
      }

      filiais[index] = form;
      await AsyncStorage.setItem("filiais", JSON.stringify(filiais));

      Alert.alert(t("alertSuccessEmployeeTitle"), t("alertUpdateFilial"));
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert(t("titleError"), t("alertErroUpdateFilial"));
    }
  };

  const campos = [
    { key: "nome", label: t("titleName"), placeholder: t("placeholderName"), iconName: "business-outline" },
    { key: "estado", label: t("titleState"), placeholder: t("placeholderState"), iconName: "flag-outline" },
    { key: "rua", label: t("titleStreet"), placeholder: t("placeholderStreet"), iconName: "navigate-outline" },
    { key: "numero", label: t("titleNumber"), placeholder: t("placeholderNumber"), iconName: "home-outline", keyboardType: "numeric" },
    { key: "codigoPais", label: t("titleCountryCode"), placeholder: t("placeholderCountryCode"), iconName: "globe-outline" },
    { key: "codigoPostal", label: t("titlePostalCode"), placeholder: t("placeholderPostalCode"), iconName: "mail-outline", keyboardType: "numeric" },
    { key: "complemento", label: t("titleComplement"), placeholder: t("placeholderComplement"), iconName: "home-outline" },
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
                    value={
                      Object.keys(form.endereco).includes(item.key)
                        ? String(form.endereco[item.key as keyof Endereco] ?? "")
                        : String(form[item.key as keyof Filial] ?? "")
                    }
                    onChangeText={(text) => handleChange(item.key as keyof Filial | keyof Endereco, text)}
                    placeholder={item.placeholder}
                    keyboardType={item.keyboardType || "default"}
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
                  <Text style={styles.buttonText}>{t("titleSaveFilial")}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
