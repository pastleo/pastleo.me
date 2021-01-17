import { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';

const TYPING_INTERVAL = 48;

import styles from '../../styles/components/about/code-typer.module.scss';

const Line = ({ line, typingLineIndex, lineIndex, onLineFinished }) => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (lineIndex !== typingLineIndex) return;
    const interval = setInterval(() => {
      setLength(l => l + 1);
    }, TYPING_INTERVAL);
    return () => clearInterval(interval);
  }, [line, typingLineIndex]);

  useEffect(() => {
    if (length >= line.length) {
      onLineFinished();
    }
  }, [line, length]);

  return length > 0 && <pre className='whitespace-normal my-1'>{ line.substr(0, length) }</pre>;
};

const CodeTyper = ({ lines }) => {
  const [typingLineIndex, setTypingLineIndex] = useState(0);

  const onLineFinished = useCallback(() => {
    setTypingLineIndex(l => l + 1);
  }, []);

  useEffect(() => () => {
    setTypingLineIndex(0);
  }, [lines]);

  return (
    <div className={classnames(styles.textTyper, 'p-4')}>
      { lines.map((line, index) => (
        <Line
          key={`${index}-${line}`}
          line={line}
          typingLineIndex={typingLineIndex}
          lineIndex={index}
          onLineFinished={onLineFinished}
        />
      )) }
    </div>
  );
};

export default CodeTyper;
