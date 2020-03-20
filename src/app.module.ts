import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { GithubService } from './service/github.service';
import { ViaCepService } from './service/viacep.service';

@Module({
  imports: [],
  exports:[],
  controllers: [AppController],
  providers: [AppService, GithubService, ViaCepService],
})
export class AppModule {}
