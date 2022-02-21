import './Text.css';
import { ChangeEvent } from 'react';

function Text(props: {
  updateText: (event: ChangeEvent<HTMLTextAreaElement>) => void,
}) {
  return (
    <div className="Text">
      <textarea placeholder="Start Typing..." onChange={props.updateText} />
    </div>
  );
}

export default Text;
