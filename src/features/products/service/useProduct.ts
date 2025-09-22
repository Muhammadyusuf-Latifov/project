import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const userKey = "productKey";

export const useProduct = () => {
  const QueryClient = useQueryClient();

  const getProduct = (limit?: number, skip?: number) =>
    useQuery({
      queryKey: [userKey, limit, skip],
      queryFn: () =>
        api
          .get("product", { params: { limit, skip } })
          .then((res) => res.data.data),
      
     
    });

  const deleteProduct = () =>
    useMutation({
      mutationFn: (id: string) => api.delete(`product/${id}`),
      onSuccess: () => {
        QueryClient.invalidateQueries({ queryKey: [userKey] });
      },
    });

  const createProduct = () =>
    useMutation({
      mutationFn: (newProduct: any) =>
        api.post(`product`, newProduct).then((res) => res.data),
      onSuccess: () => {
        QueryClient.invalidateQueries({ queryKey: [userKey] });
      },
    });

  const updateProduct = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) =>
        api.patch(`product/${id}`, data).then((res) => res.data),
      onSuccess: () => QueryClient.invalidateQueries({ queryKey: [userKey] }),
    });


  return { getProduct, deleteProduct, createProduct, updateProduct };
};
