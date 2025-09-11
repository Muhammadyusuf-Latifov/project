import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const userKey = "categoryKey";

export const useCategory = () => {
  const QueryClient = useQueryClient();
  const getCategory = () =>
    useQuery<any, any>({
      queryKey: [userKey],
      queryFn: () => api.get("category").then((res) => res.data),
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
      mutationFn: ({ id, updated }: { id: string; updated: any }) =>
        api.put(`category/${id}`, updated).then((res) => res.data),
      onSuccess: (data) => {
        QueryClient.setQueryData([userKey], (item: any) =>
          item.map((c: any) => (c.id === data.id ? data : c))
        );
      },
    });
  return { getCategory, createCategory, deleteCategory, updateCategory };
};
