import axios from "axios"

export const getSales=async ()=>{
    const res=await axios.get("/api/sales")
    return res.data
}