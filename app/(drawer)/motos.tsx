import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { MotoForm } from "../../src/types/motos";
import { useTranslation } from 'react-i18next';

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function Motos() {
  const [motos, setMotos] = useState<MotoForm[]>([]);
  const [filtroCampo, setFiltroCampo] = useState<keyof MotoForm | "todos">("todos");
  const [filtroValor, setFiltroValor] = useState("");
  const [openOptions, setOpenOptions] = useState(false);

  const { colors, toggleTheme } = useTheme();
  const styles = createGlobalStyles(colors);
    

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
    <SafeAreaView>
      <View style={styles.motoPerfil} >
         <Text style={{color:"#fff", fontSize:25, fontWeight:"bold" , textAlign:"center", paddingBottom:30 }} >{t('titleListBikes')}</Text>
  
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
            style={{borderWidth:1, borderColor:"#09BC00",borderRadius:10, width:"90%", color:"#fff"}}
            onChangeText={(text) => setFiltroValor(text)}
          />
        </View>

      </View>
     
  
      <FlatList
        data={filteredMotos}
        keyExtractor={(item) => item.placa}
        renderItem={({ item }) => (
          <TouchableOpacity style={{backgroundColor:"#099302", gap:20, width:"90%", borderRadius:20, padding:20, alignSelf:"center", marginTop:50}}
            onPress={() => handleItemPress(item)}
          >
            <Text style={{color:"#fff", fontSize:30, textAlign:"center"}}>{item.modelo}</Text>
            <Text style={{color:"#fff", fontSize:20}}>{t('titlePlate')}: {item.placa}</Text>
            <Text style={{color:"#fff", fontSize:20}}>{t('titleCondition')}: {item.condicao}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text>{t('alertContextErroFindAnyBike')}</Text>
        }
      />
      <TouchableOpacity style={{backgroundColor:"#099302", width:100, marginLeft:40, borderTopEndRadius:20, borderTopStartRadius:20}} onPress={() => setOpenOptions(!openOptions)}>
        <Image style={{alignSelf:"center"}} source={require("../../assets/profile/white-logo.png")}/>
      </TouchableOpacity>
      {openOptions && (
        <View style={styles.config}>
          <TouchableOpacity style={styles.botoesConf} onPress={() => router.push('/cadastro-moto')}>
            <Ionicons name="create-outline" size={30} color="#fff" style={{alignSelf:"center"}}/>
            <View>
              <Text style={{color:"#fff"}}>{t('titleRegister')}</Text>
              <Text style={{color:"#fff", width:"80%"}}>{t('contextRegisterBike')}</Text>
            </View>
          </TouchableOpacity>

        </View>
        
      )}
    </SafeAreaView>
  );
}
