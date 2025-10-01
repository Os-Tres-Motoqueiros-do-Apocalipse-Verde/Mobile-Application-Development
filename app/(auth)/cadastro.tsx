import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Funcionario } from '../../src/types/funcionario'; 
import { useRouter } from 'expo-router'; 
import{useTranslation} from 'react-i18next'

export default function Cadastro() {

  const{t}=useTranslation()

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [cargo, setCargo] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const router = useRouter();

    const handleRegister = async () => {
        if (!nome || !email || !senha || !telefone || !cpf || !cargo) {
          Alert.alert(t('titleError'), t('alertEmptyInput'));
          return;
        }

    const novoFuncionario: Funcionario = {
      id: Date.now(),
      nome,
      email,
      senha,
      telefone,
      cpf,
      cargo,
    };

    try {
      const storage = await AsyncStorage.getItem('funcionarios');
      const funcionarios: Funcionario[] = storage ? JSON.parse(storage) : [];
      funcionarios.push(novoFuncionario);
      await AsyncStorage.setItem('funcionarios', JSON.stringify(funcionarios));
      Alert.alert(t('alertSuccessEmployeeTitle'), t('alertRegisterEmployeeContext'));

      setNome('');
      setEmail('');
      setSenha('');
      setTelefone('');
      setCpf('');
      setCargo('');
    } catch (error) {
      Alert.alert(t('titleError'), t('alertRegisterEmployeeErrorContext'));
      console.log(error);
    }
  };

  return (
    <ScrollView>
        <View>
          <Ionicons name="person-outline" size={20} color="green" />
          <TextInput 
            placeholder={t('namePlace')} 
            value={nome} 
            onChangeText={setNome} />
        </View>
        <View>
          <Ionicons name="mail-outline" size={20} color="green" />
          <TextInput 
            placeholder={t('emailPlace')}
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none"
          />
        </View>

        <View>
          <Ionicons name="lock-closed-outline" size={20} color="green" />
          <TextInput
            placeholder={t('passwordPlace')}
            value={senha} 
            onChangeText={setSenha} 
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color="green"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Ionicons name="call-outline" size={20} color="green" />
          <TextInput
            placeholder={t('telephonePlace')}
            value={telefone} 
            onChangeText={setTelefone} 
            keyboardType="phone-pad"
          />
        </View>
        <View>
          <Ionicons name="reader-outline" size={20} color="green" />
          <TextInput 
            placeholder={t('nationalIdPlace')} 
            value={cpf} 
            onChangeText={setCpf}
          />
        </View>
        <View>
          <Ionicons name="storefront-outline" size={20} color="green" />
          <TextInput 
            placeholder={t('positionPlace')}
            value={cargo} 
            onChangeText={setCargo}
          />
        </View>

        <Button title={t('registerTitle')} onPress={handleRegister} />

        <View>
            <Text>{t('haveAccountText')}</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text>{t('loginTitle')}</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}