import type { TableProps } from 'antd';
export interface ProductType {
  key: string;
  name: string;
  unitPrice: number;
  quantity?: number;
  totalSales?: number; 
}

export const ProductColumns: TableProps<ProductType>['columns'] = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: (price) => `$${price.toFixed(2)}`,
  },
  {
    title: 'In Stock',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Total Sales',
    dataIndex: 'totalSales',
    key: 'totalSales',
  },
];
