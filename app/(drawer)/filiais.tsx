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

import { Filial } from "../../src/types/filial";

export default function Filiais() {
  const [filiais, setFiliais] = useState<Filial[]>([]);
  const [filtroCampo, setFiltroCampo] = useState<keyof Filial | keyof Filial["endereco"] | "todos">("todos");
  const [filtroValor, setFiltroValor] = useState("");
  const [openOptions, setOpenOptions] = useState(false);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const { t } = useTranslation();

  useEffect(() => {
    loadFiliais();
  }, []);

  const loadFiliais = async () => {
    try {
      const data = await AsyncStorage.getItem("filiais");
      const list: Filial[] = data ? JSON.parse(data) : [];
      setFiliais(list);
    } catch (error) {
      Alert.alert(t('titleError'), t('alertErroLoadingFiliais'));
    }
  };

  const getCampoValor = (filial: Filial, campo: keyof Filial | keyof Filial["endereco"]) => {
    if (campo in filial.endereco) {
      const valor = filial.endereco[campo as keyof Filial["endereco"]];
      return valor ? valor.toString() : "";
    }
    const valor = filial[campo as keyof Filial];
    return valor ? valor.toString() : "";
  };

  const filteredFiliais = filiais.filter((f) => {
    const valorFiltro = filtroValor.toLowerCase();
    if (filtroCampo === "todos") {
      return (
        f.nome.toLowerCase().includes(valorFiltro) ||
        f.endereco.estado.toLowerCase().includes(valorFiltro) ||
        f.endereco.rua.toLowerCase().includes(valorFiltro) ||
        f.endereco.numero.toLowerCase().includes(valorFiltro) ||
        f.endereco.codigoPais.toLowerCase().includes(valorFiltro) ||
        f.endereco.codigoPostal.toLowerCase().includes(valorFiltro)
      );
    } else {
      return getCampoValor(f, filtroCampo).toLowerCase().includes(valorFiltro);
    }
  });

  const handleItemPress = (filial: Filial) => {
    router.push({ pathname: "/filial", params: { id: filial.id } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.motoPerfil}>
        <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center", paddingBottom: 30 }}>
          {t('titleListFiliais')}
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Picker
            selectedValue={filtroCampo}
            onValueChange={(itemValue) => setFiltroCampo(itemValue)}
            style={{ color: "#fff", backgroundColor: colors.button, borderRadius: 10 }}
          >
            <Picker.Item label={t('titleAll')} value="todos" />
            <Picker.Item label={t('titleName')} value="nome" />
            <Picker.Item label={t('titleState')} value="estado" />
            <Picker.Item label={t('titleStreet')} value="rua" />
            <Picker.Item label={t('titleNumber')} value="numero" />
            <Picker.Item label={t('titleCountryCode')} value="codigoPais" />
            <Picker.Item label={t('titlePostalCode')} value="codigoPostal" />
          </Picker>

          <TextInput
            placeholder={t('titleSearchFiliais')}
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
        data={filteredFiliais}
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
              marginTop: 10,
            }}
            onPress={() => handleItemPress(item)}
          >
            <Text style={{ color: "#fff", fontSize: 22, textAlign: "center" }}>{item.nome}</Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>{t('titleState')}: {item.endereco.estado}</Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>{t('titleStreet')}: {item.endereco.rua}, {item.endereco.numero}</Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>{t('titlePostalCode')}: {item.endereco.codigoPostal}</Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>{t('titleCountryCode')}: {item.endereco.codigoPais}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#fff" }}>{t('alertContextErroFindAnyFilial')}</Text>
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
          <TouchableOpacity style={styles.botoesConf} onPress={() => router.push('/cadastro-filial')}>
            <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
            <View>
              <Text style={{ color: "#fff" }}>{t('titleRegister')}</Text>
              <Text style={{ color: "#fff", width: "80%" }}>{t('contextRegisterFiliais')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
