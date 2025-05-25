import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  formulario: {
    flex:1,
    padding: 60,
    paddingVertical: 60,
    gap:20,
    backgroundColor: '#373737',

  },
  formularioScrool: {
    padding: 60,
    paddingVertical: 60,
    gap:20,
    backgroundColor: '#373737',

  },
  home: {
    flexGrow: 1,
    paddingHorizontal: 40,
    paddingVertical: 60,
    gap:20,
    backgroundColor: '#373737',

  },

  sobre: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingVertical: 60,
    gap:20,
    backgroundColor: '#373737',

  },
  texto: {
    fontSize: 24,
    color: '#fff',
  },
  textoBotao: {
    fontSize: 15,
    color: '#fff',
  },
  textoHome: {
    fontSize: 34,
    textAlign: 'center',
    color: '#09BC00',
  },
  textoGit: {
    fontSize: 15,
    width:200,
    paddingVertical:20,
    color: '#fff',
  },
  textoConteudo: {
    fontSize: 20,
    color: '#fff',
  },
  textoUsuario: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  link: {
    fontSize: 12,
    textAlign: 'right',
    color: '#09BC00',
  },
  linkGit: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: '#09BC00',
  },
  caixa: {
    fontSize: 15,
    marginTop: 26,
    borderWidth: 1,
    borderRadius:10,
    paddingLeft: 20,
    borderColor: '#B9B9B9',
    color: 'white',
  },
  linhaMoto: {
    flex:1,
    position: 'relative',
    zIndex: 2, 
    top:45,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    gap: 5,
  },
  git: {
    fle:1,
    width:320,
    marginTop:10,
    paddingVertical:20,
    backgroundColor: '#8D8D8DFF',
    borderRadius:20,
    padding:20,
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    gap: 5,
  },
  ponto: {
    marginTop: 60,
    backgroundColor: '#09BC00',
    height:10,
    width:10,
  },
  imagem: {
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
  },
  muitoTexto: {
    paddingVertical: 50,
    paddingHorizontal:30,
    borderRadius:10,
    opacity:90,
    backgroundColor: '#858585FF',
  },
  parteUsuario: {
    flex: 1,
    gap: 30,
    marginTop: 90,
    paddingVertical: 50,
    paddingHorizontal:30,
    borderRadius:10,
    opacity:90,
    backgroundColor: '#858585FF',
  },
  botao: {
    padding: 12,
    backgroundColor: "#09BC00",
    alignSelf: 'center',
    width:150,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 160,
  },
  
  botaoHome: {
    padding: 12,
    backgroundColor: "#09BC00",
    alignSelf: 'center',
    width:150,
    borderRadius: 25,
    alignItems: 'center',
  },
  icone: {
    alignSelf: 'center',
    width:120,
    height:100,
    backgroundColor: '#4E4E4E',
    borderRadius: 30,
    justifyContent:'center',
  },
  icones: {
    alignSelf: 'center',
  },
  fundo: {
    flex: 1,
    paddingVertical:10,
    gap: 10,
    justifyContent: 'center', 
    alignItems: 'center',   
    paddingLeft:90,
  },
  dados: {
    flex: 1,
    gap:20,
    marginBottom:10,
    flexDirection: 'row', 
  },

  links: {
    backgroundColor: '#3D3D3D',
    padding:3,
    borderRadius:10,
    flexDirection: 'row', 
  },
});