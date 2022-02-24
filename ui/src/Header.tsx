import './Header.css';
import { useState, ChangeEvent } from 'react';

function Header(props: { 
  startWriting: (minutes: number, words: number, lang: String) => void,
  stopWriting: () => void,
  running: boolean,
}) {
  const [numberOfWords, setNumberOfWords] = useState(5);
  const [numberOfMinutes, setNumberOfMinutes] = useState(7);
  const [lang, setLang] = useState("de");

  const handleNumberOfWordsInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfWords(parseInt(event.target.value || "5"));
  };

  const handleNumberOfMinutesInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfMinutes(parseInt(event.target.value || "7"));
  };

  const handleLangChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.value);
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
        <input checked={lang == "de" ? true : false} type="radio" name="lang" value="de" id="de" onChange={handleLangChange} />
        <span>DE</span>
        <input checked={lang == "en" ? true : false} type="radio" name="lang" value="en" id="en" onChange={handleLangChange} />
        <span>EN</span>
      </span>
      <span>
        {!props.running ? <button onClick={() => { props.startWriting(numberOfMinutes, numberOfWords, lang)}}>Start</button> : <button onClick={() => { props.stopWriting() }}>Stop</button>}
      </span>
    </div>
  );
}

export default Header;
