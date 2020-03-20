import { Injectable } from '@nestjs/common';
import Axios, { AxiosResponse } from 'axios';
import { ViaCepResponse } from 'src/model/ViaCepResponse';

@Injectable()
export class ViaCepService {
  
    public buscarViaCep(cep: number): Promise<AxiosResponse<ViaCepResponse>> {
        const endereco = "https://viacep.com.br/ws/" + cep.toString() + "/json/";

        return Axios.get(endereco);
    }
}
