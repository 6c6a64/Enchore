export default function ProgressBar({ steps, currentStep, furthestStep = currentStep, onStepSelect }) {
  const progressPercent = (furthestStep / (steps.length - 1 || 1)) * 100;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-widest text-slate-500">
        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            onClick={() => index <= furthestStep && onStepSelect?.(index)}
            disabled={index > furthestStep}
            className="flex flex-1 flex-col items-center text-center focus:outline-none"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition ${
                index <= furthestStep
                  ? 'border-brand-teal bg-brand-teal text-white'
                  : 'border-white/10 bg-slate-900 text-slate-400'
              } ${index <= furthestStep ? 'cursor-pointer' : 'cursor-not-allowed'} ${
                index === currentStep ? 'ring-2 ring-brand-teal/70' : ''
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-[0.65rem] text-slate-400">{step.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 h-1 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-brand-teal transition-all" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  );
}
