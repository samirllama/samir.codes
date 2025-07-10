const AnimatedTitle = () => {
  const renderWord = (word: string) => (
    <div className="inline-block whitespace-nowrap">
      {word.split("").map((char, index) => (
        <div key={index} className="inline-block opacity-100 transform-none">
          {char}
        </div>
      ))}
      {"\u00A0"}
    </div>
  );

  return (
    <h1 className="header-title opacity-100">
      {renderWord("Last")}
      {renderWord("art")}
      <br /> {/* JSX line break */}
      {renderWord("Projects")}
    </h1>
  );
};

export default AnimatedTitle;
