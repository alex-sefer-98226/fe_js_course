function divider() {
  console.log("========================");
}
// console.log("123", 123, "123" == 123);

// const result = String(355);

// console.log(result, typeof result);

// console.log("Hello " + "World!");

// const defaultValue = 467;

// console.log(defaultValue, typeof defaultValue);

// const var1 = defaultValue + "";

// console.log(var1, typeof var1);
// console.log("=========================");
// console.log(String(123)); // '123'
// console.log(String(-12.3)); // '-12.3'
// console.log(String(null), null); // 'null'
// console.log(String(undefined), undefined); // 'undefined'
// console.log(String(true), true); // 'true'
// console.log(String(false)); // 'false'

// const a = 2;
// const b = 2;
// console.log(a == b);

// const symbol1 = Symbol("1");
// const symbol2 = Symbol("1");

// console.log(symbol1 == symbol2);

// Boolean

// console.log(Boolean("some string"));

// const age = 32;

// if (age < 18) {
//   alert("Рекомендуем покинуть наш сайт"); // 1
// } else {
//   alert("Приветствуем"); //2
// }

// if ("строка") {
//   console.log("Зашло в условие");
// }
// const userInput = prompt("Введите значение");

// const value = false || 0 || null || userInput || "something else";

// let x = "hello" && 123 && {} && "sdfjgnljkdnsg";

// console.log(value);

// console.log("\n");
// console.log(-0);

// Number

// console.log(Number("1234"), "1234"); // explicit

// console.log(+"1234", "1234"); // explicit

// console.log(+null);
// console.log(5 / null);

// console.log(Number(true));
// console.log(4 > "5");

// Boolean for Objects

// 1.

// const human = {
//   hands: 2,
// };

// console.log(Boolean(human));

// console.log(Boolean({}));

// console.log(human + ""); // to string

// console.log(human + 1); // to number

// console.log("1" + 1);

// console.log(1 + +"1");

// const superHuman = {
//   name: "Super Human",

//   // for string
//   toString: function () {
//     return "Привет, я сверхчеловек";
//   },
//   // for number
//   valueOf: function () {
//     return 2022;
//   },
// };

// console.log(superHuman);
// console.log(superHuman + "");
// console.log(superHuman + 1);

// console.log(Boolean([1]));
// console.log(Number("bar"));
// console.log("true" == true);

// console.log(String(["x", "y"]));

// console.log(Number.MAX_SAFE_INTEGER);
// console.log(Number.MIN_SAFE_INTEGER);

// console.log(0.1 + 0.2 == 0.3);

// y = x+32;

function firstFunc(arg1, arg2) {
  // наши действия
  console.log("Привет");
}

// firstFunc();
// firstFunc();
// firstFunc();

// function firstFuncWithArgs(
//   first = "Первый аргумент по умолчанию",
//   second = 32
// ) {
//   console.log("Привет, Вы передали следующие аргументы", first, second);
// }

// const a = "Первый";
// const b = "Второй";
// firstFuncWithArgs();
// firstFuncWithArgs(a);
// firstFuncWithArgs(a, b);

// divider();
// divider();
// divider();
// divider();
// divider();

// function y(x) {
//   console.log("Результат = ", x + 32);
// }

// y(-32);
// y(0);
// y(32);
// divider();
// function sum(a, b) {
//   console.log(a + b);
// }

// sum(2, 5);
// sum(5, 35);

// divider();

// const someVariable = divider;

// console.log("123124125");

// someVariable();

// let say = function () {
//   console.log("Say func was used");
// };

// say();

// function useArgFuncThreeTimes(func) {
//   func();
//   func();
//   func();
// }

// useArgFuncThreeTimes(divider);

// firstFuncWithArgs();

// divider();

// firstFuncWithArgs("Test", "String");

// firstFuncWithArgs("Test", "String", "third");
// divider();

// function funcWithUnlimitedArgs(...args) {
//   console.log("Аргументы, которые вы передали", args);
// }

// funcWithUnlimitedArgs(1, 2, 3, 4, 5, 7, "test", {}, null);

// divider();

// function myFunc(a, b, ...args) {
//   console.log("A -", a);
//   console.log("B-", b);
//   console.log("Аргументы, которые вы передали", args);
// }

// myFunc(1, 2, 3, 4, 5, 7, "test", {}, null);

function sumWithReturn(a, b) {
  console.log("Before return");
  return a + b + 1;
  console.log("After return");
}

// let result = sumWithReturn(3, 9);
// console.log(result);

// console.log(++result);

// console.log(result * 2);

divider();

// console.log(sumWithReturn());
// console.log(sum(1, 3));

// function sum(a, b) {
//   return a + b;
// }

// const sumArrows = (a, b) => a + b;

// console.log(sumArrows(2, 5));

// function getPiNumber() {
//   return 3.1415926;
// }

