import axios from "axios";


export const getProducts = async (limit: number, cursor?: string | number) => {
  const { data } = await axios.get("/api/product", {
    params: { limit, cursor },
  });
  return data;
};

export const updateProduct= async (formData:FormData)=>{
  const res=await axios.patch(`/api/product/${formData.get('productId')}`,formData,{headers:{'Content-Type':"multipart/form-data"}})
  return res.data
}

export const addProduct=async (formData:FormData)=>{
  const res=await axios.post("/api/product",formData,{headers:{'Content-Type':"multipart/form-data"}})
  return res.data
}

export const deleteProduct=async (productId:string) =>{
  const res=await axios.delete(`/api/product/${productId}`)
  return res.data
}

