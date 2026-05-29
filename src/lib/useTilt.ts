import { useState, useRef, MouseEvent, useCallback } from 'react';

export function useTilt(maxTilt = 15) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const tiltX = (y - 0.5) * maxTilt * -1;
    const tiltY = (x - 0.5) * maxTilt;
    setStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
    });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.3s ease-out'
    });
  }, []);

  return { ref, style, handleMouseMove, handleMouseLeave };
}