// console.log(getPiNumber() + 1);
// console.log(getPiNumber() + 1);
// console.log(getPiNumber() + 1);
// console.log(getPiNumber() + 1);

// let mangal = [];

// console.log(mangal);
// divider();

// mangal = ["курица", "свинина", "картошка"];
// console.log(mangal);

// Индексирование (отсчёт) начинается не с 1, а с 0

// console.log(mangal[1]);

// console.log(mangal[10]);

function printAndDivide(...args) {
  divider();
  console.log(...args);
}

// const arr = [
//   1,
//   2,
//   printAndDivide,
//   [1, 2, 3, 4],
//   null,
//   {},
//   undefined,
//   true,
//   Symbol("test"),
//   BigInt(32),
// ];

// printAndDivide(arr);

// printAndDivide(arr[3][1]);

// const newArray = [1, 2, 3];
// printAndDivide(newArray);

// newArray[1] = "Changed";
// printAndDivide(newArray);

const obj = {
  // properties
  name: "Tester",
  age: 145,
  // methods
  test: function () {
    console.log("Hi");
  },
  testWithReturn: function () {
    return "Hi with return";
  },
};

console.log(obj.name);
console.log(obj.age);

obj.test();

console.log(obj.testWithReturn());

const someString = "Какая-то важная и не очень длинная строка";

printAndDivide(someString[4]);
printAndDivide(someString.length);

someString[4] = "I";

printAndDivide(someString);

// let names = "Вася, Петя, Маша";

// console.log(names);
// console.log("====");

// console.log(names.split(", "));

// console.log(names.split("я"));

// console.log(someString.toLowerCase());
// console.log(someString.toUpperCase());

// console.log(someString.indexOf("я"));
// console.log(someString[4]);

// console.log(someString.indexOf("g"));

// console.log(someString.slice(5));
// console.log(someString.slice(5, 10));

// console.log(someString.replace("длинная", "test"));

// array methods

const arr = [1, 2, 3, 4, 5, "test"];
//
// console.log(arr.toString());
// console.log(arr.join("_-_"));
// console.log(arr.join(", "));

// printAndDivide(arr);
// arr.unshift("зааншифтили");
// printAndDivide(arr);
// arr.push("запушили");
// printAndDivide(arr);

// const item = arr.shift();
// printAndDivide(arr);
// console.log(item);
// arr.pop();
// printAndDivide(arr);

// concat, slice, splice

// const arr2 = [0, -1, -3, -4];
// console.log(arr.concat(arr2));

// //slice
// const newArray = arr.slice(2);
// console.log(newArray, arr);

// // splice
// arr.splice(2, 0, 7, 7, 7);
// console.log(arr);

// function forEachHelper(element, index, arr) { // ничего не должна возвращать
//   console.log(element);
//   console.log(index);
//   console.log(arr);
// }

// arr.forEach(forEachHelper);

// arr.forEach((item, index, arr) => {
//   console.log("From arrow func", item, index, arr);
// });

// function mapHelper(element, index, arr) { // должна возвращать новый элемент
//   if (element == 2) {
//     return "Поймали";
//   }

//   if (element % 2 == 0) {
//     return "abc";
//   }

//   return element + 35;
// }

// console.log(arr.map(mapHelper));

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function filterHelper(item, i, arr) {
//   // return true || false
//   if (item % 2 === 0) {
//     return true;
//   } else {
//     return false;
//   }
// }

// console.log(numbers.filter(filterHelper));

let symbols = ["b", "c", "a", "e", "d"];
console.log(symbols.sort());

let notOnlyNumbers = [1, 5, 2, 3, 12, 13, 0, "test", null, undefined];
// console.log(numbers.sort());

// function sortHelper(a, b) {
//   // return -1, 1, 0;
//   if (a > b) {
//     return 1;
//   } else if (a == b) {
//     return 0;
//   } else {
//     return -1;
//   }
// }

// console.log(numbers.sort(sortHelper));

// find, some, every

// some

console.log(
  notOnlyNumbers.some((item, index, arr) => {
    if (typeof item == "object") {
      return true;
    } else {
      return false;
    }
  })
);

// every

console.log(
  notOnlyNumbers.every((item, index, arr) => {
    if (item === "hi") {
      return false;
    } else {
      return true;
    }
  })
);

// find

function findHelper(i, index, arr) {
  // return true || false
  if (typeof i === "object") {
    return true;
  }
  return false;
}

console.log(notOnlyNumbers.find(findHelper));
console.log(
  notOnlyNumbers.find((item, index, arr) => {
    if (item == "laskdlfkm") {
      return true;
    }
    return false;
  })
);

function func1() {
  return "sdkjfnskjdnf";
}

function func2() {
  console.log("alskdmaksmdlm");
}

func2();

let pi = func2();

let x = func1();

console.log(pi);

console.log(x);
console.log(x);
console.log(x);
console.log(x);
console.log(x);
