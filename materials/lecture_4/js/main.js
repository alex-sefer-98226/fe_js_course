// console.log("test");
// console.log(window);

// var abc = 123;
// console.log(globalThis);

// const obj = {
//   name: "Something",
//   method: function () {
//     console.log("Hi");
//   },
// };

// Prototypes

// const human = {
//   isDeveloper: false,
//   isHuman: true,
//   eat: function () {
//     console.log("Я кушаю");
//   },
//   toString: function () {
//     console.log("ToString was called");
//   },
// };

// // console.log(user);

// // console.log("isDeveloper", user.hasOwnProperty("isDeveloper"));
// // console.log("isSwimmer", user.hasOwnProperty("isSwimmer"));

// // console.log(user.toString());

// const swimer = {
//   swim: function () {
//     console.log("Я плаваю");
//   },
//   __proto__: human, // == swimer.__proto__ = human;
// };

// console.log(swimer);
// swimer.swim();

// swimer.eat();
// swimer.toString();
// console.log(swimer.isDeveloper);

// swimer.name = "Vasiliy";
// swimer.isDeveloper = true;
// console.log(swimer);
// let animal = {
//   walk() {
//     if (!this.isSleeping) {
//       alert(`I walk`);
//     }
//   },

//   sleep() {
//     this.isSleeping = true;
//   },
// };

// let rabbit = {
//   name: "White Rabbit",
//   __proto__: animal,
// };

// // модифицирует rabbit.isSleeping
// rabbit.sleep();
// console.log(rabbit);

// console.log(rabbit.isSleeping); // true

// console.log(animal.isSleeping); // undefined (нет такого свойства в прототипе)
// const arr = [1, 2, 3, 4, 5];

// Array.prototype.myFunc = function () {
//   console.log(this);
// };

// arr.myFunc();

// const x = [5, 4, 3, 2, 1];

// x.myFunc();

// x.flat(); // unknown method of array

// if(Array.flat == undefined) {
//   //  в объекте Array отсутствует данный метод
//   Array.prototype.flat = function(){
//     // авторская реализация flat
//   }
// }

// string, number, boolean, null, undefined, Symbol, BigInt
// Object => Arry, function, ....
let a = 2;
let b = a; // передали конкретное значение (2)

// console.log(a, b);
b = 5;
// console.log(a, b);

const aUser = {
  name: "Test",
  age: 25,
  position: "Developer",
};

const bUser = aUser; // передали ссылку на обьект (aUser);

// console.log(aUser, bUser);

bUser.name = "abc";
bUser.age = 0;

// console.log(aUser, bUser);

const cUser = {
  name: "Test",
  age: 25,
  position: "Developer",
  nestedObject: {
    x: 2,
    y: 4,
  },
};

// console.log(cUser);

const copy = Object.assign({}, { sex: "male" }, cUser);

// console.log(copy);
copy.name = "abc";
copy.age = 0;

copy.nestedObject.x = 32;
copy.nestedObject.y = 45;
// console.log(copy);

// JSON

const dUser = {
  name: "Test #325",
  age: 17,
  position: "Consultant",
  nestedObject: {
    x: 222,
    y: 444,
  },
  method: function () {
    console.log("somthing");
  },
};
// console.log(dUser);

// const stringifiedObject = JSON.stringify(dUser); // тут хранится строка
// console.log(stringifiedObject);

// const copyOfDObject = JSON.parse(stringifiedObject);
// copyOfDObject.nestedObject.x = -44;
// copyOfDObject.nestedObject.y = -22;
// console.log(copyOfDObject, dUser);

// console.log(JSON.stringify([1, 2, 3, 4]));

// const variable = '{"a":2, "b":"something", "bool": true}';
// console.log(JSON.parse(variable));

const basedOnArray = Object.create(Array);

const basedOnNumber = Object.create(Number);

const basedOnDUser = Object.create(dUser);

// console.log(basedOnArray);

// console.log(basedOnNumber);

// console.log(basedOnDUser);

const withoutProto = Object.create(null);

withoutProto.name = "test";
// console.log(withoutProto);
basedOnDUser.ownRole = "admin";
basedOnDUser.age = 12;

// console.log(basedOnDUser);

// console.log(Object.getOwnPropertyNames(basedOnDUser));
//keys

// console.log(Object.keys(basedOnDUser));
// console.log(Object.values(basedOnDUser));
// console.log(Object.entries(basedOnDUser));

// const obj = {
//   // ...
//   __proto__:
// }

function Person(name, lastName, age, dream) {
  if (new.target === undefined) {
    console.warn("Вы используете функцию конструктор без new");
  } else {
    this.name = name;
    this.lastName = lastName;
    this.countOfYears = age;
    this.dream = dream;
    this.hi = () => {
      //1
      console.log("Hi");
    };
  }
}

const firstUser = new Person("Andrew", "Tester", 42, "To buy a house");

const secondUser = {
  name: "name",
  lastName: "lastName",
  countOfYears: "age",
  dream: "dream",
  hi: () => {
    //2
    console.log("Привет");
  },
};
// const x = Person();
// const y = new Person();
// console.log(x, y);

// console.log(firstUser, secondUser);

// console.log(firstUser instanceof Person);
// console.log(secondUser instanceof Person);

// if (firstUser instanceof Person) {
//   console.log("Тут будет написано Hi!");
//   firstUser.hi();
// } else {
//   secondUser.hi();
// }

// firstUser.hello = () => {
//   console.log("hello");
// };

// secondUser.hello = () => {
//   console.log("hello");
// };

// firstUser.hello();
// secondUser.hello();

// const user = {
//   name: "test",
//   isHuman: true,
// };

// function NamedHuman(newName) {
//   this.name = newName;
// }

// NamedHuman.prototype = user;

// const secondHuman = new NamedHuman("Vladislav");
// console.log(secondHuman);

// function Rabbit() {}
// /* прототип по умолчанию
// Rabbit.prototype = { constructor: Rabbit };
// */

// alert(Rabbit.prototype.constructor == Rabbit);

function Person() {
  this.name = "Вася";
  return this;
  // return { name: "Godzilla" }; // <-- возвращает этот объект
}

const returnFromPerson = new Person();
console.log(returnFromPerson);

// for homework

const withoutArgs = new Person();
console.log(withoutArgs);

function bindFunc(func, context, ...args) {
  //
}

const context = {};
const func = (a, b) => a + b;

const newFunc = bindFunc(func, context, 1, 3);

newFunc();
