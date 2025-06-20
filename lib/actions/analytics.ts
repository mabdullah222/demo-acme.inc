import axios from "axios"
export const getAnaytics= async  (view:string)=>{
    const res=await axios.get(`/api/sales/analytics?view=${view}`)
    return res.data
}