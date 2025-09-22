import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const userKey = "categoryKey";

export const useCategory = () => {
  const QueryClient = useQueryClient();
  const getCategory = () =>
    useQuery<any, any>({
      queryKey: [userKey],
      queryFn: () => api.get("category").then((res) => res.data),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  const deleteCategory = () =>
    useMutation({
      mutationFn: (id: string) => api.delete(`category/${id}`),
      onSuccess: () => {
        QueryClient.invalidateQueries({ queryKey: [userKey] });
      },
    });
  const createCategory = () =>
    useMutation({
      mutationFn: (newUser: any) =>
        api.post(`category`, newUser).then((res) => res.data),
      onSuccess: () => {
        QueryClient.invalidateQueries({ queryKey: [userKey] });
      },
    });
  const updateCategory = () =>
    useMutation({
      mutationFn: ({ id, ...body }: { id: string; name: string }) =>
        api.patch(`category/${id}`, body).then((res) => res.data),
      onSuccess: () => QueryClient.invalidateQueries({ queryKey: [userKey] }),
    });
  return { getCategory, createCategory, deleteCategory, updateCategory };
};
