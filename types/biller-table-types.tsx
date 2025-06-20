import type { TableProps } from 'antd';

export interface ProductType {
  key: string;
  name: string;
  unitPrice: number;
  quantity?: number;
  totalSales?: number;
}

export const ProductColumns: TableProps<ProductType>['columns']=[
    {
        key:"name",
        title:"Name",
        dataIndex:"name"
    },{
        key:"unitPrice",
        title:"Unit Price",
        dataIndex:"unitPrice"
    }
    ,{
        key:"quantity",
        title:"Quantity",
        dataIndex:"quantity"
    },{
        key:"totalSales",
        title:"Total Sales",
        dataIndex:"totalSales"
    }
]