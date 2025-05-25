import React, { useEffect, useState } from 'react';
import { View, Button, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation, email }) {
  const [nome, setNome] = useState('');

  // Função para buscar dados do usuário pelo email
  async function pegarDadosPorEmail(email) {
    try {
      const dadosJson = await AsyncStorage.getItem(`@user_${email}`);
      if (dadosJson !== null) {
        const dadosUsuario = JSON.parse(dadosJson);
        return dadosUsuario;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao acessar AsyncStorage:', error);
      return null;
    }
  }

  useEffect(() => {
    async function carregarNome() {
      const dados = await pegarDadosPorEmail(email);
      if (dados && dados.nome) {
        setNome(dados.nome);
      } else {
        setNome('Usuário');
      }
    }
    carregarNome();
  }, [email]);

  return (
    <ScrollView>
      <View>
        <Text>Bem vindo! {nome}</Text>
      </View>

      {/* Parte de texto inicial */}
      <View>
        <View>
          <View>
            <Image source={require('../../assets/LogoNoBGLime.png')} />
          </View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
        </View>
        <View>
          <Text>
            Os três cavaleiros do Apocalipse, tem como objetivo auxiliar a empresa Mottu no problema de mapeamento das motos em seus pátios, onde usamos tecnologias IOT e um mapa interativo para mapear a região do pátio, além de poder separar por setores personalizados o próprio pátio
          </Text>
        </View>
      </View>

      {/* Aqui vem a Linha */}
      <View>
        <View>
          <Text>Nosso Github </Text>
        </View>
        <View>
          <Image source={require('../../assets/githubLogo.png')} />
          <View>
            <Text>Essa é a nossa organização do projeto Os Tres Cavaleiros do apocalipse Verde</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Os-Tres-Motoqueiros-do-Apocalipse-Verde')}>
              <Text style={{color: 'blue', textDecorationLine: 'underline'}}>OTMAV</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <Text>Prazer! {nome}</Text>
        <Text>{email}</Text>
        <Button
          title="Sair"
          onPress={() => navigation.navigate('FuncionarioLogin')}
        />
      </View>
    </ScrollView>
  );
}
