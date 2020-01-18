import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {instance, mock, when} from 'ts-mockito';
import {AxiosSupplier} from '@/api/axios/axios.supplier';
import {AuthApi} from '@/api/auth/auth.api';
import {HttpClient} from '@/api/axios/http.client';
import {EthereumServiceImpl} from '@/api/wallet/wallet.service.impl';

describe('AuthApi', () => {
  const mockAdapter = new MockAdapter(axios);
  const mockAxiosSupplier = mock(AxiosSupplier);
  when(mockAxiosSupplier.get()).thenReturn(axios.create());

  const httpClient = new HttpClient(instance(mockAxiosSupplier));
  const walletService = new EthereumServiceImpl();
  const authApi = new AuthApi(httpClient, walletService);
  let responseData: object;
  const domain = 'auth';

  describe('signIn()', () => {
    const address = 'testAddress';
    const message = 'testMessage';
    const signature = 'testSignature';
    it('should return signInDto', async () => {
      responseData = {
        id: 1,
        address,
        name: 'testName',
        point: 0,
        level: 0,
        jwt: 'testJwt',
      };
      mockAdapter.onPost(`/${domain}/signin`, {message, address, signature}).reply(200, responseData);
      expect(await authApi.signIn(message)).toEqual(responseData);
    });
    it('should return 404 error', async () => {
      mockAdapter.onPost(`/${domain}/signin`, {message, address, signature}).reply(404);

      await expect(authApi.signIn(message))
        .rejects
        .toThrow(new Error('Request failed with status code 404'));
    });
    it('should return network error', async () => {
      mockAdapter.onPost(`/${domain}/signin`, {message, address, signature}).networkError();

      await expect(authApi.signIn(message))
        .rejects
        .toThrow(new Error('Network Error'));
    });
  });
});