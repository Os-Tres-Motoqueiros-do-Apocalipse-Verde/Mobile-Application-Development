import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Funcionario } from '../../src/types/funcionario';

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function EditUser() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const [form, setForm] = useState<Funcionario | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storage = await AsyncStorage.getItem('funcionarios');
        if (!storage) return;

        const funcionarios: Funcionario[] = JSON.parse(storage);
        const user = funcionarios.find(f => f.id.toString() === id);
        if (user) setForm(user);
      } catch (error) {
        console.log(error);
        Alert.alert(t('titleError'), t('alertErrorLoadUser'));
      }
    };
    if (id) loadUser();
  }, [id]);

  const handleChange = (key: keyof Funcionario | keyof Funcionario['dados'], value: string) => {
    if (!form) return;
    if (['nome', 'cpf', 'telefone', 'email', 'senha'].includes(key as string)) {
      setForm(prev => ({ ...prev!, dados: { ...prev!.dados, [key]: value } }));
    } else {
      setForm(prev => ({ ...prev!, [key]: value }));
    }
  };

  const handleSave = async () => {
    if (!form) return;

    const erros: string[] = [];
    if (!form.nome) erros.push(t('alertEmptyName'));
    if (!form.cargo) erros.push(t('alertEmptyPosition'));
    if (!form.dados.nome) erros.push(t('alertEmptyName'));
    if (!form.dados.cpf) erros.push(t('alertEmptyCPF'));
    if (!form.dados.email) erros.push(t('alertEmptyEmail'));
    if (!form.dados.senha) erros.push(t('alertEmptyPassword'));
    if (!form.dados.telefone) erros.push(t('alertEmptyPhone'));

    if (erros.length > 0) {
      Alert.alert(t('titleError'), erros.join('\n'));
      return;
    }

    try {
      const storage = await AsyncStorage.getItem('funcionarios');
      const funcionarios: Funcionario[] = storage ? JSON.parse(storage) : [];

      const index = funcionarios.findIndex(f => f.id.toString() === id);
      if (index === -1) {
        Alert.alert(t('titleError'), t('alertUserNotFound'));
        return;
      }

      funcionarios[index] = form;
      await AsyncStorage.setItem('funcionarios', JSON.stringify(funcionarios));

      Alert.alert(t('alertSuccessEmployeeTitle'), t('alertUpdateEmployeeContext'));
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert(t('titleError'), t('alertErrorUpdateUser'));
    }
  };

  if (!form) {
    return (
      <SafeAreaView>
        <Text>{t('loading')}</Text>
      </SafeAreaView>
    );
  }

  const campos = [
    { key: 'nome', label: t('namePlace'), placeholder: t('namePlace'), iconName: 'person-outline' },
    { key: 'email', label: t('emailPlace'), placeholder: t('emailPlace'), iconName: 'mail-outline' },
    { key: 'senha', label: t('passwordPlace'), placeholder: t('passwordPlace'), iconName: 'lock-closed-outline', secure: true },
    { key: 'telefone', label: t('telephonePlace'), placeholder: t('telephonePlace'), iconName: 'call-outline' },
    { key: 'cpf', label: t('nationalIdPlace'), placeholder: t('nationalIdPlace'), iconName: 'reader-outline' },
    { key: 'cargo', label: t('positionPlace'), placeholder: t('positionPlace'), iconName: 'storefront-outline' },
  ];

  return (
    <SafeAreaView style={styles.profile}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            style={styles.form}
            ref={flatListRef}
            data={campos}
            keyExtractor={item => item.key}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <View style={{ flex:1, gap:20 }}>
                <Text style={styles.textLabel}>{item.label}</Text>
                <View style={styles.input}>
                  <Ionicons name={item.iconName as any} size={24} color="#09BC00" style={styles.iconForm}/>
                  <TextInput
                    placeholder={item.placeholder}
                    value={
                      ['nome', 'cpf', 'telefone', 'email', 'senha'].includes(item.key)
                        ? form.dados[item.key as keyof Funcionario['dados']]
                        : (form[item.key as keyof Funcionario] as string)
                    }
                    secureTextEntry={item.key === 'senha' && !showPassword}
                    onChangeText={text => handleChange(item.key as keyof Funcionario, text)}
                    onFocus={() =>
                      flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.3 })
                    }
                  />
                  {item.key === 'senha' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={24}
                        color="green"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            ListFooterComponent={
              <View style={{ paddingTop: 30 }}>
                <TouchableOpacity style={styles.button}  onPress={handleSave}>
                  <Text style={styles.buttonText}>{t("titleUpdate")}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
