import { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import WelcomeScreen from './screens/WelcomeScreen';
import HouseholdSetup from './screens/HouseholdSetup';
import ChoreSelection from './screens/ChoreSelection';
import ChoreAssignment from './screens/ChoreAssignment';
import ChoreRating from './screens/ChoreRating';
import MemberWeighting from './screens/MemberWeighting';
import Results from './screens/Results';
import { useEnchore } from './context/EnchoreContext';

const steps = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'household', label: 'Household' },
  { id: 'chores', label: 'Chores' },
  { id: 'assignment', label: 'Assign' },
  { id: 'rating', label: 'Rate' },
  { id: 'weights', label: 'Weights' },
  { id: 'results', label: 'Insights' },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const { resetSimulation } = useEnchore();

  const goTo = (stepIndex) => {
    setCurrentStep((prev) => {
      const clamped = Math.min(Math.max(stepIndex, 0), steps.length - 1);
      setFurthestStep((prevFurthest) => Math.max(prevFurthest, clamped));
      return clamped;
    });
  };

  const handleRestart = () => {
    resetSimulation();
    setCurrentStep(0);
    setFurthestStep(0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen onStart={() => goTo(1)} />;
      case 1:
        return <HouseholdSetup onNext={() => goTo(2)} />;
      case 2:
        return <ChoreSelection onBack={() => goTo(1)} onNext={() => goTo(3)} />;
      case 3:
        return <ChoreAssignment onBack={() => goTo(2)} onNext={() => goTo(4)} />;
      case 4:
        return <ChoreRating onBack={() => goTo(3)} onNext={() => goTo(5)} />;
      case 5:
        return <MemberWeighting onBack={() => goTo(4)} onNext={() => goTo(6)} />;
      case 6:
        return <Results onRestart={handleRestart} onAdjustWeights={() => goTo(5)} onReassign={() => goTo(3)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ProgressBar steps={steps} currentStep={currentStep} furthestStep={furthestStep} onStepSelect={goTo} />
        <div className="rounded-3xl border border-white/5 bg-slate-900/70 p-8 shadow-2xl">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
