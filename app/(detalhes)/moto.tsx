import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams  } from 'expo-router';
import { MotoForm } from '../../src/types/motos';
import { useTranslation } from 'react-i18next';

export default function Moto() {
  const [openOptions, setOpenOptions] = useState(false);
  const [moto, setMoto] = useState<MotoForm | null>(null);

  const router = useRouter();
  const params = useLocalSearchParams ();
  const { t } = useTranslation();

  useEffect(() => {
    loadMoto();
  }, []);

  const loadMoto = async () => {
    try {
      const data = await AsyncStorage.getItem('motos');
      const motos: MotoForm[] = data ? JSON.parse(data) : [];
      const found = motos.find((m) => m.placa === params.placa);
      if (found) setMoto(found);
      else Alert.alert(t('titleError'), t('alertContextErroFindBike'));
    } catch (error) {
      Alert.alert(t(''), t('alertContextErroLoadBike'));
    }
  };

  const handleDelete = () => {
    Alert.alert(
      t('titleDelete'),
      t('contextDeleteBike'), 
      [
        { text: t('titleCancel') },
        { 
          text: t('titleDelete'), 
          style: 'destructive', 
          onPress: async () => {
            try {
              const data = await AsyncStorage.getItem('motos');
              let motos: MotoForm[] = data ? JSON.parse(data) : [];
              motos = motos.filter((m) => m.placa !== moto?.placa);
              await AsyncStorage.setItem('motos', JSON.stringify(motos));
              Alert.alert(t('alertSuccessEmployeeTitle') , t('alertConfirmedBike'));
              router.back();
            } catch (error) {
              Alert.alert(t('titleError'), t('alertContextErrorDeletedBike') );
            }
          }
        }
      ]
    );
  };


  if (!moto) return null;

  return (
    <ScrollView>
      <View>
        <Text>{moto.placa}</Text>
      </View>

      <View>
        <Text>{t('titleDataBike')}</Text>
        <View>
          <View>
            <Ionicons name="build-outline" size={24} color="black"/>            
            <Text>{t('titleChassis')} {moto.chassi}</Text>
          </View>
          <View>
            <Ionicons name="checkmark-circle-outline" size={24} color="black"/>            
            <Text>{t('titleCondition')} {moto.condicao}</Text>
          </View>
          <View>
            <Ionicons name="bicycle-outline" size={24} color="black"/>            
            <Text>{t('titleModel')} {moto.modelo}</Text>
          </View>
          <View>
            <Ionicons name="speedometer-outline" size={24} color="black"/>            
            <Text>{t('titleBraking')} {moto.frenagem}</Text>
          </View>
          <View>
            <Ionicons name="battery-charging-outline" size={24} color="black"/>            
            <Text>{t('titleStartingSystem')} {moto.sistemaPartida}</Text>
          </View>
          <View>
            <Ionicons name="water-outline" size={24} color="black"/>            
            <Text>{t('titleTank')} {moto.tanque}</Text>
          </View>
          <View>
            <Ionicons name="flame-outline" size={24} color="black"/>            
            <Text>{t('titleFuelType')} {moto.tipoCombustivel}</Text>
          </View>
          <View>
            <Ionicons name="speedometer-outline" size={24} color="black"/>            
            <Text>{t('titleConsumption')} {moto.consumo}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => setOpenOptions(!openOptions)}>
        <Image source={require("../../assets/profile/white-logo.png")}/>
      </TouchableOpacity>    
      {openOptions && (
        <View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/editar-moto', 
                params: { placa: moto?.placa },
              })
            }
          >
            <Ionicons name="pencil-outline" size={24} color="black" />
            <View>
              <Text>{t('titleUpdate')}</Text>
              <Text>{t('contextUpdateMoto')}</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/cadastro-moto')}>
            <Ionicons name="create-outline" size={24} color="black" />
            <View>
              <Text>{t('titleRegister')}</Text>
              <Text>{t('contextRegisterBike')}</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="black" />
            <View>
              <Text>{t('titleDelete')}</Text>
              <Text>{t('contextDeleteBike')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
