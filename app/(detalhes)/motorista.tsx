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
import { Motorista } from '../../src/types/motorista';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";

export default function MotoristaDetails() {
  const [openOptions, setOpenOptions] = useState(false);
  const [motorista, setMotorista] = useState<Motorista | null>(null);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    loadMotorista();
  }, []);

  const loadMotorista = async () => {
    try {
      const data = await AsyncStorage.getItem('motoristas');
      const motoristas: Motorista[] = data ? JSON.parse(data) : [];
      const found = motoristas.find((m) => m.id === params.id);
      if (found) setMotorista(found);
      else Alert.alert(t('titleError'), t('alertContextErroFindBikers'));
    } catch (error) {
      Alert.alert(t('titleError'), t('alertContextErroLoadBikers'));
    }
  };

  const handleDelete = () => {
    Alert.alert(
      t('titleDelete'),
      t('contextDeleteBikers'), 
      [
        { text: t('titleCancel') },
        { 
          text: t('titleDelete'), 
          style: 'destructive', 
          onPress: async () => {
            try {
              const data = await AsyncStorage.getItem('motoristas');
              let motoristas: Motorista[] = data ? JSON.parse(data) : [];
              motoristas = motoristas.filter((m) => m.id !== motorista?.id);
              await AsyncStorage.setItem('motoristas', JSON.stringify(motoristas));
              Alert.alert(t('alertSuccessEmployeeTitle'), t('alertConfirmedBikers'));
              router.back();
            } catch (error) {
              Alert.alert(t('titleError'), t('alertContextErrorDeletedBikers'));
            }
          }
        }
      ]
    );
  };

  if (!motorista) return null;

  const displayOptional = (value: string | undefined, fallback: string) =>
    value && value.trim() !== '' ? value : fallback;

  return (
    <SafeAreaView style={styles.profile}>
      <ScrollView >

        {/* Nome */}
        <View style={styles.motoStatus}>
          <Text style={{ fontSize: 30, color: "#fff" }}>{displayOptional(motorista.dados.nome, '-')}</Text>
        </View>

        {/* Dados do motorista */}
        <View style={styles.dadosProfile}>
          <View style={styles.dadosPreenchidos}>
            <Ionicons name="document-text-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t('titleID')}: {displayOptional(motorista.dados.cpf, '-')}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="call-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t('titlePhone')}: {displayOptional(motorista.dados.telefone, '-')}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="mail-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t('titleEmail')}: {displayOptional(motorista.dados.email, '-')}</Text>
          </View>

          <View style={styles.dadosPreenchidos}>
            <Ionicons name="document-outline" size={24} color="#099302" />
            <Text style={styles.text}>{t('titlePlan')}: {displayOptional(motorista.plano, '-')}</Text>
          </View>
        </View>

        {/* Botão de opções */}
        <TouchableOpacity style={{ backgroundColor: colors.button, width: 100, marginLeft: 40, borderTopEndRadius: 20, borderTopStartRadius: 20 }} onPress={() => setOpenOptions(!openOptions)}>
          <Image style={{ alignSelf: "center" }} source={require("../../assets/profile/white-logo.png")} />
        </TouchableOpacity>

        {openOptions && (
          <View style={styles.config}>
            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() =>
                router.push({
                  pathname: '/editar-motorista',
                  params: { id: motorista?.id },
                })
              }
            >
              <Ionicons name="pencil-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t('titleUpdate')}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t('contextUpdateBiker')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botoesConf} onPress={() => router.push('/cadastro-motorista')}>
              <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t('titleRegister')}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t('contextRegisterBikers')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botoesConf} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
              <View>
                <Text style={{ color: "#fff" }}>{t('titleDelete')}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t('contextDeleteBikers')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
