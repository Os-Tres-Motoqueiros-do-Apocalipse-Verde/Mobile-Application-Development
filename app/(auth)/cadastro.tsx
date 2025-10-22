import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Funcionario } from '../../src/types/funcionario';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { createGlobalStyles } from '../../src/styles/globalStyles';

export default function Cadastro() {
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha || !telefone || !cpf || !cargo) {
      Alert.alert(t('titleError'), t('alertEmptyInput'));
      return;
    }

    const idFuncionario = Date.now();
    const idDados = String(idFuncionario);

    const novoFuncionario: Funcionario = {
      id: idFuncionario,
      nome,
      cargo,
      dados: {
        id: idDados,
        nome,
        email,
        senha,
        telefone,
        cpf,
      },
    };

    try {
      const storage = await AsyncStorage.getItem('funcionarios');
      const funcionarios: Funcionario[] = storage ? JSON.parse(storage) : [];

      const existe = funcionarios.some(
        f => f.dados.cpf === cpf || f.dados.email.toLowerCase() === email.toLowerCase()
      );
      if (existe) {
        Alert.alert(t('titleError'), t('alertDuplicateUser'));
        return;
      }

      funcionarios.push(novoFuncionario);
      await AsyncStorage.setItem('funcionarios', JSON.stringify(funcionarios));

      Alert.alert(t('alertSuccessEmployeeTitle'), t('alertRegisterEmployeeContext'));

      setNome('');
      setEmail('');
      setSenha('');
      setTelefone('');
      setCpf('');
      setCargo('');

      router.push('/login');
    } catch (error) {
      Alert.alert(t('titleError'), t('alertRegisterEmployeeErrorContext'));
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.sobre}>
        <View style={{ padding: 16 }}>
          <View style={styles.inputForm}>
            <Ionicons name="person-outline" size={24} color="green" style={styles.iconForm} />
            <TextInput
              style={{ color: colors.text }}
              placeholder={t('namePlace')}
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputForm}>
            <Ionicons name="mail-outline" size={24} color="green" style={styles.iconForm} />
            <TextInput
              style={{ color: colors.text }}
              placeholder={t('emailPlace')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputForm}>
            <Ionicons name="lock-closed-outline" size={24} color="green" style={styles.iconForm} />
            <TextInput
              style={{ color: colors.text }}
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
                style={styles.olho}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputForm}>
            <Ionicons name="call-outline" size={24} color="green" style={styles.iconForm} />
            <TextInput
              style={{ color: colors.text }}
              placeholder={t('telephonePlace')}
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputForm}>
            <Ionicons name="reader-outline" size={24} color="green" style={styles.iconForm} />
            <TextInput
              style={{ color: colors.text }}
              placeholder={t('nationalIdPlace')}
              value={cpf}
              onChangeText={setCpf}
            />

            
          </View>

          <View style={styles.inputForm}>
            <Ionicons name="storefront-outline" size={24} color="green" style={styles.iconForm} />
            <TextInput
              style={{ color: colors.text }}
              placeholder={t('positionPlace')}
              value={cargo}
              onChangeText={setCargo}
            />
          </View>

          <TouchableOpacity style={styles.botao} onPress={handleRegister}>
            <Text>{t('registerTitle')}</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ color: colors.text }}>{t('haveAccountText')} </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={{ color: 'green', fontWeight: 'bold' }}>{t('loginTitle')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}
