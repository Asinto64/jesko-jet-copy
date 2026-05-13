'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';

const FRAME_COUNT = 120;
const images = Array.from({ length: FRAME_COUNT }, (_, i) => 
  `/sequence-1/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
);

export function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images: loadedImages, loaded } = useImagePreloader(images);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [1, 1, 0, 0]);

  useEffect(() => {
    if (!loaded || !canvasRef.current || loadedImages.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (index: number) => {
      const img = loadedImages[Math.round(index)];
      if (img && img.complete) {
        // Draw image covering the canvas (object-cover equivalent)
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

    // Render first frame immediately
    render(0);

    // Subscribe to frame changes
    const unsubscribe = frameIndex.on('change', (latest) => {
      render(latest);
    });

    // Handle resize
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
          className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none"
        >
          <h1 className="text-5xl md:text-8xl font-light tracking-[0.2em] text-white uppercase opacity-90 text-center mix-blend-difference">
            Above the Clouds
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 font-light tracking-widest uppercase max-w-2xl text-center mix-blend-difference">
            Experience the pinnacle of luxury aviation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
