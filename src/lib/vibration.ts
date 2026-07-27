export function triggerVibration(pattern: number | number[] = 50) {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export function hapticFeedback(type: 'light' | 'medium' | 'heavy' = 'medium') {
  const patterns: Record<string, number> = {
    light: 30,
    medium: 50,
    heavy: 80,
  };
  triggerVibration(patterns[type]);
}
