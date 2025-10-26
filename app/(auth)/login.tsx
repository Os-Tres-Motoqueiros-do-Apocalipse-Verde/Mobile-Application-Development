import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Funcionario } from '../../src/types/funcionario';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
    <SafeAreaView>
      <ScrollView>
        <View>
          {/* Campo de email */}
          <View>
            <Text>{t('emailPlace')}</Text>
            <View>
              <Ionicons name="mail-outline" size={24} color="green" />
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
          <View>
            <Text>{t('passwordPlace')}</Text>
            <View>
              <Ionicons name="lock-closed-outline" size={24} color="green" />
              <TextInput
                placeholder={t('passwordPlace')}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color="green"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Lembrar login */}
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
            <Ionicons
              name={rememberMe ? 'checkbox' : 'square-outline'}
              size={24}
              color="green"
            />
            <Text>{t('rememberMe')}</Text>
          </TouchableOpacity>

          {/* Botão de login */}
          <TouchableOpacity onPress={handleLogin}>
            <Text>{t('loginTitle')}</Text>
          </TouchableOpacity>

          {/* Botão para limpar o AsyncStorage */}
          {/* <TouchableOpacity
            style={{ backgroundColor: 'red', padding: 10, borderRadius: 8 }}
            onPress={async () => {
              await AsyncStorage.clear();
              alert('AsyncStorage limpo!');}}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Limpar Funcionários</Text>
          </TouchableOpacity> */}

          
          <View>
            <Text>{t('noAccountText')}</Text>
            <TouchableOpacity onPress={() => router.push('/cadastro')}>
              <Text>{t('registerTitle')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
