import { useMutation } from "@tanstack/react-query";
import { updateProduct,addProduct,deleteProduct } from "@/lib/actions/product-actions";
import { useQueryClient } from "@tanstack/react-query";



export const updateProductMutation=()=>{
    const client=useQueryClient()
    return useMutation({mutationFn:updateProduct,onSuccess:()=>{
        client.invalidateQueries({queryKey:["product","infinite"]})}})
}


export const addProductMutation=()=>{
    const client=useQueryClient()
    return useMutation({mutationFn:addProduct,onSuccess:()=>{
        client.invalidateQueries({queryKey:["product","infinite"]})}})
}

export const deleteProductMutation=()=>{
    const client=useQueryClient()
    return useMutation({mutationFn:deleteProduct,onSuccess:()=>{
        client.invalidateQueries({queryKey:["product","infinite"]})}})
}