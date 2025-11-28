import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const factorColors = {
  time: '#60a5fa',
  physical: '#c084fc',
  mental: '#fb923c',
  constraints: '#f87171',
};

export default function DistributionChart({ members }) {
  const data = members.map((entry) => ({
    name: entry.member.name || 'Unnamed',
    time: Number(entry.factorPercentages.time?.toFixed(1) || 0),
    physical: Number(entry.factorPercentages.physical?.toFixed(1) || 0),
    mental: Number(entry.factorPercentages.mental?.toFixed(1) || 0),
    constraints: Number(entry.factorPercentages.constraints?.toFixed(1) || 0),
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
          <YAxis unit="%" tick={{ fill: '#94a3b8' }} />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Legend />
          {Object.keys(factorColors).map((factor) => (
            <Bar key={factor} dataKey={factor} stackId="a" fill={factorColors[factor]} radius={factor === 'constraints' ? [12, 12, 0, 0] : 0} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
