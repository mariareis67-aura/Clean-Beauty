import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + Math.random() * 18 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-nude-50 dark:bg-neutral-950"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8"
          >
            <span className="font-display text-5xl font-light tracking-[0.3em] text-neutral-800 dark:text-neutral-100 uppercase">
              Clean
            </span>
            <br />
            <span className="font-display text-2xl font-light tracking-[0.5em] text-nude-500 uppercase">
              Beauty
            </span>
          </motion.div>

          <div className="w-48 mx-auto">
            <div className="h-px bg-nude-100 dark:bg-neutral-800 overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  background: 'linear-gradient(90deg, #c4955e, #f59e0b, #c4955e)',
                  backgroundSize: '200% 100%',
                }}
                animate={{ width: `${Math.min(progress, 100)}%`, backgroundPosition: ['0% 0%', '200% 0%'] }}
                transition={{ width: { duration: 0.2 }, backgroundPosition: { duration: 1.5, repeat: Infinity } }}
              />
            </div>
            <p className="mt-4 font-sans text-xs tracking-[0.3em] uppercase text-nude-400">
              {Math.min(Math.floor(progress), 100)}%
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-12 font-sans text-xs tracking-[0.2em] uppercase text-nude-300"
        >
          Premium Skincare
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
