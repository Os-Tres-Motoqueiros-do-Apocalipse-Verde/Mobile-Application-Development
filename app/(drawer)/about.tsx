import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

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
    nascimento: new Date(2004, 2, 10),
    icone: require("../../assets/about/vicenzo-icone.png"),
    foto: require("../../assets/about/vicenzo-inteiro.png"),
    linkedin: "https://www.linkedin.com/in/vicenzo-massao",
    github: "https://github.com/fFukurou",
    rm: "554833",
    turma: "2TDSPM",
  },
  {
    nome: "Luiz",
    nascimento: new Date(2005, 2, 10),
    icone: require("../../assets/about/luiz-icone.png"),
    foto: require("../../assets/about/luiz-inteiro.png"),
    linkedin: "https://www.linkedin.com/in/luiz-henrique-neri-reimberg-6ab0032b8",
    github: "https://github.com/LuizHNR",
    rm: "556864",
    turma: "2TDSPX",
  }
];

const calcularIdade = (dataNascimento: Date) => {
  const hoje = new Date();
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const m = hoje.getMonth() - dataNascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }
  return idade;
};

export default function About() {
  const { t } = useTranslation();

  const handleLinkPress = async (url: string) => {
    await Linking.openURL(url);
  };

  return (
    <ScrollView>
      {pessoas.map((p, index) => {
        const idade = calcularIdade(p.nascimento);
        return (
          <View key={index}>
            <View>
              <Image source={p.icone}/>
              <View>
                <Text>{t('usGreetings')} {p.nome}</Text>
                <Text>{t('usIHave')} {idade} {t('usAges')}</Text>
              </View>
            </View>

            <View>
              <View>
                <Text>{p.turma}</Text>
                <Text>RM:{p.rm}</Text>
              </View>

              <Image source={p.foto}/>

              <View>
                <TouchableOpacity onPress={() => handleLinkPress(p.linkedin)}>
                  <Text>{t('usFollowMe')}</Text>
                  <Ionicons name="logo-linkedin" size={20} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleLinkPress(p.github)}>
                  <Ionicons name="logo-github" size={20} color="black" />
                  <Text>{t('usKnowMe')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      })}
    </ScrollView>
  );
}