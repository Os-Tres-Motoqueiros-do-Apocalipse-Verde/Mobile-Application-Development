import React from "react";
import { View, Text, Image, TouchableOpacity, Linking, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "..//../src/styles/globalStyles";

const pessoas = [
  {
    nome: "Erick",
    nascimento: new Date(2006, 4, 1),
    icone: require("../../assets/about/erick-icone.png"),
    foto: require("../../assets/about/erick-inteiro.png"),
    linkedin: "https://www.linkedin.com/in/erick-alves-295180235",
    github: "https://github.com/Erick0105",
    rm: "556862",
    turma: "2TDSPM",
  },
  {
    nome: "Vicenzo",
    nascimento: new Date(2004, 0, 20),
    icone: require("../../assets/about/vicenzo-icone.png"),
    foto: require("../../assets/about/vicenzo-inteiro.png"),
    linkedin: "https://www.linkedin.com/in/vicenzo-massao",
    github: "https://github.com/fFukurou",
    rm: "554833",
    turma: "2TDSPM",
  },
  {
    nome: "Luiz",
    nascimento: new Date(2005, 9, 11),
    icone: require("../../assets/about/luiz-icone.png"),
    foto: require("../../assets/about/luiz-inteiro.png"),
    linkedin: "https://www.linkedin.com/in/luiz-henrique-neri-reimberg-6ab0032b8",
    github: "https://github.com/LuizHNR",
    rm: "556864",
    turma: "2TDSPX",
  }
];


const calculateAge = (dataNascimento: Date) => {
  const hoje = new Date();
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const m = hoje.getMonth() - dataNascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }
  return idade;
};

export default function About() {
  const { colors, toggleTheme } = useTheme();
  const styles = createGlobalStyles(colors);

  const { t } = useTranslation();

  const handleLinkPress = async (url: string) => {
    await Linking.openURL(url);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={pessoas}
        keyExtractor={(p, index) => p.rm.toString() || index.toString()}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item: p }) => {
        const idade = calculateAge(p.nascimento);
      return (
        <View style={{ marginBottom: 30 }}>
          <View style={styles.dados}>
            <Image source={p.icone} />
            <View>
              <Text style={styles.textSobre}>{t('usGreetings')} {p.nome}</Text>
              <Text style={styles.textSobre}>{t('usIHave')} {idade} {t('usAges')}</Text>
            </View>
          </View>

          <View style={styles.dados}>
            <Image source={p.foto} />
            <View style={{ position: "absolute", right: 40, top: 15, gap: 20 }}>
              <View>
                <Text style={{ color: 'white', fontSize: 15, textAlign: "center" }}>{p.turma}</Text>
                <Text style={{ color: 'white', fontSize: 13, textAlign: "center" }}>RM:{p.rm}</Text>
              </View>

              <View style={{ gap: 10 }}>
                <TouchableOpacity style={styles.links} onPress={() => handleLinkPress(p.linkedin)}>
                  <Text style={{ color: 'white' }}>{t('usFollowMe')}</Text>
                  <Ionicons name="logo-linkedin" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.links} onPress={() => handleLinkPress(p.github)}>
                  <Ionicons name="logo-github" size={20} color="#fff" />
                  <Text style={{ color: 'white' }}>{t('usKnowMe')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }}
    ListEmptyComponent={
      <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
        {t('alertContextErroFindAnyBike')}
      </Text>
    }
  />
    </SafeAreaView>
  );
}