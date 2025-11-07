import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { Funcionario } from "../../src/types/funcionario";
import { Dados } from "../../src/types/dados";

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";

export default function Cadastro() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<Funcionario>({
    id: Date.now().toString(),
    nome: "",
    cargo: "",
    dados: {
      id: Date.now().toString(),
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      cpf: "",
    },
  });

  // --- handleChange tipado ---
  const handleChange = <K extends keyof Funcionario | keyof Dados>(
    key: K,
    value: string
  ) => {
    const camposDados: (keyof Dados)[] = [
      "nome",
      "email",
      "senha",
      "telefone",
      "cpf",
    ];

    if (camposDados.includes(key as keyof Dados)) {
      setForm((prev) => ({
        ...prev,
        dados: { ...prev.dados, [key as keyof Dados]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [key as keyof Funcionario]: value }));
    }
  };

  // --- getValue seguro ---
  const getValue = (key: string): string => {
    const dadosKeys: (keyof Dados)[] = ["nome", "email", "senha", "telefone", "cpf"];
    const funcionarioKeys: (keyof Funcionario)[] = ["nome", "cargo"];

    if (dadosKeys.includes(key as keyof Dados)) {
      return form.dados[key as keyof Dados] ?? "";
    }

    if (funcionarioKeys.includes(key as keyof Funcionario)) {
      const value = form[key as keyof Funcionario];
      return typeof value === "string" ? value : "";
    }

    return "";
  };

  // --- salvar cadastro ---
  const handleRegister = async () => {
    const { nome, email, senha, telefone, cpf } = form.dados;
    const { cargo } = form;

    if (!nome || !email || !senha || !telefone || !cpf || !cargo) {
      Alert.alert(t("titleError"), t("alertEmptyInput"));
      return;
    }

    try {
      const storage = await AsyncStorage.getItem("funcionarios");
      const funcionarios: Funcionario[] = storage ? JSON.parse(storage) : [];

      const existe = funcionarios.some(
        (f) =>
          f?.dados?.cpf === cpf ||
          f?.dados?.email?.toLowerCase() === email.toLowerCase()
      );

      if (existe) {
        Alert.alert(t("titleError"), t("alertDuplicateUser"));
        return;
      }

      const novoFuncionario: Funcionario = {
        ...form,
        id: Date.now().toString(),
        dados: { ...form.dados, id: Date.now().toString() },
      };

      funcionarios.push(novoFuncionario);
      await AsyncStorage.setItem("funcionarios", JSON.stringify(funcionarios));

      Alert.alert(
        t("alertSuccessEmployeeTitle"),
        t("alertRegisterEmployeeContext")
      );

      setForm({
        id: Date.now().toString(),
        nome: "",
        cargo: "",
        dados: {
          id: Date.now().toString(),
          nome: "",
          email: "",
          senha: "",
          telefone: "",
          cpf: "",
        },
      });

      router.push("/login");
    } catch (error) {
      Alert.alert(t("titleError"), t("alertRegisterEmployeeErrorContext"));
      console.log(error);
    }
  };

  // --- campos do formulário ---
  const campos = [
    {
      key: "nome",
      label: t("titleName"),
      placeholder: t("namePlace"),
      iconName: "person-outline",
      keyboardType: "default",
    },
    {
      key: "email",
      label: t("titleEmail"),
      placeholder: t("emailPlace"),
      iconName: "mail-outline",
      keyboardType: "email-address",
    },
    {
      key: "senha",
      label: t("titlePassword"),
      placeholder: t("passwordPlace"),
      iconName: "lock-closed-outline",
      keyboardType: "default",
      secure: true,
    },
    {
      key: "telefone",
      label: t("titlePhone"),
      placeholder: t("telephonePlace"),
      iconName: "call-outline",
      keyboardType: "phone-pad",
    },
    {
      key: "cpf",
      label: t("titleCPF"),
      placeholder: t("nationalIdPlace"),
      iconName: "reader-outline",
      keyboardType: "numeric",
    },
    {
      key: "cargo",
      label: t("titleCargo"),
      placeholder: t("positionPlace"),
      iconName: "storefront-outline",
      keyboardType: "default",
    },
  ];

  return (
    <SafeAreaView style={[styles.profile, { flex: 1 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 120,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.form}>
              {campos.map((item, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                  <Text style={styles.textLabel}>{item.label}</Text>
                  <View style={styles.input}>
                    <Ionicons
                      name={item.iconName as any}
                      size={30}
                      color="#09BC00"
                      style={styles.iconForm}
                    />
                    <TextInput
                      placeholder={item.placeholder}
                      value={getValue(item.key)}
                      onChangeText={(text) =>
                        handleChange(item.key as keyof Funcionario | keyof Dados, text)
                      }
                      keyboardType={(item.keyboardType as any) || "default"}
                      secureTextEntry={item.secure ? !showPassword : false}
                    />
                    {item.secure && (
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={showPassword ? "eye-outline" : "eye-off-outline"}
                          size={24}
                          color="#09BC00"
                          style={styles.olho}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>{t("registerTitle")}</Text>
              </TouchableOpacity>

              <View style={styles.cadastrar}>
                <Text style={{ color: colors.text }}>
                  {t("haveAccountText")}{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={{ color: "#099302" }}>{t("loginTitle")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
