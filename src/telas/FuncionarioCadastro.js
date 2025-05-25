import { useState } from 'react';
import { Button, View, Text, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <ScrollView>

      {/* Se der eu coloco imagem */}
      
      <Text>Cadastro de Funcionário</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

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

      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Cargo"
        value={cargo}
        onChangeText={setCargo}
      />

      <View>
        <Button
          title="Já tenho login"
          onPress={() => navigation.navigate('FuncionarioLogin')}
        />
      </View>
      
      <View>
        <Button title="Cadastrar" onPress={handleCadastrar} />
      </View>
    </ScrollView>
  );
}