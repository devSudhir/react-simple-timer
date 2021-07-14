import "./styles.css";
import { Timer } from "./components/Timer";

import { useEffect, useState, useRef } from "react";
export default function App() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startRef = useRef();
  console.log(start, end);
  useEffect(() => {
    if (!isRunning && end !== start) {
      handleStart();
    }
    return () => {
      if (start === end - 1) {
        clearInterval(startRef.current);
        setIsRunning(!isRunning);
        //setStart(0);
        console.log("re2", startRef.current);
      }
    };
  }, [start]);
  const handleStart = () => {
    const id = setInterval(() => setStart((prev) => prev + 1), 1000);
    startRef.current = id;
    console.log("ref", startRef.current);
    setIsRunning(!isRunning);
  };
  const handleForm = (e) => {
    e.preventDefault();
    if (Number(e.target.second.value) > Number(e.target.first.value)) {
      setStart(Number(e.target.first.value));
      setEnd(Number(e.target.second.value));
    }
    e.target.first.value = "";
    e.target.second.value = "";
  };

  return (
    <div className="App">
      <h1>Timer start-end</h1>
      <form onSubmit={handleForm}>
        <input type="number" name="first" placeholder="start" />
        <br />
        <br />
        <input type="Number" name="second" placeholder="End" />
        <br />
        <br />
        <button type="submit">Start</button>
      </form>
      <Timer first={start} />
    </div>
  );
}
