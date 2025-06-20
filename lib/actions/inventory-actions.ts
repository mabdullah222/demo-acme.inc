import axios from 'axios';

export const getInventory=async (query:string)=>{
    const res= await axios.get('/api/inventory',{params:{q:query}});
    return res.data
}

export const getInventorySearchResults=async (q:string)=>{
    const res=await axios.get(`/api/inventory/search?q=${q}`)
    return res.data
}

export const updateInventory=async ({quantity,inventoryId}:{quantity:number,inventoryId:string})=>{
    const res= await axios.patch(`/api/inventory/${inventoryId}`,{quantity:quantity})
    return res.data
}

export const getInventoryItemById=async(inventoryId:string)=>{
  const res=await axios.get(`/api/inventory/${inventoryId}`)
  console.log(res.data)
  return res.data
}