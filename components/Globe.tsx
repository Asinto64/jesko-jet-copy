'use client';

export function Globe() {
  return (
    <div className="relative h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
      >
        <source src="/globe-loop.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none p-8">
        <h2 className="text-6xl md:text-9xl font-light tracking-[0.2em] text-white uppercase text-center drop-shadow-2xl">
          AISILTO
        </h2>
        <p className="mt-8 text-xl text-gray-300 font-light tracking-widest uppercase text-center max-w-xl drop-shadow-lg">
          The world is yours.
        </p>
      </div>

      <div className="absolute bottom-10 z-10 text-xs tracking-widest text-gray-500 uppercase">
        © {new Date().getFullYear()} AISILTO. All rights reserved.
      </div>
    </div>
  );
}
