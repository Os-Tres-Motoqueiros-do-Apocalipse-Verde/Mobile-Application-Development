import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import i18n from "../services/i18n";
import{useTranslation} from 'react-i18next'

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../styles/globalStyles";


export default function LanguageSelector() {
  const [open, setOpen] = useState(false);

  const { colors, toggleTheme } = useTheme();
  const styles = createGlobalStyles(colors);

  const{t}=useTranslation()

  const langs = [
    { code: "pt", label: "Português (BR)" },
    { code: "en", label: "Inglês (US)" },
    { code: "es", label: "Espanhol" },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <View >
      <TouchableOpacity onPress={() => setOpen(!open)} style={{flexDirection:"row", paddingTop:20}}  >
        <Ionicons
            name="language"
            size={24}
            style={styles.language} 
        />
        <Text style={styles.language} >{t('LanguageTitle')}</Text>
        <Ionicons
            name="chevron-down-outline"
            size={24}
            style={styles.language} 
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.escolhas}>
          {langs.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => changeLanguage(lang.code)}
            >
              <Text>{lang.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}