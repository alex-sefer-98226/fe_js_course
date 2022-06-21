// for (let elem of document.querySelectorAll("*")) {
//   elem.addEventListener(
//     "click",
//     (e) => alert(`Погружение: ${elem.tagName}`),
//     true
//   );
//   elem.addEventListener("click", (e) => alert(`Всплытие: ${elem.tagName}`));
// }

// const form = document.querySelector("form");
// const div = document.querySelector("div");
// const p = document.querySelector("p");

// form.addEventListener(
//   "click",
//   (event) => {
//     // 2nd time
//     console.log("Clicked on form");
//     event.stopPropagation();
//   },
//   {
//     // once: true,
//     capture: true,
//   }
// );

// div.addEventListener(
//   "click",
//   (event) => {
//     // 2nd time
//     console.log("Clicked on div");
//   },
//   {
//     // once: true,
//     capture: true,
//   }
// );

// p.addEventListener(
//   "click",
//   (event) => {
//     // at 1st time
//     console.log("Clicked on p");
//     // event stop propagate
//     event.stopPropagation();
//   },
//   {
//     // once: true,
//     capture: true,
//   }
// );

// stopImmediatePropagation

// const form = document.querySelector("form");
// const div = document.querySelector("div");
// const p = document.querySelector("p");

// form.addEventListener("click", (event) => {
//   console.log("Clicked on form");
// });

// div.addEventListener("click", (event) => {
//   console.log("Clicked on div");
// });

// const isLoggedin = true;

// p.addEventListener("click", (event) => {
//   console.log("Check for authorize");
//   if (!isLoggedin) {
//     alert("You are not authorized");
//     event.stopImmediatePropagation();
//   }
// });

// p.addEventListener("click", (event) => {
//   console.log("Sneding request to server...");
//   event.stopPropagation();
// });

// p.addEventListener("click", (event) => {
//   console.log("World");
// });

// const wrapper = document.querySelector(".wrapper");
// const button = document.querySelector("button");

// wrapper.addEventListener("click", () => {
//   alert("Modal is open");
// });

// button.addEventListener("click", (e) => {
//   console.log("hide modal");
//   e.stopPropagation();
// });

// console.log("Дошли до этого участка кода");

// setTimeout(function () {
//   console.log("Are you still here?");
// }, 0);

// console.log("Прошли");
// console.log("started", Date.now());
// for (let i = 0; i < 100000; i++) {
//   console.log(i);
// }
// console.log("Ended", Date.now());

// let timerId = null;

// log.addEventListener("click", () => {
//   console.log("Reverse timer started");
//   if (timerId == null) {
//     console.log("Timer successfully started");
//     timerId = setTimeout(() => {
//       console.log("BOOM");
//       timerId = null;
//     }, 2000);
//   } else {
//     console.log("Timer can't started because timerId == ", timerId);
//   }
// });

// cancel.addEventListener("click", () => {
//   console.log("Timer was canceled");
//   clearTimeout(timerId);
//   timerId = null;
// });

// span.innerText = "10";

// let timerId;
// timerId = setTimeout(function tick() {
//   const value = parseInt(span.innerText);
//   span.innerText = value - 1;
//   timerId = setTimeout(tick, 1000);
// }, 1000);

// cancel.addEventListener("click", () => {
//   console.log("click");
//   clearTimeout(timerId);
// });

// let intervalId;

// intervalId = setInterval(() => {
//   const value = parseInt(span.innerText);
//   if (value - 1 >= 0) {
//     span.innerText = value - 1;
//   } else {
//     clearInterval(intervalId);
//     span.innerText += " The end";
//   }
// }, 1000);

// cancel.addEventListener("click", () => {
//   clearInterval(intervalId);
//   intervalId = null;
// });

