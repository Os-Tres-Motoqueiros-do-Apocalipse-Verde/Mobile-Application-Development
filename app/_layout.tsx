import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Stack, usePathname } from "expo-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/services/i18n";
import LanguageSelector from "../src/components/language";
import { ThemeProvider } from '../src/context/ThemeContext';
import {View, TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ThemeToggle from '../src/components/ThemeToggleButton';

export default function RootLayout() {
  const pathname = usePathname(); 
  const router = useRouter();
  

  const hideLanguageOnRoutes = ['/home', '/profile','/about','/motos','/moto']; 
  const showLanguage = !hideLanguageOnRoutes.includes(pathname);
  const hideProfileOnRoutes = ['/cadastro-moto', '/editar-funcionario','/editar-moto','/cadastro','/login']; 
  const showProfile = !hideProfileOnRoutes.includes(pathname);
  const hideThemeOnRoutes = ['/cadastro-moto', '/editar-funcionario','/editar-moto','/cadastro','/login']; 
  const showTheme = !hideThemeOnRoutes.includes(pathname);


  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
        {showLanguage && <LanguageSelector />}
        <View>
          {showProfile && 
            <TouchableOpacity onPress={() => {router.push('/profile')}}>
              <Ionicons name="person-circle-outline" size={24} color="green" />
            </TouchableOpacity>
          }
          {showTheme && <ThemeToggle/>}
        </View>
      </ThemeProvider>
    </I18nextProvider>
  );
}
