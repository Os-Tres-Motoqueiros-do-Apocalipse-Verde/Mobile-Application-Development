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
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [open, setOpen] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);

  useEffect(() => {
    const carregarUsuario = async () => {
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
        console.error("Erro ao carregar usuário:", error);
      }
    };
    carregarUsuario();
  }, []);

  const salvarImagem = async (uri: string | null) => {
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
      "Sair da conta",
      "Tem certeza que deseja deslogar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deslogar", onPress: handleLogout },
      ]
    );
  };

  const handleViewPhoto = () => setZoomVisible(true);

  const handleChangePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Habilite o acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      salvarImagem(result.assets[0].uri);
    }
    setOpen(false);
  };

  const handleTakePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Habilite a câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 1 });

    if (!result.canceled) {
      salvarImagem(result.assets[0].uri);
    }
    setOpen(false);
  };

  const handleRemovePhoto = () => {
    salvarImagem(null);
    setOpen(false);
  };

  const confirmarRemoverFoto = () => {
    Alert.alert(
      "Confirmar remoção",
      "Tem certeza que deseja remover sua foto de perfil?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: handleRemovePhoto },
      ]
    );
  };

  return (
    <ScrollView>
      <View>
        <Text>
          {funcionario?.nome ?? "Carregando..."}
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
                  <Text>Ver Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChangePhoto}>
                  <Text>Mudar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTakePhoto}>
                  <Text>Tirar com Câmera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmarRemoverFoto}>
                  <Text style={{ color: "red" }}>Remover Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Text>Meus Dados</Text>
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

      <View>
        <View>
          <TouchableOpacity
            onPress={() => setOpenLanguage(!openLanguage)}
          >
            <Ionicons name="language" size={24} color="black" />
            <Text>Mudar Idioma</Text>
            <Text>Fazendo isso você pode mudar o idioma do aplicativo</Text>
          </TouchableOpacity>
          {openLanguage && (
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
        <TouchableOpacity onPress={handleRemovePhoto}>
          <Ionicons name="trash-outline" size={24} color="black" />
          <Text>Atualizar</Text>
          <Text>Você ira ser direcionado para a atualização dos seus dados</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmarLogout}>
          <Ionicons name="log-out-outline" size={24} color="black" />
          <Text>Deslogar</Text>
          <Text>Fazendo isso você irá retornar para a página de login</Text>
        </TouchableOpacity>
      </View>

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
