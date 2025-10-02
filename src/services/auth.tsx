// app/index.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = await AsyncStorage.getItem("token"); // seu token ou flag de login
      if (token) {
        router.replace("/home"); // usuário logado → Home (Drawer)
      } else {
        router.replace("/login"); // usuário não logado → Login
      }
    };

    checkUser();
  }, []);

  return null; // não precisa renderizar nada
}
