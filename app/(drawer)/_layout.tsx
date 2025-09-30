import React from "react";
import {createDrawerNavigator,DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";
import { View, Text } from "react-native";
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
        icon={() => <Ionicons name="person-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("about")}
      />

      <DrawerItem
        label="Perfil"
        icon={() => <Ionicons name="person-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("profile")}
      />

      <DrawerItem
        label="Configurações"
        icon={() => <Ionicons name="settings-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("settingStack")}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" />
      <Drawer.Screen name="Sobre Nós" />
      <Drawer.Screen name="Profile" />
      <Drawer.Screen name="settingsStack" options={{ headerShown: false }} />
    </Drawer>
  );
}
