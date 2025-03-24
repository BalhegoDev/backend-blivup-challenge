import { Injectable, NotFoundException } from '@nestjs/common';
import { LojaService } from 'src/loja/loja.service';
import { ProductInterface } from 'src/interfaces/Product.interface';
import { ProductDto } from 'src/dto/product.pdo';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ProductService {

    private produtos:ProductInterface[] = [];

    constructor(private readonly lojaService: LojaService) {
        this.gerarProdutos();
    }

    private nomesProdutos = [
        "Arroz Integral", "Feijão Preto", "Óleo de Soja", "Açúcar Cristal", "Café Solúvel",
        "Macarrão Instantâneo", "Molho de Tomate", "Suco de Laranja", "Leite Condensado", 
        "Queijo Mussarela", "Presunto", "Pão de Forma", "Manteiga", "Chocolate ao Leite", 
        "Salgadinho", "Refrigerante", "Detergente", "Sabão em Pó", "Shampoo", "Condicionador", 
        "Creme Dental", "Papel Higiênico", "Fralda Descartável", "Sabonete", "Desodorante", 
        "Escova de Dente", "Alface", "Tomate", "Cebola", "Batata", "Cenoura", "Pepino", 
        "Maçã", "Laranja", "Banana", "Morango", "Uva", "Melancia", "Abacaxi", "Mamão", 
        "Pêssego", "Manga", "Azeitona", "Milho Verde", "Alho", "Couve", "Rúcula", "Brócolis", 
        "Espinafre", "Feijão Branco", "Arroz Parboilizado", "Azeite de Oliva", "Vinho Tinto", 
        "Cerveja", "Whisky", "Gin", "Vodka", "Rum", "Tequila", "Salmão", "Tilápia", "Atum", 
        "Camarão", "Lula", "Sardinha", "Frango Inteiro", "Carne Bovina", "Carne Suína", 
        "Linguiça", "Presunto Defumado", "Peito de Frango", "Bacon", "Peixe", "Lombo de Porco", 
        "Alcatra", "Maminha", "Contrafilé", "Picanha", "Fraldinha", "Peito de Peru", "Salsicha", 
        "Pão de Alho", "Pizza", "Hambúrguer", "Churrasco", "Lasanha", "Macarrão à Bolonhesa", 
        "Torta de Frango"
    ];
    
    private gerarProdutos() {
        const lojas = this.lojaService.getAllLojas();
        if (!lojas.length) {
            throw new Error("Nenhuma loja cadastrada!");
        }

        this.produtos = Array.from({ length: 80 }, (_, index) => {
            const nomeProduto = this.nomesProdutos[Math.floor(Math.random() * this.nomesProdutos.length)];
            const loja = lojas[Math.floor(Math.random() * lojas.length)];
            return {
                id: index + 1,
                nome: nomeProduto,
                preco: (Math.random() * 100).toFixed(2),
                data_validade: `202${Math.floor(Math.random() * 5) + 1}-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`,
                id_loja: loja?.id,
                quantidade_produtos: Math.floor(Math.random() * 100) + 1
            };
        });
    }

    getAllLojaProducts(lojaId:number)
    {
        if(lojaId){
            const loja = this.lojaService.getLojaById(lojaId);
            if(!loja) throw new NotFoundException("Empresa não encontrada");
            const produtos = this.produtos.filter(elem => elem.id_loja == lojaId);
            if(produtos.length == 0)
            return produtos;
        }
        throw new HttpException("Informe um id válido !",HttpStatus.BAD_REQUEST);
    }

    postLojaProduct(lojaId:number, product:ProductDto){
        if(lojaId && product){
            const loja = this.lojaService.getLojaById(lojaId);
            if(!loja) throw new NotFoundException("Loja não encontrada !");
            const lojaProducts = this.produtos.filter(elem => elem.id_loja === lojaId);
            this.produtos.push({id: this.produtos.length + 1, ...product});
            return {
                "message": "produto cadastrado com sucesso !",
                "produto_cadastrado": product.nome,
                "produtos_da_empresa": lojaProducts
            }
        }
        throw new HttpException("Produto não inserido", HttpStatus.BAD_REQUEST);
    }

    deleteProduct(productId:number,lojaId:number){
        if(productId && lojaId){
            const productIndex = this.produtos.findIndex(elem => elem.id === productId);
            const loja = this.lojaService.getLojaById(lojaId)
            if(!loja) throw new NotFoundException("Loja não encontrada !");
            if(productIndex < 0) throw new NotFoundException("Produto não encontrado !");
            const produtoDeletado = this.produtos[productIndex].nome;
            this.produtos.splice(productIndex,1);
            const produtosRestantes = this.produtos.filter(elem => elem.id_loja === loja.id);
            return { 
                "message": "Produto deletado com sucesso !",
                "produto_deletado": produtoDeletado,
                "produtos_restantes": produtosRestantes
            };
        }
        throw new HttpException("Algum dado não fornecido corretamente !", HttpStatus.BAD_REQUEST);
    }

    updateProduct(productId:number, product:ProductDto){
        if(productId && product){
            const produtoIndex = this.produtos.findIndex(elem => elem.id == productId);
            if(productId < 0) throw new NotFoundException("Produto não encontrado");
            this.produtos[produtoIndex] = product;
            return { "message": "Produto atualizado !" };
        }
        throw new HttpException("Algum erro ao fazer a requisição", HttpStatus.BAD_REQUEST);
    }

}