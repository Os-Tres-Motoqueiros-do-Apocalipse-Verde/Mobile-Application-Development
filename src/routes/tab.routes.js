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
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#9F9999',
        borderTopWidth: 0,
      },
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#bbb',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
      tabBarIconStyle: {
        marginBottom: 4,
      },
     }} initialRouteName={initialRouteName}>
      <Tab.Screen
          name="tabHome"
          options={{
            tabBarLabel: "Início",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        >
          {(props) => <Home {...props} email={route.params?.email} />}
      </Tab.Screen>


      <Tab.Screen
        name="tabSobre"
        component={Sobre}
        options={{
          tabBarLabel: "Sobre",
          tabBarIcon: ({ color, size }) => (
            <Feather name="info" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="tabFilialCadastro"
        component={FilialCadastro}
        options={{
          tabBarLabel: "Filial",
          tabBarIcon: ({ color, size }) => (
            <Feather name="map-pin" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="tabMotoCadastro"
        component={MotoCadastro}
        options={{
          tabBarLabel: "Moto",
          tabBarIcon: ({ color, size }) => (
            <Feather name="truck" size={size} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}
