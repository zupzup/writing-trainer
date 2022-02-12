import './App.css';
import Header from './Header';
import Text from './Text';
import Timer from './Timer';
import Words from './Words';
import { useReducer } from 'react';

type WordState = {
  word: String,
  used: boolean,
};

type State = {
  running: boolean,
  currentTimer: number,
  words: WordState[],
};

type StartPayload = {
  minutes: number,
  words: String[],
};


export type Action = 
  | { type: 'start'; payload: StartPayload }
  | { type: 'reset' }
  | { type: 'tick' };

const initialState: State = {
  running: false,
  currentTimer: 0,
  words: []
};


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'start': {
      return {
        running: true,
        currentTimer: action.payload.minutes * 60,
        words: action.payload.words.map((word: String) => ({ word, used: false })),
      }
    }
    case 'tick': {
      let newTimer = state.currentTimer - 1;
      return {
        running: newTimer === 0 ? false : state.running,
        currentTimer: newTimer,
        words: state.words,
      }
    }
    case 'reset': {
      return initialState;
    }
    default:
      return initialState;
  }
};


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startWriting = (minutes: number, words: number) => {
    // TODO: get amount of words from API
    dispatch({ type: 'start', payload: {
      minutes,
      words: []
    }});

  };

  const stopWriting = () => {
    dispatch({ type:'reset' });
  };

  return (
    <div className="App">
      <div className="Inner">
        <Header 
          startWriting={startWriting}
          running={state.running}
          stopWriting={stopWriting}
        />
        <Words />
        <Text />
        <Timer 
          timer={state.currentTimer}
          running={state.running}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}

export default App;
