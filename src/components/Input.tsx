import "./Input.scss";

type Props = {
  timerValue: number;
  setTimerValue: (value: number) => void;
  setStartValue: (value: number) => void;
};

function Input({ timerValue, setTimerValue, setStartValue }: Props) {
  return (
    <div>
      <p className="section-timer__title">Zeit festlegen:</p>
      <input
        type="number"
        className="section-timer__timer-input"
        placeholder="0"
        value={timerValue}
        onChange={(event) => {
          const value = Number(event.target.value);
          setTimerValue(value);
          setStartValue(value);
        }}
      />
    </div>
  );
}

export default Input;
