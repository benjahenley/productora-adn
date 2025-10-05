import { useState, useEffect } from "react";

export const useTypewriter = (
  text,
  speed = 50,
  startDelay = 0,
  enabled = true
) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText("");
      setIsComplete(false);
      return;
    }

    let timeout;
    let index = 0;
    setDisplayedText("");
    setIsComplete(false);

    const startTyping = () => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setIsComplete(true);
      }
    };

    timeout = setTimeout(startTyping, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay, enabled]);

  return { displayedText, isComplete };
};
