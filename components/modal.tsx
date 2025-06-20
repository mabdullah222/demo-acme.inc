'use client'
import { Modal,Button, Form,Input } from "antd";
import { useEffect, useState } from "react";
import {message} from "antd"

type ModalPropsType={
    open:boolean
    productId: string,
    name: string,
    unitPrice: string
    toggleOpen:any
    mutationFn:any
    title:string
}

const ModalComponent=({open,productId,name,unitPrice,toggleOpen,mutationFn,title}:ModalPropsType)=>{
    const [formData,setFormData]=useState({name:name,unitPrice:unitPrice})
    const {mutate,isPending,isError}=mutationFn()
    
  useEffect(()=>{
    if (open){
    toggleOpen()
    message.success("Product Updated Successfully")
    }
  },[isPending])

    const handleFormChange=(e:any)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleOk=()=>{
      if (formData.name==""){
        message.error("Name cannot be empty")
        return
      }else if(parseFloat(formData.unitPrice)==0){
        message.error("Unit must be positive")
        return
      }
        mutate({productId,...formData})
    }

    return (
        <Modal
        open={open || isPending || isError}
        title={title}
        onOk={handleOk}
        onCancel={toggleOpen}
        footer={[
          <Button key="back" onClick={toggleOpen}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={isPending} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <form action="" className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-2">
            <label className="font-extrabold text-neutral-700" htmlFor="name">Name</label>
            <input value={formData.name} onChange={handleFormChange} className="outline outline-zinc-500 p-1.5 rounded-md" type="text" name="name" placeholder="Name of Product"/>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="font-extrabold text-neutral-700" htmlFor="unitprice">Unit Price</label>
            <input value={formData.unitPrice} onChange={handleFormChange}  className="outline outline-zinc-500 p-1.5 rounded-md border-none" type="text" name="unitPrice" placeholder="Price of Product"/>
            </div>
            
        </form>
      </Modal>
    )
}

export default ModalComponent;