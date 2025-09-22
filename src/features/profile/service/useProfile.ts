import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/api";



type UpdateProfile = {
  id: string;
  fname?: string;
  lname?: string;
  address?: string;
  [key: string]: any;
};

export const useProfile = () => {
  const queryClient = useQueryClient();

  const updateProfile = () =>
    useMutation({
      mutationFn: ({ id, ...body }: UpdateProfile) =>
        api.patch(`/user/${id}`, body).then((res) => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      },
    });

  return { updateProfile };
};
