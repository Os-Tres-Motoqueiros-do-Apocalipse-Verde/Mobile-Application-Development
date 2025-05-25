import { Text, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';

export default function Sobre({navigation}) {
  return (
    <ScrollView style={GlobalStyles.principal}>
      <View>
        <Text>Quem Somos?</Text>
      </View>
      <View>
        <View>
          <Image source={require('../../assets/sobre/erick/icone.png')}/>
          <Text>Olá, eu sou o Erick</Text>
          <Text>Tenho 19 anos</Text>
        </View>
        <View> {/*Coloca a imagem como Background Luiz */}
          <Text>2TDSPM</Text>
          <Text>RM: 556862</Text>
          <View>
            <TouchableOpacity onPress={() => Linking.openURL('www.linkedin.com/in/erick-alves-295180235')}>
              <Image source={require('../../assets/sobre/Linkedin.png')}/>
              <Text>Siga-me</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Erick0105')}>
              <Image source={require('../../assets/sobre/GitHub.png')}/>
              <Text>Conheça-me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View>
          <Image source={require('../../assets/sobre/vicenzo/icone.png')}/>
          <Text>Olá, eu sou o Vicenzo</Text>
          <Text>Tenho 21 anos</Text>
        </View>
        <View> {/*Coloca a imagem como Background Luiz */}
          <Text>2TDSPM</Text>
          <Text>RM: 554833</Text>
          <View>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/vicenzo-massao/')}>
              <Image source={require('../../assets/sobre/Linkedin.png')}/>
              <Text>Siga-me</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/fFukurou')}>
              <Image source={require('../../assets/sobre/GitHub.png')}/>
              <Text>Conheça-me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View>
          <Image source={require('../../assets/sobre/luiz/icone.png')}/>
          <Text>Olá, eu sou o Luiz</Text>
          <Text>Tenho 19 anos</Text>
        </View>
        <View> {/*Coloca a imagem como Background Luiz */}
          <Text>2TDSPM</Text>
          <Text>RM: 556864</Text>
          <View>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/luiz-henrique-neri-reimberg-6ab0032b8/')}>
              <Image source={require('../../assets/sobre/Linkedin.png')}/>
              <Text>Siga-me</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/LuizHNR')}>
              <Image source={require('../../assets/sobre/GitHub.png')}/>
              <Text>Conheça-me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}