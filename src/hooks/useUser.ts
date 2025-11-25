import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { useAuth } from './useAuth';
import { getCookie } from '@/utils/cookies';

export const useUser = () => {
  const { user } = useAuth();
  
  const userId = useMemo(() => {
    if (!user) return null;
    
    if (user.sub) return user.sub;
    
    try {
      const idToken = getCookie('cognito_id_token');
      if (idToken) {
        const base64Url = idToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        return decoded.sub;
      }
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
    }
    
    return null;
  }, [user]);

  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getById(userId!),
    enabled: !!userId,
    refetchOnWindowFocus: true,
  });

  const usersListQuery = useQuery({
    queryKey: ['users', 'list'],
    queryFn: () => userService.list(1, 100),
    refetchOnWindowFocus: true,
  });

  return {
    user: userQuery.data,
    userLoading: userQuery.isLoading,
    userError: userQuery.error,
    usersList: usersListQuery.data?.users ?? [],
    usersListLoading: usersListQuery.isLoading,
    usersListError: usersListQuery.error,
    userId,
  };
};

