import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { ProductModule } from './product/product.module';
import { LojaModule } from './loja/loja.module';

@Module({
  imports: [FuncionarioModule, ProductModule, LojaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
