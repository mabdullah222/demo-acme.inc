import { getSales } from "@/lib/actions/sales-actions";
import { useQuery } from "@tanstack/react-query";

export const getSalesQuery=()=>{
    return useQuery({
        queryKey:["sales"]
        ,queryFn:getSales,
        staleTime:3*60*1000
    })
}
