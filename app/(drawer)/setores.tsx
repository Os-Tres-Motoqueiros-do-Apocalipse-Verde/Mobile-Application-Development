import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Setor } from "../../src/types/setor";
import { useTranslation } from 'react-i18next';

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";

export default function Setores() {
  const [setores, setSetores] = useState<Setor[]>([]);
  const [filtroCampo, setFiltroCampo] = useState<keyof Setor | "todos">("todos");
  const [filtroValor, setFiltroValor] = useState("");
  const [openOptions, setOpenOptions] = useState(false);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);
    
  const { t } = useTranslation();

  useEffect(() => {
    loadSetores();
  }, []);
  
  const loadSetores = async () => {
    try {
      const data = await AsyncStorage.getItem("setores");
      const list: Setor[] = data ? JSON.parse(data) : [];
      setSetores(list);
    } catch (error) {
      Alert.alert(t('titleError'), t('alertContextErroLoadingSetores'));
    }
  };

  const getCampoValor = (setor: Setor, campo: keyof Setor) => {
    const valor = setor[campo];
    if (valor === undefined || valor === null) return "";
    if (typeof valor === "object") {
      return (valor as any).localizacao ?? (valor as any).nome ?? "";
    }
    return String(valor);
  };

  const filteredSetores = setores.filter((setor) => {
    const valorFiltro = filtroValor.toLowerCase();
    if (filtroCampo === "todos") {
      return (
        setor.nome.toLowerCase().includes(valorFiltro) ||
        setor.descricao.toLowerCase().includes(valorFiltro) ||
        getCampoValor(setor, "patio").toLowerCase().includes(valorFiltro) ||
        setor.cor.toLowerCase().includes(valorFiltro) ||
        setor.localizacao.toLowerCase().includes(valorFiltro)
      );
    } else {
      return getCampoValor(setor, filtroCampo as keyof Setor).toLowerCase().includes(valorFiltro);
    }
  });

  const handleItemPress = (setor: Setor) => {
    router.push({
      pathname: "/setor-edit",
      params: { id: setor.id },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.motoPerfil}>
        <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center", paddingBottom: 30 }}>
          {t('titleListSetores')}
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Picker
            selectedValue={filtroCampo}
            onValueChange={(itemValue) => setFiltroCampo(itemValue)}
            style={{ color: "#fff", backgroundColor: "#099302", borderRadius: 10 }}
          >
            <Picker.Item label={t('titleAll')} value="todos" />
            <Picker.Item label={t('titleNome')} value="nome" />
            <Picker.Item label={t('titleDescricao')} value="descricao" />
            <Picker.Item label={t('titlePatio')} value="patio" />
            <Picker.Item label={t('titleCor')} value="cor" />
            <Picker.Item label={t('titleLocalizacao')} value="localizacao" />
          </Picker>

          <TextInput
            placeholder={t('titleSearchSetor')}
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
        data={filteredSetores}
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
              {item.nome}
            </Text>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              {t('titlePatio')}: {getCampoValor(item, "patio")}
            </Text>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              {t('titleCapacidade')}: {item.capacidade}
            </Text>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              {t('titleQtdMoto')}: {item.qtdMoto}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>{t('alertContextErroFindAnySetor')}</Text>
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
        onPress={() => router.push('/setor-register')}
      >
        <Image style={{ alignSelf: "center", width: 50, height: 50 }} source={require("../../assets/profile/white-logo.png")} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
