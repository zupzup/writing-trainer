import './Text.css';
import { ChangeEvent } from 'react';

function Text(props: {
  updateText: (event: ChangeEvent<HTMLTextAreaElement>) => void,
  running: boolean,
}) {
  return (
    <div className="Text">
      <textarea disabled={!props.running} placeholder="Start Typing..." onChange={props.updateText} />
    </div>
  );
}

export default Text;
