import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { withLayoutContext, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";
import ThemeToggle from "../../src/components/ThemeToggleButton";
import { useTranslation } from "react-i18next";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);

function CustomDrawerContent(props: any) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = createGlobalStyles(colors);
  const router = useRouter();

  const isLoggedIn = true; 

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header do Drawer */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 }}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons name="person-circle-outline" size={35} color={colors.text} />
        </TouchableOpacity>
        <ThemeToggle />
      </View>

      <Ionicons
        name="grid-outline"
        size={30}
        color="green"
        style={{ alignSelf: "flex-end", paddingBottom: 30, paddingRight: 15 }}
      />
      <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>Menu</Text>

      {/* Itens do Drawer */}
      <DrawerItem
        label={t("titleHome")}
        labelStyle={{ color: colors.text, fontSize: 14 }}
        icon={() => <Ionicons name="home-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("home")}
      />

      <DrawerItem
        label={t("titleAboutUs")}
        labelStyle={{ color: colors.text, fontSize: 14 }}
        icon={() => <Ionicons name="people-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("about")}
      />
      <DrawerItem
        label={t("titleBikes")}
        labelStyle={{ color: colors.text, fontSize: 14 }}
        icon={() => <Ionicons name="person-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("motos")}
      />
      <DrawerItem
        label={t("titleFilial")}
        labelStyle={{ color: colors.text, fontSize: 14 }}
        icon={() => <Ionicons name="person-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("filiais")}
      />
      <DrawerItem
        label={t("titleModels")}
        labelStyle={{ color: colors.text, fontSize: 14 }}
        icon={() => <Ionicons name="person-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("modelos")}
      />
      <DrawerItem
        label={t("titleBikers")}
        labelStyle={{ color: colors.text, fontSize: 14 }}
        icon={() => <Ionicons name="id-card-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("motoristas")}
      />
      <DrawerItem
        label={t("titleSituations")}
        labelStyle={{ color: colors.text, fontSize: 14 }}
        icon={() => <Ionicons name="id-card-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("situacoes")}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {

  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: t("titleHome"),
          headerStyle: { backgroundColor: "#099302" },
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: t("titleAboutUs"),
          headerStyle: { backgroundColor: "#099302" },
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: t("titleProfile"),
          headerStyle: { backgroundColor: "#099302" },
        }}
      />
      <Drawer.Screen
        name="motos"
        options={{
          title: t("titleBikes"),
          headerStyle: { backgroundColor: "#099302" },
        }}
      />
      <Drawer.Screen
        name="filiais"
        options={{
          title: t("titleFiliais"),
          headerStyle: { backgroundColor: "#099302" },
        }}
      />
      <Drawer.Screen
        name="modelos"
        options={{
          title: t("titleModels"),
          headerStyle: { backgroundColor: "#099302" },
        }}
      />
      <Drawer.Screen
        name="motoristas"
        options={{
          title: t("titleBikers"),
          headerStyle: { backgroundColor: "#099302" },
        }}
      />
      <Drawer.Screen
        name="situacoes"
        options={{
          title: t("titleSituations"),
          headerStyle: { backgroundColor: "#099302" },
        }}
      />
    </Drawer>
  );
}
