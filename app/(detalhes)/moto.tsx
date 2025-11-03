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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Moto } from '../../src/types/motos';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";

export default function MotoDetails() {
  const [openOptions, setOpenOptions] = useState(false);
  const [moto, setMoto] = useState<Moto | null>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    loadMoto();
  }, []);

  const loadMoto = async () => {
    try {
      const data = await AsyncStorage.getItem('motos');
      const motos: Moto[] = data ? JSON.parse(data) : [];
      const found = motos.find((m) => m.placa === params.placa);
      if (found) setMoto(found);
      else Alert.alert(t('titleError'), t('alertContextErroFindBike'));
    } catch (error) {
      Alert.alert(t('titleError'), t('alertContextErroLoadBike'));
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
              let motos: Moto[] = data ? JSON.parse(data) : [];
              motos = motos.filter((m) => m.placa !== moto?.placa);
              await AsyncStorage.setItem('motos', JSON.stringify(motos));
              Alert.alert(t('alertSuccessEmployeeTitle'), t('alertConfirmedBike'));
              router.back();
            } catch (error) {
              Alert.alert(t('titleError'), t('alertContextErrorDeletedBike'));
            }
          }
        }
      ]
    );
  };

  if (!moto) return null;

  // Funções de fallback
  const displayString = (value: string | undefined, fallback: string = '-') =>
    value && value.trim() !== '' ? value : fallback;

  const displayNumber = (value: number | undefined, fallback: string = '-') =>
    typeof value === 'number' ? value : fallback;

  const displayOptional = (value: string | undefined, fallback: string) =>
    value ? value : fallback;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.profile}>
        {/* Placa */}
        <View style={styles.motoStatus}>
          <Text style={{ fontSize: 30, color: "#fff" }}>{displayString(moto.placa)}</Text>
        </View>

        {/* Dados da moto */}
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center", paddingTop: 35, color: colors.text }}>
            {t('titleDataBike')}
          </Text>

          <View style={styles.dadosProfile}>
            <View style={styles.dadosPreenchidos}>
              <Ionicons name="build-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleChassis')}: {displayNumber(moto.chassi)}</Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleCondition')}: {displayString(moto.condicao)}</Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="bicycle-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleModel')}: {displayOptional(moto.modelo?.nome, t('labelNoModel'))}</Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="speedometer-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleBraking')}: {displayOptional(moto.modelo?.frenagem, '-')}</Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="battery-charging-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleStartingSystem')}: {displayOptional(moto.modelo?.sisPartida, '-')}</Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="water-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleTank')}: {displayNumber(moto.modelo?.tanque)}</Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="flame-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleFuelType')}: {displayOptional(moto.modelo?.tipoCombustivel, '-')}</Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="speedometer-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleConsumption')}: {displayNumber(moto.modelo?.consumo)}</Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="person-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleDriver')}: {displayOptional(moto.motorista?.dados.nome, t('EmptyDriver'))}</Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="business-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleSector')}: {displayOptional(moto.setor?.nome, t('EmptySector'))}</Text>
            </View>

            <View style={styles.dadosPreenchidos}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#099302" />
              <Text style={styles.text}>{t('titleSituation')}: {displayOptional(moto.situacao?.nome, t('EmptySituation'))}</Text>
            </View>
          </View>
        </View>

        {/* Botão de opções */}
        <TouchableOpacity style={{ backgroundColor: "#099302", width: 100, marginLeft: 40, borderTopEndRadius: 20, borderTopStartRadius: 20 }} onPress={() => setOpenOptions(!openOptions)}>
          <Image style={{ alignSelf: "center" }} source={require("../../assets/profile/white-logo.png")} />
        </TouchableOpacity>

        {openOptions && (
          <View style={styles.config}>
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() =>
                router.push({
                  pathname: '/editar-moto',
                  params: { placa: moto?.placa },
                })
              }
            >
              <Ionicons name="pencil-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t('titleUpdate')}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t('contextUpdateBike')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botoesConf} onPress={() => router.push('/cadastro-moto')}>
              <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t('titleRegister')}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t('contextRegisterBike')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botoesConf} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t('titleDelete')}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t('contextDeleteBike')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
