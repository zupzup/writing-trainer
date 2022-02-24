import './Timer.css';
import { useEffect, Dispatch } from 'react';
import { Action } from './App';

function Timer(props: { timer: number, running: boolean, stopTime: Date | null,  dispatch: Dispatch<Action> }) {
  useEffect(() => {
    let interval: any;
    if (props.running) {
      interval = setInterval(() => {
        props.dispatch({ type: 'tick' })
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);

  });
  const now: number = new Date().valueOf();
  let diff = props.stopTime ? (props.stopTime.valueOf() - now) / 1000 : 0;
  if (diff <= 0) {
    diff = 0;
  }

  return (
    <div className="Timer" key={props.timer}>
      {Math.round(diff)}
    </div>
  );
}

export default Timer;
