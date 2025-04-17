import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Panel1Chart = ({ data }) => {
  const formatted = data?.prices?.map(([time, price]) => ({
    time: new Date(time).toLocaleDateString(),
    price: Number(price.toFixed(2)),
  }));

  return (
    <div>
      <h3>Market Price Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatted}>
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Panel1Chart;