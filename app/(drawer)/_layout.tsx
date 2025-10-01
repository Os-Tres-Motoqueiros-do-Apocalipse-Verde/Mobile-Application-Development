import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";


const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);

function CustomDrawerContent(props: any) {

  const { colors, toggleTheme } = useTheme();
  const styles = createGlobalStyles(colors);
  
  
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Ionicons name="grid-outline" size={30} color="green" style={{alignSelf:"flex-end", paddingBottom:50}} />
        <Text>Menu</Text>
      </View>

      <DrawerItem
        label="Home"
        icon={() => <Ionicons name="home-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("home")}
      />

      <DrawerItem
        label="Sobre Nós"
        icon={() => <Ionicons name="people-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("about")}
      />

      <DrawerItem
        label="Perfil"
        icon={() => <Ionicons name="person-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("profile")}
      />

      <DrawerItem
        label="Motos"
        icon={() => <Ionicons name="bicycle-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("motos")}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {

  const { colors, toggleTheme } = useTheme();
  const styles = createGlobalStyles(colors);

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
        drawerStyle: {
          backgroundColor: "#f8f8f8",
          width: 240,
        },
            
      }}
    >
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="about" options={{ title: "Sobre Nós" }} />
      <Drawer.Screen name="profile" options={{ title: "Perfil" }} />
      <Drawer.Screen name="motos" options={{ title: "Motos" }} />
    </Drawer>
  );
}
