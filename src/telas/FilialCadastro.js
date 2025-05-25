import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function FilialCadastro({ navigation }) {
  const [nomeFilial, setNomeFilial] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [numero, setNumero] = useState('');
  const [rua, setRua] = useState('');
  const [complemento, setComplemento] = useState('');

  const salvarFilial = async () => {
    if (!nomeFilial) {
      Alert.alert('Erro', 'O nome da filial é obrigatório');
      return;
    }

    const dadosFilial = {
      nomeFilial,
      responsavel,
      cep,
      estado,
      numero,
      rua,
      complemento,
    };

    try {
      await AsyncStorage.setItem(`@filial_${nomeFilial}`, JSON.stringify(dadosFilial));
      Alert.alert('Sucesso', 'Filial cadastrada com sucesso!');
      navigation.navigate('tabHome');
    } catch (error) {
      console.error('Erro ao salvar filial:', error);
      Alert.alert('Erro', 'Não foi possível salvar a filial');
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('tabHome')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View>
        <Text>Cadastro da Filial</Text>
      </View>

      <View>
        <TextInput placeholder="Nome da Filial" value={nomeFilial} onChangeText={setNomeFilial} />
        <TextInput placeholder="Nome do Responsável" value={responsavel} onChangeText={setResponsavel} />
        <TextInput placeholder="CEP" value={cep} onChangeText={setCep} keyboardType="numeric" />
        <TextInput placeholder="Estado" value={estado} onChangeText={setEstado} />
        <TextInput placeholder="Número" value={numero} onChangeText={setNumero} keyboardType="numeric" />
        <TextInput placeholder="Rua" value={rua} onChangeText={setRua} />
        <TextInput placeholder="Complemento" value={complemento} onChangeText={setComplemento} />
    
        <TouchableOpacity onPress={salvarFilial}>
          <Text>Cadastrar Filial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
