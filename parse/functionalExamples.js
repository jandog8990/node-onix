/**
 * This file contains example on using keys, values and 
 * objects to exclude if/else statements from code and other
 * ways to create ONIX functions using key/value pairs instead
 * of big IF/ELSE etc.
 */
 

 /**
  * Week and weekend figure outter 
  * @param {*} inputDate 
  */
 const weekendOrWeekday = (inputDate) => {
  const day = inputDate.getDay();
  return weekendOrWeekday.labels[day] || 
         weekendOrWeekday.labels['default'];
};
weekendOrWeekday.labels = { 
  0: 'weekend', 
  6: 'weekend', 
  default: 'weekday' 
};
console.log(weekendOrWeekday(new Date()));

/**
 * Converter function taking in IDs used in map 
 * @param {*} id 
 */
const convert = (id) => {
    return id + 1;
}
var onixActions = {};
onixActions["convert_id"] = convert;
var newId = onixActions["convert_id"](2);
console.log("New id = " + newId);

/**
 * Doubler function for doubling numbers, text and functions
 * using a switch statement
 */
/*
 const doubler = (input) => {
  switch (typeof input) {
    case 'number':
      return input + input;
    case 'string':
      return input
        .split('')
        .map((letter) => letter + letter)
        .join('');
    case 'object':
      Object.keys(input)
            .map((key) => (input[key] = doubler(input[key])));
      return input;
    case 'function':
      input();
      input();
  }
}
console.log(doubler(-10));
console.log(doubler('hey'));
console.log(doubler([5, 'hello']));
console.log(doubler({ a: 5, b: 'hello' }));
console.log(
  doubler(function() {
    console.log('call-me');
  }),
);
*/

/**
 * Doubler function using functional programming, this is cool
 * create an object of functions (map of keys to functions)
 */
// Map containing types to functions
const doubler = (input) => {
  return operationsByType[typeof input](input);
};
operationsByType = {
  number: (input) => input + input,
  string: (input) =>
    input
      .split('')
      .map((letter) => letter + letter)
      .join(''),
  function: (input) => {
    input();
    input();
  },
  object: (input) => {
    Object.keys(input)
          .map((key) => (input[key] = doubler(input[key])));
    return input;
  },
};
console.log(doubler(-10));
console.log(doubler('hey'));
console.log(doubler([5, 'hello']));
console.log(doubler({ a: 5, b: 'hello' }));
console.log(
  doubler(function() {
    console.log('call-me');
  }),
);