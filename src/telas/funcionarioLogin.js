import { View, Button, Text } from 'react-native';

export default function FuncionarioLogin({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página de Login do Funcionário</Text>
      <Button
        title="Entrar"
        onPress={() => navigation.navigate('MainTabs')}
      />
      <Button
        title="Cadastrar"
        onPress={() => navigation.navigate('FuncionarioCadasto')}
      />
    </View>
  );
}