import { useQuery } from "@tanstack/react-query";
import { getAnaytics } from "@/lib/actions/analytics";


export const getAnalyticsQuery=(view:string)=>{
    return useQuery({queryKey:["analytics",view],queryFn:()=>getAnaytics(view)})
}