import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/services/i18n";
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Stack screenOptions={{ 
          headerShown: false,
        }}/>
      </ThemeProvider>
    </I18nextProvider>
  );
}
