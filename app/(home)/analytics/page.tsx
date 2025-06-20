import LineChartComponent from "@/components/line-chart";
const BillerPage=()=>{    
    return (
        <div className="flex h-full space-y-4 flex-col mt-4">
        <p className="text-2xl font-extrabold text-zinc-700 self-center md:self-start">Analytics</p>
        <LineChartComponent/>
        </div>
    )
}

export default BillerPage;