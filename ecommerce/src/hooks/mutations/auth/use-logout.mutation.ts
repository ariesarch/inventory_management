import { useMutation } from '@tanstack/react-query'
import { authService } from '@/api/services/auth/auth.service'

export const useLogoutMutation = () => {
  return useMutation(
    {
        mutationFn:(input: any) => authService.logout()
    }
  );
};