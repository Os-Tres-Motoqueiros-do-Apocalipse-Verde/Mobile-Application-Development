import { Situacao } from './situacao';
import { Ionicons } from "@expo/vector-icons";
import { Modelo } from "./modelo";
import { Setor } from "./setor";
import { Motorista } from "./motorista";

export interface Moto {
  id: string;
  placa: string;
  chassi: number;
  condicao: string;
  localizacao?:string;
  modelo: Modelo;
  setor?:Setor;
  motorista?:Motorista;
  situacao:Situacao;
}

export interface CampoForm {
  key: keyof Moto;
  label: string;      
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address";
  iconName: keyof typeof Ionicons.glyphMap; 
}
