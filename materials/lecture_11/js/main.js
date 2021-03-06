/**
 * Debugger
 */

// let a = 4; // 4
// let b = a + 3; // 7 (4+3)
// let c = b ** 2;
// let d = c - 32;
// console.log(d);

// for (let i = 0; i < 10; i++) {
//   const newValue = i + 32;
//   console.log(newValue);
// }

// let obj = {
//   a: 3,
//   subObj: {
//     a: 42,
//   },
// };
// // console.log("testing ", JSON.parse(JSON.stringify(obj)));

// const newObj = Object.assign({}, obj);
// console.log("testing", newObj);
// // debugger;
// for (let i = 0; i < 32; i++) {
//   console.log(i);
// }

// obj.b = 45;
// obj.subObj.b = 345;
// console.log("testing", JSON.parse(JSON.stringify(obj)));

// function sum(a, b, ...rest) {
//   return a + b;
// }

// sum(a, b, 1, 2, 3, 4, 5, 6);

// console.log(obj)

/**
 * Try catch
 */

console.log("test");

// try {
//   // code
//   const a = 2;
//   a.concat([1, 2, 3, 4]);
// } catch (error) {
//   console.log(error);
// }

// try {
//   const string = "Hello world";
//   console.log(string);
// } catch (error) {
//   alert("Error detected");
// }

// try {
//   const value = Math.random(); // [0, 1) 0 - 0.99
//   console.log("Generated value", value);
//   if (value < 0.5) {
//     // code with throw
//     // throw value;
//     throw new Error("Number is lower than 0.5");
//   } else {
//     alert(`Everything is ok: ${value}`);
//   }
// } catch (error) {
//   alert(error);
// }

// console.log("Still working...");
// 1 - network error
// 2 - custom lib error
// 3 - unknown error

function MyCustomError(message, type) {
  const typeMap = {
    1: "network error",
    2: "custom lib error",
    3: "unknown error",
  };

  this.name = type ? typeMap[type] || "unknown error" : "unknown error";

  this.message = message;
}
// console.log(1);
// setTimeout(() => {
//   console.log(2);
// }, 0);
// console.log(3);

// try {
//   const value = Math.random(); // [0, 1) 0 - 0.99
//   console.log("Generated value", value);
//   if (value < 0.5) {
//     // code with throw
//     // throw value;
//     // setTimeout(() => {
//     //   throw new Error("Number is lower than 0.5");
//     // }, 1000);
//     for (let index = 0; index < 1000; index++) {
//       console.log(index);
//       if (index === 8) {
//         throw {
//           name: "My Custom Error",
//           message: "Empty message template",
//         };

//       }
//     }
//   } else {
//     alert(`Everything is ok: ${value}`);
//   }
// } catch (error) {
//   console.log(error.name, "||", error.message);
// }

// try {
//   throw new MyCustomError("Message", 5);
// } catch (error) {
//   console.log(error.name, "||", error.message);
// }

// try {
//   if (confirm("?????????????????????????? ?????????????")) {
//     BAD_CODE();
//   }
//   console.log("some text");
// } catch (error) {
//   console.log("There is an error", error);
// } finally {
//   console.log("Finally block");
// }

/**
 * Async/await
 */

// const API_URL = "https://jsonplaceholder.typicode.com";

// btn.addEventListener("click", () => {
//   sendRequest();
// });

// const sendRequest = () => {
//   fetch(`${API_URL}/users`)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Response is not ok");
//       }
//     })
//     .then((result) => {
//       console.log("Users", result);
//       fetch(`${API_URL}/posts`)
//         .then((response) => {
//           if (response.ok) {
//             return response.json();
//           } else {
//             throw new Error("Response is not ok");
//           }
//         })
//         .then((res) => {
//           console.log("Posts", res);
//           fetch(`${API_URL}/comments`)
//             .then((response) => {
//               if (response.ok) {
//                 return response.json();
//               } else {
//                 throw new Error("Response is not ok");
//               }
//             })
//             .then((result) => {
//               console.log("comments", result);
//             })
//             .catch((err) => {
//               console.log("errored", err);
//             });
//         })
//         .catch((err) => {
//           console.log("errored", err);
//         });
//     })
//     .catch((err) => {
//       console.log("errored", err);
//     });
// };

// const asyncFunction = async () => {
//   try {
//     const usersResponse = await fetch(`${API_URL}/users`);
//     if (!usersResponse.ok) {
//       throw new Error("usersResponse is not ok");
//     }
//     const usersData = await usersResponse.json();

//     const postsResponse = await fetch(`${API_URL}/posts`);
//     if (!postsResponse.ok) {
//       throw new Error("postsResponse is not ok");
//     }
//     const postsData = await postsResponse.json();

//     const commentsResponse = await fetch(`${API_URL}/posts`);
//     if (!commentsResponse.ok) {
//       throw new Error("commentsResponse is not ok");
//     }
//     const commentsData = await commentsResponse.json();
//   } catch (error) {}
// };

// asn.addEventListener("click", () => {
//   asyncFunction();
// });

/**
 * Destructurization
 */

//  const obj = {
//   a: 3,
//   b: 4,
//   c: 4,
// };

// const { a, c } = obj;

// console.log(a, c);

// let arr = [1, 2, 3, 4, 5, 6, 7];

// const [first, second, third, ...rest] = arr;

// console.log(first, second, third, rest);

// const input = document.querySelector("input");
// const searchButton = document.getElementById("searchButton");
// const str = "   h i   ";

// const GITHUB_API_URL = "https://api.github.com";

// const findUser = async () => {
//   try {
//     const { value } = input;
//     const text = value.split(" ").join("");
//     if (text == "") {
//       throw new Error("Empty search field");
//     }

//     const response = await fetch(`${GITHUB_API_URL}/users/${text}`);
//     if (!response.ok) {
//       throw new Error("User not found");
//     }
//     const data = await response.json();
//     console.log("data", data);
//   } catch (error) {
//     alert(error.message);
//   }
// };

// searchButton.addEventListener("click", findUser);

// const div = document.getElementById("example");
// console.log(div.offsetLeft);
// console.log(div.offsetTop);

// console.log(div.clientLeft);
// console.log(div.clientTop);

// console.log(div.scrollHeight);

// document.querySelector("button").addEventListener("click", () => {
//   // test.scrollIntoView({
//   //   behavior: "smooth",
//   //   block: "end",
//   // });
//   example.style.height = `${example.scrollHeight}px`;
// });

// reset.addEventListener("click", () => {
//   example.removeAttribute("style");
// });
