'use client';

import { motion, useReducedMotion } from 'motion/react';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInView({ children, delay = 0, className }: FadeInViewProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
