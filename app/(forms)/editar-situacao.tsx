import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import { Situacao } from "../../src/types/situacao";

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function SituacaoEdit() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const [form, setForm] = useState<Situacao>({
    id: "",
    nome: "",
    descricao: "",
    status: "Ativo",
  });

  useEffect(() => {
    if (params.id) loadSituacao(params.id);
  }, [params.id]);

  const loadSituacao = async (id: string) => {
    try {
      const data = await AsyncStorage.getItem("situacoes");
      const situacoes: Situacao[] = data ? JSON.parse(data) : [];
      const situacao = situacoes.find(s => s.id === id);
      if (!situacao) {
        Alert.alert(t("titleError"), t("alertContextErroFindAnySituacoes"));
        return;
      }
      setForm(situacao);
    } catch (error) {
      console.log(error);
      Alert.alert(t("titleError"), t("alertContextErroLoadingSituacoes"));
    }
  };

  const handleChange = (key: keyof Situacao, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.nome || !form.descricao || !form.status) {
      Alert.alert(t("titleError"), t("alertEmptyInput"));
      return;
    }

    try {
      const data = await AsyncStorage.getItem("situacoes");
      const situacoes: Situacao[] = data ? JSON.parse(data) : [];
      const index = situacoes.findIndex(s => s.id === form.id);

      if (index === -1) {
        Alert.alert(t("titleError"), t("alertContextErroFindAnySituacoes"));
        return;
      }

      // Atualiza o item existente
      situacoes[index] = form;
      await AsyncStorage.setItem("situacoes", JSON.stringify(situacoes));

      Alert.alert(t("alertSuccessEmployeeTitle"), t("alertUpdateSituacao"));
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert(t("titleError"), t("alertErroUpdateSituacao"));
    }
  };

  const campos = [
    { key: "nome", label: t("titleName"), placeholder: t("titleName"), iconName: "document-text-outline" },
    { key: "descricao", label: t("titleDescription"), placeholder: t("titleDescription"), iconName: "reader-outline" },
    { key: "status", label: t("titleStatus"), placeholder: t("titleStatus"), iconName: "checkmark-done-outline" },
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
            keyExtractor={item => item.key}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <View style={{ flex:1, gap:20 }}>
                <Text style={styles.textLabel}>{item.label}</Text>
                <View style={styles.input}>
                  <Ionicons name={item.iconName as any} size={22} color="#09BC00" style={styles.iconForm}/>
                  {item.key === "status" ? (
                    <View style={{ flex:1, gap:20 }}>
                      <RNPickerSelect
                        value={form.status}
                        onValueChange={(value) => handleChange("status", value)}
                        items={[
                          { label: t("statusActive"), value: "Ativo" },
                          { label: t("statusInactive"), value: "Inativo" },
                        ]}
                      />

                    </View>
                    
                  ) : (
                    <TextInput style={styles.textInput}
                      placeholder={item.placeholder}
                      value={form[item.key as keyof Situacao]}
                      onChangeText={(text) => handleChange(item.key as keyof Situacao, text)}
                      onFocus={() => flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.3 })}
                    />
                  )}
                </View>
              </View>
            )}
            ListFooterComponent={
              <View style={{ paddingTop: 30 }}>
                <TouchableOpacity style={styles.button}  onPress={handleSave}>
                  <Text style={styles.buttonText}>{t("titleSaveSituacao")}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
