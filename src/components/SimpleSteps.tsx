import { Compass, Sparkles, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export default function SimpleSteps() {
  const steps = [
    {
      num: 1,
      title: 'Start to Get Started',
      description: 'Register with our recommended binary options broker in less than 2 minutes and connect your account.',
      icon: <Compass className="w-5 h-5 text-[#F5B400]" />
    },
    {
      num: 2,
      title: 'Synchronize Signals',
      description: 'Connect your Telegram ID to our priority delivery bot. Receive real-time high-accuracy entry alerts.',
      icon: <Sparkles className="w-5 h-5 text-[#F5B400]" />
    },
    {
      num: 3,
      title: 'Execute & Win Options',
      description: 'Place specified CALL/PUT trades on IQ Option or PocketOption, manage risk, and enjoy direct GCash/bank cashouts.',
      icon: <Trophy className="w-5 h-5 text-[#F5B400]" />
    }
  ];

  return (
    <div className="p-4 rounded-xl border-2 border-[#0A3D91] bg-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5B400]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="pb-3 border-b border-gray-200 mb-3 flex items-center justify-between">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0A3D91]">
          Simple to Get Started
        </h3>
        <span className="text-[10px] text-[#F5B400] bg-[#0A3D91] px-2 py-0.5 rounded font-mono font-bold">
          3 STEP GUIDE
        </span>
      </div>

      {/* Steps List */}
      <motion.div 
        className="space-y-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {steps.map((step) => (
          <motion.div
            key={step.num}
            variants={{
              hidden: { opacity: 0, x: -30, scale: 0.95 },
              show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }
            }}
            whileHover={{ scale: 1.03, x: 4, transition: { duration: 0.2 } }}
            className="flex gap-4 items-center p-3 sm:p-4 rounded-full bg-[#0A3D91] border-2 border-[#F5B400] relative overflow-hidden hover:border-[#F5B400] transition duration-300 shadow-md min-h-[76px] cursor-pointer"
          >
            {/* White circle containing number badge */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F5B400] text-[#1F2937] font-display font-black text-lg flex-shrink-0 shadow-md z-10">
              {step.num}
            </div>

            <div className="flex-1 min-w-0 pr-8 z-10">
              <h4 className="text-xs sm:text-sm font-display font-black text-white uppercase tracking-wider">
                {step.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-blue-100 mt-0.5 leading-tight line-clamp-2">
                {step.description}
              </p>
            </div>

            {/* Golden ornate scrollwork on the right */}
            <svg
              className="absolute right-0 top-0 h-full w-24 text-[#F5B400]/30 pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M100,0 C80,20 60,40 60,50 C60,60 80,80 100,100" />
              <path d="M100,20 C85,35 85,65 100,80" />
              <path d="M100,40 C95,45 95,55 100,60" />
              <circle cx="95" cy="15" r="1.5" fill="currentColor" />
              <circle cx="85" cy="50" r="1.5" fill="currentColor" />
              <circle cx="95" cy="85" r="1.5" fill="currentColor" />
            </svg>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
