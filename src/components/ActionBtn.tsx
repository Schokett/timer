import "./ActionBtn.scss";

function ActionBtn() {
  return (
    <div className="section-timer__btn-container">
      <button className="section-timer__start btn">Start</button>
      <button className="section-timer__pause btn">Pause</button>
      <button className="section-timer__Reset btn">Reset</button>
    </div>
  );
}

export default ActionBtn;
