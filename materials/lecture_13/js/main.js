// Инкапсуляция, полиморфизм и наследование

let isAdmin = true;
// let obj = {
//   number: 2,
//   addSomething(value) {
//     this.number = this.number + value;
//   },
// };

// obj.number = 35;

const createCounter = () => {
  let count = 0; // isolated from others
  return {
    increase: () => {
      if (isAdmin) {
        count++;
      } else {
        console.error("Permission denied");
      }
    },
    getCount: () => {
      return isAdmin ? count : "Permission denied";
    },
  };
};

const counter1 = createCounter();

// console.log(counter1.getCount());
counter1.increase(); //  point to change our counter
counter1.increase();
counter1.increase();
// console.log(counter1.getCount()); // point to get current value

counter1.count = 0;
// console.log("Trying to reset counter");
counter1.increase();
// console.log(counter1.getCount()); // point to get current value

class Incapsulation {
  #count = 0; // creating private field;

  constructor(initialValue) {
    this.#count = initialValue || 0;
  }

  increase() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}

const counter2 = new Incapsulation(5);

// console.log(counter2.getCount());
counter2.increase();
counter2.increase();
counter2.increase();
// console.log(counter2.getCount());
// console.log(counter2);

counter2["#count"] = 25;
// console.log(counter2);
// console.log(counter2.getCount());
// console.log(counter2.getCount());
// counter2.increase();
// counter2.increase();

class Vehicle {
  constructor(name) {
    this.name = name;
  }

  drive() {
    console.log("Driving...", this.name);
    return -1;
  }

  // if 2 wheels -> one()
  // if 3 wheels -> two()
  // if 4 wheels -> three()
  // if no wheels -> four()
}

class TwoWheelVehicle extends Vehicle {
  constructor(name) {
    super(name);
  }
}

class Auto extends Vehicle {
  constructor(name) {
    // new Auto('value');
    super(name);
  }

  drive() {
    console.log("Еду...");
    return 0;
  }
}

class Motorcycle extends TwoWheelVehicle {
  constructor(name) {
    // new Motorcycle('value');
    super(name);
  }

  drive() {
    console.log("Еду с ветерком");
    return 1;
  }
}

class Bus extends Vehicle {
  constructor(name) {
    super(name);
  }
}

function logTimeAndRide(obj) {
  console.info(Date.now());
  obj.drive();
}

const auto = new Auto("Audi");

const moto = new Motorcycle("Yamaha");

const bus = new Bus("test");

logTimeAndRide(auto);
logTimeAndRide(moto);
logTimeAndRide(bus);

// Singleton (Одиночка)

class Singleton {
  constructor(data) {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.data = data;
    Singleton.instance = this;
    return this;
  }
}

const a = new Singleton("Test");
// ...
const b = new Singleton("Not test");

console.log(a, b);

const x = {
  a: 3,
};

const y = x;
y.a = 32;
console.log(x, y);

console.log(a == b);

// btn.addEventListener("click", () => {});
// Builder

class Button {
  handlers = {};
  styles = {};
  constructor(text) {
    this.innerText = text;
  }

  setHandler(eventType, func) {
    if (this.handlers[eventType]) {
      this.handlers[eventType].push(func);
    } else {
      this.handlers[eventType] = [func];
    }
    return this;
  }

  setColor(value) {
    this.styles.color = value;
    return this;
  }

  setPadding(value) {
    this.styles.padding = value;
    return this;
  }

  setMargin(value) {
    this.styles.margin = value;
    return this;
  }

  build() {
    const btn = document.createElement("button");
    btn.innerText = this.innerText;
    Object.assign(btn.style, this.styles);
    for (const key in this.handlers) {
      this.handlers[key].forEach((handler) => {
        btn.addEventListener(key, handler);
      });
    }
    return btn;
  }
}

const button = new Button("Click me")
  .setColor("red") //
  .setMargin("10px") //
  .setPadding("20px") //
  .setHandler("click", () => {
    console.log("clicked");
  })
  .setHandler("click", () => {
    console.log("clicked 2");
  })
  .build();
// console.log(button);

// document.body.append(button);

// Factory Method

class AbstractWorker {
  constructor(type, hourly) {
    this.type = type;
    this.hourly = hourly;
  }
  describe() {
    console.log(`Привет, я ${this.type} и моя ставка ${this.hourly}`);
  }
}

class FullTime extends AbstractWorker {
  constructor(type) {
    const hourly = "100";
    super(type, hourly);
  }
}

class Trainee extends AbstractWorker {
  constructor(type) {
    const hourly = "50";
    super(type, hourly);
  }
  describe() {
    console.log("Привет, я из переопределённого метода");
  }
}

class Contractor extends AbstractWorker {
  constructor(type) {
    const hourly = "200";
    super(type, hourly);
  }
}

class Factory {
  createEmployee(employeeType) {
    if (employeeType === "Штатный сотрудник") {
      return new FullTime(employeeType);
    }
    if (employeeType === "Стажер") {
      return new Trainee(employeeType);
    }
    if (employeeType === "Подрядчик") {
      return new Contractor(employeeType);
    }
    throw new Error("Такого типа не существует");
  }
}

const testing = () => {
  const employees = []; // empty array

  const factory = new Factory(); // creation of factory

  employees.push(factory.createEmployee("Штатный сотрудник"));

  employees.push(factory.createEmployee("Стажер"));

  employees.push(factory.createEmployee("Подрядчик"));

  employees.forEach((employee) => employee.describe());
};
testing();

// abstract factory

class Z4 {
  info() {
    console.log("Z4 is a Sport car!");
  }
}

class I3 {
  info() {
    console.log("i3 is a Family car!");
  }
}

function sportCarFactory() {
  //
  return new Z4();
}

function familyCarFactory() {
  //
  return new I3();
}

//
function bmwProducer(kind) {
  return kind === "sport" ? sportCarFactory : familyCarFactory;
}

const sportCar = bmwProducer("sport")();
const familyCar = bmwProducer()();

console.log(sportCar, familyCar);
sportCar.info();
familyCar.info();

// https://refactoring.guru/uk/
