import { useState } from "react";
import "./App.scss";
import Input from "./components/Input.tsx";
import TimerDisplay from "./components/TimerDisplay.tsx";
import ActionBtn from "./components/ActionBtn.tsx";

function App() {
  const [timerValue, setTimerValue] = useState(0);
  const [startValue, setStartValue] = useState(0);

  return (
    <div className="section-timer">
      <TimerDisplay timerValue={timerValue} />
      <Input startValue={startValue} setTimerValue={setTimerValue} setStartValue={setStartValue} />
      <ActionBtn setTimerValue={setTimerValue} startValue={startValue} />
    </div>
  );
}

export default App;
