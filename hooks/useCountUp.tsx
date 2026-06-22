'use client';

import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      const startTime = performance.now();
      const difference = end - start;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function - easeOutQuart for smooth deceleration
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const currentCount = start + difference * easeOutQuart;
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    animate();
  }, [isVisible, start, end, duration]);

  const formatNumber = (num: number) => {
    return num.toFixed(decimals);
  };

  return {
    count,
    displayValue: `${prefix}${formatNumber(count)}${suffix}`,
    ref,
    isVisible,
  };
}

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const { displayValue, ref } = useCountUp({
    start: 0,
    end: value,
    suffix,
    prefix,
    duration,
    decimals,
  });

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
