import { JsonProperty } from "@roit/roit-model-mapper";

export class UsuarioRequest{
    nome: string = undefined;
    idade: number = undefined;
    
    @JsonProperty("usuario_github")
    usuarioGithub: string = undefined;

    numero: number = undefined;
    complemento: string = undefined;
    cep: number = undefined;
}