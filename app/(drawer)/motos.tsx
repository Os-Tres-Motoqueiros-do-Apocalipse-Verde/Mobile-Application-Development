import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { MotoForm } from "../../src/types/motos";
import { useTranslation } from 'react-i18next';

export default function Motos() {
  const [motos, setMotos] = useState<MotoForm[]>([]);
  const [filtroCampo, setFiltroCampo] = useState<keyof MotoForm | "todos">("todos");
  const [filtroValor, setFiltroValor] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
    

  const { t } = useTranslation();
  

  useEffect(() => {
    loadMotos();
  }, []);
  
  const loadMotos = async () => {
    try {
      const data = await AsyncStorage.getItem("motos");
      const list: MotoForm[] = data ? JSON.parse(data) : [];
      setMotos(list);
    } catch (error) {
      Alert.alert(t('titleError'), t('alertContextErroLoadingBike'));
    }
  };
  
  const filteredMotos = motos.filter((moto) => {
    if (filtroCampo === "todos") {
      return (
        moto.placa.toLowerCase().includes(filtroValor.toLowerCase()) ||
        moto.modelo.toLowerCase().includes(filtroValor.toLowerCase()) ||
        moto.condicao.toLowerCase().includes(filtroValor.toLowerCase()) ||
        moto.frenagem.toLowerCase().includes(filtroValor.toLowerCase())
      );
    } else {
      return moto[filtroCampo].toLowerCase().includes(filtroValor.toLowerCase());
    }
  });
  
  const handleItemPress = (moto: MotoForm) => {
    router.push({
      pathname: "/moto",
      params: { placa: moto.placa },
    });
  };
  
  return (
    <View>
      <Text>{t('titleListBikes')}</Text>
  
      <View>
        <Picker
          selectedValue={filtroCampo}
          onValueChange={(itemValue) => setFiltroCampo(itemValue)}
        >
          <Picker.Item label={t('titleAll')} value="todos" />
          <Picker.Item label={t('titlePlate')} value="placa" />
          <Picker.Item label={t('titleModel')} value="modelo" />
          <Picker.Item label={t('titleCondition')} value="condicao" />
          <Picker.Item label={t('titleBraking')} value="frenagem" />
        </Picker>
  
        <TextInput
          placeholder={t('titleSearchBike')}
          value={filtroValor}
          onChangeText={(text) => setFiltroValor(text)}
        />
      </View>
  
      <FlatList
        data={filteredMotos}
        keyExtractor={(item) => item.placa}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleItemPress(item)}
          >
            <Text>{item.modelo}</Text>
            <Text>{t('titlePlate')}: {item.placa}</Text>
            <Text>{t('titleCondition')}: {item.condicao}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text>{t('alertContextErroFindAnyBike')}</Text>
        }
      />
      <TouchableOpacity onPress={() => setOpenOptions(!openOptions)}>
        <Image source={require("../../assets/profile/white-logo.png")}/>
      </TouchableOpacity>
      {openOptions && (
        <TouchableOpacity onPress={() => router.push('/cadastro-moto')}>
          <Ionicons name="create-outline" size={24} color="black" />
          <View>
            <Text>{t('titleRegister')}</Text>
            <Text>{t('contextRegisterBike')}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
