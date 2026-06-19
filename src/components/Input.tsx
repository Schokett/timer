import "./Input.scss";

type Props = {
  startValue: number;
  setTimerValue: (value: number) => void;
  setStartValue: (value: number) => void;
  hasError: boolean;
};

function Input({ startValue, setTimerValue, setStartValue, hasError }: Props) {
  return (
    <div>
      {/* <p className="section-timer__title">Zeit festlegen:</p> */}
      <input
        type="number"
        min={0}
        className={`section-timer__timer-input ${hasError ? "is-invalid" : ""}`}
        value={startValue === 0 ? "" : startValue}
        autoFocus
        onKeyDown={(event) => {
          if (event.key === "-" || event.key === "Subtract") {
            event.preventDefault();
          }
        }}
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
