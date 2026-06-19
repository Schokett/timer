import { useState, useEffect, useRef } from "react";
import "./App.scss";
import Input from "./components/Input.tsx";
import TimerDisplay from "./components/TimerDisplay.tsx";
import ActionBtn from "./components/ActionBtn.tsx";
import { playCyberAlarm } from "./utils/audio.ts";

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

  useEffect(() => {
    const minutes = Math.floor(timerValue / 60);
    const seconds = Math.floor(timerValue % 60);

    const formatted = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    document.title = `${formatted} | Timer`;
  }, [timerValue]);

  useEffect(() => {
    document.body.style.setProperty("--timer-progress", progress.toString());
  }, [progress]);

  useEffect(() => {
    if (timerValue === 0 && startValue > 0) {
      const ctx = getAudioCtx();
      playCyberAlarm(ctx);
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
