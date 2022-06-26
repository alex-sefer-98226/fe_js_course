// console.log("Hi");

// function usualFunction() {
//   console.log(this);
//   console.log(this.a);
// }

// const arrowFunc = () => {
//   console.log(this);
//   console.log(this.a);
// };

// usualFunction();
// arrowFunc();

// Главная особенность стрелочной функции в JavaScript
//  - отсутствие у нее собственного значения this.
// При обращении к this используется значение окружения,
//  в котором был осуществлен вызов функции

// window.a = 9;

// let obj = {
//   a: 5,
//   getA: () => {
//     console.log(this.a);
//     this.c = 32;
//   },
//   getAWithUsualFunc() {
//     // declaration
//     console.log(this.a);
//     this.b = 32;
//   },
// };

// obj.getA();
// obj.getAWithUsualFunc();
// console.log(obj);

// const arr = [1, 2, 3];
// arr.forEach(function (element, index, argArray) {
//   console.log("Args", element, index, argArray);
//   console.log(this === arr);
// }, arr);

// arr.forEach((element, index, argArray) => {
//   console.log("Args", element, index, argArray);
//   console.log(this === arr);
// }, arr);

// В JavaScript ключевое слово this ссылается на объект
// контекст вызова, в пределах которого выполняется текущий код.
// Из этого следует, что значение this не является фиксированным.
// Выполнение кода может происходить:
// - в глобальном контексте;
// - в контексте функции.

// -- Значение this в глобальном контексте -- //

// Глобальным контекстом выполнения кода в JavaScript считается
// любая часть скрипта за пределами тела функции (включая методы
// объектов). Значение this в глобальном контексте всегда ссылается
// на глобальный объект window

// console.log(this === window); // true

// Таким образом, обращение к this равносильно обращению к window.

// this.onclick = () => alert("Clicked"); //обработка клика мыши

// console.log(this.innerWidth); //ширина окна

// window.var1 = 1;
// console.log(this.var1); // 1

// -- Значение this в контексте функции -- //

/* В пределах функции дело обстоит немного иначе: 
значение this зависит от того, где и как функция 
была вызвана. Возможные варианты:
- стандартный вызов;
- метод объекта;
- вызов стрелочной функции;
- конструктор класса;
- обработчик события.
*/

// При стандартном вызове функции значение
// this не устанавливается вызовом и поэтому ссылается на
// глобальный контекст window

// function func() {
//   console.log(this === window);
// }

// func();

// Если функция является методом объекта или используется
// как объект метода, то this ссылается на этот объект.
// Причем то, где и как была объявлена функция, никак не
// влияет на это. Исключением является стрелочная функция.

// let obj = {
//   message: "JavaScript",
//   printMessage: function () {
//     console.log(this.message);
//   },
//   print: () => {
//     console.log(this.message);
//   },
// };

// obj.printMessage(); // 'JavaScript'
// obj.print();

// Функция может быть объявлена глобально,
// но использоваться как метод объекта, но
// результат останется неизменным.

// function printMessage() {
//   console.log(this.message);
// }

// let obj = {
//   message: "JavaScript",
//   printMessage: printMessage,
// };

// obj.printMessage(); // 'JavaScript'

/* Главная особенность стрелочной функции от обычной в том,
что она не имеет собственного значения this: оно 
всегда устанавливается из контекста окружения, 
в котором была определена, контекст вызова никак 
на this не влияет. */

// let arrowFunc = () => console.log(this === window);

// arrowFunc(); // true

// let obj = {
//   arrowFunc: arrowFunc,
//   usualFunc: function () {
//     console.log(this);
//   },
// };

// obj.usualFunc();
// obj.arrowFunc(); // true

/* Из примера видно, что вызов определенной в 
глобальной области видимости стрелочной функции 
arrowFunc() в качестве метода объекта никак 
не повлиял на ее значение this. */

// -- Tip -- //
// На стрелочные функции также не распространяется
// действие методов call(), bind() и apply().

// Если функция является обработчиком события, то
// значением this установится элемент, относительно
// которого произошло событие.

// let button = document.getElementById("btn");
// console.log("Button", button);

// button.addEventListener("click", function () {
//   console.log("This", this);
//   console.log(this === button);
// });

// button.addEventListener("click", () => {
//   console.log("This", this);
//   console.log(this === button);
// });

// const tomatoDiv = document.querySelector(".tomato");

// tomatoDiv.addEventListener("click", function (event) {
//   console.log("Event target", event.target);
//   console.log("This", this);
// });

// call, apply, bind

function Hero(name, surname) {
  this.name = name;
  this.surname = surname;
  this.hi = function () {
    return `${this.name} says hello.`;
  };
}

Hero.prototype.greet = function () {
  return `${this.name} says hello.`;
};

const harry = new Hero("Гарри", "Поттер");
// console.log(harry);

// 1 - muggle
// 2 - mage

// Creating a new constructor from the parent
function Mage(name, surname, spell) {
  // Chain constructor with call
  Hero.call(this, name, surname);

  this.spell = spell;
}

const character = new Mage("Harry", "Potter", "sextumsempra");
// console.log(character.hi());

// muggle

function Muggle(name, surname, usual_job) {
  Hero.call(this, name, surname);
  this.usual_job = usual_job;
}

const muggle = new Muggle("New Muggle", "Character", "driver");
// console.log(muggle.hi());

// another example with call

Array.prototype.consoleLog = function () {
  for (let i = 0; i < this.length; i++) {
    console.log(this[i]);
  }
};

// arr.forEach((item, index, arr) => {
//   // ...
// }, this);

// Array.prototype.forEach = function (callback, contextValue) {
//   const ctx = contextValue ? contextValue : this;
//   for (let i = 0; i < ctx.length; i++) {
//     callback(ctx[i], i, ctx);
//   }
// };

// const arr = [1, 2, 3, 4];

// arr.consoleLog();

function summa() {
  console.log(arguments instanceof Array); //false
  // Array => Array.from

  let sum = 0;

  Array.prototype.forEach.call(arguments, (value, index) => {
    console.log(value, index);
  });

  console.log(sum);
  console.log("=======");
}
// summa(1, 2, 3, 4, 5, 6); //21
// summa(10, 20, 30, 40, 50, 60, 100, 200); //510
// summa(30, 5, -15, -20); //0

// another example

// Раньше для преобразования коллекций в массивы
// приходилось использовать подобные конструкции:

// const links = document.querySelectorAll("a");
// const linksArr = Array.slice.call(links);

// // Или более короткий вариант
// const linksArr = [].slice.call(document.links);

// Array.isArray(links); // false
// Array.isArray(linksArr); // true

// example with bind

const popupViewer = {
  container: document.body, //
  popup: document.querySelector(".my-popup"),
  close: document.querySelector(".mypopup-close"),

  activateModal: function (state) {
    // open modal
    console.log(this);
    setTimeout(
      function () {
        this.addClass(this.container, "popup-open");
        this.addClass(this.popup, "open");
      }.bind(this),
      300
    );
  },
  deactivateModal: function (state) {
    // close modal
    setTimeout(() => {
      this.removeClass(this.popup, "open");
      this.removeClass(this.container, "popup-open");
    }, 500);
  },

  addClass: function (element, name) {
    element.classList.add(name);
  },

  removeClass: function (element, name) {
    element.className = element.className.replace(name, "");
  },
};

addPopup.addEventListener("click", popupViewer.activateModal.bind(popupViewer));
popupViewer.close.addEventListener(
  "click",
  popupViewer.deactivateModal.bind(popupViewer)
);
