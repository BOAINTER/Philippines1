import { FeatureItem } from '../types';
import * as LucideIcons from 'lucide-react';
import { Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface FeaturesGridProps {
  features: FeatureItem[];
}

export default function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div id="features" className="p-5 rounded-2xl border-2 border-[#0A3D91] bg-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#F5B400]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="pb-4 border-b border-gray-200 mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0A3D91]">
            FEATURES
          </h2>
          <h3 className="text-xl font-display font-black text-[#1F2937] mt-0.5">
            Precision Ecosystem
          </h3>
        </div>
        <span className="text-[10px] text-[#F5B400] bg-[#0A3D91] px-2.5 py-1 rounded font-mono font-bold inline-flex items-center gap-1">
          <span>BOA INTERNATIONAL</span>
          <Globe className="w-3 h-3 text-[#F5B400]" />
        </span>
      </div>

      {/* Grid of 8 features */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
      >
        {features.map((feature, idx) => {
          // Dynamic Lucide icon lookup safely
          const IconComponent = (LucideIcons as any)[feature.iconName] || LucideIcons.HelpCircle;

          return (
            <motion.div
              key={feature.id}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 220, damping: 18 } }
              }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="p-5 rounded-2xl border-2 border-[#0A3D91] bg-[#0A3D91] text-white shadow-md transition-all flex flex-col items-center text-center justify-between cursor-pointer hover:border-[#F5B400]"
            >
              <div>
                {/* Gold icon center-aligned */}
                <div className="text-[#F5B400] mb-3 flex items-center justify-center">
                  <IconComponent className="w-8 h-8" />
                </div>

                <h4 className="text-sm font-display font-black text-white tracking-wide uppercase">
                  {feature.title}
                </h4>
                <p className="text-[10px] text-blue-100 mt-2 leading-relaxed max-w-[200px]">
                  {feature.description}
                </p>
              </div>

              {/* Card visual footer */}
              <div className="mt-4 pt-2.5 border-t border-white/20 w-full text-center text-[8px] font-sans font-black text-[#F5B400] uppercase tracking-widest">
                BOA INTERNATIONAL ACADEMY
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
