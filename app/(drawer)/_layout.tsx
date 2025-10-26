import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";
import ThemeToggle from "../../src/components/ThemeToggleButton";
import { useTranslation } from "react-i18next";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);
const router = useRouter();

function CustomDrawerContent(props: any) {

  const { t } = useTranslation();
  const { colors, toggleTheme } = useTheme();
  const styles = createGlobalStyles(colors);
  
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View>
          <View>
            <TouchableOpacity  onPress={() => {router.push('/profile')}}>
              <Ionicons name="person-circle-outline" size={35} color="#000000" />
            </TouchableOpacity>
            <ThemeToggle/>
          </View>
          <Ionicons name="grid-outline" size={30} color="green" style={{alignSelf:"flex-end", paddingBottom:50, paddingRight:15}} />
        </View>
        <Text style={styles.text} >Menu</Text>
      </View>

      <DrawerItem
        label={t("pageTitleHome")}
        labelStyle={{ color: colors.text, fontSize: 14 }}
        icon={() => <Ionicons name="home-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("home")}
      />

      <DrawerItem
        label={t("pageTitleAboutUs")}
        labelStyle={{ color: colors.text, fontSize: 14 }}
        icon={() => <Ionicons name="people-outline" size={24} color="green" />}
        onPress={() => props.navigation.navigate("about")}
      />

      <DrawerItem
        label={t("pageTitleBikes")}
        labelStyle={{ color: colors.text, fontSize: 14 }}
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
          backgroundColor: colors.background,
          zIndex:1,
          width: 280,
        },
                
      }}
    >

      <Drawer.Screen name="home" options={{ 
        title: "Home", 
        headerStyle: {
          backgroundColor: "#099302", 
        },
      }} />
      <Drawer.Screen name="about" options={{ 
        title: "Sobre Nós", 
        headerStyle: {
          backgroundColor: "#099302", 
        }, 
        
      }} />
      <Drawer.Screen name="profile" options={{ 
        title: "Perfil", 
        headerStyle: {
          backgroundColor: "#099302", 
        }, 
      }} />
      <Drawer.Screen name="motos" options={{ title: "Motos", 
        headerStyle: {
          backgroundColor: "#099302", 
        },
       }} />
    </Drawer>
  );
}
