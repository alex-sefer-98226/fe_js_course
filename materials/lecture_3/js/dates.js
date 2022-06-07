// Date and time

const now_date_and_time = new Date();
// console.log(now_date_and_time);

// console.log(Date.now());
const obj = new Date(0); // using timestamp
const date_in_string = new Date("2022-05-21"); // using string
// console.log(date_in_string);
const someObject = new Date(2022, 5, 7, 20, 7, 30, 345); // using arguments

console.log("Custom date", someObject);
// const initial_date = new Date(-1000 * 60 * 60 * 24);
// console.log(initial_date);
console.log(now_date_and_time.getDay());

const sunday = new Date("2022-06-05");

// day of week 0 - 6 from Sunday
console.log(sunday.getDay());

// day of month // 1 - 31
console.log(now_date_and_time.getDate());

// month of year // 0 - 11
console.log(now_date_and_time.getMonth());

console.log(now_date_and_time.getFullYear());

console.log(now_date_and_time.getHours());

console.log(now_date_and_time.getUTCHours());

console.log(now_date_and_time.getMinutes());

console.log(now_date_and_time.getUTCSeconds());

console.log(now_date_and_time.getMilliseconds());

console.log(now_date_and_time.getTimezoneOffset());
