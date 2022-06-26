// const list = document.querySelector("ul");
// const button = document.querySelector("button");

// const nodes = list.childNodes;
// console.log(list.childNodes);

// console.log(list.firstChild);
// console.log(list.lastChild);

// const li = document.createElement("li");
// li.innerText = "142";

// list.childNodes[3] = li;

// // button.addEventListener("click", () => {
// //   console.log(nodes[2].innerText);
// // });
// console.log("======");
// console.log(listItem.nextSibling);
// console.log(listItem.previousSibling);
// console.log(listItem.parentNode);

// console.log(list.children);
// list.replaceChild(li, list.children[3]);

// console.log("======");
// console.log(listItem.nextElementSibling);
// console.log(listItem.previousElementSibling);
// console.log(listItem.parentElement);

// function Animal(name, age) {
//   this.name = name;
//   this.age = age;
// }

// const rabbit = new Animal("Bunny", 2);

// console.log(rabbit);

let promise = new Promise(function (resolve, reject) {
  // console.log("I'm executing");
  // setTimeout(() => resolve("done"), 2000);
  // setTimeout(() => reject(new Error("Something wrong...")), 2000);
  setTimeout(() => {
    const value = Math.random();
    // console.log("Value is ", value);
    if (value <= 0.5) {
      resolve(value);
    }
    reject("Unsuccessfully!");
  }, 3000);
  // sending request
});

function onSuccess(result) {
  // result <=0.5
  // console.log("Success", result);
  const newResult = result * 10 * 3;
  //
  return newResult;
}

function onError(error) {
  // console.log("Error", error);
}
// .then'able
// then(onSucess, onError)
promise
  // .finally(() => {
  //   alert("Промис завершил работу!");
  // })
  .then(onSuccess) // 1
  .then((res) => {
    // console.log("2nd then, result here is: ", res);
  })
  .catch((err) => {
    // 2
    // console.error(err);
  });

const btn = document.getElementById("btn");

const server = [
  {
    name: "Andrew",
    surName: "Developer",
    eyeColour: "brown",
  },
  {
    name: "Anatoliy",
    surName: "Engineer",
    eyeColour: "red",
  },
];

const getDataFromServer = () => {
  return new Promise((resolve, reject) => {
    // (0)
    setTimeout(() => {
      // resolve(server); // успех
      reject(new Error("500 ServerError")); // не успех
    }, 2000);
  });
};

const createLoader = () => {
  const div = document.createElement("div");
  div.classList.add("lds-dual-ring");
  return div;
};

const listItemCreator = (human) => {
  const listItem = document.createElement("li");
  listItem.innerText = `${human.name}, ${human.surName}, ${human.eyeColour}`;
  return listItem;
};

function asyncAction() {
  const loader = createLoader();
  orderedListItem.appendChild(loader);
  let defaultValue = 0;
  const response = getDataFromServer();
  response
    .finally(() => {
      loader.remove();
    })
    .then((response) => {
      // res
      console.log("response: ", response); // [{ name: 'Andrew', ... }, { name: 'Anatoliy', ... }]

      defaultValue = response.length;
      return response.map((human) => {
        return listItemCreator(human);
      });
    })
    .then((items) => {
      items.forEach((item) => {
        orderedListItem.appendChild(item);
      });
    })
    .catch((err) => {
      // (2)
      alert("Error!");
      console.log("err: ", err);
      return 0;
    })
    .then((res) => {
      defaultValue = res;
    });
}

btn.addEventListener("click", asyncAction);

const API_URL = "https://jsonplaceholder.typicode.com/todos";
const API_URL_TODO = "/1";
// XML HTTP REQUEST;
// 1
let request = new XMLHttpRequest();
// 2
request.open("GET", API_URL + API_URL_TODO);
// if u want to set some settings - do it here

request.responseType = "json";
// 3
request.send();

request.onload = function () {
  // finished
  if (request.status != 200) {
    // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    console.log(`Ошибка ${request.status}: ${request.statusText}`); // Например, 404: Not Found
  } else {
    // если всё прошло гладко, выводим результат
    console.log(`Готово, получили ${request.response.length} байт`); // response -- это ответ сервера
    console.log(request.response);
  }
};
request.onerror = function () {
  // происходит, только когда запрос совсем не получилось выполнить
  console.log(`Ошибка соединения`);
};
request.onprogress = function (event) {
  // запускается периодически
  // event.loaded - количество загруженных байт
  // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
  // event.total - количество байт всего (только если lengthComputable равно true)
  console.log(`Загружено ${event.loaded} из ${event.total}`);
};

const USERS_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

const loadUsersButton = document.querySelector(".btn");

const createListItem = (user) => {
  // returning <li>
  const item = document.createElement("li");
  item.innerText = `UserID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
  return item;
};

let activeUser = true;

function loadUsers() {
  const list = document.querySelector("ul");

  const loader = createLoader();
  list.append(loader);

  let usersRequest = new XMLHttpRequest();
  usersRequest.open("GET", USERS_ENDPOINT);
  usersRequest.responseType = "json";
  usersRequest.send();
  usersRequest.onload = () => {
    loader.remove();
    if (usersRequest.status > 299) {
      // error in request
      console.error("You have error on your request");
    } else {
      console.log(usersRequest.response);
      usersRequest.response.forEach((user) => {
        const li = createListItem(user);
        list.appendChild(li);
      });
    }
  };
  console.log(list);
}

loadUsersButton.addEventListener("click", loadUsers);
