'use client';

import { useState } from "react";
import { Segmented, Spin } from "antd";
import { getAnalyticsQuery } from "@/queries/analytics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type View = "Yearly" | "Monthly" | "Daily";

const LineChartComponent = () => {
  const [view, setView] = useState<View>("Yearly");
  const { data, isLoading } = getAnalyticsQuery(view);

  const handleChange = (val: string | number) => {
    setView(val as View);
  };

  return (
    <div className="w-full space-y-5">
      <Segmented
        block
        options={["Yearly", "Monthly", "Daily"]}
        value={view}
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
        className="max-w-sm mb-2"
      />
      <div className="w-full bg-black text-white rounded-xl space-y-2 shadow p-4">
        <h1 className="font-semibold">{view}</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.data || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                tick={{ fill: 'white', fontSize: 12, fontWeight: 500 }}
                dataKey="name"
              />
              <YAxis
                tick={{ fill: 'white', fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#1890ff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>

        )}
      </div>
    </div>
  );
};

export default LineChartComponent;
