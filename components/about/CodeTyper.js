import { useState, useEffect, useCallback } from 'react';

const TYPING_INTERVAL = 48;

const Line = ({ line, reveal, typingLineIndex, lineIndex, onLineFinished }) => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (reveal || lineIndex !== typingLineIndex) return;

    const interval = setInterval(() => {
      setLength(l => l + 1);
    }, TYPING_INTERVAL);
    return () => clearInterval(interval);
  }, [reveal, lineIndex, typingLineIndex]);

  useEffect(() => {
    if (lineIndex !== typingLineIndex || length < line.length) return;

    onLineFinished();
  }, [lineIndex, typingLineIndex, length, line, onLineFinished]);


  return (
    <pre className='whitespace-normal my-1'>{ reveal ? line : line.substr(0, length) }</pre>
  );
};

const Space = ({ children, typingLineIndex, reveal, lineIndex, onLineFinished }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reveal || lineIndex !== typingLineIndex) return;

    const timeout = setTimeout(() => {
      setShown(true);
    }, TYPING_INTERVAL);
    return () => clearInterval(timeout);
  }, [reveal, lineIndex, typingLineIndex]);

  useEffect(() => {
    if (lineIndex !== typingLineIndex || !shown) return;

    onLineFinished();
  }, [lineIndex, typingLineIndex, shown, onLineFinished]);

  return (shown || reveal) && (children ? children : <div className='h-8' />);
};

const CodeTyper = ({ lines, reveal: revealProp, className }) => {
  const [key, setKey] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [typingLineIndex, setTypingLineIndex] = useState(0);

  const onLineFinished = useCallback(() => {
    setTypingLineIndex(l => l + 1);
  }, []);

  useEffect(() => {
    if (revealProp) setRevealed(true);
  }, [revealProp]);

  useEffect(() => () => {
    setRevealed(false);
    setKey(n => n + 1);
    setTypingLineIndex(0);
  }, [lines]);

  return (
    <div className={className} onClick={() => {
      setRevealed(true);
    }}>
      { lines.map((line, index) => (
        typeof line === 'string' && line.length > 0 ? (
          <Line
            key={`${key}-${index}`}
            line={line}
            typingLineIndex={typingLineIndex}
            lineIndex={index}
            onLineFinished={onLineFinished}
            reveal={revealed}
          />
        ) : (
          <Space
            key={`${key}-${index}`}
            typingLineIndex={typingLineIndex}
            lineIndex={index}
            onLineFinished={onLineFinished}
            reveal={revealed}
          >{ line }</Space>
        )
      )) }
    </div>
  );
};

export default CodeTyper;
