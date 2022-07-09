let obj = {
  a: 2,
  test: 32,
  hi: () => {
    console.log("test");
  },
  func() {
    console.log("Test2");
  },
};

// console.log(obj);

obj.a = 1203809;

// console.log(obj);

delete obj.a;

// console.log(obj);

obj.b = "Hello";

obj.c = true;

// for (const key in obj) {
//   console.log(obj[key]);
// }

// console.log(Object.getOwnPropertyDescriptor(obj, "b"));

Object.defineProperty(obj, "custom", {
  value: "Hello, I'm custom field",
  writable: true, // false
  enumerable: true, // false
  configurable: true, // false
});

const myDefineProperty = (nameOfProperty, value, target) => {
  Object.defineProperty(target, nameOfProperty, {
    value: value,
  });
};

for (const key in obj) {
  // console.log(obj[key]);
}

obj.custom = "Changed"; // write

delete obj.custom;

// console.log(obj);

const x = {};

// myDefineProperty()

Object.defineProperties(x, {
  // key: descriptorOfKey
  name: { value: "Andrew", enumerable: true, configurable: false },
  salary: { value: "1000", enumerable: true, configurable: true },
  sayHi: {
    value: () => {
      console.log("Hi");
    },
    enumerable: false,
    configurable: false,
  },
});

// console.log(x);

// x.name = "Alex";
// console.log("==========");
// for (const key in x) {
//   console.log(x[key]);
// }

// x.sayHi();

// class
// const Hero = function () {
//   this.property = "test";
// };

// const Enemy = class {};

// console.log(Object.getPrototypeOf(Hero));
// console.log(Object.getPrototypeOf(Enemy));

// const testObj = new Hero();
// console.log(testObj);

// const testObjFromClass = new Enemy();
// console.log(testObjFromClass);

function Robot(name, sound) {
  this.name = name;

  this.sayHi = () => {
    console.log(sound);
  };
}

const r2d2 = new Robot("r2d2", "beep");
// console.log(r2d2);
// r2d2.sayHi();

class ClassRobot {
  constructor(name, sound) {
    // console.log("Constructor was called");
    this.name = name; // property
    this.sound = sound; // свойство
  }

  sayHi() {
    // method, метод
    console.log(this.sound);
  }
}

const c3p0 = new ClassRobot("c3p0", "Hello, beep, Hello!");
// console.log(c3p0);

// c3p0.sayHi();

// for (const key in r2d2) {
//   console.log(r2d2[key]);
// }

// console.log("c3p0 part");

// for (const key in c3p0) {
//   console.log(c3p0[key]);
// }

function Hero(name, level) {
  this.name = name;
  this.level = level;
}

Hero.prototype.greet = function () {
  return `${this.name} says hello.`;
};

const hero = new Hero("NPC", "25");
// console.log(hero.greet());

// Creating a new constructor from the parent
function Mage(name, level, spell) {
  // Chain constructor with call
  Hero.call(this, name, level);
  this.spell = spell;
}

function Archer(name, level, weapon) {
  Hero.call(this, name, level);
  this.weapon = weapon;
}
const mage = new Mage("Anatoliy", "80", () => {
  console.log("blow");
});

// console.log(mage);
// mage.spell();

// const archer = new Archer("Vladislav", "90", "knowledge");
// console.log(archer);

class Bird {
  constructor(name) {
    console.log("Bird constructor was called");
    this.name = name;
  }

  fly() {
    console.log("flying...");
  }
}

// const bird = new Bird("Base Bird");
// console.log(bird);
// bird.fly();

// Eagle, Parrot
class Eagle extends Bird {
  constructor(name, color) {
    super(name);
    this.color = color;
  }

  hunt() {
    console.log("Finding something to eat...");
  }

  fly() {
    // 1. Fly от Bird
    // 2. делал какое-то доп действие
    super.fly();
    console.log("Flying with friends");
  }
}

const eagle = new Eagle("Eagle v1", "black&white");

console.log(eagle);
// eagle.hunt();
eagle.fly();

class Parrot extends Bird {
  constructor(name, size) {
    // 'string'
    super(name);
    this.size = size;
  }

  speak() {
    console.log("Привет");
  }
}

const kesha = new Parrot("Kesha", "xs");

kesha.speak();
kesha.fly();

class CoffeeMachine {
  #waterLimit = 200;
  #checkWater(value) {
    if (value < 0) {
      throw new Error("Отрицательный уровень воды");
    }
    if (value > this.#waterLimit) {
      throw new Error("Слишком много воды");
    }
  }
}

const coffeMachine = new CoffeeMachine();

// console.log(coffeMachine.#waterLimit);

class Person {
  #job = "";

  constructor(name, age, job) {
    this.name = name;
    this.age = age;
    this.#job = job;
  }

  getAge() {
    return this.age;
  }

  setAge(value) {
    const resultOfValidation = this.#ageValidation(value);
    this.age = resultOfValidation;
  }

  #ageValidation(value) {
    if (value > 18) {
      return value;
    }
    return "Invalid value";
  }

  getJob(isAdmin) {
    if (isAdmin) {
      return this.#job;
    }
    return;
  }
  // sum(value1, value2){
  //   return value1 + value2;
  // }

  // diff(value){
  //   return value - 7;
  // }

  // save(value){
  //   db.save({

  //   })
  // }

  // calcSumMinus3AndSaveToDb(value1, value2) {
  //   const sum = this.sum(value1, value2);
  //   const diff = this.diff(sum);
  //   this.save(diff);
  // }
}

const person = new Person("Alexey", "32", "Developer");
person.setAge(15);
// console.log(person.getAge());

// console.log(person.name);
// console.log(person.age);
// console.log(person.job);

// console.log(person.getJob());
// console.log(person.getJob(true));

const myObj = {
  a: 3,
};

console.log(myObj.a);

myObj.a = 32;

class GettersAndSetters {
  constructor() {
    this.x = 22;
    this.y = 23;
  }

  get coords() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  set coords(value) {
    this.x = value.x < 0 ? 0 : value.x;
    this.y = value.y > 0 ? 0 : value.y;
  }
}

const gettersAndSetters = new GettersAndSetters();
console.log(gettersAndSetters.coords);

gettersAndSetters.coords = {
  x: 45,
  y: -35,
};

console.log(gettersAndSetters.coords);

gettersAndSetters.coords = {
  x: -32,
  y: -35,
};

console.log(gettersAndSetters.coords);

gettersAndSetters.coords = {
  x: 32,
  y: 115,
};

console.log(gettersAndSetters.coords);

class AnyClass {
  static CURRENT_LESSON = 12;
  static sayHi() {
    console.log("Hello, Im static mthod");
  }
}
const date = new Date(); // creating instance of class Date

const now = Date.now(); // using static methods

AnyClass.sayHi();

console.log(Number.MAX_SAFE_INTEGER);

console.log(Math.PI);

console.log(AnyClass.CURRENT_LESSON);

AnyClass.CURRENT_LESSON = 32;

console.log(AnyClass.CURRENT_LESSON);

foo("AAAAABBBBBCCCCDDDDAAB"); // ["A", "B", "C", "D", "A", "B"]
