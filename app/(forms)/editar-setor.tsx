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
import RNPickerSelect from "react-native-picker-select";
import { Setor } from "../../src/types/setor";
import { Patio } from "../../src/types/patio";

export default function SetorEdit() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const [patios, setPatios] = useState<Patio[]>([]);
  const [form, setForm] = useState<Setor>({
    id: "",
    nome: "",
    descricao: "",
    capacidade: 0,
    qtdMoto: 0,
    patio: {
      id: "",
      totalMotos: 0,
      capacidadeMoto: 0,
      filial: {
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
      },
      localizacao: "",
    },
    cor: "",
    localizacao: "",
  });

  useEffect(() => {
    loadPatios();
    if (params.id) loadSetor(params.id);
  }, [params.id]);

  const loadPatios = async () => {
    const data = await AsyncStorage.getItem("patios");
    const storedPatios: Patio[] = data ? JSON.parse(data) : [];
    setPatios(storedPatios);
  };

  const loadSetor = async (id: string) => {
    try {
      const data = await AsyncStorage.getItem("setores");
      const setores: Setor[] = data ? JSON.parse(data) : [];
      const setor = setores.find(s => s.id === id);
      if (!setor) {
        Alert.alert(t("titleError"), t("alertContextErroFindAnySetores"));
        return;
      }
      setForm(setor);
    } catch (error) {
      console.log(error);
      Alert.alert(t("titleError"), t("alertContextErroLoadingSetores"));
    }
  };

  const handleChange = (key: keyof Setor, value: string | number) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const errors: string[] = [];
    if (!form.nome) errors.push(t("alertErrorRegisterNome"));
    if (!form.capacidade || form.capacidade <= 0) errors.push(t("alertErrorRegisterCapacidade"));
    if (!form.patio.id) errors.push(t("alertErrorRegisterPatio"));

    if (errors.length > 0) {
      Alert.alert(t("titleError"), errors.join("\n"));
      return;
    }

    try {
      const data = await AsyncStorage.getItem("setores");
      const setores: Setor[] = data ? JSON.parse(data) : [];
      const index = setores.findIndex(s => s.id === form.id);

      if (index === -1) {
        Alert.alert(t("titleError"), t("alertContextErroFindAnySetores"));
        return;
      }

      setores[index] = form;
      await AsyncStorage.setItem("setores", JSON.stringify(setores));

      Alert.alert(t("alertSuccessTitle"), t("alertUpdateSetor"));
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert(t("titleError"), t("alertErroUpdateSetor"));
    }
  };

  const campos = [
    { key: "nome", label: t("titleNome"), placeholder: t("placeholderNome"), iconName: "create-outline" },
    { key: "descricao", label: t("titleDescricao"), placeholder: t("placeholderDescricao"), iconName: "reader-outline" },
    { key: "capacidade", label: t("titleCapacidade"), placeholder: t("placeholderCapacidade"), iconName: "cube-outline", keyboardType: "numeric" },
    { key: "qtdMoto", label: t("titleQtdMoto"), placeholder: t("placeholderQtdMoto"), iconName: "bicycle-outline", keyboardType: "numeric" },
    { key: "cor", label: t("titleCor"), placeholder: t("placeholderCor"), iconName: "color-palette-outline" },
    { key: "localizacao", label: t("titleLocalizacao"), placeholder: t("placeholderLocalizacao"), iconName: "navigate-outline" },
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
            keyExtractor={item => item.key}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <View style={{ marginBottom: 16 }}>
                <Text>{t("titlePatio")}</Text>
                <RNPickerSelect
                  placeholder={{ label: t("placeholderSelectPatio"), value: null }}
                  onValueChange={(value) => {
                    const selectedPatio = patios.find(p => p.id === value);
                    if (selectedPatio) {
                      setForm(prev => ({ ...prev, patio: selectedPatio }));
                    }
                  }}
                  items={patios.map(p => ({ label: p.localizacao, value: p.id }))}
                  value={form.patio.id || null}
                />
              </View>
            }
            renderItem={({ item, index }) => (
              <View style={{ marginBottom: 16 }}>
                <Text>{item.label}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name={item.iconName as any} size={22} />
                  <TextInput
                    placeholder={item.placeholder}
                    value={String(form[item.key as keyof Setor] ?? "")}
                    keyboardType={item.keyboardType || "default"}
                    onChangeText={(text) =>
                      handleChange(
                        item.key as keyof Setor,
                        item.keyboardType === "numeric" ? Number(text) : text
                      )
                    }
                    onFocus={() => flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.3 })}
                  />
                </View>
              </View>
            )}
            ListFooterComponent={
              <View>
                <TouchableOpacity onPress={handleSave}>
                  <Text>{t("titleSaveSetor")}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
