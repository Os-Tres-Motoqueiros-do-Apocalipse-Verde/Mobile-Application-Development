import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Funcionario } from '../../src/types/funcionario';
import { useTranslation } from 'react-i18next';

export default function EditUser() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadUser(params.id);
    }
  }, [params.id]);

  const loadUser = async (id: string) => {
    try {
      const storage = await AsyncStorage.getItem('funcionarios');
      const funcionarios: Funcionario[] = storage ? JSON.parse(storage) : [];
      const user = funcionarios.find(f => f.id.toString() === id);
      if (!user) {
        Alert.alert(t('titleError'), t('alertUserNotFound'));
        return;
      }
      setNome(user.nome);
      setEmail(user.email);
      setSenha(user.senha);
      setTelefone(user.telefone);
      setCpf(user.cpf);
      setCargo(user.cargo);
    } catch (error) {
      Alert.alert(t('titleError'), t('alertErrorLoadUser'));
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (!nome || !email || !senha || !telefone || !cpf || !cargo) {
      Alert.alert(t('titleError'), t('alertEmptyInput'));
      return;
    }

    try {
      const storage = await AsyncStorage.getItem('funcionarios');
      const funcionarios: Funcionario[] = storage ? JSON.parse(storage) : [];
      const index = funcionarios.findIndex(f => f.id.toString() === params.id);

      if (index === -1) {
        Alert.alert(t('titleError'), t('alertUserNotFound'));
        return;
      }

      funcionarios[index] = { ...funcionarios[index], nome, email, senha, telefone, cpf, cargo };
      await AsyncStorage.setItem('funcionarios', JSON.stringify(funcionarios));

      Alert.alert(t('alertSuccessEmployeeTitle'), t('alertUpdateEmployeeContext'));
      router.back();
    } catch (error) {
      Alert.alert(t('titleError'), t('alertErrorUpdateUser'));
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View>
        <Ionicons name="person-outline" size={20} color="green" />
        <TextInput placeholder={t('namePlace')} value={nome} onChangeText={setNome} />
      </View>

      <View>
        <Ionicons name="mail-outline" size={20} color="green" />
        <TextInput placeholder={t('emailPlace')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      </View>

      <View>
        <Ionicons name="lock-closed-outline" size={20} color="green" />
        <TextInput
          placeholder={t('passwordPlace')}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="green" />
        </TouchableOpacity>
      </View>

      <View>
        <Ionicons name="call-outline" size={20} color="green" />
        <TextInput placeholder={t('telephonePlace')} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
      </View>

      <View>
        <Ionicons name="reader-outline" size={20} color="green" />
        <TextInput placeholder={t('nationalIdPlace')} value={cpf} onChangeText={setCpf} />
      </View>

      <View>
        <Ionicons name="storefront-outline" size={20} color="green" />
        <TextInput placeholder={t('positionPlace')} value={cargo} onChangeText={setCargo} />
      </View>

      <Button title={t('updateTitle')} onPress={handleUpdate} />
    </ScrollView>
  );
}
