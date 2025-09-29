import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <Ionicons name="grid-outline" size={30} color="green" />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>Menu</Text>
      </View>

      <DrawerItem
        label="Home"
        icon={() => <Ionicons name="home-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("home")}
      />

      <DrawerItem
        label="About"
        icon={() => <Ionicons name="person-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("about")}
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
      <Drawer.Screen name="home" />
      <Drawer.Screen name="about" />
      <Drawer.Screen name="settingsStack" options={{ headerShown: false }} />
    </Drawer>
  );
}
