// src/styles/global.js
import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  formulario: {
    flex: 1,
    padding: 60,
    gap:40,
    backgroundColor: '#373737',

  },
  texto: {
    fontSize: 24,
    color: '#fff',
  },
  caixa: {
    fontSize: 15,
    borderWidth: 1,
    borderRadius:10,
    paddingLeft: 20,
    borderColor: '#fff',
    color: 'white',
  },
  imagem: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  botao: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  icone: {
    alignSelf: 'center',
    backgroundColor: '#4E4E4E',
  },
});
