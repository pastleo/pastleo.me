import { useState, useEffect, useCallback } from 'react';

const TYPING_INTERVAL = 48;

const Line = ({ line, typingLineIndex, lineIndex, onLineFinished }) => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (lineIndex !== typingLineIndex) return;
    const interval = setInterval(() => {
      setLength(l => l + 1);
    }, TYPING_INTERVAL);
    return () => clearInterval(interval);
  }, [lineIndex, typingLineIndex]);

  useEffect(() => {
    if (length >= line.length) {
      onLineFinished();
    }
  }, [line, length, onLineFinished]);

  return length > 0 && <pre className='whitespace-normal my-1'>{ line.substr(0, length) }</pre>;
};

const Space = ({ typingLineIndex, lineIndex, onLineFinished }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (lineIndex !== typingLineIndex) return;
    const timeout = setTimeout(() => {
      setShown(true);
    }, TYPING_INTERVAL);
    return () => clearInterval(timeout);
  }, [lineIndex, typingLineIndex]);

  useEffect(() => {
    if (shown) {
      onLineFinished();
    }
  }, [shown, onLineFinished]);

  return shown && <div className='h-8' />;
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
    <>
      { lines.map((line, index) => (
        line ? (
          <Line
            key={`${index}-${line}`}
            line={line}
            typingLineIndex={typingLineIndex}
            lineIndex={index}
            onLineFinished={onLineFinished}
          />
        ) : (
          <Space
            key={`${index}-${line}`}
            typingLineIndex={typingLineIndex}
            lineIndex={index}
            onLineFinished={onLineFinished}
          />
        )
      )) }
    </>
  );
};

export default CodeTyper;
