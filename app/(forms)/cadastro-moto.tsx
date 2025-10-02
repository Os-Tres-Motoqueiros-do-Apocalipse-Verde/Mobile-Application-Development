import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotoForm } from "../../src/types/motos";
import{useTranslation} from 'react-i18next'

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function MotoRegister() {
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

    const { t } = useTranslation();

    const { colors, toggleTheme } = useTheme();
    const styles = createGlobalStyles(colors);
  

    const handleChange = (key: keyof MotoForm, value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
      try {
        const existingData = await AsyncStorage.getItem("motos");
        const motos: MotoForm[] = existingData ? JSON.parse(existingData) : [];
        motos.push(form);
        await AsyncStorage.setItem("motos", JSON.stringify(motos));

        Alert.alert(t('alertSuccessEmployeeTitle'), t('alertRegisterMoto'));
        router.back();
      } catch (error) {
        Alert.alert(t('titleError'), t('alertErroRegisterMoto'));
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
      <ScrollView contentContainerStyle={styles.sobre}>
        {campos.map((item) => (
          <View key={item.key} style={styles.form}>
            <Text style={{color: colors.text}}>{item.label}</Text>
            <View style={styles.inputForm}>
              <Ionicons name={item.iconName} size={30} color="green" style={styles.iconForm}/>
              <TextInput
                value={form[item.key]}
                onChangeText={(text) => handleChange(item.key, text)}
                placeholder={item.placeholder || `Digite ${item.label.toLowerCase()}`}
                keyboardType={item.keyboardType || "default"}
              />
              
            </View>
            
          </View>
        ))}

        <TouchableOpacity style={styles.botao} onPress={handleSave}>
            <Text style={{color:"#fff"}} >{t('titleSaveBike')}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
}