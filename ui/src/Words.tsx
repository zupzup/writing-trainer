import './Words.css';
import { WordState } from './App';

function Words(props: { words: WordState[] }) {
  return (
    <div className="Words">
      {
        props.words.map((word: WordState) => {
          return <span key={`${word.word}`} className={ word.used ? "active" : "inactive"}>
            {word.word}
          </span>
        })
      }
    </div>
  );
}

export default Words;
