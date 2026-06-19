import "./TimerDisplay.scss";

type Props = {
  timerValue: number;
};

function TimerDisplay({ timerValue }: Props) {
  return (
    <div>
      <p className="section-timer__title-left">
        Time left <br></br>
        <span>{timerValue.toFixed(3).replace(".", ":")}</span>
      </p>
    </div>
  );
}

export default TimerDisplay;
