import { Body, Controller,Get,Param,Post } from '@nestjs/common';
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

}
