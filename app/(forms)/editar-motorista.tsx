import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import { Motorista, CampoForm } from "../../src/types/motorista";
import { Dados } from "../../src/types/dados";

export default function MotoristaCreate() {
  const router = useRouter();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const planos = ["Básico", "Intermediário", "Premium"];

  const [form, setForm] = useState<Motorista>({
    id: Date.now().toString(),
    plano: planos[0],
    dados: {
      id: Date.now().toString(),
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
    },
  });

  const handleChange = (key: keyof Motorista | keyof Dados, value: string) => {
    if (["id", "nome", "cpf", "telefone", "email", "senha"].includes(key as string)) {
      setForm(prev => ({
        ...prev,
        dados: { ...prev.dados, [key as keyof Dados]: value },
      }));
    } else {
      setForm(prev => ({ ...prev, [key as keyof Motorista]: value }));
    }
  };

  const handleSave = async () => {
    // Validação simples
    if (!form.dados.nome || !form.dados.cpf || !form.dados.telefone || !form.dados.email || !form.dados.senha) {
      Alert.alert(t("titleError"), t("alertEmptyInput"));
      return;
    }

    try {
      const data = await AsyncStorage.getItem("motoristas");
      const motoristas: Motorista[] = data ? JSON.parse(data) : [];

      // Verificar duplicados
      const existe = motoristas.some(
        m => m.dados.cpf === form.dados.cpf || m.dados.email.toLowerCase() === form.dados.email.toLowerCase()
      );
      if (existe) {
        Alert.alert(t("titleError"), t("alertDuplicateUser"));
        return;
      }

      motoristas.push(form);
      await AsyncStorage.setItem("motoristas", JSON.stringify(motoristas));

      Alert.alert(t("alertSuccessEmployeeTitle"), t("alertUpdateMotorista"));
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert(t("titleError"), t("alertErroUpdateMotorista"));
    }
  };

  const campos: CampoForm[] = [
    { key: "nome", label: t("namePlace"), placeholder: t("namePlace"), keyboardType: "default", iconName: "person-outline" },
    { key: "cpf", label: t("nationalIdPlace"), placeholder: t("nationalIdPlace"), keyboardType: "numeric", iconName: "reader-outline" },
    { key: "telefone", label: t("telephonePlace"), placeholder: t("telephonePlace"), keyboardType: "phone-pad", iconName: "call-outline" },
    { key: "email", label: t("emailPlace"), placeholder: t("emailPlace"), keyboardType: "email-address", iconName: "mail-outline" },
    { key: "senha", label: t("passwordPlace"), placeholder: t("passwordPlace"), keyboardType: "default", iconName: "lock-closed-outline" },
  ];

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            ref={flatListRef}
            data={campos}
            keyExtractor={(item) => item.key}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <View>
                <Text>{item.label}</Text>
                <View>
                  <Ionicons name={item.iconName} size={30} color="green"/>
                  <TextInput
                    value={
                      ["nome", "cpf", "telefone", "email", "senha"].includes(item.key as string)
                        ? form.dados[item.key as keyof Dados]
                        : (form[item.key as keyof Motorista] as string)
                    }
                    onChangeText={(text) => handleChange(item.key, text)}
                    placeholder={item.placeholder}
                    keyboardType={item.keyboardType}
                    secureTextEntry={item.key === "senha"}
                    onFocus={() => {
                      flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.3 });
                    }}
                  />
                </View>
              </View>
            )}
            ListFooterComponent={
              <View>
                <Text>{t("titlePlan")}</Text>
                <RNPickerSelect
                  value={form.plano}
                  onValueChange={(value) => handleChange("plano", value)}
                  items={planos.map((p) => ({ label: p, value: p }))}
                  placeholder={{}}
                />

                <TouchableOpacity onPress={handleSave}>
                  <Text>{t("registerTitle")}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
