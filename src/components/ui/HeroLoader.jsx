import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroLoader = ({ progress, onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      const timer1 = setTimeout(() => {
        setIsFinished(true);
      }, 400); // small delay at 100%
      
      const timer2 = setTimeout(() => {
        onComplete();
      }, 1200); // wait for exit animation to finish
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, borderRadius: "0%" }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            borderRadius: "0 0 50% 50%",
            transition: { duration: 0.8, ease: [0.77, 0.02, 0.24, 1.02] }
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#fcf8fa] p-8 md:p-12 overflow-hidden"
        >
          {/* Top text */}
          <div className="flex justify-start pt-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase"
            >
              Anchorstone Global
            </motion.h1>
          </div>

          {/* Middle Line */}
          <div className="w-full flex items-center justify-start my-8 relative h-[4px]">
             <div className="absolute inset-0 bg-slate-200/50 w-full rounded-full" />
             <motion.div 
               className="h-full bg-slate-900 rounded-full origin-left relative z-10"
               initial={{ width: "0%" }}
               animate={{ width: `${progress}%` }}
               transition={{ ease: "easeOut", duration: 0.3 }}
             />
          </div>

          {/* Bottom Counter */}
          <div className="flex justify-end items-end pb-4">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-[8rem] sm:text-[12rem] md:text-[18rem] font-light leading-none tracking-tighter text-slate-900 select-none overflow-hidden"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              <div className="flex items-baseline">
                <span>{Math.round(progress)}</span>
                <span className="text-4xl md:text-6xl ml-2 font-normal opacity-50">%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
