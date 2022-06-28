// let promise = new Promise(function (resolve, reject) {
//   resolve(1);
// });

// let xml = new XMLHttpRequest();
// xml.open("GET", "https://jsonplaceholder.typicode.com/users");
// xml.send();

// xml.onload = function () {
//   // console.log(xml.response);
// };
// xml.onerror = function () {
//   console.log(xml.response.status);
// };

// const arr = [1, 2, 3, 4];

// arr.forEach((item) => {
//   console.log(item * 2);
// });

// Array.prototype.forEach = function(callback) {
//   for(let i = 0; i< this.length; i++){
//     callback(this[i], i, this);
//   }
// }

// function getPaymentFromClient() {
// getting payment from client card;
// }

// import { anatylicLog } 'google-analytic'
// function anatylicLog(event, callback) {
// sending specific event on server
// console.info(event);
// sending event was succesfully
// callback();
// while ("ивент не отправлен успешно") {
// посылать ивент
// вызывать коллбек
// }
// }

// anatylicLog(
//   {
//     eventAction: "buy",
//     item: "ball",
//   },
//   () => {
//     getPaymentFromClient();
//   }
// );

// function anatylicLog(event) {
//   return new Promise(function (resolve, reject) {
//     // если ивент выслался нормально - то resolve()
//     resolve("OK");
//     //если ивент выслался не нормально - то reject()
//   });
// }

// anatylicLog({
//   eventAction: "buy",
//   item: "ball",
// })
//   .then((onResolved) => {
//     getPaymentFromClient();
//   })
//   .catch((err) => {
//     console.log("Error is", err);
//   });

// const obj = new Promise((resolve, reject) => {
//   const randomNumber = Math.random(); // 0 - 1
//   console.log("Random value is ", randomNumber);
//   setTimeout(() => {
// reject("Something wrong");
// resolve(2);
// if (randomNumber < 0.5) {
//   resolve("Все прошло отлично!");
// } else {
//   reject("Что-то пошло не так");
// }
//   }, 1000);
// });

// console.log(promise);

// function onFullfilled(data) {
//   console.log(data);
// }

// function onReject(err) {
//   console.error("Crushed", err);
// }

// promise
//   .finally(() => {
//     console.log(promise);
//   })
//   .then(onFullfilled, onReject);

// promise.then(
//   (success) => {
//     console.log("I'm second listener. Getting", success);
//   },
//   (err) => {
//     console.log("I'm second error handler, ", err);
//   }
// );

// obj // promise
//   .then(
//     (result) => {
//       console.log(result);
//     },
//     (err) => {
//       console.log(err);
//     }
//   )
//   .catch((err) => {
//     console.log(err);
//     err.map((item) => {
//       console.log(item);
//     });
//   });

// Promise.all(), Promise.race()

// const promise1 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("Resolved #1");
//     resolve("Hi");
//   }, 1000);
// });

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("Resolved #2");
//     reject("Java");
//   }, 2500);
// });

// const promise3 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("Resolved #3");
//     resolve("Script");
//   }, 4000);
// });

// const promiseGeneral = Promise.all([promise1, promise2, promise3]);

// promiseGeneral
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const delay = (ms) => {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// };

// delay(1000).then(() => {
//   console.log("delayed");
// });

// const racedPromise = Promise.race([promise2, promise3]); // fullfilled || rejected

// racedPromise
//   .then((val) => {
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const timeoutPromise = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     reject(new Error("Timeout error"));
//   }, 2000);
// });

// const fetchData = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     // resolve([1, 3, 5, 7, 10]);

//     reject(new Error("Not found"));
//   }, 500);
// });

// const query = Promise.race([timeoutPromise, fetchData]);
// query
//   .then((data) => {
//     console.log("Fetch is succesfull. Here is your data: ", data);
//   })
//   .catch((e) => {
//     if (e.message == "Timeout error") {
//       alert("Timeout Error");
//     } else {
//       console.log(e);
//     }
//   });

// let obj = new XMLHttpRequest();
// obj.open('GET', 'https://jsonplaceholder.typicode.com/users');
// obj.send();

// все пользователи - https://jsonplaceholder.typiode.com/users
// один пользователь - https://jsonplaceholder.typiode.com/users/{id}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    console.log("Succesfully", response);
    return response.json();
  })
  .then((data) => {
    console.log("Data is", data[0]);
  })
  .catch((err) => {
    console.log(err);
  });

fetch("https://jsonplaceholder.typicode.com/users/142")
  .then((response) => {
    if (response.ok) {
      // write logic for usual executing
    } else {
      throw new Error(response.status);
    }
  })
  .catch((e) => {
    console.log("error", e);
  });

const user = {
  name: "Test Object",
  username: "Smth",
};

// method 'POST'
let req = new XMLHttpRequest();
req.open("POST", "https://jsonplaceholder.typicode.com/users/");
req.send(JSON.stringify(user));

req.onload = function () {
  console.log(req.response);
};

req.onerror = function () {
  console.log(req.response);
};

fetch("https://jsonplaceholder.typicode.com/users/", {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  method: "POST",
  body: JSON.stringify(user),
})
  .then((res) => {
    console.log("Successfully POST REQUEST", res);
    return res.json();
  })
  .then((data) => {
    console.log("Data in POST REQUEST is: ", data);
  })
  .catch((e) => {
    console.log(e);
  });

fetch("http://localhost:8080")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });

const objToSent = {
  title: "Test title",
  body: "TestBody",
  completed: true,
};

fetch("http://localhost:8080/todo", {
  method: "POST",
  body: JSON.stringify(objToSent),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      alert("Something wrong");
      console.log(res.status, res.statusText);
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });
