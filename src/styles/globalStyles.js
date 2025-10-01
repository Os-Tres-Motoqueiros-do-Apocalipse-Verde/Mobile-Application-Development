import { StyleSheet } from "react-native";

export const createGlobalStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      marginBottom:50,
      paddingBottom:100,
    },

    home: {
      flex:1,
      gap:30,
      paddingVertical:40,
      paddingHorizontal:20,
      backgroundColor: colors.background
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
        gap:5,
        
       },


    input: {
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
  });
