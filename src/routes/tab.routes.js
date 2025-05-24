import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../telas/Home";
import Sobre from "../telas/Sobre";
import FilialCadastro from "../telas/FilialCadastro";
import MotoCadastro from "../telas/motoCadastro";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="tabHome">
      <Tab.Screen
        name="tabHome"
        component={Home}
        options={{
          tabBarIcon: () => <Feather name="edit-2" size={20} />,
          tabBarLabel: "Local",
          tabBarActiveBackgroundColor: 'green',
          tabBarActiveTintColor: 'white'
        }}
      />
      <Tab.Screen
        name="tabSobre"
        component={Sobre}
        options={{
          tabBarIcon: () => <Feather name="globe" size={20} />,
          tabBarLabel: "Sobre",
          tabBarActiveBackgroundColor: 'green',
          tabBarActiveTintColor: 'white'
        }}
      />
      <Tab.Screen
        name="tabFilialCadastro"
        component={FilialCadastro}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: () => <Feather name="globe" size={20} />,
          tabBarLabel: "Filial",
          tabBarActiveBackgroundColor: 'green',
          tabBarActiveTintColor: 'white'
        }}
      />
      <Tab.Screen
        name="tabMotoCadastro"
        component={MotoCadastro}
        options={{
        tabBarStyle: { display: 'none' }, 
        tabBarIcon: () => <Feather name="globe" size={20} />,
        tabBarLabel: "Moto",
        tabBarActiveBackgroundColor: 'green',
        tabBarActiveTintColor: 'white'
        }}
      />

    </Tab.Navigator>
  );
}
