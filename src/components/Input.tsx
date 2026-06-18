import "./Input.scss";

function Input() {
  return (
    <div>
      <p className="section-timer__title">Zeit festlegen:</p>
      <input type="number" className="section-timer__timer-input" placeholder="0" />
    </div>
  );
}

export default Input;
