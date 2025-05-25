import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from '../styles/global';

export default function FuncionarioLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha email e senha');
      return;
    }

    try {
      const usuarioJson = await AsyncStorage.getItem(`@user_${email}`);

      if (!usuarioJson) {
        Alert.alert('Erro', 'Usuário não encontrado');
        return;
      }

      const usuario = JSON.parse(usuarioJson);

      if (usuario.senha !== senha) {
        Alert.alert('Erro', 'Senha incorreta');
        return;
      }

      Alert.alert('Sucesso', `Bem-vindo, ${usuario.nome}!`);

      navigation.navigate('MainTabs' , { email: usuario.email }); 

    } catch (error) {
      console.log('Erro no login:', error);
      Alert.alert('Erro', 'Não foi possível fazer login.');
    }
  };

  return (
    <View style={GlobalStyles.formulario}>

      
      <Image style={GlobalStyles.icone} source={require('../../assets/icons/Engineer.png')}/>

      <Text style={GlobalStyles.texto}>Login do Funcionário</Text>

      <TextInput
        style={GlobalStyles.caixa}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
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

      <View style={GlobalStyles.botao}>
        <Button title="Entrar" onPress={handleLogin} />
      </View>

      <View style={GlobalStyles.botao}>
        <Button
          title="Não tenho Cadastro"
          onPress={() => navigation.navigate('FuncionarioCadasto')}
        />
      </View>
    </View>
  );
}
