import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const userKey = "userKey";

interface IUser {
  id: number;
  name: string;
}

interface IResponseGetAllUsers {
  users: IUser[];
  limit: number;
  skip: number;
  total: number;
}

export const useAuth = () => {
  const getUsers = () =>
    useQuery<IResponseGetAllUsers, any>({
      queryKey: [userKey],
      queryFn: () => api.get("user").then((res) => res.data),
    });

  const getProfile = () =>
    useQuery<any, any>({
      queryKey: [userKey],
      queryFn: () => api.get("auth/me").then((res) => res.data),
      retry: 0,
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

  return { signIn, getUsers, signUp, confirmOtp, sendNewOtp, getProfile };
};
