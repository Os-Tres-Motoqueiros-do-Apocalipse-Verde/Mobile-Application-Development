import { StyleSheet } from "react-native";

export const createGlobalStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      marginBottom:50,
      paddingBottom:100,
    },

    home: {
      gap:30,
      paddingVertical:40,
      paddingHorizontal:20,
      backgroundColor: colors.background
    },

    profile: {
    backgroundColor: colors.background,
    minHeight: 700,

    },

    apresentacao: {
      marginBottom:50,
      paddingBottom:60,
      borderBottomWidth:2,
      borderBottomColor: "#099302",
      
    },

    informacao:{
      flexDirection: 'row', 
      justifyContent: "space-between", 
      paddingHorizontal:10, 
      backgroundColor: "#099302",
      height: 70,
      borderRadius: 20
    },

    MaisInfo:{
      flexDirection: 'row', 
      justifyContent: "space-between", 
      paddingHorizontal:10, 
      backgroundColor: colors.popUp,
      padding: 20,
      borderRadius: 15,
      
      // sombra iOS
      shadowColor: "#000",
      shadowOffset: {
        width: 20,
        height: 10,
      },

      shadowRadius: 4.65,

      // sombra Android
      elevation: 30,
    },

    git:{
      justifyContent: "space-between", 
      paddingHorizontal:10, 
      backgroundColor: colors.popUp,
      padding: 20,
      borderRadius: 15,
      
      // sombra iOS
      shadowColor: "#000",
      shadowOffset: {
        width: 20,
        height: 10,
      },

      shadowRadius: 4.65,

      // sombra Android
      elevation: 30,
    },


    text: {
      color: colors.text,
      fontSize: 16,
    },

    textInfo: {
      color: colors.text,
      fontSize: 16,
      textAlign:"center"
    },

    textSobre: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "bold",
    },

    textBemVindo: {
      color: colors.text,
      fontSize: 25,
      fontWeight: "bold",
      
    },


    button: {
      backgroundColor: colors.button,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },


    buttonText: {
      color: colors.buttonText,
      fontWeight: "bold",
    },

    organization: {
        flex:1,
        gap:30,
        paddingVertical:40,
    },

    form: {
        flex:1,
        alignSelf: "center",
        gap:20,
        
       },


    input: {
        flexDirection:"row",
        borderWidth:1,
        borderColor: colors.border,
        borderRadius: 10,
        height: 50,
        width:300,
    },

    inputSelecao: {
      borderWidth:1,
      borderColor: colors.border,
      borderRadius: 10,
      height: 50,
      width:300,
    },

    inputForm: {
        flex:1,
        flexDirection:"row",
        borderWidth:1,
        borderColor: colors.border,
        borderRadius: 10,
        height: 50,
        width:300,
    },

    textInput: {
        alignSelf: "center",
        width:"70%",
        color: colors.text,
    },

    cadastrar: {
        flex:1,
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
    },

    iconForm: {
        alignSelf: "center",
        padding: 10,
            
    },

    olho: {
        alignSelf: "center",
        padding: 10,   
    },

    lembre: {
        flexDirection: "row", 
        marginLeft:40,
        gap:20,
    },

    HeaderForm: {
        flexDirection: "row", 
        gap: 12, 
        marginRight: 10, 
        height:168.14,
        
    },

    language: {
        color: colors.titulo
    },

    escolhas: {
        backgroundColor:colors.titulo,
        padding:10,
    },

    escolhasProfile: {
        backgroundColor:colors.titulo,
        borderRadius:20,
        gap:20,
        padding:20,
    },


    dados: {
      flex: 1,
      gap:20,
      marginBottom:10,
      flexDirection: 'row', 
    },

    fundo: {
      flex: 1,
      paddingVertical:10,
      gap: 10,
      justifyContent: 'center', 
      alignItems: 'center',   
      paddingLeft:90,
    },

    links: {
      backgroundColor: '#3D3D3D',
      padding:5,
      gap:10,
      justifyContent:"center",
      borderRadius:15,
      flexDirection: 'row', 
    },

    profileImage: { 
      width: 150, 
      height: 150, 
      position:"absolute",
      top:40,
      left:-70,

    },

  sectionTitle: { 
    fontSize: 18, 
    marginTop: 12, 
    fontWeight: "bold" 
  },

  zoomContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },

  zoomImage: { 
    width: "90%", 
    height: "70%", 
    resizeMode: "contain" 
  },
  
  closeZoom: { 
    position: "absolute", 
    top: 40, 
    right: 20 
  },

  fotoPerfil: {
    height:260,
    paddingTop:70,
    backgroundColor: "#099302",
    alignItems: "center",
    borderBottomStartRadius:200,
    borderBottomEndRadius:200, 
    
  },

  motoPerfil: {
    height:240,
    paddingTop:30,
    backgroundColor: "#099302",
    alignItems: "center",
    borderBottomStartRadius:100,
    borderBottomEndRadius:100, 
  },

  motoStatus: {
    height:200,
    paddingTop:30,
    backgroundColor: "#099302",
    alignItems: "center",
    borderBottomStartRadius:100,
    borderBottomEndRadius:100, 
  },

  opcaoPerfil: {
    flex: 1,
    position:"relative",
    backgroundColor: colors.popUp,
    padding:10,
    borderRadius:20,
    gap:5,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  dadosProfile: {
    flex:1,
    paddingHorizontal:40,
    paddingVertical:80,
    gap:30,  
  },

  dadosPreenchidos: {
    flexDirection:"row",
    borderBottomWidth:1,
    borderColor: colors.border,
    paddingBottom:10,
    gap:20
  },

  config: {
    backgroundColor: "#099302",
    alignItems: "center",
    borderTopEndRadius:30, 
    borderTopStartRadius:30,
    gap:20,
    padding:20,
    height:"100%"
  },

  botoesConf: {
    flexDirection:"row",
    width:"99%",
    borderRadius:20,
    gap:10,
    padding:10,
    backgroundColor:"#09BC00"
  },

  botao: {
    backgroundColor: "#09BC00",
    alignSelf: 'center',
    height:40,
    width:150,
    borderRadius: 25,
    alignItems: 'center',
  },

  botaoConfig: {
    backgroundColor:"#099302", 
    width:100, 
    marginLeft:40, 
    borderTopEndRadius:20, 
    borderTopStartRadius:20
  }


});
