import {Button, View, Text} from 'react-native';

export default function FuncionarioCadastro({navigation}) {
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página de Cadastro Funcionário</Text>
      <Button
        title="Logar"
        onPress={() => navigation.navigate('FuncionarioLogin')}
      />
      <Button
        title="Cadastrar"
      />
    </View>
  );
}