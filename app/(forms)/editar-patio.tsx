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
import { Patio } from "../../src/types/patio";
import { Filial } from "../../src/types/filial";

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function PatioEdit() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const [filiais, setFiliais] = useState<Filial[]>([]);
  const [form, setForm] = useState<Patio>({
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
  });

  useEffect(() => {
    const loadFiliais = async () => {
      const data = await AsyncStorage.getItem("filiais");
      let storedFiliais: Filial[] = data ? JSON.parse(data) : [];

      if (storedFiliais.length === 0) {
        storedFiliais = [
          {
            id: "1",
            nome: "Filial Mock 1",
            endereco: {
              id: "1",
              numero: "100",
              estado: "SP",
              codigoPais: "BR",
              codigoPostal: "01000-000",
              complemento: "",
              rua: "Rua Mock",
            },
          },
          {
            id: "2",
            nome: "Filial Mock 2",
            endereco: {
              id: "2",
              numero: "200",
              estado: "RJ",
              codigoPais: "BR",
              codigoPostal: "20000-000",
              complemento: "",
              rua: "Avenida Mock",
            },
          },
        ];
      }

      setFiliais(storedFiliais);
    };

    loadFiliais();
  }, []);

  useEffect(() => {
    if (params.id) loadPatio(params.id);
  }, [params.id]);

  const loadPatio = async (id: string) => {
    try {
      const data = await AsyncStorage.getItem("patios");
      const patios: Patio[] = data ? JSON.parse(data) : [];
      const patio = patios.find(p => p.id === id);

      if (!patio) {
        Alert.alert(t("titleError"), t("alertContextErroFindAnyPatios"));
        return;
      }

      setForm(patio);
    } catch (error) {
      console.log(error);
      Alert.alert(t("titleError"), t("alertContextErroLoadingPatios"));
    }
  };

  const handleChange = (key: keyof Patio, value: string | number) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const errors: string[] = [];

    if (!form.filial.id) errors.push(t("alertErrorRegisterFilial"));
    if (!form.localizacao) errors.push(t("alertErrorRegisterLocation"));
    if (form.capacidadeMoto <= 0) errors.push(t("alertErrorRegisterCapacity"));
    if (form.totalMotos < 0) errors.push(t("alertErrorRegisterTotalMotos"));

    if (errors.length > 0) {
      Alert.alert(t("titleError"), errors.join("\n"));
      return;
    }

    try {
      const data = await AsyncStorage.getItem("patios");
      const patios: Patio[] = data ? JSON.parse(data) : [];
      const index = patios.findIndex(p => p.id === form.id);

      if (index === -1) {
        Alert.alert(t("titleError"), t("alertContextErroFindAnyPatios"));
        return;
      }

      patios[index] = form;
      await AsyncStorage.setItem("patios", JSON.stringify(patios));

      Alert.alert(t("alertSuccessEmployeeTitle"), t("alertUpdatePatio"));
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert(t("titleError"), t("alertErroUpdatePatio"));
    }
  };

  const campos = [
    { key: "localizacao", label: t("titleLocation"), placeholder: t("placeholderLocation"), iconName: "navigate-outline" },
    { key: "capacidadeMoto", label: t("titleCapacity"), placeholder: t("placeholderCapacity"), iconName: "cube-outline", keyboardType: "numeric" },
    { key: "totalMotos", label: t("titleTotalMotos"), placeholder: t("placeholderTotalMotos"), iconName: "bicycle-outline", keyboardType: "numeric" },
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
            ListHeaderComponent={
              <View style={{ flex:1, gap:20 }}>
                <Text>{t("titleFilial")}</Text>
                <RNPickerSelect
                  placeholder={{ label: t("placeholderSelectFilial"), value: null }}
                  onValueChange={(value) => {
                    const selectedFilial = filiais.find(f => f.id === value);
                    if (selectedFilial) setForm(prev => ({ ...prev, filial: selectedFilial }));
                  }}
                  items={filiais.map(f => ({ label: f.nome, value: f.id }))}
                  value={form.filial.id || null}
                />
              </View>
            }
            renderItem={({ item, index }) => (
              <View style={{ flex:1, gap:20 }}>
                <Text style={styles.textLabel}>{item.label}</Text>
                <View style={styles.input}>
                  <Ionicons name={item.iconName as any} size={24} color="#09BC00" style={styles.iconForm}/>
                  <TextInput
                    value={String(form[item.key as keyof Patio] ?? "")}
                    onChangeText={(text) =>
                      handleChange(
                        item.key as keyof Patio,
                        item.keyboardType === "numeric" ? Number(text) : text
                      )
                    }
                    placeholder={item.placeholder}
                    keyboardType={item.keyboardType || "default"}
                    onFocus={() => {
                      flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.3 });
                    }}
                  />
                </View>
              </View>
            )}
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
