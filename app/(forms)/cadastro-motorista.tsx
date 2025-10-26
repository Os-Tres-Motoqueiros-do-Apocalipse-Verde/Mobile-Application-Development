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
import { Motorista, CampoForm } from "../../src/types/motorista";
import { Dados } from "../../src/types/dados";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";

export default function MotoristaCreate() {
  const router = useRouter();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const planos = ["Básico", "Premium", "VIP"];

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
    if (Object.keys(form.dados).includes(key as string)) {
      setForm((prev) => ({
        ...prev,
        dados: { ...prev.dados, [key as keyof Dados]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [key as keyof Motorista]: value }));
    }
  };

  const handleSave = async () => {
    const errors: string[] = [];

    if (!form.plano) errors.push(t("alertErrorRegisterPlan"));
    if (!form.dados.nome) errors.push(t("alertErrorRegisterName"));
    if (!form.dados.cpf) errors.push(t("alertErrorRegisterCPF"));
    if (!form.dados.telefone) errors.push(t("alertErrorRegisterPhone"));
    if (!form.dados.email) errors.push(t("alertErrorRegisterEmail"));
    if (!form.dados.senha) errors.push(t("alertErrorRegisterPassword"));

    if (errors.length > 0) {
      Alert.alert(t("titleError"), errors.join("\n"));
      return;
    }

    try {
      const data = await AsyncStorage.getItem("motoristas");
      const motoristas: Motorista[] = data ? JSON.parse(data) : [];
      motoristas.push(form);
      await AsyncStorage.setItem("motoristas", JSON.stringify(motoristas));

      Alert.alert(t("alertSuccessEmployeeTitle"), t("alertCreateMotorista"));
      router.back();
    } catch (error) {
      Alert.alert(t("titleError"), t("alertErroCreateMotorista"));
    }
  };

  const campos: CampoForm[] = [
    { key: "nome", label: t("titleName"), placeholder: t("placeholderName"), keyboardType: "default", iconName: "person-outline" },
    { key: "cpf", label: t("titleCPF"), placeholder: t("placeholderCPF"), keyboardType: "numeric", iconName: "barcode-outline" },
    { key: "telefone", label: t("titlePhone"), placeholder: t("placeholderPhone"), keyboardType: "phone-pad", iconName: "call-outline" },
    { key: "email", label: t("titleEmail"), placeholder: t("placeholderEmail"), keyboardType: "email-address", iconName: "mail-outline" },
    { key: "senha", label: t("titlePassword"), placeholder: t("placeholderPassword"), keyboardType: "default", iconName: "lock-closed-outline" },
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
            keyExtractor={(item, index) => item.key + index}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <View>
                <Text>{item.label}</Text>
                <View>
                  <Ionicons name={item.iconName} size={30} color="green"/>
                  <TextInput
                    value={
                      Object.keys(form.dados).includes(item.key as string)
                        ? String(form.dados[item.key as keyof Dados] ?? "")
                        : String(form[item.key as keyof Motorista] ?? "")
                    }
                    onChangeText={(text) => handleChange(item.key as keyof Motorista | keyof Dados, text)}
                    placeholder={item.placeholder}
                    keyboardType={item.keyboardType || "default"}
                    secureTextEntry={item.key === "senha"}
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
              <View>
                <Text>{t("titlePlan")}</Text>
                <RNPickerSelect
                  placeholder={{}}
                  value={form.plano}
                  onValueChange={(value) => handleChange("plano", value)}
                  items={planos.map((p) => ({ label: p, value: p }))}
                />

                <TouchableOpacity onPress={handleSave}>
                  <Text>{t("titleSaveDriver")}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
