// console.log("hi");
// fetch(`http://localhost:8080/todo/3`, {
//   method: "DELETE",
// })
//   .then((res) => {
//     console.log(res);
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

if (localStorage.getItem("isVisited")) {
  console.log("Key exist, alert is not needed");
} else {
  alert("HI, Welcome on out website");
  const objVisited = {
    value: true,
    time: Date.now(),
  };

  localStorage.setItem("isVisited", JSON.stringify(objVisited));
}

localStorage.setItem("a", "a");
localStorage.setItem("2", "2");
localStorage.setItem("123", "123");
localStorage.setItem("test", "test");
localStorage.setItem("something", "something");

console.log(localStorage.getItem("alex"));

btn.addEventListener("click", () => {
  localStorage.clear();
  sessionStorage.clear();
});

console.log(sessionStorage.getItem("Test Item in Session Storage"));
// sessionStorage.setItem("Test Item in Session Storage", "32");
