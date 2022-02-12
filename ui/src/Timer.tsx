import './Timer.css';
import { useEffect, Dispatch } from 'react';
import { Action } from './App';

function Timer(props: { timer: number, running: boolean, dispatch: Dispatch<Action> }) {
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

  return (
    <div className="Timer">
      {props.timer}
    </div>
  );
}

export default Timer;
