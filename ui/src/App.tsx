import './App.css';
import Header from './Header';
import Text from './Text';
import Timer from './Timer';
import Words from './Words';
import { useReducer, ChangeEvent } from 'react';
import axios, {AxiosResponse as Response, AxiosError} from 'axios';

export type WordState = {
  word: string,
  used: boolean,
};

type State = {
  running: boolean,
  currentTimer: number,
  stopTime: Date | null,
  words: WordState[],
};

type StartPayload = {
  minutes: number,
  words: string[],
};


export type Action = 
  | { type: 'start'; payload: StartPayload }
  | { type: 'reset' }
  | { type: 'updateWords', payload: WordState[] }
  | { type: 'tick' };

const initialState: State = {
  running: false,
  currentTimer: 0,
  words: [],
  stopTime: null,
};


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'start': {
      const stopTime = new Date();
      stopTime.setMinutes(stopTime.getMinutes() + action.payload.minutes);
      return {
        running: true,
        currentTimer: action.payload.minutes * 60,
        words: action.payload.words.map((word: string) => ({ word, used: false })),
        stopTime,
      }
    }
    case 'tick': {
      let newTimer = state.currentTimer - 1;
      return {
        running: newTimer === 0 ? false : state.running,
        currentTimer: newTimer,
        words: state.words,
        stopTime: state.stopTime,
      }
    }
    case 'updateWords': {
      return {
        running: state.running,
        currentTimer: state.currentTimer,
        words: action.payload,
        stopTime: state.stopTime,
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
    axios.get(`http://localhost:8080/words/de/${words}`)
      .then((response: Response) => {
        const words = response.data.words;
        dispatch({ type: 'start', payload: {
          minutes,
          words
        }});
      })
      .catch((error: AxiosError) => {
        alert(`error while fetching words: ${error}`);
      });
  };

  const updateText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    dispatch({
      type: 'updateWords',
      payload: state.words.map((w: WordState) => {
        return {
          word: w.word,
          used: text.includes(w.word),
        };
      })
    });
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
        <Words words={state.words} />
        <Text updateText={updateText}/>
        <Timer 
          timer={state.currentTimer}
          running={state.running}
          dispatch={dispatch}
          stopTime={state.stopTime}
        />
      </div>
    </div>
  );
}

export default App;
