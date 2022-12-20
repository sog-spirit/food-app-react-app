export const toPrice = (price) => {
    const str = price.toString();
    let count = 0;
    let newStr = '';
    for (let i = str.length - 1; i >= 0; i--) {
      count++;
      if (count > 3) {
        newStr = str.charAt(i) + '.' + newStr;
        count = 1;
      } else {
        newStr = str.charAt(i) + newStr;
      }
    }
    return newStr;
  };