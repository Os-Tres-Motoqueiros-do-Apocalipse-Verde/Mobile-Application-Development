import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/global';

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
    <ScrollView contentContainerStyle={GlobalStyles.formularioScrool}>

      <TouchableOpacity  onPress={() => navigation.navigate('tabHome')}>
        <Ionicons  name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={GlobalStyles.icone}>
        <Image style={GlobalStyles.icones} source={require('../../assets/icons/Google Forms.png')}/>       
      </View>

      <View>
        <Text style={GlobalStyles.texto}>Cadastro da Filial</Text>
      </View>

      <View>
        <TextInput style={GlobalStyles.caixa} placeholderTextColor="#aaa" placeholder="Nome da Filial" value={nomeFilial} onChangeText={setNomeFilial} />
        <TextInput style={GlobalStyles.caixa} placeholderTextColor="#aaa" placeholder="Nome do Responsável" value={responsavel} onChangeText={setResponsavel} />
        <TextInput style={GlobalStyles.caixa} placeholderTextColor="#aaa" placeholder="CEP" value={cep} onChangeText={setCep} keyboardType="numeric" />
        <TextInput style={GlobalStyles.caixa} placeholderTextColor="#aaa" placeholder="Estado" value={estado} onChangeText={setEstado} />
        <TextInput style={GlobalStyles.caixa} placeholderTextColor="#aaa" placeholder="Número" value={numero} onChangeText={setNumero} keyboardType="numeric" />
        <TextInput style={GlobalStyles.caixa} placeholderTextColor="#aaa" placeholder="Rua" value={rua} onChangeText={setRua} />
        <TextInput style={GlobalStyles.caixa} placeholderTextColor="#aaa" placeholder="Complemento" value={complemento} onChangeText={setComplemento} />
    
        <TouchableOpacity style={GlobalStyles.botao} onPress={salvarFilial}>
          <Text style={GlobalStyles.textoBotao}>Cadastrar Filial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
