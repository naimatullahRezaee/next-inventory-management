"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface chartData {
  week: string;
  products: number;
}
const ProductsChart = ({ data }: { data: chartData[] }) => {
  return (
    <div className="w-full h-48 min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="week"
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <YAxis
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Area
            type="monotone"
            dataKey="products"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", r: 2 }}
            activeDot={{ fill: "#8b5cf6", r: 4 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ color: "#374151", fontWeight: "500" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductsChart;
