import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';


export default function Home() {
    
    const router = useRouter();
    const [nome, setNome] = useState<string>("");
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    
  

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

    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem("usuarioLogado");
        router.replace("/");
      } catch (error) {
        console.log(t('alertErrorLogout'), error);
      }
    };
  
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
            <Text>{t('contextGithub')}</Text>
            </View>
        </View>
        {/* <Button title="Deslogar" onPress={handleLogout} /> */}
      </ScrollView>
    );
}
