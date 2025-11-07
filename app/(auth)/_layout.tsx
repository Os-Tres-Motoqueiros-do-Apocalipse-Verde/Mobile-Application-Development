import { Stack, usePathname, useRouter } from "expo-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/services/i18n"; 
import { ThemeProvider } from "../../src/context/ThemeContext";
import LanguageSelector from "../../src/components/language";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function AuthLayout() {
  const { t } = useTranslation();
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
            headerStyle: { backgroundColor: colors.button,  },
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
          <Stack.Screen name="login" options={{ title: t("titleLogin") }} />
          <Stack.Screen name="cadastro" options={{ title: t("titleRegister") }} />
        </Stack>
      </ThemeProvider>
    </I18nextProvider>
  );
}
