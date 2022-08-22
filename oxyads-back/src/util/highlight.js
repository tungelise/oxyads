exports.highlightText = (sentence, wordToHighlight) => {

  let highlightedText = sentence.toLowerCase();

  if (wordToHighlight.length > 0) {
    for (let w of wordToHighlight) {
      if (w === highlightedText) {
        highlightedText = "{{" + w + "}}";
      } else {
        highlightedText = highlightedText.replace(w + ' ', "{{" + w + "}} ");
        highlightedText = highlightedText.replace(' ' + w + ' ', " {{" + w + "}}");
        highlightedText = highlightedText.replace(' ' + w, " {{" + w + "}}");
      }
    }
  }

  return highlightedText;
}
