import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);

function CustomDrawerContent(props: any) {

  
  
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Ionicons name="grid-outline" size={30} color="green" />
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
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* No Expo Router, não precisa de component, apenas o name deve bater com o arquivo */}
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="about" options={{ title: "Sobre Nós" }} />
      <Drawer.Screen name="profile" options={{ title: "Perfil" }} />
      <Drawer.Screen name="motos" options={{ title: "Motos" }} />
    </Drawer>
  );
}
