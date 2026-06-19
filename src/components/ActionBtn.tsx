import { useRef, useState } from "react";
import "./ActionBtn.scss";

type Props = {
  setTimerValue: React.Dispatch<React.SetStateAction<number>>;
  startValue: number;
  onInvalidTime: () => void;
};

function ActionBtn({ setTimerValue, startValue, onInvalidTime }: Props) {
  const intervalRef = useRef<number | null>(null);
  const [activeBtn, setActiveBtn] = useState<"start" | "pause" | "reset" | null>(null);

  function startTimer() {
    if (intervalRef.current) return;

    if (startValue <= 0) {
      onInvalidTime();
      return;
    }
    setActiveBtn("start");
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
      setActiveBtn("pause");
    }
  }

  function resetTimer() {
    console.log("startValue beim Reset:", startValue);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimerValue(startValue);
    setActiveBtn("reset");
  }

  return (
    <div className="section-timer__btn-container">
      <button
        className={`section-timer__start btn ${activeBtn === "start" ? "is-active" : ""}`}
        onClick={startTimer}>
        Start
      </button>
      <button
        className={`section-timer__start btn ${activeBtn === "pause" ? "is-active" : ""}`}
        onClick={pauseTimer}>
        Pause
      </button>
      <button
        className={`section-timer__start btn ${activeBtn === "reset" ? "is-active" : ""}`}
        onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}

export default ActionBtn;
