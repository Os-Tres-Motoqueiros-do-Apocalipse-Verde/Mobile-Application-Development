import { Text, View, Button} from 'react-native';

export default function MotoCadastro({navigation}) {
  return (
    <View>
      <Text>Página de Cadastro da moto</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate('tabHome')}
      />
    </View>
  );
}