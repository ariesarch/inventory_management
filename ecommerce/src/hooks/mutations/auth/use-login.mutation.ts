import { useMutation } from "@tanstack/react-query";
import { authService,LoginInputType } from "@/api/services/auth/auth.service";
export const useLoginMutation = () => {
  return useMutation(
    {
        mutationFn:(input: LoginInputType) => authService.login(input)
    }
  );
};
