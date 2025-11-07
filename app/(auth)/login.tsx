import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Funcionario } from '../../src/types/funcionario';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

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

    // 🔒 Garante que só tentamos acessar dados válidos
    const usuario = funcionarios.find(
      (u) => u.dados && u.dados.email === email
    );

    if (!usuario) {
      Alert.alert(t('titleError'), t('alertLoginNoUser'));
      return;
    }

    if (usuario.dados.senha !== senha) {
      Alert.alert(t('titleError'), t('alertLoginContext'));
      return;
    }

    await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    await AsyncStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');

    Alert.alert(
      t('alertWelcomeTitle'),
      `${t('alertWelcomeContext')} ${usuario.dados.nome}`,
      [{ text: 'OK', onPress: () => router.replace('/home') }]
    );
  } catch (error) {
    Alert.alert(t('titleError'), t('alertLoginErrorContext'));
    console.log(error);
  }
};


  return (
    <SafeAreaView style={styles.profile}>
      <ScrollView >
        <View style={styles.organization}>
          <View style={styles.form}>
            {/* Campo de email */}
            <View style={styles.form}>
              <Text style={styles.textLabel}>{t('emailPlace')}</Text>
              <View style={styles.input}>
                <Ionicons name="mail-outline" size={24} color="green" style={styles.iconForm}/>
                <TextInput
                  placeholder={t('emailPlace')}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Campo de senha */}
            <View style={styles.form}>
              <Text style={styles.textLabel}>{t('passwordPlace')}</Text>
              <View style={styles.input}>
                <Ionicons name="lock-closed-outline" size={24} color="green" style={styles.iconForm}/>
                <TextInput
                  placeholder={t('passwordPlace')}
                  value={senha}
                  style={styles.textInput}
                  onChangeText={setSenha}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    style={styles.olho}
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={24}
                    color="green"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Lembrar login */}
            <TouchableOpacity style={styles.lembre}  onPress={() => setRememberMe(!rememberMe)}>
              <Ionicons
              
                name={rememberMe ? 'checkbox' : 'square-outline'}
                size={24}
                color="green"
              />
              <Text style={{color:colors.text}}>{t('rememberMe')}</Text>
            </TouchableOpacity>

          </View>
          

          

          {/* Botão de login */}
          <View style={{ marginHorizontal: 40 }}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>{t('loginTitle')}</Text>
            </TouchableOpacity>
          </View>
          

          {/* Botão para limpar o AsyncStorage */}
          {/* <TouchableOpacity
            style={{ backgroundColor: 'red', padding: 10, borderRadius: 8 }}
            onPress={async () => {
              await AsyncStorage.clear();
              alert('AsyncStorage limpo!');}}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Limpar Funcionários</Text>
          </TouchableOpacity> */}

          
          <View style={styles.cadastrar}>
            <Text style={{color:colors.text}}>{t('noAccountText')}</Text>
            <TouchableOpacity onPress={() => router.push('/cadastro')}>
              <Text style={{ color: '#099302' }}>{t('registerTitle')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
