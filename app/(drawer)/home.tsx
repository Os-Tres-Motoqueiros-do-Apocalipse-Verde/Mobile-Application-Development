import { View, Text, Alert, ScrollView, TouchableOpacity, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";



export default function Home() {

    const { colors, toggleTheme } = useTheme();
    const styles = createGlobalStyles(colors);
    
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
      <ScrollView contentContainerStyle={styles.home}>

            <View style={styles.apresentacao}>
              <Text style={styles.textBemVindo} >{t('welcome')} {nome}</Text>
              <Text style={styles.text} >{t('greetings')}</Text>
            </View>


            <View style={styles.apresentacao}>
              <TouchableOpacity onPress={() => setOpen(!open)} style={styles.informacao} >
                  <Text style={{color:"#fff", fontSize:20, alignSelf:"center"}}>{t('questionOTMAV')}</Text>
                  <Ionicons
                      name="chevron-down-outline"
                      size={24}
                      color="#fff"
                      style={styles.olho}
                  />
              </TouchableOpacity>
              {open && (
                  <View style={styles.MaisInfo} >
                    <Text style={styles.textInfo}>{t('contextOTMAV')}</Text>
                </View>
              )}
          </View>


          <View style={{gap:20}} >

              <Text style={styles.textBemVindo} >{t('titleGithub')}</Text>

              <View style={styles.git} >
                <View style={{flexDirection:"row", width:"70%"}}>
                    <Ionicons
                        name="logo-github"
                        size={70}
                        color="green"
                    />
                  
                    <Text style={styles.textInfo}>{t('contextGithub')}</Text>

                </View>

                <View>
                    
                  <TouchableOpacity onPress={openLink}>
                    <Text style={{color:"#099302", fontSize: 20, alignSelf:"center"}} >
                      OTMAV
                    </Text>
                  </TouchableOpacity>

                </View>
            </View>


          </View>
        
      </ScrollView>
    );
}
