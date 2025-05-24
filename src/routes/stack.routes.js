import { createStackNavigator } from "@react-navigation/stack";

import FuncLogin from '../telas/funcionario-login';
import FuncCadastro from "../telas/FuncionarioCadastro";
import Home from "../telas/Home";
import Sobre from "../telas/Sobre";
import FilialCadastro from "../telas/FilialCadastro";
import MotoCadastro from "../telas/moto-cadastro";

const Stack = createStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Funcionario Login" component={FuncLogin}/>
      <Stack.Screen name="Funcionario Cadastro" component={FuncCadastro}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="SobreNos" component={Sobre}/>
      <Stack.Screen name="Filial Cadastro" component={FilialCadastro}/>
      <Stack.Screen name="Moto Cadastro" component={MotoCadastro}/>
    </Stack.Navigator>
  );
}
