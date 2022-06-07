function divider() {
  console.log("========================");
}

// divider();

// const obj = {
//   name: "Some name",
//   age: 42,
//   job: "Developer",
//   "some-another-title": "test",
// };

// console.log(obj.some);

// console.log("a" + "ge");

// console.log(obj["a" + "ge"]);

// const property = "job";

// console.log(obj[property]);

// obj["job-title"] = "Senior";

// console.log(obj);

// divider();
// divider();

// let counter = 1; // 0
// console.log("Before cycle");

// while (counter != 0) {
//   console.log(counter);
//   --counter; // counter = counter - 1
// }

// do {
//   console.log(counter--);
// } while (counter > 0);

// console.log("After cycle");

// for (let index = 0; index <= 3; index++) {
//   console.log(index);
// }
// divider();
// const arr = [1, 2, 3, 4, 5, 6];

// const res = [];
// for (let index = 0; index < arr.length; index++) {
//   if (arr[index] % 2 == 0) {
//     // Парное число
//     console.log(arr[index]);
//   } else {
//     // Непарное число
//     console.log("Непарный элемент");
//     res.push(arr[index]);
//   }
// }
// console.log(res);

// for..of
// for (const item of arr) {
//   console.log(item);
// }

// const forOfObject = {
//   name: "Some name",
//   age: 42,
//   job: "Developer",
//   "some-another-title": "test",
// };

// // for..in
// for (const key in forOfObject) {
//   const a = 3;
//   console.log("Key: ", key);
//   console.log("Value: ", forOfObject[key]);
//   divider();
// }

// const arrForContinueAndBreak = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// divider();
// for (let index = 0; index < arrForContinueAndBreak.length; index++) {
//   if (arrForContinueAndBreak[index] > 3 && arrForContinueAndBreak[index] <= 5) {
//     continue; // for 4 and 5
//   }

//   console.log(arrForContinueAndBreak[index]);
//   if (arrForContinueAndBreak[index] == 8) {
//     break;
//   }
//   // ...
// }
// divider();

// alert("Hello!");
// const userInput = prompt("Введите букву") || "Default value";

// console.log(`User entered: ${userInput}`);
// console.log(`User's message type: ${typeof userInput}`);

// const userAccepted = confirm("Are you sure?");

// console.log(userAccepted);

// Pure functions and High Order Funcs

// const sum = (x, y) => {
//   return x + y;
// };

// console.log(sum(2, 2));
// console.log(sum(2, 2));
// console.log(sum(2, 2));
// console.log(sum(2, 2));
// console.log(sum(2, 2));

// let x = 2;

// function anotherFunc(y) {
//   x += y;
//   return x;
// }

// console.log(anotherFunc(2));
// console.log(anotherFunc(2));
// console.log(anotherFunc(2));
// console.log(anotherFunc(2));
// console.log(anotherFunc(2));

// Side effect
// const getDate = () => {

//   return Date.now(); //
// };

// console.log(getDate());
// for (let i = 0; i < 10000; i++) {}
// console.log(getDate());

// console.log(getDate());

// console.log(getDate());

// console.log(getDate());

// const objMutation = (key, value, object) => {
//   object.surname = "another value";
//   object[key] = value;
//   return object;
// };
// const person = {
//   name: "Bobo",
//   surname: "Test",
// }; // person

// console.log(person);

// const result = objMutation("shoeSize", 400, person); //

// console.log(result, person);
// divider();
// const objMutationWithCopy = (key, value, object) => {
//   return {
//     ...object,
//     surname: "another value",
//     [key]: value,
//   };
// };

// const secondPerson = {
//   name: "Bobo",
//   surname: "Test",
// };
// console.log(secondPerson);
// const secondResult = objMutationWithCopy("shoeSize", 400, secondPerson); //

// console.log(secondResult, secondPerson);

// const arr = [1, 2, 3, 4, 5];

// const secondArray = arr.map((item, index) => {
//   return `Item #${index}, value: ${item}`;
// });

// divider();

// console.log(arr, secondArray);

// function highOrderFunction(a) {
//   console.log("Hi new arg");
//   a();
//   console.log("Bye");
// }

// function hello() {
//   console.log("Hello");
// }

// // highOrderFunction(hello);

// function secondHighOrderFunc() {
//   let counter = 0;
//   //
//   return function () {
//     return counter++;
//   };
// }

