import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { LojaModule } from 'src/loja/loja.module';
import { LojaService } from 'src/loja/loja.service';

@Module({
  providers: [ProductService,LojaService],
  controllers: [ProductController],
  imports: [LojaModule],
  exports: [ProductService]
})
export class ProductModule {}
