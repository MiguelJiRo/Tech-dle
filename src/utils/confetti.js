const prefersReducedMotion = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const COLORS = ['#10b981', '#3b82f6', '#9333ea', '#f59e0b', '#ef4444'];

export const fireWinConfetti = async () => {
  if (prefersReducedMotion()) return;
  try {
    const { default: confetti } = await import('canvas-confetti');
    confetti({
      particleCount: 140,
      spread: 80,
      startVelocity: 45,
      origin: { y: 0.65 },
      colors: COLORS,
      disableForReducedMotion: true,
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: COLORS,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: COLORS,
        disableForReducedMotion: true,
      });
    }, 220);
  } catch {
    // canvas-confetti failed to load; just skip the celebration silently
  }
};
