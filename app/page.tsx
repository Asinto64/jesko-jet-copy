'use client';

import { HeroScroll } from '@/components/HeroScroll';
import { PlaneMorph } from '@/components/PlaneMorph';
import { Globe } from '@/components/Globe';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="bg-[#050505]">
      <HeroScroll />
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ margin: "-20% 0px -20% 0px" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="h-[50vh] bg-[#050505] flex items-center justify-center"
      >
        <p className="text-gray-500 tracking-[0.3em] uppercase text-sm font-light">
          Scroll to discover
        </p>
      </motion.div>
      
      <PlaneMorph />
      
      <Globe />
    </main>
  );
}