// log.addEventListener("click", () => {
//   if (intervalId) {
//     // if(intervalId != null)
//     clearInterval(intervalId);
//   }
//   intervalId = setInterval(() => {
//     const value = parseInt(span.innerText);
//     span.innerText = value - 1;
//   }, 1000);
// });
// const func = (a, b, c, d, ...rest) => {
//   console.log(a, b, c, d, rest);
// };
// setTimeout(
//   function (a, b, c, d, ...rest) {
//     console.log(a, b, c, d, rest);
//   },
//   1000,
//   2,
//   3,
//   4,
//   5,
//   6,
//   7,
//   8
// );

// setInterval(
//   function (a, b, c, test) {
//     console.log(a, b, c, test);
//   },
//   1000,
//   1,
//   2,
//   3,
//   "test"
// );

let a = "global";

function outerFunc() {
  let b = "outer";

  console.log(a); // выдаст 'global'
  console.log(b); // выдаст 'outer'
}

const globalLexicalEnviroment = {
  environmentRecord: {
    a: a,
    outerFunc: outerFunc,
  },
  outer: window,
};

const outerFuncLexicalEnvironment = {
  environmentRecord: {
    b: "outer",
  },
  outer: globalLexicalEnviroment,
};

// outer();
// console.log(a);
// console.log(b); // unavailable
// console.log(c); // unavailable

function person() {
  let userName = "Peter";

  return function displayName() {
    console.log(userName);
  };
}
// var userName = "Alex";
// console.log(userName);

// let peter = person();
// peter(); // выведет 'Peter'

function getCounter() {
  // returning function, that could be called
  let counter = 5;

  return function () {
    // returnin counter, increase counter on 1 point;
    return counter++;
  };
}

let count = getCounter();

// console.log(count()); // 0
// console.log(count()); // 1
// console.log(count()); // 2

var counter = 2;

// console.log("Global", counter);
// console.log(count()); // 0
// console.log(count()); // 1
// console.log(count()); // 2

let y = null;

{
  let x = "X-Value";
  console.log(x);
  y = function () {
    console.log("Y was called");
    return x;
  };
}

// console.log(y());

// console.log(x);

// function f(a) {
//   // getting n in args
//   console.log("N value", a);
//   if (a > 0) {
//     console.log("N != 1");
//     return a * f(a - 1);
//   } else {
//     console.log("N == 1");
//     return 1;
//   }
// }

// alert(f(4));
// let result = 1;
// for (let i = 2; i <= 4; i++) {
//   result *= i;
// }
// console.log(result);

// const t0 = performance.now();
// for (let i = 0; i < 100000; i++) {
//   console.log(i);
// }
// const t1 = performance.now();
// console.log((t1 - t0) / 1000, "seconds");

// console.time

// console.time("метка");
// for (let i = 0; i < 10000; i++) {
//   console.log(i);
// }
// console.timeEnd("метка");

let user = {
  name: "John",
  age: 30,
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  },
};

console.log(user.toString()); // {name: "John", age: 30}
let student = {
  name: "John",
  age: 30,
  isAdmin: false,
  courses: ["html", "css", "js"],
  wife: null,
  getAge: () => {
    console.log(this.age);
  },
  undefinedValue: undefined,
};

// before sending request
const stringifiedStudent = JSON.stringify(student);
console.log(stringifiedStudent);

// after getting data
const obj = JSON.parse(stringifiedStudent);
console.log(obj.name);

// 5 div

function createDivHelper(text) {
  const div = document.createElement("div");
  div.innerText = text;
  div.classList.add("test");
  return div;
}

const div1 = createDivHelper("Hello");
const div2 = createDivHelper("World");

document.body.append(div1, div2);

const property = "group";

// console.log(span.dataset[property]);
console.log(span);
// margin: 4px 0 0 0;
// margin-left: 4px
span.style.marginLeft = "10px";
span.style.color = "red";

// span.style.margin = "10px 10px 20px 20px";

span.setAttribute("style", "margin: 10px 10px 0px 0px;");
