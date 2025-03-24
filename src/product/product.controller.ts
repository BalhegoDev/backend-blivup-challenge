import { Body, Controller,Delete,Get,Param,Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('product')
export class ProductController {

    constructor( private readonly productService:ProductService) {}

    //  URL:
    //  http://localhost:3000/product/lojaProducts/:id
    //  essa rota irá retornar todos os produtos de uma loja específica
    @Get("lojaProducts/:id")
    getAllProducts(@Param("id", ParseIntPipe) id:number){
        return this.productService.getAllLojaProducts(id)
    }

    //  URL:
    //  http://localhost:3000/product/insertProduct
    @Post("insertProduct")
    postProduct(@Body() body)
    {
        return this.productService.postLojaProduct(body.loja_id, body.product);
    }

    //  URL:
    //  http://localhost:3000/product/deleteProduct
    @Delete("deleteProduct")
    deleteProduct(@Query() query){
        const {productId,lojaId} = query;
        return this.productService.deleteProduct( Number(productId), Number(lojaId) );
    }   

    //  URL:
    //  http://localhost:3000/product/updateProduct
    @Put("updateProduct")
    updateProduct( @Body() body ){
        const { productId, product } = body 
        return this.productService.updateProduct(Number(productId), product)
    }

}
