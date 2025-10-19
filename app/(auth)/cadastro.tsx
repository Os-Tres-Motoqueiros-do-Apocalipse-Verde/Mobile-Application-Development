import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Funcionario } from '../../src/types/funcionario'; 
import { useRouter } from 'expo-router'; 
import{useTranslation} from 'react-i18next'

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";


export default function Cadastro() {

  const{t}=useTranslation()

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [cargo, setCargo] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { colors, toggleTheme } = useTheme();
    const styles = createGlobalStyles(colors);
    
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.organization}>

        <View style={styles.form}>
          <Text style={{color: colors.text}} >{t('namePlace')} </Text>
          <View style={styles.input}>
            <Ionicons name="person-outline" size={20} color="green" style={styles.iconForm}/>
            <TextInput 
              placeholder={t('namePlace')} 
              value={nome} 
              onChangeText={setNome} />
          </View> 
        </View>

          <View style={styles.form}>
            <Text style={{color: colors.text}} >{t('emailPlace')}</Text>
            <View style={styles.input}>
              <Ionicons name="mail-outline" size={20} color="green" style={styles.iconForm} />
              <TextInput 
                placeholder={t('emailPlace')}
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address" 
                autoCapitalize="none"
              />
            </View>
         
          </View>
        
          <View style={styles.form}>
          <Text style={{color: colors.text}} >{t('passwordPlace')}</Text>
          <View style={styles.input}>
          <Ionicons name="lock-closed-outline" size={20} color="green" style={styles.iconForm} />
          <TextInput
              placeholder={t('passwordPlace')}
              value={senha} 
              onChangeText={setSenha} 
              style={styles.textInput}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="green"
                style={styles.olho}
              />
            </TouchableOpacity>
          </View>

          </View>
        
        <View style={styles.form}>
          <Text style={{color: colors.text}} >{t('telephonePlace')}</Text>
          <View style={styles.input}>
            <Ionicons name="call-outline" size={20} color="green" style={styles.iconForm}/>
            <TextInput
              placeholder={t('telephonePlace')}
              value={telefone} 
              onChangeText={setTelefone} 
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        <View style={styles.form}>
          <Text style={{color: colors.text}} >{t('nationalIdPlace')} </Text>
          <View style={styles.input}>
            <Ionicons name="reader-outline" size={20} color="green" style={styles.iconForm} />
            <TextInput 
              placeholder={t('nationalIdPlace')} 
              value={cpf} 
              onChangeText={setCpf}
            />
          </View>

        </View>

        <View style={styles.form}>
          <Text style={{color: colors.text}} >{t('positionPlace')}</Text>
          <View style={styles.input}>
            <Ionicons name="storefront-outline" size={20} color="green" style={styles.iconForm} />
            <TextInput 
              placeholder={t('positionPlace')}
              value={cargo} 
              onChangeText={setCargo}
            />
          </View>

        </View>
       

        <Button title={t('registerTitle')} onPress={handleRegister} />

        <View style={styles.cadastrar} >
            <Text>{t('haveAccountText')}</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={{ color: '#099302' }}>{t('loginTitle')}</Text>
            </TouchableOpacity>
        </View>

      </View>
        
    </ScrollView>
  );
}