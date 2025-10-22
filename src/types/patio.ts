import { Filial } from "./filial";

export interface Patio{
    id:string;
    totalMotos:number;
    capacidadeMoto:number;
    filial:Filial;
    localizacao:string;
}