const playTone = (
  audioCtx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
) => {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
};

export function playCyberAlarm(audioCtx: AudioContext) {
  const schedule = () => {
    const now = audioCtx.currentTime;

    playTone(audioCtx, 600, now, 0.12);
    playTone(audioCtx, 900, now + 0.1, 0.15);

    playTone(audioCtx, 600, now + 0.4, 0.12);
    playTone(audioCtx, 900, now + 0.5, 0.15);

    playTone(audioCtx, 600, now + 0.8, 0.12);
    playTone(audioCtx, 900, now + 0.9, 0.15);
  };

  if (audioCtx.state === "suspended") {
    audioCtx.resume().then(schedule);
  } else {
    schedule();
  }
}
