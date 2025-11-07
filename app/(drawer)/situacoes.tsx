import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Situacao } from "../../src/types/situacao";
import { useTranslation } from 'react-i18next';

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";

export default function Situacoes() {
  const [situacoes, setSituacoes] = useState<Situacao[]>([]);
  const [filtroCampo, setFiltroCampo] = useState<keyof Situacao | "todos">("todos");
  const [filtroValor, setFiltroValor] = useState("");
  const [openOptions, setOpenOptions] = useState(false);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const { t } = useTranslation();

  useEffect(() => {
    loadSituacoes();
  }, []);

  const loadSituacoes = async () => {
    try {
      const data = await AsyncStorage.getItem("situacoes");
      const list: Situacao[] = data ? JSON.parse(data) : [];
      setSituacoes(list);
    } catch (error) {
      Alert.alert(t('titleError'), t('alertContextErroLoadingSituacoes'));
    }
  };

  const getCampoValor = (situacao: Situacao, campo: keyof Situacao) => {
    const valor = situacao[campo];
    return valor ? valor.toString() : "";
  };

  const filteredSituacoes = situacoes.filter((s) => {
    const valorFiltro = filtroValor.toLowerCase();
    if (filtroCampo === "todos") {
      return (
        s.nome.toLowerCase().includes(valorFiltro) ||
        s.descricao.toLowerCase().includes(valorFiltro) ||
        s.status.toLowerCase().includes(valorFiltro)
      );
    } else {
      return getCampoValor(s, filtroCampo).toLowerCase().includes(valorFiltro);
    }
  });

  const handleItemPress = (situacao: Situacao) => {
    router.push({ pathname: "/situacao", params: { id: situacao.id } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.motoPerfil}>
        <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center", paddingBottom: 30 }}>
          {t('titleListSituacoes')}
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Picker
            selectedValue={filtroCampo}
            onValueChange={(itemValue) => setFiltroCampo(itemValue)}
            style={{ color: "#fff"}}
          >
            <Picker.Item label={t('titleAll')} value="todos" />
            <Picker.Item label={t('titleName')} value="nome" />
            <Picker.Item label={t('titleDescription')} value="descricao" />
            <Picker.Item label={t('titleStatus')} value="status" />
          </Picker>

          <TextInput
            placeholder={t('titleSearchSituacoes')}
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
        data={filteredSituacoes}
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
            <Text style={{ color: "#fff", fontSize: 18 }}>{item.descricao}</Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>{item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>{t('alertContextErroFindAnySituacoes')}</Text>
        }
      />

      <TouchableOpacity style={styles.botaoConfig}
        onPress={() => setOpenOptions(!openOptions)}
      >
        <Image style={{ alignSelf: "center"}} source={require("../../assets/profile/white-logo.png")} />
      </TouchableOpacity>

      {openOptions && (
        <View style={styles.config}>
          <TouchableOpacity style={styles.botoesConf} onPress={() => router.push('/cadastro-situacao')}>
            <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
            <View>
              <Text style={{ color: "#fff" }}>{t('titleRegister')}</Text>
              <Text style={{ color: "#fff", width: "80%" }}>{t('contextRegisterSituacoes')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
