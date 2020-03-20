import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Usuario } from 'src/model/Usuario';
import { UsuarioRequest } from 'src/model/request/UsuarioRequest';
import { ModelMapper } from "@roit/roit-model-mapper";
import { GithubService } from 'src/service/github.service';
import { ViaCepService } from 'src/service/viacep.service';
import { OkResponse, ErrorResponse } from "@roit/roit-response-handler";

@Controller('usuarios')
export class AppController {
  constructor(private readonly appService: AppService, private readonly githubService: GithubService, private readonly viaCepService: ViaCepService) {}

  @Get('usuario/:id')
  getUsuario(@Param('id') idUsuario: number) {
    var res: Response;

    if (idUsuario && idUsuario > 0){
      var usuario : Usuario = this.appService.buscarUsuarioId(idUsuario);

      if (usuario && usuario.id){
        return OkResponse(usuario, 'Sucesso!');
      }

      return ErrorResponse("Usuário não encontrado!");
    }
    return ErrorResponse("id de usuário inválido!");
  }

  @Get()
  getUsuarios()  {
      const usuarios = this.appService.buscarUsuarios();

      return OkResponse(usuarios, 'Sucesso!');
  }

  @Post('remover-usuario/:id')
  deleteRemoverUsuario(@Param('id') id:number) {
    if (id && id > 0){
      console.log(id);
      this.appService.removeUsuario(id);
      return OkResponse(null, 'Sucesso!');
    }
    return ErrorResponse("id de usuário inválido!");
  }

  @Post('editar-usuario/:id')
  editarUsuario(@Param('id') id:number, @Body() usuario : UsuarioRequest) {
    if (!usuario || !id || id <= 0) {
      return ErrorResponse("id de usuário inválido!");
    }

    var usuariobanco = this.appService.buscarUsuarioId(id);

    if (!usuariobanco){
      return ErrorResponse("usuário não encontrado!");
    }
    
    usuariobanco.nome = usuario.nome;
    usuariobanco.cep = usuario.cep;
    usuariobanco.complemento = usuario.complemento;
    usuariobanco.idade = usuario.idade;
    usuariobanco.numero = usuario.numero;
    usuariobanco.usuarioGithub = usuario.usuarioGithub;

    this.viaCepService.buscarViaCep(usuariobanco.cep).then( response => {
      usuariobanco.endereco = response.data.logradouro;
      usuariobanco.cep = Number.parseInt(response.data.cep.replace("-", ""));

      this.githubService.buscarGithub(usuariobanco.usuarioGithub).then(response2 => {
        if (response2.data && response2.data.items && response2.data.items.length > 0){
          usuariobanco.usuarioGithub = response2.data.items[0].login;
          usuariobanco.urlGithub = response2.data.items[0].html_url;

          this.appService.atualizarUsuario(usuariobanco);
        }
      }).catch(error => {
        return ErrorResponse("Erro ao consultar o GitHub!");
      });
    }).catch(error => {
      return ErrorResponse("Erro ao consultar o ViaCEP!");
    });

  }

  @Post('adicionar-usuario')
  adicionarUsuario(@Body() usuario : UsuarioRequest) {
    var user : Usuario = ModelMapper.deserialize(Usuario, JSON.stringify(usuario), { singleResult: true });

    this.viaCepService.buscarViaCep(user.cep).then( response => {
      user.endereco = response.data.logradouro;
      user.cep = Number.parseInt(response.data.cep.replace("-", ""));

      this.githubService.buscarGithub(user.usuarioGithub).then(response2 => {
        if (response2.data && response2.data.items && response2.data.items.length > 0){
          user.usuarioGithub = response2.data.items[0].login;
          user.urlGithub = response2.data.items[0].html_url;

          this.appService.addUsuario(user);
        }
      }).catch(error => {
        return ErrorResponse("Erro ao consultar o GitHub!");
      });
    }).catch(error => {
      return ErrorResponse("Erro ao consultar o ViaCEP!");
    });

  }

}