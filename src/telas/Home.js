import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from '../styles/global';

export default function Home({ navigation, email }) {
  const [nome, setNome] = useState('');

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
    <ScrollView contentContainerStyle={GlobalStyles.home}>
      <View>
        <Text style={GlobalStyles.textoHome}>Bem vindo! {nome}</Text>
      </View>

      <View>
        <View style={GlobalStyles.linhaMoto}>
          <View style={GlobalStyles.ponto}></View>
          <View style={GlobalStyles.ponto}></View>
          <View style={GlobalStyles.ponto}></View>
          <View style={GlobalStyles.ponto}></View>
          <View>
            <Image style={GlobalStyles.imagem} source={require('../../assets/LogoNoBGLime.png')} />
          </View>
        </View>
        <View style={GlobalStyles.muitoTexto}>
          <Text style={GlobalStyles.textoConteudo}>
            Os três cavaleiros do Apocalipse, tem como objetivo auxiliar a empresa Mottu no problema de mapeamento das motos em seus pátios, onde usamos tecnologias IOT e um mapa interativo para mapear a região do pátio, além de poder separar por setores personalizados o próprio pátio
          </Text>
        </View>
      </View>

      <View>
        <View >
          <Text style={GlobalStyles.texto}>Nosso Github </Text>
        </View>
        <View style={GlobalStyles.git}>
          <Image source={require('../../assets/home/Github.png')} />
          <View>
            <Text style={GlobalStyles.textoGit}>Essa é a nossa organização do projeto Os Tres Cavaleiros do apocalipse Verde</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Os-Tres-Motoqueiros-do-Apocalipse-Verde')}>
              <Text style={GlobalStyles.linkGit}>OTMAV</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={GlobalStyles.parteUsuario}> 
        {/* Se der tempo eu coloco o icone */}
        <Text style={GlobalStyles.textoUsuario}>Prazer! {nome}</Text>
        <Text style={GlobalStyles.textoUsuario}>{email}</Text>
        
        <TouchableOpacity style={GlobalStyles.botaoHome} onPress={() => navigation.navigate('FuncionarioLogin')}>
          <Text style={GlobalStyles.textoBotao}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
