'use client';

import Image from 'next/image';
import { Button ,message, Popconfirm } from 'antd';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ModalComponent from './modal';
import { addProductMutation, updateProductMutation,deleteProductMutation } from '@/mutations/product-mutations';
import { toast } from "react-toastify";
import type { PopconfirmProps } from 'antd';

type ProductCardProps = {
  productId:string
  imageUrl: string;
  name: string;
  unitPrice: number;
  onEdit?: () => void;
  active?: boolean;
};

const ProductCard = ({
  productId,
  imageUrl,
  name,
  unitPrice,
  onEdit,
  active = false,
}: ProductCardProps) => {
  const {mutate,isPending,isSuccess,isError}=deleteProductMutation()
  const [open,setOpen]=useState<boolean>(false);
  const toggleOpen=()=>{
    open ? setOpen(false) : setOpen(true)
  }
  const handleDelete = () => {
  mutate(productId,{onError:()=>{message.error("Error deleteting the Product")},onSuccess:()=>{message.success("Product deleted Successfully")}})
};

  return (
    <div
      className={`flex w-[260px] flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg ${
        active ? 'border-blue-500' : 'border-gray-200'
      }`}
    >
      <div className="relative h-[180px]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-fit"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold text-zinc-500">{name}</h3>

        <div className="text-base font-medium text-blue-600">
          ${unitPrice.toFixed(2)}
        </div>
        <div className='flex flex-1 flex-row justify-between'>
             <Button
          icon={<EditOutlined />}
          onClick={toggleOpen}
          type="primary"
          className="mt-2"
        >
          Edit
        </Button>
        <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={handleDelete}
        onCancel={()=>{message.error('Delete cancelled')}}
        okText="Yes"
        cancelText="No"
      >
        <Button danger
          icon={<DeleteOutlined></DeleteOutlined>}
          disabled={isPending}
          variant="filled"
          className="mt-2"
        >
          {isPending? "Deleting...":"Delete"}
          
        </Button>
      </Popconfirm>
        
        </div>
       
      </div>
      <ModalComponent title='Update Product' mutationFn={updateProductMutation} productId={productId} open={open} toggleOpen={toggleOpen} name={name} imageUrl={imageUrl} unitPrice={unitPrice.toString()}></ModalComponent>
    </div>
  );
};

export default ProductCard;
