# Jesko Jets Cinematic Experience

## 🛩️ Project Overview
Jesko Jets is a high-end, premium, and cinematic web experience designed to showcase luxury aviation. Built on a modern tech stack, the project leverages advanced scroll-linked animations, sophisticated typography, and a polished dark-mode aesthetic. 

The core of the experience revolves around "scrollytelling"—where the user's scroll position drives dynamic 3D graphic sequences and smooth opacity transitions, delivering a seamless and engaging storytelling journey.

## ✨ Key Features
- **Cinematic Scrollytelling:** Interactive image sequence animations controlled directly by scroll position.
- **High-Fidelity Canvas Rendering:** Implemented custom device pixel ratio scaling (`devicePixelRatio`) to ensure crystal clear, unpixelated graphics on high-DPI displays (like Retina screens).
- **Smooth Scrolling Engine:** Integration of **Lenis** to provide a buttery smooth scrolling experience, essential for precise scroll-linked animations.
- **Fluid Micro-Animations:** Driven by **Framer Motion**, offering dynamic text opacity, transform updates, and layout morphing.
- **Image Preloading System:** A custom React hook (`useImagePreloader`) ensuring all heavy image frames are loaded prior to execution, avoiding stuttering or blank canvas flashes.

## 🛠️ Technical Architecture & Procedure

### 1. The Canvas Sequence Rendering (`PlaneMorph.tsx` & `HeroScroll.tsx`)
Rather than relying on video elements which can be difficult to scrub smoothly backwards and forwards, the project uses a sequence of high-resolution images rendered onto an HTML5 `<canvas>`. 

- As the user scrolls, `framer-motion`'s `useScroll` hook maps the vertical scroll progress (`[0, 1]`) to the total number of frames.
- A `requestAnimationFrame` loop efficiently redraws the canvas whenever the frame index changes.

### 2. Device Pixel Ratio (DPI) Optimization
To achieve premium visual perfection, the canvas context is scaled according to the user's screen density. This procedure prevents the rendering distortions and blurriness typically associated with standard canvas drawings on modern displays.

### 3. Smooth Scroll Provider (`SmoothScrollProvider.tsx`)
Lenis is implemented at the root layout to override the browser's default scroll behavior. This ensures that the scrolling values fed into Framer Motion are interpolated smoothly, removing any jerky mouse-wheel steps and resulting in a cinematic 60FPS animation.

### 4. Deployment on Vercel
The project is built on Next.js App Router and optimized for immediate deployment on Vercel. Vercel acts as the hosting environment, utilizing its edge network for rapid delivery of the heavy image assets required for the scrollytelling experience.

## 🚀 Getting Started Locally

First, install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License
This project is private and intended for portfolio and direct domain deployment purposes.
