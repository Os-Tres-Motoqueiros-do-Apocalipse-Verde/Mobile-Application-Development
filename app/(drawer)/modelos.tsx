import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useTranslation } from 'react-i18next';

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";
import { Modelo } from "../../src/types/modelo";

export default function Modelos() {
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [filtroCampo, setFiltroCampo] = useState<keyof Modelo | "todos">("todos");
  const [filtroValor, setFiltroValor] = useState("");
  const [openOptions, setOpenOptions] = useState(false);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);
  const { t } = useTranslation();

  useEffect(() => {
    loadModelos();
  }, []);

  const loadModelos = async () => {
    try {
      const data = await AsyncStorage.getItem("modelos");
      const list: Modelo[] = data ? JSON.parse(data) : [];
      setModelos(list);
    } catch (error) {
      Alert.alert(t('titleError'), t('alertContextErroLoadingModels'));
    }
  };

  // Função auxiliar para ler valor dinamicamente
  const getCampoValor = (modelo: Modelo, campo: keyof Modelo) => {
    const valor = modelo[campo];
    if (valor === undefined || valor === null) return "";
    return String(valor);
  };

  // Filtragem
  const filteredModelos = modelos.filter((modelo) => {
    const valorFiltro = filtroValor.toLowerCase();
    if (filtroCampo === "todos") {
      return (
        getCampoValor(modelo, "nome").toLowerCase().includes(valorFiltro) ||
        getCampoValor(modelo, "frenagem").toLowerCase().includes(valorFiltro) ||
        getCampoValor(modelo, "sisPartida").toLowerCase().includes(valorFiltro) ||
        getCampoValor(modelo, "tipoCombustivel").toLowerCase().includes(valorFiltro) ||
        getCampoValor(modelo, "tanque").toLowerCase().includes(valorFiltro) ||
        getCampoValor(modelo, "consumo").toLowerCase().includes(valorFiltro)
      );
    } else {
      return getCampoValor(modelo, filtroCampo).toLowerCase().includes(valorFiltro);
    }
  });

  const handleItemPress = (modelo: Modelo) => {
    router.push({
      pathname: "/modelo",
      params: { id: modelo.id },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.motoPerfil}>
        <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center", paddingBottom: 30 }}>
          {t('titleListModels')}
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Picker
            selectedValue={filtroCampo}
            onValueChange={(itemValue) => setFiltroCampo(itemValue)}
            style={{ color: "#fff"}}
          >
            <Picker.Item label={t('titleAll')} value="todos" />
            <Picker.Item label={t('titleName')} value="nome" />
            <Picker.Item label={t('titleBraking')} value="frenagem" />
            <Picker.Item label={t('titleStartingSystem')} value="sisPartida" />
            <Picker.Item label={t('titleFuelType')} value="tipoCombustivel" />
            <Picker.Item label={t('titleTank')} value="tanque" />
            <Picker.Item label={t('titleConsumption')} value="consumo" />
          </Picker>

          <TextInput
            placeholder={t('titleSearchModels')}
            placeholderTextColor="#ccc"
            value={filtroValor}
            onChangeText={setFiltroValor}
            style={{
              borderWidth: 1,
              borderColor: "#000000",
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
        data={filteredModelos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: colors.button,
              gap: 10,
              width: "90%",
              borderRadius: 20,
              padding: 20,
              alignSelf: "center",
              marginTop: 20,
            }}
            onPress={() => handleItemPress(item)}
          >
            <Text style={{ color: "#fff", fontSize: 26, textAlign: "center", fontWeight: "bold" }}>
              {item.nome}
            </Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              {t('titleBraking')}: {item.frenagem}
            </Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              {t('titleStartSystem')}: {item.sisPartida}
            </Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              {t('titleFuelType')}: {item.tipoCombustivel}
            </Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              {t('titleTank')}: {item.tanque} L
            </Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              {t('titleConsumption')}: {item.consumo} km/L
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text>
            {t('alertContextErroFindAnyModels')}
          </Text>
        }
      />

      <TouchableOpacity
        style={{
          backgroundColor: colors.button,
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
          <TouchableOpacity style={styles.botoesConf} onPress={() => router.push('/cadastro-modelo')}>
            <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
            <View>
              <Text style={{ color: "#fff" }}>{t('titleRegister')}</Text>
              <Text style={{ color: "#fff", width: "80%" }}>{t('contextRegisterModels')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
