import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';

const factorColors = {
  time: '#60a5fa',
  physical: '#c084fc',
  mental: '#fb923c',
  constraints: '#f87171',
};

export default function WeightDonutChart({ weights = {} }) {
  const safeWeights = { time: 0, physical: 0, mental: 0, constraints: 0, ...weights };
  const data = Object.entries(safeWeights).map(([key, value]) => ({
    name: key,
    value: Number((value * 100).toFixed(1)),
  }));

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} innerRadius={50} outerRadius={80} strokeWidth={2}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={factorColors[entry.name]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
