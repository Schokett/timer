import { useRef } from "react";
import "./ActionBtn.scss";

type Props = {
  setTimerValue: React.Dispatch<React.SetStateAction<number>>;
  startValue: number;
};

function ActionBtn({ setTimerValue, startValue }: Props) {
  const intervalRef = useRef<number | null>(null);
  console.log("ActionBtn Rendered mit startValue:", startValue);

  function startTimer() {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTimerValue((prev) => {
        if (prev <= 0.01) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 0.01;
      });
    }, 10);
  }

  function pauseTimer() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    }
  }

  function resetTimer() {
    console.log("startValue beim Reset:", startValue);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimerValue(startValue);
  }

  return (
    <div className="section-timer__btn-container">
      <button className="section-timer__start btn" onClick={startTimer}>
        Start
      </button>
      <button className="section-timer__pause btn" onClick={pauseTimer}>
        Pause
      </button>
      <button className="section-timer__Reset btn" onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}

export default ActionBtn;
