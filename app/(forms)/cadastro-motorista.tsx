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
  TouchableWithoutFeedback
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";
import { Motorista, CampoForm } from "../../src/types/motorista";
import { Dados } from "../../src/types/dados";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MotoristaCreate() {
  const [form, setForm] = useState<Motorista>({
    id: "",
    plano: "",
    dados: {
      id: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
      nome: "",
    },
  });

  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);
  const flatListRef = useRef<FlatList>(null);

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
    try {
      const data = await AsyncStorage.getItem("motoristas");
      let motoristas: Motorista[] = data ? JSON.parse(data) : [];
      motoristas.push(form);
      await AsyncStorage.setItem("motoristas", JSON.stringify(motoristas));
      Alert.alert(
        t("alertSuccessEmployeeTitle") || "Sucesso",
        t("alertCreateMotorista") || "Motorista criado com sucesso"
      );
      router.back();
    } catch (error) {
      Alert.alert(
        t("titleError") || "Erro",
        t("alertErroCreateMotorista") || "Erro ao criar motorista"
      );
    }
  };

  const campos: CampoForm[] = [
    { key: "id", label: "ID Motorista", placeholder: "Digite o ID do motorista", keyboardType: "default", iconName: "id-card-outline" },
    { key: "plano", label: "Plano", placeholder: "Digite o plano", keyboardType: "default", iconName: "ribbon-outline" },
    { key: "id", label: "ID Dados", placeholder: "Digite o ID dos dados", keyboardType: "default", iconName: "id-card-outline" },
    { key: "nome", label: "Nome", placeholder: "Digite o nome", keyboardType: "default", iconName: "person-outline" },
    { key: "cpf", label: "CPF", placeholder: "Digite o CPF", keyboardType: "numeric", iconName: "barcode-outline" },
    { key: "telefone", label: "Telefone", placeholder: "Digite o telefone", keyboardType: "phone-pad", iconName: "call-outline" },
    { key: "email", label: "Email", placeholder: "Digite o email", keyboardType: "email-address", iconName: "mail-outline" },
    { key: "senha", label: "Senha", placeholder: "Digite a senha", keyboardType: "default", iconName: "lock-closed-outline" },
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
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item, index }) => (
              <View style={styles.form}>
                <Text style={{ color: colors.text }}>{item.label}</Text>
                <View style={styles.inputForm}>
                  <Ionicons
                    name={item.iconName}
                    size={30}
                    color="green"
                    style={styles.iconForm}
                  />
                  <TextInput
                    value={
                      Object.keys(form.dados).includes(item.key as string)
                        ? String(form.dados[item.key as keyof Dados] ?? "")
                        : String(form[item.key as keyof Motorista] ?? "")
                    }
                    style={{ color: colors.text, flex: 1 }}
                    onChangeText={(text) =>
                      handleChange(
                        item.key as keyof Motorista | keyof Dados,
                        text
                      )
                    }
                    placeholder={item.placeholder}
                    keyboardType={item.keyboardType || "default"}
                    placeholderTextColor={colors.textSecondary || "#888"}
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
              <View style={{ height: 120 }}>
                <TouchableOpacity style={styles.botao} onPress={handleSave}>
                  <Text style={{ color: "#fff" }}>Salvar Motorista</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
