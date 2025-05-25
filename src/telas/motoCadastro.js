import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function MotoCadastro({ navigation }) {
  const [placa, setPlaca] = useState('');
  const [chassi, setChassi] = useState('');
  const [condicao, setCondicao] = useState('');
  const [modelo, setModelo] = useState('');
  const [frenagem, setFrenagem] = useState('');
  const [partida, setPartida] = useState('');
  const [capacidadeTanque, setCapacidadeTanque] = useState('');
  const [tipoCombustivel, setTipoCombustivel] = useState('');
  const [mediaConsumo, setMediaConsumo] = useState('');

  const salvarMoto = async () => {
    if (!placa) {
      Alert.alert('Erro', 'A placa é obrigatória');
      return;
    }

    const dadosMoto = {
      placa,
      chassi,
      condicao,
      modelo,
      frenagem,
      partida,
      capacidadeTanque,
      tipoCombustivel,
      mediaConsumo,
    };

    try {
      await AsyncStorage.setItem(`@moto_${placa}`, JSON.stringify(dadosMoto));
      Alert.alert('Sucesso', 'Moto cadastrada com sucesso!');
      navigation.navigate('tabHome');
    } catch (error) {
      console.error('Erro ao salvar moto:', error);
      Alert.alert('Erro', 'Não foi possível salvar a moto');
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('tabHome')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View>
        <Text>Cadastro da Moto</Text>
      </View>

      <View>

      <TextInput placeholder="Placa" value={placa} onChangeText={setPlaca} />
      <TextInput placeholder="Número do Chassi" value={chassi} onChangeText={setChassi}/>
      <TextInput placeholder="Condição" value={condicao} onChangeText={setCondicao}/>
      <TextInput placeholder="Nome do Modelo" value={modelo} onChangeText={setModelo}/>
      <TextInput placeholder="Sistema de Frenagem" value={frenagem} onChangeText={setFrenagem}/>
      <TextInput placeholder="Sistema de Partida" value={partida} onChangeText={setPartida}/>
      <TextInput placeholder="Capacidade do Tanque (L)" value={capacidadeTanque} onChangeText={setCapacidadeTanque} keyboardType="numeric" />
      <TextInput placeholder="Tipo de Combustível" value={tipoCombustivel} onChangeText={setTipoCombustivel}/>
      <TextInput placeholder="Média de Consumo (km/L)" value={mediaConsumo} onChangeText={setMediaConsumo}keyboardType="numeric" />

      <TouchableOpacity onPress={salvarMoto} style={styles.botao}>
        <Text>Cadastrar Moto</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
