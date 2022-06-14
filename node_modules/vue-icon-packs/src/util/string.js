const { ToWords } = require('to-words');
const toWords = new ToWords();

module.exports = {
  toPascalCase: (str) => {
    return str
      .replace(/^[a-z]|/, (match) => match.toUpperCase())
      .replace(/(?<=-)./g, (match) => match.toUpperCase());
  },
  intToWords: (str) => {
    return str.replace(/^[0-9]+/, (match) => {
      return toWords.convert(match).replace(/\s/g, '');
    });
  },
};
