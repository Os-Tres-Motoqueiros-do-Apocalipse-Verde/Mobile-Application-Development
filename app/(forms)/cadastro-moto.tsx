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
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";
import { Moto, CampoForm } from "../../src/types/motos";
import { Modelo } from "../../src/types/modelo";
import { Setor } from "../../src/types/setor";
import { Motorista } from "../../src/types/motorista";
import { Situacao } from "../../src/types/situacao";

// Mocks

const enderecosMock = [
  {
    id: "1",
    rua: "Rua A",
    numero: "100",
    estado: "SP",
    codigoPais: "BR",
    codigoPostal: "01000-000",
    complemento: "Apto 101",
  },
  {
    id: "2",
    rua: "Rua B",
    numero: "200",
    estado: "RJ",
    codigoPais: "BR",
    codigoPostal: "20000-000",
    complemento: "Sala 2",
  },
];

const setoresMock: Setor[] = [
  {
    id: "1",
    nome: "Setor 1",
    qtdMoto: 5,
    capacidade: 10,
    descricao: "Setor principal",
    cor: "#ff0000",
    localizacao: "SP",
    patio: {
      id: "1",
      totalMotos: 5,
      capacidadeMoto: 10,
      localizacao: "SP",
      filial: { id: "1", nome: "Filial A", endereco: enderecosMock[0] },
    },
  },
  {
    id: "2",
    nome: "Setor 2",
    qtdMoto: 3,
    capacidade: 10,
    descricao: "Setor secundário",
    cor: "#00ff00",
    localizacao: "RJ",
    patio: {
      id: "2",
      totalMotos: 3,
      capacidadeMoto: 15,
      localizacao: "RJ",
      filial: { id: "2", nome: "Filial B", endereco: enderecosMock[1] },
    },
  },
];

const modelosMock: Modelo[] = [
  { id: "1", nome: "Modelo A", frenagem: "Boa", sisPartida: "Elétrica", tanque: 15, tipoCombustivel: "Gasolina", consumo: 25 },
  { id: "2", nome: "Modelo B", frenagem: "Regular", sisPartida: "Manual", tanque: 12, tipoCombustivel: "Diesel", consumo: 20 },
];

const situacoesMock: Situacao[] = [
  { id: "1", nome: "Ativa", descricao: "Moto em uso", status: "ATIVO" },
  { id: "2", nome: "Inativa", descricao: "Moto parada", status: "INATIVO" },
];

const motoristasMock: Motorista[] = [
  {
    id: "1",
    plano: "Básico",
    dados: { id: "1", nome: "João Silva", cpf: "123.456.789-00", telefone: "11999999999", email: "joao@email.com", senha: "123456" },
  },
  {
    id: "2",
    plano: "Premium",
    dados: { id: "2", nome: "Maria Souza", cpf: "987.654.321-00", telefone: "11988888888", email: "maria@email.com", senha: "abcdef" },
  },
];

export default function MotoRegister() {
  const [form, setForm] = useState<Moto>({
    id: Date.now().toString(),
    placa: "",
    chassi: "",
    condicao: "",
    localizacao: "",
    modelo: modelosMock[0],
    setor: setoresMock[0],
    situacao: situacoesMock[0],
    motorista: undefined,
  });

  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const flatListRef = useRef<FlatList>(null);

  const handleChange = (key: keyof Moto, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const existingData = await AsyncStorage.getItem("motos");
      const motos: Moto[] = existingData ? JSON.parse(existingData) : [];
      motos.push(form);
      await AsyncStorage.setItem("motos", JSON.stringify(motos));

      Alert.alert(t("alertSuccessEmployeeTitle"), t("alertRegisterMoto"));
      router.back();
    } catch (error) {
      Alert.alert(t("titleError"), t("alertErroRegisterMoto"));
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
                    value={form[item.key as keyof Moto] as string}
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
              <View style={{ padding: 20 }}>
                {/* Modelos */}
                <Text style={{ color: colors.text, marginTop: 10 }}>{t("titleModel")}</Text>
                {modelosMock.map((m) => (
                  <TouchableOpacity key={m.id.toString()} onPress={() => handleChange("modelo", m)}>
                    <Text style={{ color: form.modelo.id === m.id ? "green" : colors.text }}>{m.nome}</Text>
                  </TouchableOpacity>
                ))}

                {/* Setores */}
                <Text style={{ color: colors.text, marginTop: 10 }}>{t("titleSector")}</Text>
                {setoresMock.map((s) => (
                  <TouchableOpacity key={s.id.toString()} onPress={() => handleChange("setor", s)}>
                    <Text>{s.nome}</Text>
                  </TouchableOpacity>
                ))}

                {/* Situação */}
                <Text style={{ color: colors.text, marginTop: 10 }}>{t("titleSituation")}</Text>
                {situacoesMock.map((s) => (
                  <TouchableOpacity key={s.id.toString()} onPress={() => handleChange("situacao", s)}>
                    <Text style={{ color: form.situacao.id === s.id ? "green" : colors.text }}>{s.nome}</Text>
                  </TouchableOpacity>
                ))}

                {/* Motorista */}
                <Text style={{ color: colors.text, marginTop: 10 }}>{t("titleDriverId")}</Text>
                <TextInput
                  value={form.motorista?.id || ""}
                  style={{ color: colors.text, borderBottomWidth: 1, borderBottomColor: colors.textSecondary }}
                  onChangeText={(text) =>
                    handleChange(
                      "motorista",
                      text
                        ? {
                            id: text,
                            plano: "Básico",
                            dados: {
                              id: Date.now().toString(),
                              nome: "",
                              cpf: "",
                              telefone: "",
                              email: "",
                              senha: "",
                            },
                          }
                        : undefined
                    )
                  }
                  placeholder={t("placeholderDriverId")}
                  keyboardType="default"
                  placeholderTextColor={colors.textSecondary || "#888"}
                />

                {/* Motoristas mock */}
                {motoristasMock.map((m) => (
                  <TouchableOpacity key={m.id.toString()} onPress={() => handleChange("motorista", m)}>
                    <Text style={{ color: form.motorista?.id === m.id ? "green" : colors.text }}>{m.dados.nome}</Text>
                  </TouchableOpacity>
                ))}

                {/* Botão salvar */}
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
