import { useMutation } from "@tanstack/react-query";
import { authService,RegisterUserInputType } from "@/api/services/auth/auth.service";
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn:(input: RegisterUserInputType) =>
    authService.register(input)
  }
  );
};
