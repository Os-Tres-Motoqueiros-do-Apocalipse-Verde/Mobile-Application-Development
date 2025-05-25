import { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, Alert } from 'react-native';

export default function FuncionarioLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    console.log('Tela de login carregada');
  }, []);

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    // Aqui você pode adicionar lógica real de login
    console.log('Email:', email);
    console.log('Senha:', senha);

    // Navegar diretamente para a tela Home dentro das tabs
    navigation.navigate('tabHome');
  };

  const handleCadastro = () => {
    navigation.navigate('Funcionario Cadastro');
  };

  return (
    <View>
      <Text>Login do Funcionário</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <View>
        <Button title="Entrar" onPress={handleLogin} />
      </View>

      <View>
        <Button title="Cadastrar" onPress={handleCadastro} />
      </View>
    </View>
  );
}