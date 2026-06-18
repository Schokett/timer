import "./App.css";
import Input from "./components/Input.tsx";
import TimerDisplay from "./components/TimerDisplay.tsx";
import ActionBtn from "./components/ActionBtn.tsx";

function App() {
  return (
    <div className="section-timer">
      <Input />
      <TimerDisplay />
      <ActionBtn />
    </div>
  );
}

export default App;
