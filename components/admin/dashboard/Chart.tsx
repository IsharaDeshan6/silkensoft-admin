"use client";

import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";

interface iAppProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

interface Data {
  date: string;
  revenue: number;
}

const aggregateData = (data: Data[]): { date: string; revenue: number }[] => {
  const aggregated = data.reduce((acc: Record<string, number>, curr: Data) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue;
    } else {
      acc[curr.date] = curr.revenue;
    }
    return acc;
  }, {});

  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }));
};

export function Chart({ data }: iAppProps) {
  const proccesedData = aggregateData(data);
  return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={proccesedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
              type="monotone"
              stroke="#3b82f6"
              activeDot={{ r: 8 }}
              dataKey="revenue"
          />
        </LineChart>
      </ResponsiveContainer>
  );
}
