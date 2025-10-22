import React, { useState, useEffect, useRef } from "react";
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
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";
import { Moto, CampoForm } from "../../src/types/motos";
import { Modelo } from "../../src/types/modelo";
import { Setor } from "../../src/types/setor";
import { Situacao } from "../../src/types/situacao";
import { SafeAreaView } from "react-native-safe-area-context";

// Mocks para seleção
const modelosMock: Modelo[] = [
  { id: "1", nome: "Honda CG 160", frenagem: "ABS", sisPartida: "Elétrica", tanque: 14, tipoCombustivel: "Gasolina", consumo: 35 },
  { id: "2", nome: "Yamaha MT-03", frenagem: "CBS", sisPartida: "Elétrica", tanque: 14, tipoCombustivel: "Gasolina", consumo: 28 },
];

const setoresMock: Setor[] = [
  {
    id: "1",
    nome: "Setor A",
    qtdMoto: 10,
    capacidade: 20,
    patio: {
      id: "1",
      totalMotos: 10,
      capacidadeMoto: 20,
      filial: { id: "1", nome: "Filial 1", endereco: { id: "1", numero: "100", estado: "SP", codigoPais: "BR", codigoPostal: "01000-000", complemento: "", rua: "Rua A" } },
      localizacao: "Local A",
    },
    cor: "#f00",
    descricao: "Setor de teste",
    localizacao: "Local A",
  },
  {
    id: "2",
    nome: "Setor B",
    qtdMoto: 5,
    capacidade: 10,
    patio: {
      id: "2",
      totalMotos: 5,
      capacidadeMoto: 10,
      filial: { id: "2", nome: "Filial 2", endereco: { id: "2", numero: "200", estado: "RJ", codigoPais: "BR", codigoPostal: "20000-000", complemento: "", rua: "Rua B" } },
      localizacao: "Local B",
    },
    cor: "#0f0",
    descricao: "Setor B",
    localizacao: "Local B",
  },
];

const situacoesMock: Situacao[] = [
  { id: "1", nome: "Ativa", descricao: "Moto ativa", status: "OK" },
  { id: "2", nome: "Manutenção", descricao: "Moto em manutenção", status: "WARN" },
];

export default function MotoEdit() {
  const [form, setForm] = useState<Moto>({
    id: "",
    placa: "",
    chassi: "",
    condicao: "",
    localizacao: "",
    modelo: modelosMock[0],
    setor: setoresMock[0],
    situacao: situacoesMock[0],
    motorista: undefined,
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
      const motos: Moto[] = data ? JSON.parse(data) : [];
      const found = motos.find((m) => m.placa === params.placa);
      if (found) setForm(found);
      else Alert.alert(t("titleError"), t("alertMotoNotFound") || "Moto não encontrada");
    } catch (error) {
      Alert.alert(t("titleError"), t("alertErroLoadMoto") || "Não foi possível carregar os dados");
    }
  };

  const handleChange = (key: keyof Moto, value: string | Modelo | Setor | Situacao) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const data = await AsyncStorage.getItem("motos");
      let motos: Moto[] = data ? JSON.parse(data) : [];
      motos = motos.map((m) => (m.placa === form.placa ? form : m));
      await AsyncStorage.setItem("motos", JSON.stringify(motos));
      Alert.alert(t("alertSuccessEmployeeTitle"), t("alertUpdateMoto"));
      router.back();
    } catch (error) {
      Alert.alert(t("titleError"), t("alertErroUpdateMoto"));
    }
  };

  const campos: CampoForm[] = [
    { key: "placa", label: t("titlePlate"), placeholder: t("placeholderPlate"), keyboardType: "default", iconName: "card-outline" },
    { key: "chassi", label: t("titleChassis"), placeholder: t("placeholderChassis"), keyboardType: "default", iconName: "barcode-outline" },
    { key: "condicao", label: t("titleCondition"), placeholder: t("placeholderCondition"), keyboardType: "default", iconName: "checkmark-circle-outline" },
    { key: "localizacao", label: t("titleLocation"), placeholder: t("placeholderLocation"), keyboardType: "default", iconName: "location-outline" },
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
                    value={typeof form[item.key] === "string" ? (form[item.key] as string) : ""}
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
            ListHeaderComponent={
              <View style={{ padding: 10 }}>
                <Text style={{ color: colors.text }}>Modelo:</Text>
                {modelosMock.map((m) => (
                  <TouchableOpacity key={m.id} onPress={() => handleChange("modelo", m)}>
                    <Text style={{ color: form.modelo.id === m.id ? "green" : colors.text }}>{m.nome}</Text>
                  </TouchableOpacity>
                ))}

                <Text style={{ color: colors.text, marginTop: 10 }}>Setor:</Text>
                {setoresMock.map((s) => (
                  <TouchableOpacity key={s.id} onPress={() => handleChange("setor", s)}>
                    <Text style={{ color: form.setor.id === s.id ? "green" : colors.text }}>{s.nome}</Text>
                  </TouchableOpacity>
                ))}

                <Text style={{ color: colors.text, marginTop: 10 }}>Situação:</Text>
                {situacoesMock.map((s) => (
                  <TouchableOpacity key={s.id} onPress={() => handleChange("situacao", s)}>
                    <Text style={{ color: form.situacao.id === s.id ? "green" : colors.text }}>{s.nome}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            }
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
