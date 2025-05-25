import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../telas/home";
import Sobre from "../telas/Sobre";
import FilialCadastro from "../telas/FilialCadastro";
import MotoCadastro from "../telas/motoCadastro";

const Tab = createBottomTabNavigator();

export default function TabRoutes({ route }) {
  const initialRouteName = route?.params?.initialRouteName || 'tabHome';

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Tab.Screen
        name="tabHome"
        options={{
        tabBarIcon: () => <Feather name='home' size={20} />,
        tabBarLabel: "Início",
        tabBarActiveBackgroundColor: 'green',
        tabBarActiveTintColor: 'white'
        }}
      >
        {(props) => <Home {...props} email={route.params?.email} />}
      </Tab.Screen>

      <Tab.Screen
        name="tabSobre"
        component={Sobre}
        options={{
          tabBarIcon: () => <Feather name='info' size={20} />,
          tabBarLabel: "Sobre",
          tabBarActiveBackgroundColor: 'green',
          tabBarActiveTintColor: 'white'
        }}
      />
      <Tab.Screen
        name="tabFilialCadastro"
        component={FilialCadastro}
        options={{
          tabBarIcon: () => <Feather name='map-pin' size={20} />,
          tabBarLabel: "Filial",
          tabBarActiveBackgroundColor: 'green',
          tabBarActiveTintColor: 'white'
        }}
      />
      <Tab.Screen
        name="tabMotoCadastro"
        component={MotoCadastro}
        options={{
          tabBarIcon: () => <Feather name='truck' size={20} />,
          tabBarLabel: "Moto",
          tabBarActiveBackgroundColor: 'green',
          tabBarActiveTintColor: 'white'
        }}
      />
    </Tab.Navigator>
  );
}
