import { CoreApi } from '@/utils/api/core.api';
import { API_ENDPOINTS } from '@/utils/api/endpoints';

export type LoginInputType = {
  email: string;
  password: string;
};

export type RegisterUserInputType = {
  name?: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type AuthResponse = {
  status:number;
  message?:string;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

class Auth extends CoreApi {
  async login(input: LoginInputType): Promise<AuthResponse> {
    try {
      const response = await this.http.post<AuthResponse>(API_ENDPOINTS.LOGIN, input);
      return response.data;
    } catch (error:any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to login');
      }
    }
  }

  async register(input: RegisterUserInputType): Promise<AuthResponse> {
    try {
      const response = await this.http.post<AuthResponse>(API_ENDPOINTS.REGISTER, input);
      return response.data;
    } catch (error:any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to register');
      }
    }
  }

  async logout() {
    try {
      // await this.http.post(API_ENDPOINTS.LOGOUT);
      return this.http.post(API_ENDPOINTS.LOGOUT).then((res) => {
      // console.log('Lout: ', res)
      // Cookies.remove('auth_token')
      // Cookies.remove('auth_permissions')
      // route.push('/')
      return res.data
    })
    } catch (error:any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to logout');
      }
    }
  }
}

export const authService = new Auth('auth');
