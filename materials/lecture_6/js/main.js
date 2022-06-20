// const element = document.querySelector("input");

// element.setAttribute("disabled", "");
// element.setAttribute("value", "Some Text");
// element.setAttribute("name", "my_text_input");

// const button = document.querySelector("button");

// 1-й вариант
// button.onclick = () => {
//   alert("Clicked");
// };

// button.onclick = () => {
//   console.log("Привет");
// };

// on<event_name>
// onclick
// onfocus
// onmouseover

// 2-й вариант
// function clickHandler(event) {
//   console.log("делаю полезные действия");
//   button.removeEventListener("click", clickHandler);
//   console.log("Убрали слушатель на полезные действия");
// }

// button.addEventListener("click", clickHandler);

// button.addEventListener("click", function (event) {
//   console.log("высылаю аналитику");
// });

// button.addEventListener("click", function (event) {
//   console.log("ставлю таймер до рекламы");
// });

// clickHandler();

// button.addEventListener("focus", () => {
//   console.log("focus");
// });

// button.addEventListener("blur", () => {
//   console.log("blur");
// });

// button.addEventListener("contextmenu", () => {
//   alert("Вы клиннули на элемент правой кнопкой мыши");
// });

// const clicker = () => {
//   console.log("Hi");
// };

// button.addEventListener("click", clicker, {
//   once: true,
// });
// document.addEventListener("DOMContentLoaded", function () {
//   console.log(text);
// });

// events
// function clickHandler(event) {
//   console.log(event.target);
//   console.log(this);
// }

// button.addEventListener("click", clickHandler);

// const onInputHandler = (event) => {
//   console.log(event.type);
//   console.log(event.target.value);
// };

// const input = document.querySelector("input");

// input.addEventListener("input", onInputHandler);

// const commonHandler = (e) => {
//   console.log("Тип ивента: ", e.type);
// };

// input.addEventListener("focus", commonHandler);
// input.addEventListener("blur", commonHandler);
// input.addEventListener("change", commonHandler);
// input.addEventListener("mouseover", commonHandler);

// const wrapper = document.querySelector(".wrapper");

// wrapper.addEventListener("click", function (event) {
//   // event.target.style.backgroundColor = "red";
//   this.style.backgroundColor = "red";
//   // console.log(event.target);
//   // console.log(this);
// });

// input.addEventListener("cut", (event) => {
//   console.log("We detected that user emit cut event");
// });

// input.addEventListener("copy", (event) => {
//   event.preventDefault();
//   // console.log("We detected that user emit copy event");
//   // console.log(event);
//   // event.clipboardData.setData("text/plain", "не вышло скопировать");
// });

// const link = document.querySelector("a");
// console.log(link);

// link.onclick = (event) => {
//   event.preventDefault();
//   console.log("You're not authorized");
// };

// const form = document.querySelector("form");
// console.log(form.lastElementChild);

// form.lastElementChild.onclick = (event) => {
//   event.preventDefault();
//   // transfering data to the server
//   console.log("test");
// };

// input.addEventListener("paste", (event) => {
//   event.target.value = "checked";
//   event.preventDefault();
//   console.log("user pasted");
// });

const form = document.querySelector("form");

const button = form.querySelector("button");

const inputName = document.querySelector("[name='name']");
const inputAge = document.querySelector("[name='age']");
const checkbox = document.querySelector("[type='checkbox']");

const validateInputsForCheckbox = () => {
  console.log("Validate checkbox function was called");
  if (inputName.value.length > 0 && inputAge.value > 18) {
    checkbox.removeAttribute("disabled");
  } else {
    checkbox.setAttribute("disabled", "");
  }
};

form.onsubmit = (e) => {
  console.log("Submitted");
  e.preventDefault();

  if (checkbox.checked == false) {
    alert("Вы не согласились на условия использования");
    return;
  }
  console.log("Пользователь согласился");

  const formData = {
    username: inputName.value,
    age: inputAge.value,
    isAgree: checkbox.checked,
  };

  console.log("Sending...", JSON.stringify(formData));
  // {name: 'Teste', age:32, isAgree: true}
};

const nameChangeHandler = (event) => {
  validateInputsForCheckbox();
};

const ageChangeHandler = (event) => {
  validateInputsForCheckbox();
};

inputName.addEventListener("input", nameChangeHandler);
inputAge.addEventListener("input", ageChangeHandler);

// hw 4
const person = {
  name: "",
  age: 0,

  setName: function (name) {
    this.name = name;
  },

  setAge: function (value) {
    const ageAfterValidation = this.ageValidation(value); // age >= 18 ?age : 'error';
    this.age = ageAfterValidation;
  },

  getName: function () {
    return this.name;
  },

  getAge: function () {
    return this.age;
  },

  ageValidation: function (value) {
    if (parseInt(value) >= 18) {
      return value;
    } else {
      return "Validation Error";
    }
  },
};

const person1 = Object.create(person);

console.log(person1);
person1.setName("Andrew");

console.log(person1);

person1.setAge(22);
console.log(person1);

console.log(person1.getName());
console.log(person1.getAge());

person1.setAge("12");
console.log(person1.getAge());

const func = function () {
  console.log(Object.keys(this));
};

const obj = {
  a: 32,
  b: 44,
};

func.call(obj);

function getNewArray() {
  const filteredValues = this.values.filter(function (number) {
    return number > 2 && number < 10 && typeof number == "number"
      ? true
      : false;
  });
  return filteredValues;
}

const valObject0 = {
  values: [1, "2", 4, 8, "8", 3, 10, null, false],
};

const result = getNewArray.call(valObject0);
console.log(result);

// object literal

const namesOfDays = {
  ru: ["Понедельник", "Вторник", "Среда", "Воскресенье"],
  en: ["Monday", "Tuesday", "Wednesday", "Sunday"],
};

const obj32 = {
  name: "test",
  job: "developer",
  title: "junior",
};

console.log(obj32.name);
console.log(obj32["job"]);

const property = "title";
console.log(obj32[property]);

console.log(namesOfDays.ru);

const lang = "ru";
console.log(namesOfDays[lang]);

const ctx = {
  value: 22,
};

const ctx2 = {
  value: -3,
};

function sumUserValueWithContextValue(arg0, arg1, arg2) {
  console.log(arg0, arg1, arg2);
  return this.value + arg0;
  //
}

console.log(sumUserValueWithContextValue.call(ctx, 32, 34, 35));

console.log(sumUserValueWithContextValue.apply(ctx2, [32, 34, 35]));

const clickFunction = (value) => {
  const currentValue = parseInt(number_value.innerText);
  const nextValue = currentValue + value;
  number_value.innerText = nextValue;
};

first.addEventListener("click", clickFunction.bind(null, -32));
second.addEventListener("click", clickFunction.bind(null, 1));
third.addEventListener("click", clickFunction.bind(null, 44));
