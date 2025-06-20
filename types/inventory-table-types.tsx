import type { TableProps } from 'antd';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export interface InventoryType {
  productId: string;
  key: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lastUpdated: string;
  toggleOpen?: () => void;
  selectInventoryId?: (id: string) => void;
}

export const InventoryColumns: TableProps<InventoryType>['columns'] = [
  {
    title: 'Product',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: price => `$${price.toFixed(2)}`,
  },
  {
    title: 'Last Updated',
    dataIndex: 'lastUpdated',
    key: 'lastUpdated',
    render: ts => new Date(ts).toLocaleString(),
  },
  {
    title: 'Actions',
    key: 'action',
    render: (_, record) => (
      <Button
        icon={<EditOutlined />}
        type="primary"
        onClick={() => {
          record.selectInventoryId?.(record.productId);
          record.toggleOpen?.();
        }}
      >
        Edit
      </Button>
    ),
  },
];
