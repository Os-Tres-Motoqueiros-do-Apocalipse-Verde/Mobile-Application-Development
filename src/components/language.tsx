import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import i18n from "../services/i18n";
import{useTranslation} from 'react-i18next'

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);

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
    <View>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Ionicons
            name="language"
            size={24}
            color="green"
        />
        <Text>{t('LanguageTitle')}</Text>
        <Ionicons
            name="chevron-down-outline"
            size={24}
            color="green"
        />
      </TouchableOpacity>

      {open && (
        <View>
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