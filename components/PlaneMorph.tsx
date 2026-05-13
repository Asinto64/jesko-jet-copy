'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';

const FRAME_COUNT = 120;
const images = Array.from({ length: FRAME_COUNT }, (_, i) => 
  `/sequence-2/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
);

export function PlaneMorph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images: loadedImages, loaded } = useImagePreloader(images);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!loaded || !canvasRef.current || loadedImages.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (index: number) => {
      const img = loadedImages[Math.round(index)];
      if (img && img.complete) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let w = canvas.width;
        let h = canvas.height;
        let x = 0;
        let y = 0;

        if (canvasRatio > imgRatio) {
          h = canvas.width / imgRatio;
          y = (canvas.height - h) / 2;
        } else {
          w = canvas.height * imgRatio;
          x = (canvas.width - w) / 2;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, w, h);
      }
    };

    render(0);

    const unsubscribe = frameIndex.on('change', (latest) => {
      render(latest);
    });

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      render(frameIndex.get());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [loaded, loadedImages, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full object-cover" />
        
        {/* Overlay Content */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-32 p-8 pointer-events-none"
        >
          <h2 className="text-4xl md:text-7xl font-light tracking-[0.15em] text-white uppercase opacity-90 text-center mix-blend-difference">
            Unrivaled Engineering
          </h2>
          <p className="mt-4 text-md md:text-lg text-gray-400 font-light tracking-widest uppercase max-w-3xl text-center mix-blend-difference">
            Precision morphs into unparalleled performance.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
