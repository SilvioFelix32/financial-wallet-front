export interface CreateUserRequest {
  user_id: string;
  name: string;
  email: string;
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UsersListResponse {
  users: User[];
  pagination: Pagination;
}

