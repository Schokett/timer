import { useState, useEffect } from "react";
import "./App.scss";
import Input from "./components/Input.tsx";
import TimerDisplay from "./components/TimerDisplay.tsx";
import ActionBtn from "./components/ActionBtn.tsx";

function App() {
  const [timerValue, setTimerValue] = useState(0);
  const [startValue, setStartValue] = useState(0);
  const progress = startValue > 0 ? timerValue / startValue : 1;
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    document.body.style.setProperty("--timer-progress", progress.toString());
  }, [progress]);

  function triggerWarning() {
    setHasError(true);
    setTimeout(() => setHasError(false), 1500);
  }

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
      />
    </div>
  );
}

export default App;
