import { useState, useEffect } from "react";
import "./App.scss";
import Input from "./components/Input.tsx";
import TimerDisplay from "./components/TimerDisplay.tsx";
import ActionBtn from "./components/ActionBtn.tsx";

function App() {
  const [timerValue, setTimerValue] = useState(0);
  const [startValue, setStartValue] = useState(0);

  const progress = startValue > 0 ? timerValue / startValue : 1;

  useEffect(() => {
    document.body.style.setProperty("--timer-progress", progress.toString());
  }, [progress]);

  return (
    <div className="section-timer">
      <TimerDisplay timerValue={timerValue} startValue={startValue} />
      <Input startValue={startValue} setTimerValue={setTimerValue} setStartValue={setStartValue} />
      <ActionBtn setTimerValue={setTimerValue} startValue={startValue} />
    </div>
  );
}

export default App;
