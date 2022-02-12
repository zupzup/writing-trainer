import './Header.css';
import { useState, ChangeEvent } from 'react';

function Header(props: { 
  startWriting: (minutes: number, words: number) => void,
  stopWriting: () => void,
  running: boolean,
}) {
  const [numberOfWords, setNumberOfWords] = useState(5);
  const [numberOfMinutes, setNumberOfMinutes] = useState(7);

  const handleNumberOfWordsInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfWords(parseInt(event.target.value || "5"));
  };

  const handleNumberOfMinutesInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfMinutes(parseInt(event.target.value || "7"));
  };

  return (
    <div className="Header">
      <span>
        <input onChange={handleNumberOfWordsInput} type="text" placeholder="Number of Words" />
      </span>
      <span>
        <input onChange={handleNumberOfMinutesInput} type="text" placeholder="Number of Minutes" />
      </span>
      <span>
        {!props.running ? <button onClick={() => { props.startWriting(numberOfMinutes, numberOfWords)}}>Start</button> : <button onClick={() => { props.stopWriting() }}>Stop</button>}
      </span>
    </div>
  );
}

export default Header;
