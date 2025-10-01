import { View, Text, Alert, ScrollView, TouchableOpacity, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';


export default function Home() {
    
    const [nome, setNome] = useState<string>("");
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    
    const openLink = async () => {
      const url = "https://github.com/Os-Tres-Motoqueiros-do-Apocalipse-Verde";

      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(t('titleError'), t('contextAlertLinkErro') + url);
      }
    };

    useEffect(() => {
        const fetchUsuario = async () => {
        try {
          const storedUser = await AsyncStorage.getItem("usuarioLogado");
          if (storedUser) {
            const usuario = JSON.parse(storedUser);
            setNome(usuario.nome); 
          }
        } catch (error) {
          console.log(t('alertErrorFindUser'), error);
        }
    };
        fetchUsuario();
    }, []);
  
    return (
      <ScrollView>
        <View>
            <Text>{t('welcome')} {nome}</Text>
            <Text>{t('greetings')}</Text>
        </View>
        <View>
            <TouchableOpacity onPress={() => setOpen(!open)}>
                <Text>{t('questionOTMAV')}</Text>
                <Ionicons
                    name="chevron-down-outline"
                    size={24}
                    color="green"
                />
            </TouchableOpacity>
            {open && (
                <View>
                <Text>{t('contextOTMAV')}</Text>
              </View>
            )}
        </View>
        <View>
            <Text>{t('titleGithub')}</Text>
            <View>
            <Ionicons
                name="logo-github"
                size={24}
                color="green"
            />
            <View>
              <Text>{t('contextGithub')}</Text>
              <TouchableOpacity onPress={openLink}>
                <Text>
                  OTMAV
                </Text>
              </TouchableOpacity>
            </View>
            </View>
        </View>
      </ScrollView>
    );
}
