import { Ionicons } from "@expo/vector-icons";

export interface MotoForm {
  placa: string;
  chassi: string;
  condicao: string;
  modelo: string;
  frenagem: string;
  sistemaPartida: string;
  tanque: string;
  tipoCombustivel: string;
  consumo: string;
}

export interface CampoForm {
  key: keyof MotoForm;
  label: string;      
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address";
  iconName: keyof typeof Ionicons.glyphMap; 
}
