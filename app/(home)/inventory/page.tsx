'use client'
import Search from "@/components/search";
import { InventoryType,InventoryColumns } from "@/types/inventory-table-types";
import TableComponent from "@/components/table";
import { getInventoryQuery } from "@/queries/inventory-queries";
import { useState } from "react";



const InventoryPage= ()=>{
    const [query,setQuery]=useState<string>('')
    const {data:inventoryData,isLoading,isError,isSuccess}=getInventoryQuery(query)
    

    const handleChange=(queryString:string)=>{
        setQuery(queryString)
    }

    return (
        <div className="flex h-full space-y-4 flex-col mt-4">
        <p className="text-2xl font-extrabold text-zinc-700 self-center md:self-start">Inventory</p>
        <Search handleChange={handleChange}  placeholder="Search Inventory" classNames="self-end"></Search>
        <TableComponent<InventoryType> data={inventoryData} columns={InventoryColumns}isLoading={isLoading} isError={isError} isSuccess={isSuccess}></TableComponent>
        </div>
    )
}

export default InventoryPage;