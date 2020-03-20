import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/model/Usuario';

@Injectable()
export class AppService {
  usuarios: Usuario[] = [];
  lastId = 1;

  constructor() {
    var usu = new Usuario();
    usu = { id:1,nome : "Fulano", idade:19, endereco:"Rua 0", usuarioGithub:"fulano@10", numero:0, complemento:"aa", cep:80010020, urlGithub: "http://github.com/users/GabrielAC17"};
    this.usuarios.push(usu);
  }

  public addUsuario(usuario: Usuario){
    usuario.id = ++this.lastId;
    this.usuarios.push(usuario);
  }

  public removeUsuario(idUsuario: number){
    const usuarioIndex: number = this.usuarios.findIndex(u => u.id == idUsuario);
    if (usuarioIndex && usuarioIndex >= 0){
      this.usuarios.splice(usuarioIndex, 1);
    }
  }

  public buscarUsuarioNome(nome:string) : Usuario{
    return this.usuarios.find(x => String(x.nome).toLowerCase().includes(String(nome).toLowerCase(), 0));
  }

  public buscarUsuarios() : Usuario[] {
    return this.usuarios;
  }

  public buscarUsuarioId(id:number): Usuario{
    return this.usuarios.find(u => u.id == id);
  }

  public atualizarUsuario(usuario: Usuario){
    this.removeUsuario(usuario.id);
    this.usuarios.push(usuario);
  }
}
