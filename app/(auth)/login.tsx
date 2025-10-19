import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Funcionario } from '../../src/types/funcionario';
import { useRouter } from 'expo-router'; 
import { useTranslation } from 'react-i18next';

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";


export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { colors, toggleTheme } = useTheme();
  const styles = createGlobalStyles(colors);

  const router = useRouter();

  useEffect(() => {
    const checkRememberedUser = async () => {
      const savedUser = await AsyncStorage.getItem('usuarioLogado');
      const rememberFlag = await AsyncStorage.getItem('rememberMe');
      if (savedUser && rememberFlag === 'true') {
        router.replace('/home');
      }
    };
    checkRememberedUser();
  }, []);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert(t('titleError'), t('alertEmptyInput'));
      return;
    }

    try {
      const storage = await AsyncStorage.getItem('funcionarios');
      const funcionarios: Funcionario[] = storage ? JSON.parse(storage) : [];

      const usuarioPorEmail = funcionarios.find(u => u.email === email);

      if (!usuarioPorEmail) {
        Alert.alert(t('titleError'), t('alertLoginNoUser'));
        return;
      }

      if (usuarioPorEmail.senha !== senha) {
        Alert.alert(t('titleError'), t('alertLoginContext'));
        return;
      }

      await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuarioPorEmail));
      await AsyncStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');

      Alert.alert(
        t('alertWelcomeTitle'),
        t('alertWelcomeContext') + usuarioPorEmail.nome,
        [{ text: 'OK', onPress: () => router.replace('/home') }]
      );
    } catch (error) {
      Alert.alert(t('titleError'), t('alertLoginErrorContext'));
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.organization}>

        <View style={styles.form}>
          <Text style={{color: colors.text}} >{t('emailPlace')}</Text>
          <View style={styles.input}>
            <Ionicons name="mail-outline" size={24} color="green" style={styles.iconForm}/>
            <TextInput
              placeholder={t('emailPlace')}
              value={email}
              style={styles.textInput}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
        </View>


          <View style={styles.form}>
            <Text style={{color: colors.text}} >{t('passwordPlace')}</Text>
            
            <View style={styles.input}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="green"
                style={styles.iconForm}
              />
              <TextInput
                placeholder={t('passwordPlace')}
                value={senha}
                style={styles.textInput}
                onChangeText={setSenha}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="green"
                style={styles.olho}
              />
              </TouchableOpacity>

            </View>
          </View>
        

        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.lembre}>
          <Ionicons 
            name={rememberMe ? 'checkbox' : 'square-outline'} 
            size={24} 
            color="green" 
          />
          <Text>{t('rememberMe')}</Text>
        </TouchableOpacity>

        <Button title={t('loginTitle')} onPress={handleLogin} />

        <View style={styles.cadastrar}>
          <Text style={{color: colors.text}}>{t('noAccountText')}</Text>
          <TouchableOpacity onPress={() => router.push('/cadastro')}>
            <Text style={{ color: '#099302' }}>{t('registerTitle')}</Text>
          </TouchableOpacity>
        </View>

      </View>
      
    </ScrollView>
  );
}
