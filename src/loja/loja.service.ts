import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LojaService {
    private lojas = [
        { id: 1, nome: "Estrela", cnpj: "12.345.678/0001-99" },
        { id: 2, nome: "Central", cnpj: "98.765.432/0001-55" },
        { id: 3, nome: "Cometa", cnpj: "23.456.789/0001-88" },
        { id: 4, nome: "Aurora", cnpj: "34.567.890/0001-77" },
        { id: 5, nome: "Solara", cnpj: "45.678.901/0001-66" },
        { id: 6, nome: "Lumin", cnpj: "56.789.012/0001-55" },
        { id: 7, nome: "Primor", cnpj: "67.890.123/0001-44" },
        { id: 8, nome: "Vita", cnpj: "78.901.234/0001-33" }
    ];

    public getAllLojas()
    {
        return this.lojas;
    }

    getLojaById(id:number)
    {
        if(id){
            const loja = this.lojas.find(elem => elem.id === id);
            if(!loja) throw new NotFoundException("Loja não encontrada");
            return loja;
        }
        throw new NotFoundException("ID não informado !");       
    }
}
