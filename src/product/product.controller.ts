import { Body, Controller,Delete,Get,Param,Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common';

@Controller('product')
export class ProductController {

    constructor( private readonly productService:ProductService) {}

    //essa rota irá retornar todos os produtos de uma loja específica
    @Get("lojaProducts/:id")
    getAllProducts(@Param("id", ParseIntPipe) id:number){
        return this.productService.getAllLojaProducts(id)
    }

    @Post("insertProduct")
    postProduct(@Body() body)
    {
        return this.productService.postLojaProduct(body.loja_id, body.product);
    }

    
    @Delete("deleteProduct")
    deleteProduct(@Query() query){
        const {productId,lojaId} = query;
        return this.productService.deleteProduct( Number(productId), Number(lojaId) );
    }

}
