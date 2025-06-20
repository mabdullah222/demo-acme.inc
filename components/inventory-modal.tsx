'use client';

import React, { useEffect, useState } from 'react';
import { Modal, InputNumber, Spin } from 'antd';
import { getInventoryItemByIdQuery } from '@/queries/inventory-queries';
import { updateInventoryMutation } from '@/mutations/inventory-mutations';
import {message}  from "antd"

type InventoryModalProps = {
  inventoryId: string;
  open: boolean;
  toggleOpen: () => void;
};

const InventoryModal = ({ inventoryId, open, toggleOpen }: InventoryModalProps) => {
  const [value, setValue] = useState<number | null>(null);
  const {mutate,isPending}=updateInventoryMutation()
  const { data: inventoryItem, isLoading, isSuccess } = getInventoryItemByIdQuery(
    inventoryId,
    open
  );

  useEffect(() => {
    if (isSuccess && inventoryItem) setValue(inventoryItem.quantity);
  }, [isSuccess, inventoryItem]);

  const handleOk = () => {
    mutate({quantity:value ?? 0,inventoryId:inventoryId},{onSuccess:()=>{
      message.success("Updated Successfully")
      toggleOpen();
    },onError:()=>{message.error('Error updating the inventory')}})
  };


  const handleCancel = () => {
    toggleOpen()
  };

  return (
    <Modal
      title="Update Quantity"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{disabled:isPending}}
      okText={isPending ? "Updating...":"Update"}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <InputNumber
          style={{ width: '100%' }}
          value={value ?? undefined}
          onChange={val => setValue(val)}
          placeholder="Enter a number"
        />
      )}
    </Modal>
  );
};

export default InventoryModal;
