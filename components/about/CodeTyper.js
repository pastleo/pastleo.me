import { useState, useEffect, useCallback } from 'react';

const TYPING_INTERVAL = 48;

const Line = ({ line, reveal, typingLineIndex, lineIndex, onLineFinished }) => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (reveal) return setLength(line.length);
    if (lineIndex !== typingLineIndex) return;
    const interval = setInterval(() => {
      setLength(l => l + 1);
    }, TYPING_INTERVAL);
    return () => clearInterval(interval);
  }, [line, reveal, lineIndex, typingLineIndex]);

  useEffect(() => {
    if (length >= line.length) {
      onLineFinished();
    }
  }, [line, length, onLineFinished]);

  return length > 0 && <pre className='whitespace-normal my-1'>{ line.substr(0, length) }</pre>;
};

const Space = ({ typingLineIndex, reveal, lineIndex, onLineFinished }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reveal) return setShown(true);
    if (lineIndex !== typingLineIndex) return;
    const timeout = setTimeout(() => {
      setShown(true);
    }, TYPING_INTERVAL);
    return () => clearInterval(timeout);
  }, [lineIndex, typingLineIndex, reveal]);

  useEffect(() => {
    if (shown) {
      onLineFinished();
    }
  }, [shown, onLineFinished]);

  return shown && <div className='h-8' />;
};

const CodeTyper = ({ lines, reveal }) => {
  const [key, setKey] = useState(0);
  const [typingLineIndex, setTypingLineIndex] = useState(0);

  const onLineFinished = useCallback(() => {
    setTypingLineIndex(l => l + 1);
  }, []);

  useEffect(() => () => {
    setKey(n => n + 1);
    setTypingLineIndex(0);
  }, [lines]);

  return (
    <>
      { lines.map((line, index) => (
        line ? (
          <Line
            key={`${key}-${index}`}
            line={line}
            typingLineIndex={typingLineIndex}
            lineIndex={index}
            onLineFinished={onLineFinished}
            reveal={reveal}
          />
        ) : (
          <Space
            key={`${key}-${index}`}
            typingLineIndex={typingLineIndex}
            lineIndex={index}
            onLineFinished={onLineFinished}
            reveal={reveal}
          />
        )
      )) }
    </>
  );
};

export default CodeTyper;
