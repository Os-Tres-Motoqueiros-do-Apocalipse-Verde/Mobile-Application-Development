import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Stack, usePathname } from "expo-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/services/i18n";
import LanguageSelector from "../src/components/language";

export default function RootLayout() {
  const pathname = usePathname(); 

  const hideOnRoutes = ['/home', '/profile','/about','/motos']; 

  const showLanguage = !hideOnRoutes.includes(pathname);

  return (
    <I18nextProvider i18n={i18n}>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        {showLanguage && <LanguageSelector />}
      </>
    </I18nextProvider>
  );
}
