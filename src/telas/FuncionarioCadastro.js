import { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from '../styles/global';

export default function FuncionarioCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');

  const handleCadastrar = async () => {
    if (!nome || !email || !senha || !telefone || !cpf || !cargo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const usuarioExistente = await AsyncStorage.getItem(`@user_${email}`);

      if (usuarioExistente !== null) {
        Alert.alert('Erro', 'Usuário já cadastrado com este e-mail.');
        return;
      }

      const dadosUsuario = JSON.stringify({ nome, email, senha, telefone, cpf, cargo });
      await AsyncStorage.setItem(`@user_${email}`, dadosUsuario);

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');

      navigation.navigate('FuncionarioLogin');
    } catch (error) {
      console.log('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar.');
    }
  };

  return (
    <ScrollView style={GlobalStyles.formularioScrool}>

      <View style={GlobalStyles.icone}>
        <Image style={GlobalStyles.icones} source={require('../../assets/icons/Engineer.png')}/>       
      </View>
      
      <Text style={GlobalStyles.texto}>Cadastro de Funcionário</Text>

      <TextInput
        style={GlobalStyles.caixa}
        placeholderTextColor="#aaa"
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={GlobalStyles.caixa}
        placeholderTextColor="#aaa"
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={GlobalStyles.caixa}
        placeholderTextColor="#aaa"
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={GlobalStyles.caixa}
        placeholderTextColor="#aaa"
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={GlobalStyles.caixa}
        placeholderTextColor="#aaa"
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <TextInput
        style={GlobalStyles.caixa}
        placeholderTextColor="#aaa"
        placeholder="Cargo"
        value={cargo}
        onChangeText={setCargo}
      />

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('FuncionarioLogin')}>
          <Text style={GlobalStyles.link}>Já tenho Login</Text>
        </TouchableOpacity>
      </View>
      
      <View style={GlobalStyles.botao}>
        <TouchableOpacity onPress={handleCadastrar}>
          <Text style={GlobalStyles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}