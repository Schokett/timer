import { useState, useEffect, useRef } from "react";
import "./App.scss";
import Input from "./components/Input.tsx";
import TimerDisplay from "./components/TimerDisplay.tsx";
import ActionBtn from "./components/ActionBtn.tsx";

function App() {
  const [timerValue, setTimerValue] = useState(0);
  const [startValue, setStartValue] = useState(0);
  const progress = startValue > 0 ? timerValue / startValue : 1;
  const [hasError, setHasError] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  function triggerWarning() {
    setHasError(true);
    setTimeout(() => setHasError(false), 1500);
  }

  function getAudioCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  function playPingSound() {
    const audioCtx = getAudioCtx();

    const playTone = (frequency, startTime, duration) => {
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

    const schedule = () => {
      const now = audioCtx.currentTime;

      playTone(600, now, 0.12);
      playTone(900, now + 0.1, 0.15);

      playTone(600, now + 0.4, 0.12);
      playTone(900, now + 0.5, 0.15);

      playTone(600, now + 0.8, 0.12);
      playTone(900, now + 0.9, 0.15);
    };

    if (audioCtx.state === "suspended") {
      audioCtx.resume().then(schedule);
    } else {
      schedule();
    }
  }
  useEffect(() => {
    document.body.style.setProperty("--timer-progress", progress.toString());
  }, [progress]);

  useEffect(() => {
    if (timerValue === 0 && startValue > 0) {
      playPingSound();
      setStartValue(0);
    }
  }, [timerValue, startValue]);

  return (
    <div className="section-timer">
      <TimerDisplay timerValue={timerValue} />
      <Input
        startValue={startValue}
        setTimerValue={setTimerValue}
        setStartValue={setStartValue}
        hasError={hasError}
      />
      <ActionBtn
        setTimerValue={setTimerValue}
        startValue={startValue}
        onInvalidTime={triggerWarning}
        onStart={() => {
          const ctx = getAudioCtx();
          if (ctx.state === "suspended") ctx.resume();
        }}
      />
    </div>
  );
}

export default App;
