
# Desafio Back End BlivUp

Ao clonar o projeto, execute o seguinte comando para instalar todas as dependências:

```
npm i
```

Depois, ponha o servidor para rodar com o comando:

```
npm run start:dev
```

# Rotas
- GET 

Para pegar todos os produtos de uma empresa específica, há a seguinte rota:
```
http://localhost:3000/product/lojaProducts/[id da empresa]
```

- POST 

para inserir um produto novo, segue o seguinte esquema:
```
http://localhost:3000/product/insertProduct

Onde o body possui a seguinte estrutura:

{
    loja_id: number
    product: {
        nome: string,
        preco: number,
        data_validade: string,
        id_loja: number,
        quantidade_produtos: number
    }
}
```

- DELETE

para remover um produto de uma determinada loja, segue o seguinte esquema:
```
    http://localhost:3000/product/deleteProduct?productId=[id_do_produto]&lojaId=[id_da_loja]
```

- UPDATE

para atualizar um produto específico, segue o seguinte esquema:

```
    http://localhost:3000/product/updateProduct

    Onde o body possui a seguinte estrutura:
    {
        product_id: number
        product: {
            nome: string,
            preco: number,
            data_validade: string,
            id_loja: number,
            quantidade_produtos: number
        }
    }
```
