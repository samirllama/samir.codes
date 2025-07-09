const AnimatedTitle = () => {
  // Helper function to render a word
  const renderWord = (word: string) => (
    <div className="inline-block whitespace-nowrap">
      {word.split("").map((char, index) => (
        <div
          key={index} // Using index as key is acceptable here as the list is static
          className="inline-block opacity-100" // Tailwind for opacity: 1
          className="transform-none"
        >
          {char}
        </div>
      ))}
      {"\u00A0"} {/* Unicode for non-breaking space */}
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
