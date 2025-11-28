const colorMap = {
  time: 'text-blue-400',
  physical: 'text-purple-400',
  mental: 'text-amber-400',
  constraints: 'text-rose-400',
};

export default function WeightSlider({ factor, value = 0, onChange }) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className={colorMap[factor]}>{factor.charAt(0).toUpperCase() + factor.slice(1)}</span>
        <span>{Math.round(safeValue * 100)}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(safeValue * 100)}
        onChange={(event) => onChange(Number(event.target.value) / 100)}
        className="h-2 w-full cursor-pointer rounded-full bg-slate-800"
      />
    </div>
  );
}
