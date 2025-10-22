import { Patio } from "./patio";

export interface Setor{
    id:string;
    qtdMoto:number;
    capacidade:number;
    nome:string;
    descricao:string;
    patio:Patio;
    cor:string;
    localizacao:string;
}