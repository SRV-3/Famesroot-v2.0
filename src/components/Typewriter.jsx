import { useState, useEffect } from 'react';

export default function Typewriter({ 
  words, 
  speed = 100, 
  deleteSpeed = 50, 
  delay = 2000, 
  className = "",
  textClassName = "",
  cursorClassName = "bg-primary"
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      // Typing text
      timer = setTimeout(() => {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
      }, speed);
    }

    // Handle deletions and transitions
    if (!isDeleting && currentText === currentWord) {
      // Finished typing, pause before delete
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      // Finished deleting, transition to next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, delay]);

  return (
    <span className={`${className} inline-flex items-center`}>
      <span className={textClassName}>{currentText}</span>
      <span className={`inline-block w-[3.5px] h-[0.75em] ml-1 animate-pulse ${cursorClassName}`} style={{ verticalAlign: 'middle' }} />
    </span>
  );
}
