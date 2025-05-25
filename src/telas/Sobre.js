import { Text, View, ScrollView, Image, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { GlobalStyles } from '../styles/global';

export default function Sobre({navigation}) {
  return (
    <ScrollView contentContainerStyle={GlobalStyles.sobre}>
      <View>
        <Text style={GlobalStyles.textoHome}>Quem Somos?</Text>
      </View>
      <View>
        <View style={GlobalStyles.dados}>
          <Image source={require('../../assets/sobre/erick/icone.png')}/>
          <View>
            <Text style={{ color:'white' }}>Olá, eu sou o Erick</Text>
            <Text style={{ color:'white' }}>Tenho 19 anos</Text>
          </View>         
        </View>
        <ImageBackground
          source={require('../../assets/sobre/erick/erick.png')}
          style={GlobalStyles.fundo}
          resizeMode="cover"> 
          <Text style={{ color:'white' }}>2TDSPM</Text>
          <Text style={{ color:'white' }}>RM: 556862</Text>
          <View >
            <TouchableOpacity style={GlobalStyles.links} onPress={() => Linking.openURL('www.linkedin.com/in/erick-alves-295180235')}>
              <Text style={{ color:'white' }}>Siga-me</Text>
              <Image source={require('../../assets/sobre/Linkedin.png')}/>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={GlobalStyles.links} onPress={() => Linking.openURL('https://github.com/Erick0105')}>
              <Image source={require('../../assets/sobre/GitHub.png')}/>
              <Text style={{ color:'white' }}>Conheça-me</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View>
        <View style={GlobalStyles.dados}>
          <Image source={require('../../assets/sobre/vicenzo/icone.png')}/>
          <View>
            <Text style={{ color:'white' }}>Olá, eu sou o Vicenzo</Text>
            <Text style={{ color:'white' }}>Tenho 21 anos</Text>
          </View>      
        </View>
        <ImageBackground 
          source={require('../../assets/sobre/vicenzo/Vicenzo.png')}
          style={GlobalStyles.fundo}
          resizeMode="cover">
          <Text style={{ color:'white' }}>2TDSPM</Text>
          <Text style={{ color:'white' }}>RM: 554833</Text>
          <View>
            <TouchableOpacity style={GlobalStyles.links} onPress={() => Linking.openURL('https://www.linkedin.com/in/vicenzo-massao/')}>
              <Text style={{ color:'white' }}>Siga-me</Text>
              <Image source={require('../../assets/sobre/Linkedin.png')}/>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={GlobalStyles.links} onPress={() => Linking.openURL('https://github.com/fFukurou')}>
              <Image source={require('../../assets/sobre/GitHub.png')}/>
              <Text style={{ color:'white' }}>Conheça-me</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View>
        <View style={GlobalStyles.dados}>
          <Image source={require('../../assets/sobre/luiz/icone.png')}/>
          <View>
            <Text style={{ color:'white' }}>Olá, eu sou o Luiz</Text>
            <Text style={{ color:'white' }}>Tenho 19 anos</Text>
          </View>
          
        </View>
        <ImageBackground
          source={require('../../assets/sobre/luiz/luiz.png')}
          style={GlobalStyles.fundo}
          resizeMode="cover">
          <Text style={{ color:'white' }}>2TDSPM</Text>
          <Text style={{ color:'white' }}>RM: 556864</Text>
          <View>
            <TouchableOpacity style={GlobalStyles.links} onPress={() => Linking.openURL('https://www.linkedin.com/in/luiz-henrique-neri-reimberg-6ab0032b8/')}>
              <Text style={{ color:'white'}}>Siga-me</Text>
              <Image source={require('../../assets/sobre/Linkedin.png')}/>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={GlobalStyles.links} onPress={() => Linking.openURL('https://github.com/LuizHNR')}>
              <Image source={require('../../assets/sobre/GitHub.png')}/>
              <Text style={{ color:'white' }}>Conheça-me</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}