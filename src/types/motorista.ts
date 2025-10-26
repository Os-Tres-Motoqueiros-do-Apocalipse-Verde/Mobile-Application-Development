import { Dados } from "./dados";

export interface Motorista{
    id:string;
    plano:string;
    dados: Dados;
}

export interface CampoForm {
  key: keyof Motorista | keyof Dados;
  label: string;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  iconName: string;
  secure?: boolean;
}