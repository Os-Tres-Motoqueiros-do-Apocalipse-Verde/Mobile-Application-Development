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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import { Setor } from "../../src/types/setor";
import { Patio } from "../../src/types/patio";

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function SetorRegister() {
  const router = useRouter();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const [patios, setPatios] = useState<Patio[]>([]);
  const [form, setForm] = useState<Setor>({
    id: Date.now().toString(),
    qtdMoto: 0,
    capacidade: 0,
    nome: "",
    descricao: "",
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
    const loadPatios = async () => {
      const data = await AsyncStorage.getItem("patios");
      const storedPatios: Patio[] = data ? JSON.parse(data) : [];
      setPatios(storedPatios);
    };
    loadPatios();
  }, []);

  const handleChange = (key: keyof Setor, value: string | number) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const errors: string[] = [];

    if (!form.patio.id) errors.push(t("alertErrorRegisterPatio"));
    if (!form.nome) errors.push(t("alertErrorRegisterNome"));
    if (!form.capacidade || form.capacidade <= 0) errors.push(t("alertErrorRegisterCapacidade"));
    if (form.qtdMoto < 0) errors.push(t("alertErrorRegisterQtdMoto"));

    if (errors.length > 0) {
      Alert.alert(t("titleError"), errors.join("\n"));
      return;
    }

    try {
      const data = await AsyncStorage.getItem("setores");
      const setores: Setor[] = data ? JSON.parse(data) : [];
      setores.push(form);
      await AsyncStorage.setItem("setores", JSON.stringify(setores));

      Alert.alert(t("alertSuccessTitle"), t("alertCreateSetor"));
      router.back();
    } catch (error) {
      Alert.alert(t("titleError"), t("alertErrorCreateSetor"));
    }
  };

  const campos = [
    {
      key: "nome",
      label: t("titleNome"),
      placeholder: t("placeholderNome"),
      iconName: "create-outline",
    },
    {
      key: "descricao",
      label: t("titleDescricao"),
      placeholder: t("placeholderDescricao"),
      iconName: "document-text-outline",
    },
    {
      key: "capacidade",
      label: t("titleCapacidade"),
      placeholder: t("placeholderCapacidade"),
      iconName: "cube-outline",
      keyboardType: "numeric",
    },
    {
      key: "qtdMoto",
      label: t("titleQtdMoto"),
      placeholder: t("placeholderQtdMoto"),
      iconName: "bicycle-outline",
      keyboardType: "numeric",
    },
    {
      key: "cor",
      label: t("titleCor"),
      placeholder: t("placeholderCor"),
      iconName: "color-palette-outline",
    },
    {
      key: "localizacao",
      label: t("titleLocalizacao"),
      placeholder: t("placeholderLocalizacao"),
      iconName: "navigate-outline",
    },
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
            keyExtractor={(item, index) => item.key + index}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <View style={{ flex:1, gap:20 }}>
                <Text style={styles.textLabel}>{t("titlePatio")}</Text>
                <View style={styles.inputSelecao}>
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
                
              </View>
            }
            renderItem={({ item, index }) => (
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.textLabel}>{item.label}</Text>
                <View style={styles.input}>
                  <Ionicons name={item.iconName as any} size={24} color="#09BC00" style={styles.iconForm}/>
                  <TextInput style={styles.textInput}
                    value={String(form[item.key as keyof Setor] ?? "")}
                    onChangeText={(text) =>
                      handleChange(
                        item.key as keyof Setor,
                        item.keyboardType === "numeric" ? Number(text) : text
                      )
                    }
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
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>{t("titleSave")}</Text>
              </TouchableOpacity>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
