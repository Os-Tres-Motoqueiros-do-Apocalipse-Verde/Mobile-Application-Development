import { StyleSheet } from "react-native";

export const createGlobalStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },


    text: {
      color: colors.text,
      fontSize: 16,
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
        gap:50,
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
  });
