import axios from "axios";


export const getProducts = async (limit: number, cursor?: string | number) => {
  const { data } = await axios.get("/api/product", {
    params: { limit, cursor },
  });
  return data;
};

export const updateProduct= async (data:{productId:string,name:string,unitPrice:string})=>{
  const res=await axios.patch(`/api/product/${data.productId}`,{name:data.name,unitPrice:parseFloat(data.unitPrice)})
  return res.data
}

export const addProduct=async (data:{name:string,unitPrice:string})=>{
  const res=await axios.post("/api/product",{name:data.name,unitPrice:parseFloat(data.unitPrice)})
  return res.data
}

export const deleteProduct=async (productId:string) =>{
  const res=await axios.delete(`/api/product/${productId}`)
  return res.data
}

