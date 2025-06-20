'use client';

import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import InventoryModal from './inventory-modal';

type TableComponentProps<T> = {
  columns: TableProps<T>['columns'];
  data: T[] | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

function TableComponent<T extends { key: string; productId: string }>({
  columns,
  data = [],
  isLoading,
  isError,
}: TableComponentProps<T>) {
  const [open, setOpen] = useState(false);
  const [inventoryId, setInventoryId] = useState<string>('');

  const toggleOpen = () => setOpen(prev => !prev);
  const selectInventoryId = (id: string) => setInventoryId(id);

  if (isError) {
    return <p className="text-red-600">Failed to load inventory.</p>;
  }

  return (
    <div className="flex-1">
      <Table<T>
        rowKey="key"
        loading={isLoading}
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={data.map(item => ({
          ...item,
          toggleOpen,
          selectInventoryId,
        }))}
      />

      <InventoryModal
        inventoryId={inventoryId}
        open={open}
        toggleOpen={toggleOpen}
      />
    </div>
  );
}

export default TableComponent;
