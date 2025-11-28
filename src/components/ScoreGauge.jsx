import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { scoreColor } from '../utils/chartHelpers';

export default function ScoreGauge({ score }) {
  const data = [{ name: 'score', value: Math.round(score), full: 100 }];
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer>
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          startAngle={180}
          endAngle={0}
          data={data}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background
            clockWise
            dataKey="value"
            cornerRadius={15}
            fill={scoreColor(score)}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="relative -top-24 text-center text-3xl font-bold text-white">{Math.round(score)}</div>
    </div>
  );
}
