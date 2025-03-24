import { IsString, IsInt, minLength } from "class-validator";
export class ProductDto {

    @IsString({message:"Deve ser string"})
    nome: string; 

    @IsInt({message: "Deve ser um valor inteiro"})
    preco: string;

    @IsString({message:"Deve ser uma string"})
    data_validade: string; 

    @IsInt({message: "Deve ser um valor inteiro"})
    id_loja: number; 

    @IsInt({message: "Deve ser um valor inteiro"})
    quantidade_produtos: number;


}