import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(['user', user])
      navigate("/dashboard", {replace: true});
    },
    onError: (err) => toast.error("Incorrect email or password."),
  });
  return { login, isLoading };
}
