import { createStackNavigator } from "@react-navigation/stack";

import FuncLogin from '../telas/funcionarioLogin';
import FuncCadastro from "../telas/FuncionarioCadastro";
import StackInicial from './tab.routes'; 

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FuncionarioLogin" component={FuncLogin} />
      <Stack.Screen name="FuncionarioCadasto" component={FuncCadastro} />
      <Stack.Screen name="MainTabs" component={StackInicial} />
    </Stack.Navigator>
  );
}
