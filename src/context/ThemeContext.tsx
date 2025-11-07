import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeColors {
  background: string;
  text: string;
  button: string;
  buttonInvert: string;
  buttonText: string;
  border: string;
  titulo: string;
  popUp: string;
}

interface ThemeContextProps {
  colors: ThemeColors;
  toggleTheme: () => void;
  theme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextProps>({
  colors: {
    background: "#fff",
    text: "#000",
    button: "#099302",
    buttonInvert: "#09BC00",
    buttonText: "#fff",
    border: "#000",
    titulo: "#fff",
    popUp: "#E4E4E4FF",
  },
  toggleTheme: () => {},
  theme: "light",
});

export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<"light" | "dark">(systemScheme || "light");

  const themeColors: Record<"light" | "dark", ThemeColors> = {
    light: {
      background: "#fff",
      text: "#000",
      button: "#099302",
      buttonInvert: "#09BC00",
      buttonText: "#fff",
      border: "#000",
      titulo: "#fff",
      popUp: "#E4E4E4FF",
    },
    dark: {
      background: "#373737",
      text: "#fff",
      button: "#09BC00",
      buttonInvert: "#099302",
      buttonText: "#000",
      border: "#fff",
      titulo: "#373737",
      popUp: "#272727",
    },
  };

  // Carrega tema salvo ou usa o tema do sistema
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("@theme");
        if (storedTheme === "light" || storedTheme === "dark") {
          setTheme(storedTheme);
        } else if (systemScheme) {
          setTheme(systemScheme);
        }
      } catch (e) {
        console.log("Erro ao carregar tema:", e);
      }
    };
    loadTheme();
  }, [systemScheme]);

  const toggleTheme = async () => {
    const newTheme: "light" | "dark" = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("@theme", newTheme);
    } catch (e) {
      console.log("Erro ao salvar tema:", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, colors: themeColors[theme], theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
