import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Funcionario } from '../../src/types/funcionario';
import { useTranslation } from 'react-i18next';
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";

export default function EditUser() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

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
      setEmail(user.dados.email);
      setSenha(user.dados.senha);
      setTelefone(user.dados.telefone);
      setCpf(user.dados.cpf);
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

      funcionarios[index] = {
        ...funcionarios[index],
        nome,
        cargo,
        dados: {
          ...funcionarios[index].dados,
          cpf,
          telefone,
          email,
          senha,
          nome 
        }
      };

      await AsyncStorage.setItem('funcionarios', JSON.stringify(funcionarios));

      Alert.alert(t('alertSuccessEmployeeTitle'), t('alertUpdateEmployeeContext'));
      router.back();

    } catch (error) {
      Alert.alert(t('titleError'), t('alertErrorUpdateUser'));
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.sobre}>
      <View style={styles.inputForm}>
        <Ionicons name="person-outline" size={30} color="green" style={styles.iconForm}/>
        <TextInput
          style={{ color: colors.text }}
          placeholder={t('namePlace')}
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputForm}>
        <Ionicons name="mail-outline" size={30} color="green" style={styles.iconForm}/>
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
        <Ionicons name="lock-closed-outline" size={30} color="green" style={styles.iconForm}/>
        <TextInput
          placeholder={t('passwordPlace')}
          style={{ color: colors.text }}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={30}
            color="green"
            style={styles.olho}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputForm}>
        <Ionicons name="call-outline" size={30} color="green" style={styles.iconForm}/>
        <TextInput
          placeholder={t('telephonePlace')}
          style={{ color: colors.text }}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputForm}>
        <Ionicons name="reader-outline" size={30} color="green" style={styles.iconForm}/>
        <TextInput
          placeholder={t('nationalIdPlace')}
          style={{ color: colors.text }}
          value={cpf}
          onChangeText={setCpf}
        />
      </View>

      <View style={styles.inputForm}>
        <Ionicons name="storefront-outline" size={30} color="green" style={styles.iconForm}/>
        <TextInput
          placeholder={t('positionPlace')}
          style={{ color: colors.text }}
          value={cargo}
          onChangeText={setCargo}
        />
      </View>

      <Button title={t('titleUpdate')} onPress={handleUpdate} />
    </ScrollView>
  );
}
