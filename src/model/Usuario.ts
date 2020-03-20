import { JsonProperty } from "@roit/roit-model-mapper";

export class Usuario{
    id?: number = undefined;
    nome?: string = undefined;
    idade?: number = undefined;
    @JsonProperty("usuario_github")
    usuarioGithub?: string = undefined;
    urlGithub?: string = undefined;
    endereco?: string = undefined;
    numero?: number = undefined;
    complemento?: string = undefined;
    cep?: number = undefined;
}