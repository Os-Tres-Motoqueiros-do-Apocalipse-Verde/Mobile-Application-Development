import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import i18n from "../../src/services/i18n";
import { useTranslation } from "react-i18next";

export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  cargo: string;
}

export default function Profile() {
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
        console.error(t('consoleErroLoading'), error);
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
    Alert.alert(
      t('alertTitleLogout'),
      t('alertContextLogout'),
      [
        { text: t('titleCancel')},
        { text: t('textLogout'), onPress: handleLogout },
      ]
    );
  };

  const handleViewPhoto = () => setZoomVisible(true);

  const handleChangePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t('titlePermission'), t('contextPermissionPhotos'));
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
      Alert.alert(t('titlePermission'), t('contextPermissionCamera'));
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
    Alert.alert(
      t('titleRemovePhoto'),
      t('ContextRemovePhoto'),
      [
        { text: t('titleCancel'), style: "cancel" },
        { text: t('textRemovePhoto'), onPress: handleRemovePhoto },
      ]
    );
  };

  return (
    <ScrollView>
      <View>
        <Text>
          {funcionario?.nome ?? t('loading')}
        </Text>

        <View>
          <Image source={profileImage} style={styles.profileImage} />
          <View>
            <TouchableOpacity
              onPress={() => setOpen(!open)}
            >
              <View>
                <MaterialIcons name="edit" size={20} color="#000000" />
              </View>
            </TouchableOpacity>

            {open && (
              <View>
                <TouchableOpacity onPress={handleViewPhoto}>
                  <Text>{t('PhotoSee')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChangePhoto}>
                  <Text>{t('photoChange')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTakePhoto}>
                  <Text>{t('photoWithCamera')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmRemovePhoto}>
                  <Text style={{ color: "red" }}>{t('photoRemove')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <Text>{t('titleCancel')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Text>{t('titleMydata')}</Text>
      </View>

      <View>
        <View>
          <Ionicons name="mail-outline" size={20} color="black" />
          <Text>{funcionario?.email}</Text>
        </View>
        <View>
          <Ionicons name="call-outline" size={20} color="black" />
          <Text>{funcionario?.telefone}</Text>
        </View>
        <View>
          <MaterialIcons name="badge" size={20} color="black" />
          <Text>{funcionario?.cpf}</Text>
        </View>
        <View>
          <Ionicons name="person-outline" size={20} color="black" />
          <Text>{funcionario?.cargo}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => setOpenOptions(!openOptions)}>
        <Image source={require("../../assets/profile/white-logo.png")}/>
      </TouchableOpacity>
        {openOptions && (
          <View>
            {/* Botão de mudar idioma */}
            <View>
              <TouchableOpacity onPress={() => setOpenLanguage(!openLanguage)}>
                <Ionicons name="language" size={24} color="black" />
                <View>
                  <Text>{t('titleChangeLanguage')}</Text>
                  <Text>{t('contextChangeLanguage')}</Text>
                </View>
                <Ionicons name="chevron-down-outline" size={24} color="green" />
              </TouchableOpacity>
              {openLanguage && (
                <View>
                  <Text>{t('ContextLanguage')}</Text>
                  <View>
                    {langs.map((lang) => (
                      <TouchableOpacity key={lang.code} onPress={() => changeLanguage(lang.code)}>
                        <Text>{lang.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
            
            {/* Botão de editar usuário */}
            <TouchableOpacity
              onPress={() => {
                if (funcionario) {
                  router.push(`/editar-funcionario?id=${funcionario.id}`);
                } else {
                  Alert.alert(t('titleError'), t('alertUserNotFound'));
                }
              }}
            >
              <Ionicons name="pencil-outline" size={24} color="black" />
              <View>
                <Text>{t('titleUpdate')}</Text>
                <Text>{t('contextUpdateUser')}</Text>
              </View>
            </TouchableOpacity>
            
            {/* Botão de logout */}
            <TouchableOpacity onPress={confirmarLogout}>
              <Ionicons name="log-out-outline" size={24} color="black" />
              <View>
                <Text>{t('textLogout')}</Text>
                <Text>{t('contextLogout')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}


      <Modal visible={zoomVisible} transparent onRequestClose={() => setZoomVisible(false)}>
        <View style={styles.zoomContainer}>
          <Image source={profileImage} style={styles.zoomImage} />
          <TouchableOpacity
            onPress={() => setZoomVisible(false)}
          >
            <Ionicons name="close-circle" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileImage: { width: 150, height: 150, borderRadius: 75 },
  sectionTitle: { fontSize: 18, marginTop: 12, fontWeight: "bold" },
  zoomContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomImage: { width: "90%", height: "70%", resizeMode: "contain" },
  closeZoom: { position: "absolute", top: 40, right: 20 },
});