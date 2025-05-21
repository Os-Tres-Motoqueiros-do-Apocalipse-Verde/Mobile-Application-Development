import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FuncLogin from "./src/telas/funcionario-login"

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Funcionario Login" component={FuncLogin} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}