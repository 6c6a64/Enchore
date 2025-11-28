import { motion } from 'framer-motion';
import { ArrowRight, Scale } from 'lucide-react';

const heroGradient = 'from-cyan-400/80 via-sky-500/80 to-indigo-500/80';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`rounded-3xl bg-gradient-to-r ${heroGradient} p-10 text-slate-950 shadow-2xl`}
      >
        <div className="flex items-center gap-4 text-3xl font-semibold">
          <Scale className="h-10 w-10" />
          Enchore
        </div>
        <p className="mt-4 max-w-2xl text-base text-slate-900/90">
          Run a quick load check: add your household members, pick chores, see how the work splits.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-slate-900/50"
        >
          Start Simulation
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Create your household',
            description: 'Add names for your household members.',
          },
          {
            title: 'Score chores',
            description: 'Rate time, physical, mental, constraints.',
          },
          {
            title: 'Review spread',
            description: 'See totals and tweak fast.',
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
