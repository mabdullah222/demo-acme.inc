import { updateInventory } from "@/lib/actions/inventory-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const updateInventoryMutation=()=>{
    const client=useQueryClient()
    return useMutation({mutationFn:updateInventory,onSuccess:()=>{client.invalidateQueries({queryKey:["inventory"]})}})
}