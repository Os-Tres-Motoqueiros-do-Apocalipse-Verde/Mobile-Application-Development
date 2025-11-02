import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../src/context/ThemeContext";
import RNPickerSelect from "react-native-picker-select";
import { Moto, CampoForm } from "../../src/types/motos";
import { Modelo } from "../../src/types/modelo";
import { Setor } from "../../src/types/setor";
import { Motorista } from "../../src/types/motorista";
import { Situacao } from "../../src/types/situacao";


import { createGlobalStyles } from "..//../src/styles/globalStyles";

// ===== MOCKS =====
const enderecosMock = [
  { id: "1", rua: "Rua A", numero: "100", estado: "SP", codigoPais: "BR", codigoPostal: "01000-000", complemento: "Apto 101" },
  { id: "2", rua: "Rua B", numero: "200", estado: "RJ", codigoPais: "BR", codigoPostal: "20000-000", complemento: "Sala 2" },
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
    patio: { id: "1", totalMotos: 5, capacidadeMoto: 10, localizacao: "SP", filial: { id: "1", nome: "Filial A", endereco: enderecosMock[0] } },
  },
  {
    id: "2",
    nome: "Setor 2",
    qtdMoto: 3,
    capacidade: 10,
    descricao: "Setor secundário",
    cor: "#00ff00",
    localizacao: "RJ",
    patio: { id: "2", totalMotos: 3, capacidadeMoto: 15, localizacao: "RJ", filial: { id: "2", nome: "Filial B", endereco: enderecosMock[1] } },
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

// ===== FUNÇÃO GENÉRICA PARA LOAD COM FALLBACK =====
async function loadOrFallback<T>(key: string, fallback: T[]): Promise<T[]> {
  try {
    const json = await AsyncStorage.getItem(key);
    if (json) {
      const data = JSON.parse(json);
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    console.log(`Erro ao carregar ${key}:`, err);
  }
  return fallback;
}

// ===== COMPONENTE =====
export default function MotoRegister() {
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);
  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [situacoes, setSituacoes] = useState<Situacao[]>([]);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);

  const [form, setForm] = useState<Moto>({
    id: Date.now().toString(),
    placa: "",
    chassi: 0,
    condicao: "",
    localizacao: "",
    modelo: modelosMock[0],
    setor: undefined,
    situacao: situacoesMock[0],
    motorista: undefined,
  });

  // Carregar dados do AsyncStorage
  useEffect(() => {
    async function loadData() {
      const modelosData = await loadOrFallback("modelos", modelosMock);
      const setoresData = await loadOrFallback("setores", setoresMock);
      const situacoesData = await loadOrFallback("situacoes", situacoesMock);
      const motoristasData = await loadOrFallback("motoristas", motoristasMock);

      setModelos(modelosData);
      setSetores(setoresData);
      setSituacoes(situacoesData);
      setMotoristas(motoristasData);

      setForm(prev => ({
        ...prev,
        modelo: modelosData[0] ?? modelosMock[0],
        situacao: situacoesData[0] ?? situacoesMock[0],
      }));
    }
    loadData();
  }, []);

  const handleChange = (key: keyof Moto, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // ===== Validação completa =====
  const handleSave = async () => {
    const erros: string[] = [];

    if (!form.placa || typeof form.placa !== "string") erros.push(t("alertErrorRegisterPlate"));
    if (form.chassi === undefined || typeof form.chassi !== "number" || isNaN(form.chassi)) erros.push(t("alertErrorRegisterChassis"));
    if (!form.condicao || typeof form.condicao !== "string") erros.push(t("alertErrorRegisterCondition"));
    if (form.localizacao && typeof form.localizacao !== "string") erros.push(t("alertErrorRegisterLocation"));
    if (!form.modelo || typeof form.modelo !== "object" || !form.modelo.id) erros.push(t("alertErrorRegisterModel"));
    if (!form.situacao || typeof form.situacao !== "object" || !form.situacao.id) erros.push(t("alertErrorRegisterSituation"));

    if (erros.length > 0) {
      Alert.alert(t("titleError"), erros.join("\n"));
      return;
    }

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
    { key: "chassi", label: t("titleChassis"), placeholder: t("placeholderChassis"), keyboardType: "numeric", iconName: "barcode-outline" },
    { key: "condicao", label: t("titleCondition"), placeholder: t("placeholderCondition"), keyboardType: "default", iconName: "checkmark-circle-outline" },
    // { key: "localizacao", label: t("titleLocation"), placeholder: t("placeholderLocation"), keyboardType: "default", iconName: "location-outline" },
  ];

  return (
    <SafeAreaView style={styles.profile}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{ flex:1, gap:50 }}
      >
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
          <FlatList
            style={styles.form}
            ref={flatListRef}
            data={campos}
            keyExtractor={(item) => item.key}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <View style={{ flex:1, gap:20 }}>
                <Text >{item.label}</Text>
                <View style={styles.input}>
                  <Ionicons name={item.iconName} size={24} color="green" style={styles.iconForm}/>
                  <TextInput
                    style={styles.textInput}
                    value={item.key === "chassi" ? form.chassi?.toString() ?? "" : (form[item.key as keyof Moto] as string)}
                    onChangeText={(text) => {
                      if (item.key === "chassi") {
                        const num = text.replace(/[^0-9]/g, "");
                        handleChange("chassi", num ? Number(num) : undefined);
                      } else {
                        handleChange(item.key, text);
                      }
                    }}
                    placeholder={item.placeholder || ""}
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
              <View style={styles.form} >
                {/* Modelo */}
                <Text >{t("titleModel")}</Text>
                <View style={styles.inputSelecao}>
                  <RNPickerSelect
                  placeholder={{}}
                  onValueChange={(value) => {
                    const modeloSelecionado = modelos.find(m => m.id === value);
                    handleChange("modelo", modeloSelecionado);
                  }}
                  value={form.modelo.id}
                  items={modelos.length > 0 ? modelos.map(m => ({ label: m.nome, value: m.id })) : [{ label: t('labelNoModel'), value: null }]}
                  />

                </View>
                

                {/* Setor */}
                <Text style={{ flex:1, gap:20, color: colors.text }}>{t("titleSector")}</Text>
                <View style={styles.inputSelecao}>
                  <RNPickerSelect
                  placeholder={{}}
                  onValueChange={(value) => {
                    const setorSelecionado = setores.find(s => s.id === value);
                    handleChange("setor", setorSelecionado);
                  }}
                  value={form.setor?.id ?? null}
                  items={[{ label: t('EmptySector'), value: null }, ...setores.map(s => ({ label: s.nome, value: s.id }))]}
                  />

                </View>
                

                {/* Situação */}
                <Text style={{ flex:1, gap:20 }}>{t("titleSituation")}</Text>
                <View style={styles.inputSelecao}>
                  <RNPickerSelect
                  placeholder={{}}
                  onValueChange={(value) => {
                    const situacaoSelecionado = situacoes.find(s => s.id === value);
                    handleChange("situacao", situacaoSelecionado);
                  }}
                  value={form.situacao.id ?? null}
                  items={situacoes.length > 0 ? situacoes.map(s => ({ label: s.nome, value: s.id })) : [{ label: t('labelNoSituation'), value: null }]}
                />

                </View>
                

                {/* Motorista */}
                <Text>{t("titleDriver")}</Text>
                <View style={styles.inputSelecao}>
                  <RNPickerSelect
                  placeholder={{}}
                  onValueChange={(value) => {
                    if (!value) handleChange("motorista", undefined);
                    else handleChange("motorista", motoristas.find(m => m.id === value));
                  }}
                  value={form.motorista?.id ?? null}
                  items={[{ label: t('EmptyDriver'), value: null }, ...motoristas.map(m => ({ label: m.dados.nome, value: m.id }))]}
                />

                </View>
                

                {/* Botões */}
                <View style={{ flex:1, gap:20 }}>
                  <TouchableOpacity style={styles.button} onPress={() => router.push('/cadastro-modelo')}>
                    <Text style={styles.buttonText}>{t("titleRegisterModel")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => router.push('/cadastro-setor')}>
                    <Text style={styles.buttonText}>{t("titleRegisterSector")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => router.push('/cadastro-situacao')}>
                    <Text style={styles.buttonText}>{t("titleRegisterSituation")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => router.push('/cadastro-motorista')}>
                    <Text style={styles.buttonText}>{t("titleRegisterBiker")}</Text>
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                      <Text style={styles.buttonText}>{t("titleSaveBike")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
