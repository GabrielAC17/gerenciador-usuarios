import { Injectable } from '@nestjs/common';
import Axios, { AxiosResponse } from 'axios';
import { GithubResponse } from 'src/model/GithubResponse';

@Injectable()
export class GithubService {
  
    public buscarGithub(username: String): Promise<AxiosResponse<GithubResponse>> {
        const endereco = "https://api.github.com/search/users?q=" + username;

        return Axios.get(endereco);
    }
}
