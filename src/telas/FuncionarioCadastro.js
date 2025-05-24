import { StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function FuncionarioCadastro() {

  const navigation = useNavigation()
  
  return (
    <View>
      <Text>Página de Cadastro do Funcionario</Text>
    </View>
  );
}