// counter = 0;
// console.log("Another counter", counter);
// let variable = secondHighOrderFunc(); // return function

// console.log(variable());
// console.log(variable());
// console.log(variable());
// console.log(variable());
// console.log(variable());
// console.log(variable());

// function greetCurried(greeting) {
//   // return function

//   return function (name) {
//     return greeting + ", " + name;
//   };
// }

// let helloFunc = greetCurried("Hello");

// console.log(helloFunc("Andrew"));
// console.log(helloFunc("Inna"));
// console.log(helloFunc("Anatoliy"));

// let byeFunc = greetCurried("Good night");

// console.log(byeFunc("Alexey"));
// console.log(byeFunc("Vladimir"));

// function curriedSum(a) {
//   // return function

//   return function (b) {
//     return a + b;
//   };
// }

// const plusFifteen = curriedSum(15);
// // 5 + 15
// // 17 + 15
// // 345 + 15

// console.log(plusFifteen(5));
// console.log(plusFifteen(17));
// console.log(plusFifteen(345));

// // let greetHello = greetCurried("Hello");
// // greetHello("Heidi"); //"Hello, Heidi"
// // greetHello("Eddie"); //"Hello, Eddie"

// function curry(f) {
//   // curry(f) выполняет каррирование
//   return function (a) {
//     return function (b) {
//       return f(a, b);
//     };
//   };
// }
// // использование
// function sum(a, b) {
//   return a + b;
// }

// let newCarriedSum = curry(sum);

// const minusFifty = newCarriedSum(-50);

// divider();

// console.log(minusFifty(50));

// alert( newCarriedSum(1)(2) ); // 3

// console.log(this);

const user = {
  name: "John Smith",
  a: 32,

  getThis: function () {
    console.log(this);
  },
  getNameArrowed: () => {
    console.log("Hi, I'm arrow func");
    console.log(this);
    console.log(this.name);
  },

  getName: function () {
    console.log("Value of this:", this);
    console.log("Value of name:", this.name);
  },

  getSum: function (b) {
    return this.a + b;
  },
};

// user.getName(); // John Smith
// user.getThis();

function getName() {
  console.log(this.name);
}

const person = {
  name: "Andrew",
};

const animal = {
  name: "Alexey",
};

// person.testMethod = getName;
// animal.testMethod = getName;

// person.testMethod();
// animal.testMethod();

// divider();

// user.getName();
// divider();

// divider();

// // arrow func
// user.getNameArrowed();

// call, apply, bind

const lostFunc = user.getName;

lostFunc.call({
  name: "Some another name",
});

// console.log(user, user.getSum(3));

const usersGetSum = user.getSum;

const anotherContext = {
  a: 22,
};

console.log(usersGetSum.call(anotherContext, 42));
// console.log(usersGetSum(42));

// const newObj = {
//   initialValue: 10,
//   countWithInitialValue: function (...arg) {
//     const sum = arg.reduce((prev, current) => {
//       return prev + current;
//     }, this.initialValue);

//     return sum;
//   },
// };

// console.log(newObj.countWithInitialValue(1, 2, 3, 4, 5));

// const countWithInitialWithoutObj = newObj.countWithInitialValue;

// const newContext = {
//   initialValue: 0,
// };

// const result = countWithInitialWithoutObj.apply(newContext, [1, 2, 3, 4, 5]);

// console.log(result);

// // bind

// const newAnotherContext = {
//   initialValue: -10,
// };

// const func = countWithInitialWithoutObj.bind(newAnotherContext); // bind => returns function with changed context

// const anotherResult = func(1, 2, 3, 4, 5);
// console.log(anotherResult);
divider();

function arrayTesting(arr) {
  // .some
  let result = false;

  result = arr.some((item) => {
    const isTrueElement = Boolean(item); //true || false
    return isTrueElement;
  });
  return result ? "Нашли true значение" : "Ничего нет";
}

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const value = arr.some((item, index, arr) => {
//   //
//   console.log(item);
//   if (item == 8) {
//     return true;
//   } else {
//     return false;
//   }
// });

// console.log(value);
const haveTrueValue = arrayTesting([0, false, null, 1]);
console.log(haveTrueValue);
const dontHaveTrueValue = arrayTesting([0, false, null, 0]);
console.log(dontHaveTrueValue);
