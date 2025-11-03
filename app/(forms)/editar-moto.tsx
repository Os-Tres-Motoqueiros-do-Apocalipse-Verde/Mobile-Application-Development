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
import { Moto, CampoForm } from "../../src/types/motos";
import { Modelo } from "../../src/types/modelo";
import { Setor } from "../../src/types/setor";
import { Situacao } from "../../src/types/situacao";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";

import { createGlobalStyles } from "..//../src/styles/globalStyles";

// ===== MOCKS =====
const modelosMock: Modelo[] = [
  { id: "1", nome: "Honda CG 160", frenagem: "ABS", sisPartida: "Elétrica", tanque: 14, tipoCombustivel: "Gasolina", consumo: 35 },
  { id: "2", nome: "Yamaha MT-03", frenagem: "CBS", sisPartida: "Elétrica", tanque: 14, tipoCombustivel: "Gasolina", consumo: 28 },
];

const setoresMock: Setor[] = [
  { id: "1", nome: "Setor A", qtdMoto: 10, capacidade: 20, patio: { id: "1", totalMotos: 10, capacidadeMoto: 20, filial: { id: "1", nome: "Filial 1", endereco: { id: "1", numero: "100", estado: "SP", codigoPais: "BR", codigoPostal: "01000-000", complemento: "", rua: "Rua A" } }, localizacao: "Local A" }, cor: "#f00", descricao: "Setor de teste", localizacao: "Local A" },
  { id: "2", nome: "Setor B", qtdMoto: 5, capacidade: 10, patio: { id: "2", totalMotos: 5, capacidadeMoto: 10, filial: { id: "2", nome: "Filial 2", endereco: { id: "2", numero: "200", estado: "RJ", codigoPais: "BR", codigoPostal: "20000-000", complemento: "", rua: "Rua B" } }, localizacao: "Local B" }, cor: "#0f0", descricao: "Setor B", localizacao: "Local B" },
];

const situacoesMock: Situacao[] = [
  { id: "1", nome: "Ativa", descricao: "Moto ativa", status: "OK" },
  { id: "2", nome: "Manutenção", descricao: "Moto em manutenção", status: "WARN" },
];

// ===== FUNÇÃO AUX =====
const getCampoValor = (moto: Moto, key: keyof Moto) => {
  const valor = moto[key];
  if (!valor) return "";
  if (typeof valor === "object") return (valor as any).nome ?? "";
  return String(valor);
};

// ===== COMPONENTE =====
export default function MotoEdit() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const [form, setForm] = useState<Moto>({
    id: "",
    placa: "",
    chassi: 0,
    condicao: "",
    localizacao: "",
    modelo: modelosMock[0],
    setor: setoresMock[0],
    situacao: situacoesMock[0],
    motorista: undefined,
  });

  useEffect(() => {
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
    loadMoto();
  }, [params.placa]);

  const handleChange = (key: keyof Moto, value: any) => {
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
    { key: "chassi", label: t("titleChassis"), placeholder: t("placeholderChassis"), keyboardType: "numeric", iconName: "barcode-outline" },
    { key: "condicao", label: t("titleCondition"), placeholder: t("placeholderCondition"), keyboardType: "default", iconName: "checkmark-circle-outline" },
    // { key: "localizacao", label: t("titleLocation"), placeholder: t("placeholderLocation"), keyboardType: "default", iconName: "location-outline" },
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
                  <Ionicons name={item.iconName} size={30} color="#09BC00" style={styles.iconForm}/>
                  <TextInput
                    value={
                      item.key === "chassi"
                        ? form.chassi?.toString() ?? ""
                        : (form[item.key as keyof Moto] as string) ?? ""
                    }
                    onChangeText={(text) => {
                      if (item.key === "chassi") {
                        const num = text.replace(/[^0-9]/g, "");
                        handleChange("chassi", num ? Number(num) : 0);
                      } else {
                        handleChange(item.key as keyof Moto, text);
                      }
                    }}
                  />
                </View>
              </View>
            )}
            ListHeaderComponent={
              <View>
                {/* Modelo */}
                <Text style={styles.textLabel}>{t("titleModel")}</Text>
                <View style={styles.inputSelecao}>
                  <RNPickerSelect
                  placeholder={{}}
                  value={form.modelo?.id}
                  onValueChange={(value) => {
                    const m = modelosMock.find((m) => m.id === value);
                    if (m) handleChange("modelo", m);
                  }}
                  items={modelosMock.map((m) => ({ label: m.nome, value: m.id }))}
                />

                </View>
                

                {/* Setor */}
                <Text style={styles.textLabel}>{t("titleSector")}</Text>
                <View style={styles.inputSelecao}>
                   <RNPickerSelect
                  placeholder={{}}
                  value={form.setor?.id}
                  onValueChange={(value) => {
                    const s = setoresMock.find((s) => s.id === value);
                    handleChange("setor", s);
                  }}
                  items={[{ label: "Não possui setor", value: null }, ...setoresMock.map((s) => ({ label: s.nome, value: s.id }))]}
                />


                </View>
               
                {/* Situação */}
                <Text style={styles.textLabel}>{t("titleSituation")}</Text>
                <View style={styles.inputSelecao}>
                  <RNPickerSelect
                  placeholder={{}}
                  value={form.situacao?.id}
                  onValueChange={(value) => {
                    const s = situacoesMock.find((s) => s.id === value);
                    handleChange("situacao", s);
                  }}
                  items={situacoesMock.map((s) => ({ label: s.nome, value: s.id }))}
                />

                </View>
                
              </View>
            }
            ListFooterComponent={
              <View style={{ paddingTop: 30 }}>
                <TouchableOpacity style={styles.button}  onPress={handleSave}>
                  <Text style={styles.buttonText}>{t("titleSave")}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
