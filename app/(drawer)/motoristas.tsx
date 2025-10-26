import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Motorista } from "../../src/types/motorista";
import { useTranslation } from 'react-i18next';

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [filtroCampo, setFiltroCampo] = useState<keyof Motorista | keyof Motorista['dados'] | "todos">("todos");
  const [filtroValor, setFiltroValor] = useState("");
  const [openOptions, setOpenOptions] = useState(false);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);
    
  const { t } = useTranslation();

  useEffect(() => {
    loadMotoristas();
  }, []);
  
  const loadMotoristas = async () => {
    try {
      const data = await AsyncStorage.getItem("motoristas");
      const list: Motorista[] = data ? JSON.parse(data) : [];
      setMotoristas(list);
    } catch (error) {
      Alert.alert(t('titleError'), t('alertContextErroLoadingBikers'));
    }
  };

  // Função auxiliar para pegar valor do campo, mesmo se for objeto
  const getCampoValor = (motorista: Motorista, campo: keyof Motorista | keyof Motorista['dados']) => {
    if (campo in motorista) {
      const valor = motorista[campo as keyof Motorista];
      if (valor === undefined || valor === null) return "";
      if (typeof valor === "object") return JSON.stringify(valor);
      return String(valor);
    } else if (campo in motorista.dados) {
      const valor = motorista.dados[campo as keyof Motorista['dados']];
      if (valor === undefined || valor === null) return "";
      return String(valor);
    }
    return "";
  };

  // Filtragem
  const filteredMotoristas = motoristas.filter((motorista) => {
    const valorFiltro = filtroValor.toLowerCase();
    if (filtroCampo === "todos") {
      return (
        motorista.plano.toLowerCase().includes(valorFiltro) ||
        getCampoValor(motorista, "nome").toLowerCase().includes(valorFiltro) ||
        getCampoValor(motorista, "cpf").toLowerCase().includes(valorFiltro) ||
        getCampoValor(motorista, "telefone").toLowerCase().includes(valorFiltro) ||
        getCampoValor(motorista, "email").toLowerCase().includes(valorFiltro)
      );
    } else {
      return getCampoValor(motorista, filtroCampo).toLowerCase().includes(valorFiltro);
    }
  });

  const handleItemPress = (motorista: Motorista) => {
    router.push({
      pathname: "/motorista",
      params: { id: motorista.id },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.motoPerfil}>
        <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center", paddingBottom: 30 }}>
          {t('titleListBikers')}
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Picker
            selectedValue={filtroCampo}
            onValueChange={(itemValue) => setFiltroCampo(itemValue)}
            style={{ color: "#fff", backgroundColor: "#099302", borderRadius: 10 }}
          >
            <Picker.Item label={t('titleAll')} value="todos" />
            <Picker.Item label={t('titleName')} value="nome" />
            <Picker.Item label={t('titleID')} value="cpf" />
            <Picker.Item label={t('titlePhone')} value="telefone" />
            <Picker.Item label={t('titleEmail')} value="email" />
            <Picker.Item label={t('titlePlan')} value="plano" />
          </Picker>

          <TextInput
            placeholder={t('titleSearchBikers')}
            placeholderTextColor="#ccc"
            value={filtroValor}
            onChangeText={setFiltroValor}
            style={{
              borderWidth: 1,
              borderColor: "#09BC00",
              borderRadius: 10,
              width: "90%",
              color: "#fff",
              padding: 10,
              marginTop: 10
            }}
          />
        </View>
      </View>

      <FlatList
        data={filteredMotoristas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#099302",
              gap: 20,
              width: "90%",
              borderRadius: 20,
              padding: 20,
              alignSelf: "center",
              marginTop: 20,
            }}
            onPress={() => handleItemPress(item)}
          >
            <Text style={{ color: "#fff", fontSize: 30, textAlign: "center" }}>
              {getCampoValor(item, "nome")}
            </Text>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              {t('titleID')}: {getCampoValor(item, "cpf")}
            </Text>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              {t('titlePhone')}: {getCampoValor(item, "telefone")}
            </Text>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              {t('titlePlan')}: {item.plano}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>{t('alertContextErroFindAnyBikers')}</Text>
        }
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#099302",
          width: 100,
          marginLeft: 40,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          marginTop: 10
        }}
        onPress={() => setOpenOptions(!openOptions)}
      >
        <Image style={{ alignSelf: "center", width: 50, height: 50 }} source={require("../../assets/profile/white-logo.png")} />
      </TouchableOpacity>

      {openOptions && (
        <View style={styles.config}>
          <TouchableOpacity style={styles.botoesConf} onPress={() => router.push('/cadastro-motorista')}>
            <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
            <View>
              <Text style={{ color: "#fff" }}>{t('titleRegister')}</Text>
              <Text style={{ color: "#fff", width: "80%" }}>{t('contextRegisterBikers')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
