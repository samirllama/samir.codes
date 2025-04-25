"use client";

import { useState, useEffect } from "react";

const charset = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// SplitFlapCharacter Component
function SplitFlapCharacter({ target }: { target: string }) {
  const [displayed, setDisplayed] = useState(" ");
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (displayed === target) return;

    const flip = () => {
      setIsFlipping(true);
      setTimeout(() => {
        setDisplayed((prev) => {
          const currentIndex = charset.indexOf(prev);
          const nextIndex = (currentIndex + 1) % charset.length;
          return charset[nextIndex];
        });
        setIsFlipping(false);
        if (displayed !== target) {
          setTimeout(flip, 50);
        }
      }, 300);
    };

    flip();
  }, [target, displayed]);

  return <div className={`flap ${isFlipping ? "flip" : ""}`}>{displayed}</div>;
}

// SplitFlapDisplay Component
function SplitFlapDisplay({ text }) {
  const rows = text.length;
  const cols = text[0].length;

  return (
    <div className="display-container">
      <div className={`grid grid-rows-${rows} grid-cols-${cols} gap-1`}>
        {text.map((row, rowIndex) =>
          row
            .split("")
            .map((char, colIndex) => (
              <SplitFlapCharacter
                key={`${rowIndex}-${colIndex}`}
                target={char}
              />
            ))
        )}
      </div>
    </div>
  );
}

// HeroSection Component
export default function HeroSection() {
  const messages = [
    ["Welcome to My Website", "Explore My Work and Projects"],
    ["About Me", "Learn More About My Journey"],
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = messages[currentMessageIndex];

  return (
    <section className="hero max-w-4xl mx-auto">
      <SplitFlapDisplay text={currentMessage} />
    </section>
  );
}
