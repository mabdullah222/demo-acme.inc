import type { TableProps } from 'antd';

export interface SalesType{
    key: string;
    productId:string;
    saleDate: string;
    customerName: string;
    billerName: string;
    totalAmount: number;
    paymentMethod?: string;
}

export const salesColumns: TableProps<SalesType>['columns'] = [
  {
    title: 'Date',
    dataIndex: 'saleDate',
    key: 'saleDate',
  },
  {
    title: 'Customer',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Biller',
    dataIndex: 'billerName',
    key: 'billerName',
  },
  {
    title: 'Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render: (amount) => `$${amount.toFixed(2)}`,
  },
  {
    title: 'Payment',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
  },
];
