import { Stack, usePathname, useRouter } from "expo-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/services/i18n"; 
import { ThemeProvider } from "../../src/context/ThemeContext";
import LanguageSelector from "../../src/components/language";
import { View } from "react-native";

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function AuthLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const { colors, toggleTheme } = useTheme();
  const styles = createGlobalStyles(colors);
  
  const hideLanguageOnRoutes = ['/auth/cadastro']; 
  const showLanguage = !hideLanguageOnRoutes.includes(pathname);

  const hideThemeOnRoutes = ['/auth/cadastro']; 
  const showTheme = !hideThemeOnRoutes.includes(pathname);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#0BA70F",  },
            headerTintColor: colors.titulo,
            headerTitleStyle: { fontWeight: "bold", fontSize:30 },
            headerTitleAlign: "center",
            
            headerRight: () => (
              <View style={styles.HeaderForm} >
                {showLanguage && <LanguageSelector />}

              </View>
            )
          }}
        >
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="cadastro" options={{ title: "Cadastro" }} />
        </Stack>
      </ThemeProvider>
    </I18nextProvider>
  );
}
