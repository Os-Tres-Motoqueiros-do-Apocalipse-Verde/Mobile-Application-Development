import React, { useState, useRef } from "react";
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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Endereco } from "../../src/types/endereco";
import { Filial } from "../../src/types/filial";

export default function FilialCreate() {
  const router = useRouter();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const [form, setForm] = useState<Filial>({
    id: Date.now().toString(),
    nome: "",
    endereco: {
      id: Date.now().toString(),
      numero: "",
      estado: "",
      codigoPais: "",
      codigoPostal: "",
      complemento: "",
      rua: "",
    },
  });

  const handleChange = (key: keyof Filial | keyof Endereco, value: string) => {
    if (Object.keys(form.endereco).includes(key as string)) {
      setForm((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [key as keyof Endereco]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [key as keyof Filial]: value }));
    }
  };

  const handleSave = async () => {
    const errors: string[] = [];

    if (!form.nome) errors.push(t("alertErrorRegisterNameFilial"));
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
      filiais.push(form);
      await AsyncStorage.setItem("filiais", JSON.stringify(filiais));

      Alert.alert(t("alertSuccessEmployeeTitle"), t("alertCreateFilial"));
      router.back();
    } catch (error) {
      Alert.alert(t("titleError"), t("alertErroCreateFilial"));
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
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            ref={flatListRef}
            data={campos}
            keyExtractor={(item, index) => item.key + index}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <View>
                <Text>{item.label}</Text>
                <View>
                  <Ionicons name={item.iconName as any} size={24} color="green"/>
                  <TextInput
                    value={
                      Object.keys(form.endereco).includes(item.key)
                        ? String(form.endereco[item.key as keyof Endereco] ?? "")
                        : String(form[item.key as keyof Filial] ?? "")
                    }
                    onChangeText={(text) => handleChange(item.key as keyof Filial | keyof Endereco, text)}
                    placeholder={item.placeholder}
                    keyboardType={item.keyboardType || "default"}
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
                <TouchableOpacity
                    onPress={handleSave}
                >
                    <Text>{t("titleSave")}</Text>
                </TouchableOpacity>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
