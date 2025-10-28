import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { Situacao } from "../../src/types/situacao";
import RNPickerSelect from "react-native-picker-select";

export default function SituacaoRegister() {
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const [form, setForm] = useState<Situacao>({
    id: Date.now().toString(),
    nome: "",
    descricao: "",
    status: "",
  });

  const handleChange = (key: keyof Situacao, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const erros: string[] = [];
    if (!form.nome) erros.push(t("alertErrorRegisterName"));
    if (!form.descricao) erros.push(t("alertErrorRegisterDescription"));
    if (!form.status) erros.push(t("alertErrorRegisterStatus"));

    if (erros.length > 0) {
      Alert.alert(t("titleError") || "Erro", erros.join("\n"));
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem("situacoes");
      const situacoes: Situacao[] = existingData ? JSON.parse(existingData) : [];
      situacoes.push(form);
      await AsyncStorage.setItem("situacoes", JSON.stringify(situacoes));

      Alert.alert(t("alertSuccessEmployeeTitle"), t("contextRegisterSituacao"));
      router.back();
    } catch (error) {
      Alert.alert(t("titleError"), t("alertErrorRegisterSituacao"));
    }
  };

  const campos = [
    { key: "nome", label: t("titleName"), placeholder: t("titleName"), iconName: "document-text-outline" },
    { key: "descricao", label: t("titleDescription"), placeholder: t("titleDescription"), iconName: "reader-outline" },
    { key: "status", label: t("titleStatus"), placeholder: t("titleStatus"), iconName: "checkmark-done-outline" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            ref={flatListRef}
            data={campos}
            keyExtractor={item => item.key}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <View>
                <Text>{item.label}</Text>
                <View>
                  <Ionicons name={item.iconName as any} size={22} />
                  {item.key === "status" ? (
                    <RNPickerSelect
                      value={form.status}
                      onValueChange={(value) => handleChange("status", value)}
                      items={[
                        { label: t("statusActive"), value: "Ativo" },
                        { label: t("statusInactive"), value: "Inativo" },
                      ]}
                      placeholder={{ label: t("titleSelectStatus"), value: "" }}
                    />
                  ) : (
                    <TextInput
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
              <View>
                <TouchableOpacity onPress={handleSave} >
                  <Text>{t("titleSaveSituacao")}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}