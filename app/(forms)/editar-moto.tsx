import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotoForm } from "../../src/types/motos";
import { useTranslation } from "react-i18next";

export default function MotoEdit() {
  const [form, setForm] = useState<MotoForm>({
    placa: "",
    chassi: "",
    condicao: "",
    modelo: "",
    frenagem: "",
    sistemaPartida: "",
    tanque: "",
    tipoCombustivel: "",
    consumo: "",
  });

  const router = useRouter();
  const params = useLocalSearchParams(); 
  const { t } = useTranslation();

  useEffect(() => {
    loadMoto();
  }, []);

  const loadMoto = async () => {
    try {
      const data = await AsyncStorage.getItem("motos");
      const motos: MotoForm[] = data ? JSON.parse(data) : [];
      const found = motos.find((m) => m.placa === params.placa);
      if (found) setForm(found);
      else Alert.alert(t('titleError'), t('alertMotoNotFound') || "Moto não encontrada");
    } catch (error) {
      Alert.alert(t('titleError'), t('alertErroLoadMoto') || "Não foi possível carregar os dados");
    }
  };

  const handleChange = (key: keyof MotoForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const data = await AsyncStorage.getItem("motos");
      let motos: MotoForm[] = data ? JSON.parse(data) : [];

      motos = motos.map((m) => (m.placa === form.placa ? form : m));

      await AsyncStorage.setItem("motos", JSON.stringify(motos));
      Alert.alert(t('alertSuccessEmployeeTitle'), t('alertUpdateMoto') || "Moto atualizada com sucesso!");
      router.back();
    } catch (error) {
      Alert.alert(t('titleError'), t('alertErroUpdateMoto') || "Erro ao atualizar a moto");
    }
  };

  const campos: {
    key: keyof MotoForm;
    label: string;
    placeholder?: string;
    keyboardType?: "default" | "numeric" | "email-address";
    iconName: keyof typeof Ionicons.glyphMap;
  }[] = [
    { key: "placa", label: t('titlePlate'), placeholder: t('placeholderPlate'), keyboardType: "default", iconName: "card-outline" },
    { key: "chassi", label: t('titleChassis'), placeholder: t('placeholderChassis'), keyboardType: "default", iconName: "barcode-outline" },
    { key: "condicao", label: t('titleCondition'), placeholder: t('placeholderCondition'), keyboardType: "default", iconName: "checkmark-circle-outline" },
    { key: "modelo", label: t('titleModel'), placeholder: t('placeholderModel'), keyboardType: "default", iconName: "bicycle-outline" },
    { key: "frenagem", label: t('titleBraking'), placeholder: t('placeholderBraking'), keyboardType: "default", iconName: "speedometer-outline" },
    { key: "sistemaPartida", label: t('titleStartingSystem'), placeholder: t('placeholderStartingSystem'), keyboardType: "default", iconName: "battery-charging-outline" },
    { key: "tanque", label: t('titleTank'), placeholder: t('placeholderTank'), keyboardType: "numeric", iconName: "water-outline" },
    { key: "tipoCombustivel", label: t('titleFuelType'), placeholder: t('placeholderFuelType'), keyboardType: "default", iconName: "flame-outline" },
    { key: "consumo", label: t('titleConsumption'), placeholder: t('Km/L'), keyboardType: "numeric", iconName: "speedometer-outline" },
  ];

  return (
    <ScrollView>
      {campos.map((item) => (
        <View key={item.key}>
          <View>
            <Ionicons name={item.iconName} size={20} color="green" />
            <Text>{item.label}</Text>
          </View>
          <TextInput
            value={form[item.key]}
            onChangeText={(text) => handleChange(item.key, text)}
            placeholder={item.placeholder || `Digite ${item.label.toLowerCase()}`}
            keyboardType={item.keyboardType || "default"}
          />
        </View>
      ))}

      <TouchableOpacity onPress={handleSave}>
        <Text>{t('titleSaveBike')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}