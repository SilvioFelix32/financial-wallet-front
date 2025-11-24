import api from './api.service';
import { getCookie, setCookie, removeCookie } from '@/utils/cookies';
import type {
  CreateUserRequest,
  User,
  UsersListResponse,
} from '@/interfaces/user.interfaces';

const SYNC_COOKIE_NAME = 'user_synced';
const SYNC_COOKIE_EXPIRES_DAYS = 30;

export const userService = {
  
  async createOrSync(data: CreateUserRequest): Promise<User> {
    const syncCookie = getCookie(`${SYNC_COOKIE_NAME}_${data.user_id}`);
    
    if (syncCookie === 'true') {
      return this.getById(data.user_id);
    }

    const user = await this.createUser(data);
    return user;
  },

  async createUser(data: CreateUserRequest): Promise<User> {
    try {
      const response = await api.post<User>('/users', data);
      const createdUser = response.data;
      
      if (!createdUser || !createdUser.user_id) {
        throw new Error('Usuário criado mas dados inválidos retornados');
      }

      setCookie(`${SYNC_COOKIE_NAME}_${data.user_id}`, 'true', SYNC_COOKIE_EXPIRES_DAYS);
      return createdUser;
    } catch (createError: any) {
      throw new Error(`Erro ao criar usuário: ${createError.message}`);
    }
  },

  async getById(id: string): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  async list(page: number = 1, limit: number = 10): Promise<UsersListResponse> {
    const response = await api.get<UsersListResponse>('/users', {
      params: { page, limit },
    });
    return response.data;
  },

  async getByEmail(email: string): Promise<User> {
    const response = await api.get<User>(`/users/email/${email}`);
    return response.data;
  },
};

