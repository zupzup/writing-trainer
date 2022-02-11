import './App.css';
import Header from './Header';
import Text from './Text';
import Timer from './Timer';
import Words from './Words';

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

type Action = 
  | { type: 'start'; payload: StartPayload }
  | { type: 'reset' };

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
    case 'reset': {
      return initialState;
    }
    default:
      return initialState;
  }
};

function App() {
  return (
    <div className="App">
      <div className="Inner">
        <Header />
        <Words />
        <Text />
        <Timer />
      </div>
    </div>
  );
}

export default App;
