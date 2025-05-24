// import { StyleSheet, Text, View } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import { Button } from '@react-navigation/elements';

// export default function FuncionarioLogin() {

//   const navigation = useNavigation()

//   const MyStack = createNativeStackNavigator({
//     screens: {
//       Home: HomeScreen,
//       Profile: ProfileScreen,
//     },
//   });
  
//   return (
//     <View>
//       <Text>Página de Login do Funcionario</Text>
//       <Button 
//         onPress={()=>navigation.navigate("FuncionarioCadastro")}
//       >
//         <Text>Cadastro Funcionario</Text>
//       </Button>
//     </View>
//   );
// }

// src/telas/FuncionarioLogin.js
import { View, Text, Button } from 'react-native';

export default function FuncionarioLogin({ navigation }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login do Funcionário</Text>
      <Button title="Entrar"/>
    </View>
  );
}
