import {Service} from 'typedi';
import {HttpClient} from '@/api/axios/http.client';
import {Ghost, GhostDto} from '@/types';

@Service()
export class GhostApi {
    private domain = 'ghosts';

    constructor(private httpClient: HttpClient) {
    }

    public async get(id: number): Promise<Ghost> {
        return await this.httpClient.call<Ghost>('GET', `${this.domain}/${id}`);
    }

    public async getByUser(userAddress: string): Promise<Ghost[]> {
        return await this.httpClient.call<Ghost[]>('GET', `${this.domain}/${userAddress}`);
    }

    public async createEgg(gene: string, id: number, owner: string): Promise<Ghost> {
        const ghostDto: GhostDto = {gene, tokenId: id, owner};
        return await this.httpClient.call<Ghost>('POST', `${this.domain}`, ghostDto, {});
    }

    public async levelUp(gene: string, level: number): Promise<Ghost> {
        return await this.httpClient.call<Ghost>('PUT', `${this.domain}`, {gene, level}, {});
    }

    public async transfer(from: string, to: string, gene: string): Promise<Ghost> {
        return await this.httpClient.call<Ghost>('PUT', `${this.domain}`, {from, to, gene}, {});
    }
}