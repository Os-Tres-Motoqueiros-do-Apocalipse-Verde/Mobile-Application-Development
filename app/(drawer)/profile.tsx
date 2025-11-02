import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import i18n from "../../src/services/i18n";
import { useTranslation } from "react-i18next";
import { Funcionario } from "../../src/types/funcionario";

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

export default function Profile() {

  const { colors, toggleTheme } = useTheme();
  const styles = createGlobalStyles(colors);

  const { t } = useTranslation();
  const router = useRouter();

  const langs = [
    { code: "pt", label: "Português (BR)" },
    { code: "en", label: "Inglês (US)" },
    { code: "es", label: "Espanhol" },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpenLanguage(false);
  };

  const defaultImage = require("../../assets/profile/avatar.png");
  const [profileImage, setProfileImage] = useState<any>(defaultImage);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [open, setOpen] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("usuarioLogado");
        const savedImage = await AsyncStorage.getItem("profileImage");

        if (jsonValue) {
          const user: Funcionario = JSON.parse(jsonValue);
          setFuncionario(user);
        }

        if (savedImage) {
          setProfileImage({ uri: savedImage });
        }
      } catch (error) {
        console.error(t("consoleErroLoading"), error);
      }
    };
    loadUser();
  }, []);

  const saveImage = async (uri: string | null) => {
    if (uri) {
      await AsyncStorage.setItem("profileImage", uri);
      setProfileImage({ uri });
    } else {
      await AsyncStorage.removeItem("profileImage");
      setProfileImage(defaultImage);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("usuarioLogado");
    router.replace("/login");
  };

  const confirmarLogout = () => {
    Alert.alert(t("alertTitleLogout"), t("alertContextLogout"), [
      { text: t("titleCancel") },
      { text: t("textLogout"), onPress: handleLogout },
    ]);
  };

  const handleViewPhoto = () => setZoomVisible(true);

  const handleChangePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t("titlePermission"), t("contextPermissionPhotos"));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
    setOpen(false);
  };

  const handleTakePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(t("titlePermission"), t("contextPermissionCamera"));
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 1 });

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
    setOpen(false);
  };

  const handleRemovePhoto = () => {
    saveImage(null);
    setOpen(false);
  };

  const confirmRemovePhoto = () => {
    Alert.alert(t("titleRemovePhoto"), t("ContextRemovePhoto"), [
      { text: t("titleCancel") },
      { text: t("textRemovePhoto"), onPress: handleRemovePhoto },
    ]);
  };

  return (
    <SafeAreaView style={styles.profile}>
      <ScrollView>
        <View style={styles.fotoPerfil}>
          <Text style={{fontSize:30, color:"#fff" }} >{funcionario?.dados?.nome ?? t("loading")}</Text>

          <View >
            <Image
              source={profileImage}
              style={styles.profileImage}
              resizeMode="cover"
            />

            <View style={{position:"absolute", top:180, left:20}}>
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <MaterialIcons name="edit" size={20} color="#000" />
              </TouchableOpacity>

              {open && (
                <View style={styles.opcaoPerfil} >
                  <TouchableOpacity style={{borderBottomWidth:1}}  onPress={handleViewPhoto}>
                    <Text style={styles.text} >{t("PhotoSee")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{borderBottomWidth:1}}  onPress={handleChangePhoto}>
                    <Text style={styles.text} >{t("photoChange")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{borderBottomWidth:1}}  onPress={handleTakePhoto}>
                    <Text style={styles.text} >{t("photoWithCamera")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{borderBottomWidth:1}}  onPress={confirmRemovePhoto}>
                    <Text style={styles.text} >{t("photoRemove")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{borderBottomWidth:1}}  onPress={() => setOpen(false)}>
                    <Text style={styles.text} >{t("titleCancel")}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.dadosProfile}>
          <Text style={{ fontSize:25, fontWeight:"bold" , textAlign:"center", paddingBottom:30 }} >{t("titleMydata")}</Text>
          <View style={styles.dadosPreenchidos}>
            <Ionicons name="mail-outline" size={30} color="#099302" />
            <Text style={styles.text} >{funcionario?.dados?.email}</Text>
          </View>
          <View style={styles.dadosPreenchidos}>
            <Ionicons name="call-outline" size={30} color="#099302" />
            <Text style={styles.text} >{funcionario?.dados?.telefone}</Text>
          </View>
          <View style={styles.dadosPreenchidos}>
            <MaterialIcons name="badge" size={30} color="#099302" />
            <Text style={styles.text} >{funcionario?.dados?.cpf}</Text>
          </View>
          <View style={styles.dadosPreenchidos}>
            <Ionicons name="person-outline" size={30} color="#099302" />
            <Text style={styles.text} >{funcionario?.cargo}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.botaoConfig} onPress={() => setOpenOptions(!openOptions)}>
          <Image style={{ alignSelf: "center" }}  source={require("../../assets/profile/white-logo.png")} />
        </TouchableOpacity>

        {openOptions && (
          <View style={styles.config}>
            <View style={{paddingHorizontal:40}} >
              <TouchableOpacity style={styles.botoesConf} onPress={() => setOpenLanguage(!openLanguage)}>
                <Ionicons
                  name="language"
                  size={30}
                  color="#fff"
                  style={{ alignSelf: "center" }}
                />
                <View >
                  <Text style={{color:"#fff"}}>{t("titleChangeLanguage")}</Text>
                  <Text style={{color:"#fff"}}>{t("contextChangeLanguage")}</Text>
                </View>
                <Ionicons name="chevron-down-outline" size={40} color="#fff" />
              </TouchableOpacity>

              {openLanguage && (
                <View style={styles.escolhasProfile}>
                  <Text style={{fontWeight:"bold"}} >{t("ContextLanguage")}</Text>
                  {langs.map((lang) => (
                    <TouchableOpacity
                      style={styles.dadosPreenchidos}
                      key={lang.code}
                      onPress={() => changeLanguage(lang.code)}
                    >
                      <Text>{lang.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.botoesConf}
              onPress={() => {
                if (funcionario) {
                  router.push(`/editar-funcionario?id=${funcionario.id}`);
                } else {
                  Alert.alert(t("titleError"), t("alertUserNotFound"));
                }
              }}
            >
              <Ionicons name="pencil-outline" size={30} color="#fff" />
              <View>
                <Text style={{color:"#fff"}}>{t("titleUpdate")}</Text>
                <Text style={{color:"#fff"}}>{t("contextUpdateUser")}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botoesConf} onPress={confirmarLogout}>
              <Ionicons name="log-out-outline" size={30} color="#fff" />
              <View>
                <Text style={{color:"#fff"}}>{t("textLogout")}</Text>
                <Text style={{color:"#fff"}}>{t("contextLogout")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Modal de Zoom da Foto */}
        <Modal
          visible={zoomVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setZoomVisible(false)}
        >
          <View >
            <Image
              source={profileImage}
        
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => setZoomVisible(false)}
            >
              <Ionicons name="close-circle" size={50} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}