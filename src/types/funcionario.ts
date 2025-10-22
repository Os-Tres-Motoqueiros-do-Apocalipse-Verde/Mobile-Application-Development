import { Dados } from './dados';
export interface Funcionario{
    nome: string;
    id: number;
    cargo:string;
    dados: Dados;
}