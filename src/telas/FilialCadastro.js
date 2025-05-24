import {Text, View, Button} from 'react-native';

export default function FilialCadastro({navigation}) {
  return (
    <View>
      <Text>Página de Cadastro da filial</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate('tabHome')}
      />
    </View>
  );
}