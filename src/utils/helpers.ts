
export function formatNumberToCurrency(number:string):string {
  if(number.length <= 3) {
    return number;
  }
  const splitNumber = number.split('').reverse();
  let counter = 1;
  const currencyNumber: string[] = [];
  splitNumber.forEach(n => {
    if(counter%3 == 0 && counter!=splitNumber.length) {
      counter++;
      currencyNumber.push(n);
      currencyNumber.push('.')
    }else {
      counter++
      currencyNumber.push(n);
    }
  })
  return currencyNumber.reverse().join('');
}