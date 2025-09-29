import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();

  return (
    <View>
      <Text>Página de Configurações</Text>
      <Button title="Ir para outra página" onPress={() => router.push("/settingStack/otherPage")} />
    </View>
  );
}
