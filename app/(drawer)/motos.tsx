import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image, ScrollView, } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Moto } from "../../src/types/motos";
import { useTranslation } from 'react-i18next';

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";

export default function Motos() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [filtroCampo, setFiltroCampo] = useState<keyof Moto | "todos">("todos");
  const [filtroValor, setFiltroValor] = useState("");
  const [openOptions, setOpenOptions] = useState(false);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);
    
  const { t } = useTranslation();

  useEffect(() => {
    loadMotos();
  }, []);
  
  const loadMotos = async () => {
    try {
      const data = await AsyncStorage.getItem("motos");
      const list: Moto[] = data ? JSON.parse(data) : [];
      setMotos(list);
    } catch (error) {
      Alert.alert(t('titleError'), t('alertContextErroLoadingBike'));
    }
  };

  // Função auxiliar para pegar valor do campo, mesmo se for objeto
  const getCampoValor = (moto: Moto, campo: keyof Moto) => {
    const valor = moto[campo];
    if (valor === undefined || valor === null) return "";
    if (typeof valor === "object") {
      return (valor as any).nome ?? "";
    }
    return String(valor);
  };

  // Filtragem
  const filteredMotos = motos.filter((moto) => {
    const valorFiltro = filtroValor.toLowerCase();
    if (filtroCampo === "todos") {
      return (
        moto.placa.toLowerCase().includes(valorFiltro) ||
        getCampoValor(moto, "modelo").toLowerCase().includes(valorFiltro) ||
        moto.condicao.toLowerCase().includes(valorFiltro) ||
        getCampoValor(moto, "setor").toLowerCase().includes(valorFiltro) ||
        getCampoValor(moto, "motorista").toLowerCase().includes(valorFiltro) ||
        getCampoValor(moto, "situacao").toLowerCase().includes(valorFiltro)
      );
    } else {
      return getCampoValor(moto, filtroCampo as keyof Moto).toLowerCase().includes(valorFiltro);
    }
  });

  const handleItemPress = (moto: Moto) => {
    router.push({
      pathname: "/moto",
      params: { placa: moto.placa },
    });
  };

  return (
    <SafeAreaView style={styles.profile}>
      <ScrollView>
        <View style={styles.motoPerfil}>
          <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center", paddingBottom: 30 }}>
            {t('titleListBikes')}
          </Text>

          <View>
            <Picker
              selectedValue={filtroCampo}
              onValueChange={(itemValue) => setFiltroCampo(itemValue)}
              style={{ color: "#fff", backgroundColor: "#099302", borderRadius: 10 }}
            >
              <Picker.Item label={t('titleAll')} value="todos" />
              <Picker.Item label={t('titlePlate')} value="placa" />
              <Picker.Item label={t('titleModel')} value="modelo" />
              <Picker.Item label={t('titleCondition')} value="condicao" />
              <Picker.Item label={t('titleBraking')} value="frenagem" />
            </Picker>

            <TextInput
              placeholder={t('titleSearchBike')}
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
          data={filteredMotos}
          keyExtractor={(item) => item.placa}
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
                {getCampoValor(item, "modelo")}
              </Text>
              <Text style={{ color: "#fff", fontSize: 20 }}>
                {t('titlePlate')}: {item.placa}
              </Text>
              <Text style={{ color: "#fff", fontSize: 20 }}>
                {t('titleCondition')}: {item.condicao}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>{t('alertContextErroFindAnyBike')}</Text>
          }
        />

        <TouchableOpacity style={styles.botaoConfig}
          onPress={() => setOpenOptions(!openOptions)}
        >
          <Image  style={{ alignSelf: "center" }} source={require("../../assets/profile/white-logo.png")} />
        </TouchableOpacity>

        {openOptions && (
          <View style={styles.config}>
            <TouchableOpacity style={styles.botoesConf} onPress={() => router.push('/cadastro-moto')}>
              <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t('titleRegister')}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t('contextRegisterBike')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
