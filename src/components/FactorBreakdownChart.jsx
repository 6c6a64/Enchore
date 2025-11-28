import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const colors = {
  time: '#60a5fa',
  physical: '#c084fc',
  mental: '#fb923c',
  constraints: '#f87171',
};

export default function FactorBreakdownChart({ data }) {
  const chartData = [
    { name: 'Time', value: data.time },
    { name: 'Physical', value: data.physical },
    { name: 'Mental', value: data.mental },
    { name: 'Constraints', value: data.constraints },
  ];

  return (
    <div className="h-32 w-full">
      <ResponsiveContainer>
        <BarChart data={chartData} layout="vertical">
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis type="category" dataKey="name" width={80} />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Bar dataKey="value" radius={8}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={colors[entry.name.toLowerCase()]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
