// console.log("Hi");
// console.log(parseFloat(5.62));
// console.log(parseFloat("2"));
// console.log(parseFloat("4.45"));
// console.log(parseFloat("314e-2"));
// console.log(parseFloat("0.0314E+2"));
// console.log(parseFloat("3.14какие-нибудь не цифровые знаки"));
// console.log(parseFloat("какие-нибудь не цифровые знаки"));
// console.log(parseFloat("какие-нибудь не 3.15цифровые знаки"));

// parseInt
// console.log(parseInt("2"));
// console.log(parseInt("4.99"));
// console.log(parseInt("1111", 2));
// console.log(parseInt("FF", 16)); // #00 cc ff
// console.log(parseInt("751", 8));
// console.log(parseInt("546", 2));

// const window = {
//   document: {
//     // ...
//   },
//   browser: {
//     //..
//   },
//   javaScript: {
//     //..
//   },
// };

// function myFunc() {
//   console.log("My function was called");
// }

// var a = "test";
// var b = 3;
// console.log(window);

// console.log(navigator);
// console.log(navigator.userAgent);
// console.log(location);

// console.log(document.head);
// console.log(document.body);

// const html = {
//   head: {
//     title: {
//       text: "Заголовок",
//     },
//   },
//   body: {
//     text: "Прекрасный документ",
//   },
// };

let el = document.getElementById("second");
// console.log(el);

let listItemsCollection = document.getElementsByTagName("li");
let listItemsArray = Array.from(listItemsCollection);
// // console.log(listItemsCollection, listItemsArray);
// listItemsArray.forEach((el) => {
//   el.innerText += " was checked";
//   el.style.zIndex = 4; // .

//   const ourfontSize = 24;

//   el.style.fontSize = `${ourfontSize}px`;
//   el.style.top = 0;
//   // console.log(el);
//   el.classList.add("colorRed", "test", "x");
//   el.classList.remove("test", "green");
// });

// let items = document.getElementsByClassName("blue");
// console.log(items);
let divs = Array.from(document.getElementsByTagName("div"));
// console.log(divs);
// console.log("Div #3", divs[2]);
const paragraphs = Array.from(divs[2].getElementsByTagName("p"));
// console.log(paragraphs);

// paragraphs.forEach((p) => {
//   console.log(p, p.style.color);
// });
// filter
const paragraphsWithRedColor = paragraphs.filter((p) => {
  if (p.style.color === "red") {
    return true;
  } else {
    return false;
  }
});

// console.log(paragraphsWithRedColor);
const itembyId = document.body.querySelector("#second");
const itembyClassName = document.body.querySelector(".blue");
const itembyTag = document.body.querySelector("p");

// console.log(itembyId, itembyClassName, itembyTag);

const itemsById = document.body.querySelectorAll("#second");
const itemsByClassName = document.body.querySelectorAll(".blue");
const itemsByTag = document.body.querySelectorAll("p");

// console.log(itemsById, itemsByClassName, itemsByTag);

// const forTestItems = Array.from(document.body.querySelectorAll(".for-test"));
// console.log(forTestItems);
// forTestItems.forEach((element) => {
//   console.log(element.ELEMENT_NODE);
// });
// console.log(document.ELEMENT_NODE);

let div = document.createElement("div");
div.innerText = "Привет, я первый созданный див";
div.style.color = "green";

// console.log(second);
// second.appendChild(div);
document.body.appendChild(div);

const list = document.createElement("ul");
const item1 = document.createElement("li");
item1.innerText = `Item №1`;
const item2 = document.createElement("li");
item2.innerText = `Item №2`;
const item3 = document.createElement("li");
item3.innerText = `Item №3`;
const item4 = document.createElement("li");
item4.innerText = `Item №4`;

list.append(item1, item2, item3, item4);

document.body.appendChild(list);

ordered.append("test");
ordered.prepend("test with prepend");

console.log(firstItem);
const listItemForBefore = document.createElement("li");
listItemForBefore.innerText = "listItemForBefore";

firstItem.before(listItemForBefore);

const listItemForAfter = document.createElement("li");
listItemForAfter.innerText = "listItemForAfter";

firstItem.after(listItemForAfter);

const someHeading = document.createElement("h1");
someHeading.innerText = "Heading H1";
firstItem.replaceWith(someHeading);

const foundDivs = Array.from(document.querySelectorAll("div"));
const filteredDivs = foundDivs.filter((div) => {
  return div.style.color === "green"; // ? true : false
});
console.log(filteredDivs);
filteredDivs[0].remove();

const allPOnPage = Array.from(document.querySelectorAll("p"));
allPOnPage.forEach((p) => {
  p.remove();
});

console.log(test.dataset);

console.log(test.dataset.item);
console.log(test.dataset.color);
test.dataset.color = "green";
console.log(test.dataset.color);
