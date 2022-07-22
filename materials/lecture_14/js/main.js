// console.log("Hi");
const arr = [1, 2, 3, 4, 5];
const obj = {
  a: 3,
  b: 4,
  c: 5,
};

const arrInObj = {
  0: 1,
  1: 2,
};

// console.log(arr);
// for (const value of arr) {
//   console.log(value);
// }

let range = {
  from: 1,
  to: 5,
  ["some custom field"]: 2,
};

range["test"] = "test";

range[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,
    next() {
      if (this.current <= this.last) {
        return {
          done: false,
          value: (this.current += 2),
        };
      } else {
        return {
          done: true,
        };
      }
    },
  };
};

// for (const value of range) {
//   console.log(value);
// }

// function any() {
//   console.log("Hi");
//   let a = 2 + 3;

//   // code

//   return 2;
// }

// console.log(any());

function* generateSequence() {
  console.log("yield 1");
  yield 1; // returned

  console.log("yield 2");
  yield 2;

  console.log("yield 3");
  return 3;
}

const generator = generateSequence();
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

// function* infinityFunction() {
//   let item = 32;
//   while (true) {
//     yield item++;
//   }
// }
// console.log("====");
// const gen = infinityFunction();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

function* quips(name) {
  yield "привет, " + name + "!";

  yield "я надеюсь, вам нравятся статьи";

  if (name) {
    yield `как круто, что ваше имя - ${name}`;
  }

  yield "увидимся!";
  return "Something";
}

const gen = quips("Andrew");

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

for (let value of gen) {
  console.log(value);
}

let range2 = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() {
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

for (const iterator of range2) {
  console.log(iterator);
}
