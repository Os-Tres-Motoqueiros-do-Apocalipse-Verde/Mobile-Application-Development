import {View, Button } from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Button
        title="Sair"
        onPress={() => navigation.navigate('FuncionarioLogin')}
      />
    </View>
  );
}