import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const userKey = "userKey";

export const useAuth = () => {
  const QueryClient = useQueryClient();
  const getUsers = () =>
    useQuery<any, any>({
      queryKey: ["user"],
      queryFn: () => api.get("user").then((res) => res.data),
      retry: 0,
      staleTime: 1000 * 60 * 3,
      gcTime: 1000 * 60 * 10,
    });
  const deleteUser = () =>
      useMutation({
        mutationFn: (id: string) => api.delete(`user/${id}`),
        onSuccess: () => {
          QueryClient.invalidateQueries({ queryKey: ["user"] });
        },
      });

  const getProfile = () =>
    useQuery<any, any>({
      queryKey: [userKey],
      queryFn: () => api.get("auth/me").then((res) => res.data),
      retry: 0,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const signIn = useMutation<any, any, { email: string; password: string }>({
    mutationFn: (body) => api.post("auth/signin", body).then((res) => res.data),
  });

  const signUp = useMutation<any, any, any>({
    mutationFn: (body) => api.post("auth/signup", body).then((res) => res.data),
  });

  const confirmOtp = useMutation<
    any,
    any,
    { otp: string; verificationKey: string; email: string }
  >({
    mutationFn: (body) =>
      api.post("auth/confirm-otp", body).then((res) => res.data),
  });

  const sendNewOtp = useMutation<any, any, { email: string }>({
    mutationFn: (body) =>
      api.post("auth/new-opt", body).then((res) => res.data),
  });

  return { signIn, getUsers, signUp, confirmOtp, sendNewOtp, getProfile, deleteUser };
};
