import { useState } from 'react';

const useCapitalization = (initialString = '') => {
  const [text, setText] = useState(initialString);

  const capitalizeFirstLetter = (str:string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizeEachWord = (str :string) => {
    return str
      .split(' ')
      .map(word => capitalizeFirstLetter(word))
      .join(' ');
  };

  const updateText = (newText :string) => {
    setText(newText);
  };

  return {
    text,
    capitalizeFirstLetter,
    capitalizeEachWord,
    updateText
  };
};

export default useCapitalization;