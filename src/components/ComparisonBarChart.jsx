import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { scoreColor } from '../utils/chartHelpers';

export default function ComparisonBarChart({ members }) {
  const data = members
    .map((entry) => ({ name: entry.member.name || 'Unnamed', score: Math.round(entry.totalScore) }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" hide domain={[0, 'dataMax']} />
          <YAxis dataKey="name" type="category" width={120} />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Bar dataKey="score" radius={12}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={scoreColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
