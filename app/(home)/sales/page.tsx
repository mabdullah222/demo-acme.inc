'use client'
import { SalesType,salesColumns } from "@/types/sales-table-types";
import TableComponent from "@/components/table";
import { getSalesQuery } from "@/queries/sales-queries";


const SalesPage= ()=>{
    const {data:salesData,isLoading,isError,isSuccess}=getSalesQuery()
    return (
        <div className="flex space-y-4 flex-col justify-between mt-4">
        <p className="text-2xl font-extrabold text-zinc-700 self-center md:self-start">Sales</p>
        <TableComponent<SalesType> data={salesData} columns={salesColumns}isLoading={isLoading} isError={isError} isSuccess={isSuccess}></TableComponent>
        </div>
    )
}

export default SalesPage;