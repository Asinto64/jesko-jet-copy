'use client';

import { useState, useEffect } from 'react';

export function useImagePreloader(imageUrls: string[]) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) return;

    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    imageUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setLoaded(true);
        }
      };
      // To handle errors so we don't block forever
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setLoaded(true);
        }
      };
      imgArray[i] = img;
    });

    setImages(imgArray);
  }, [imageUrls]);

  return { images, loaded };
}
