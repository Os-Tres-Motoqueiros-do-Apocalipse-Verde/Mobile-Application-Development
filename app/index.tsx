import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");
      if (usuarioLogado) {
        router.replace("/home"); // usuário logado → Home (Drawer)
      } else {
        router.replace("/login"); // usuário não logado → Login
      }
    };

    checkUser();
  }, []);

  return null;
}
