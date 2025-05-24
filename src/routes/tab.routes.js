import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FuncLogin from "../telas/funcionarioLogin";
import FuncCadastro from "../telas/FuncionarioCadastro";
import Home from "../telas/Home";
import Sobre from "../telas/Sobre";
import FilialCadastro from "../telas/FilialCadastro";
import MotoCadastro from "../telas/motoCadastro";

const Tab = createBottomTabNavigator()

export default function TabRoutes({ route }) {

    const initialRouteName = route?.params?.initialRouteName || 'tabFuncLogin';

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
            <Tab.Screen name='tabFuncLogin' component={FuncLogin}
                options={{
                    tabBarIcon: () => <Feather name='home' size={20} />,
                    tabBarLabel: "Início", tabBarActiveBackgroundColor: 'green', tabBarActiveTintColor: 'white'
                }}
            />
            <Tab.Screen name='tabFuncCadastro' component={FuncCadastro}
                options={{
                    tabBarIcon: () => <Feather name='user' size={20} />,
                    tabBarLabel: "Quem Somos", tabBarActiveBackgroundColor: 'green', tabBarActiveTintColor: 'white'
                }}
            />
            <Tab.Screen name='tabHome' component={Home}
                options={{
                    tabBarIcon: () => <Feather name='edit-2' size={20} />,
                    tabBarLabel: "Adicionar Local", tabBarActiveBackgroundColor: 'green', tabBarActiveTintColor: 'white'
                }}
            />
            <Tab.Screen name='tabSobre' component={Sobre}
                options={{
                    tabBarIcon: () => <Feather name='globe' size={20} />,
                    tabBarLabel: "Sobre Reciclagem", tabBarActiveBackgroundColor: 'green', tabBarActiveTintColor: 'white'
                }}
            />
            <Tab.Screen name='tabFilialCadastro' component={FilialCadastro}
                options={{
                    tabBarIcon: () => <Feather name='globe' size={20} />,
                    tabBarLabel: "Sobre Reciclagem", tabBarActiveBackgroundColor: 'green', tabBarActiveTintColor: 'white'
                }}
            />
            <Tab.Screen name='tabMotoCadastro' component={MotoCadastro}
                options={{
                    tabBarIcon: () => <Feather name='globe' size={20} />,
                    tabBarLabel: "Sobre Reciclagem", tabBarActiveBackgroundColor: 'green', tabBarActiveTintColor: 'white'
                }}
            />

            
        </Tab.Navigator>
    )
}