# Глобальные объекты

В браузере это объект window

```
var foo = 42;
console.log(window.foo); // 42
 
const bar = 'some thing';
console.log(window.bar); // undefined
 
window.baz = 'JavaScript <3';
console.log(baz); // JavaScript <3
```

В Node.js тоже есть глобальный объект global

```
var foo = 42;
console.log(global.foo); // 42
```

# Объекты в JavaScript

- Нативные объекты
- Хост объекты
- Пользовательские объекты

# Нативные объекты

Нативными (native object) объектами в JS называют объекты, свойства и поведение которых описаны в спецификации языка JavaScript.

Их наличие не зависит от того окружения, где запускается код.

```
 Object, Array, Date, Math
 
```
# Хост объекты

Хост (host object) объектами в JS называют объекты, которые предоставляются окружением (зависят от того, где работает код)

```
Например, для браузеров это будут document, location, history, 
XMLHttpRequest, setTimeout, setInterval
```

# Литерал объекта

Объявление через {...} называют литералом объекта или литеральной нотацией.

# Прототипное наследование

Например, у нас есть объект user со своими свойствами и методами, и мы хотим создать объекты admin и guest как его слегка изменённые варианты.

Мы хотели бы повторно использовать то, что есть у объекта user, не копировать/переопределять его методы, а просто создать новый объект на его основе.

Прототипное наследование — это возможность языка, которая помогает в этом.

# [[Prototype]]

В JavaScript объекты имеют специальное скрытое свойство [[Prototype]] (так оно названо в спецификации), которое либо равно null, либо ссылается на другой объект. Этот объект называется «прототип»:

Свойство [[Prototype]] является внутренним и скрытым, но есть много способов задать его.

Одним из них является использование __proto__, например так:

```
const animal = {
    eats: true
};
const rabbit = {
    jumps: true,
};
const lions = {
    roar: true,
};
rabbit.__proto__ = animal;
lions.__proto__ = animal;
rabbit.jumps; // true
rabbit.eats; // true
```

Так же можно наследовать методы:

```
const animal = {
    eats: true,
    walk() {
        console.log("Walk");
    }
};
const rabbit = {
    jumps: true,
};
const lions = {
    roar: true,
};
rabbit.__proto__ = animal;
lions.__proto__ = animal;
rabbit.walk(); // Walk
rabbit.eats; // true
```

```
let animal = {
    eats: true,
    walk() {
        alert("Animal walk");
    }
};
let rabbit = {
    jumps: true,
    __proto__: animal
};
// walk взят из прототипа
rabbit.walk(); // Animal walk
```

# Операция записи не использует прототип

В приведённом ниже примере мы присваиваем rabbit собственный метод walk:

```
let animal = {
  eats: true,
  walk() {
    /* этот метод не будет использоваться в rabbit */
  }
};
let rabbit = {
  __proto__: animal
};
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
rabbit.walk(); // Rabbit! Bounce-bounce!
```

Теперь вызов rabbit.walk() находит метод непосредственно в объекте и выполняет его, не используя прототип


# Значение «this»

Неважно, где находится метод: в объекте или его прототипе.

При вызове метода this — всегда объект перед точкой.


```
// методы animal
let animal = {
    walk() {
        if (!this.isSleeping) {
            alert(`I walk`);
        }
    },
    sleep() {
        this.isSleeping = true;
    }
};
let rabbit = {
    name: "White Rabbit",
    __proto__: animal
};
// модифицирует rabbit.isSleeping
rabbit.sleep();
alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (нет такого свойства в прототипе)
```


# Методы конструктора Object

- Object.assign()

Создаёт новый объект путём копирования значений всех собственных перечислимых свойств из одного или более исходных объектов в целевой объект.

```
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

- Object.create()

Создаёт новый объект с указанными объектом прототипа и свойствами.

```
const human = {
    test: true,
};
const Vova = Object.create(human);
// Vova.__proto__ === human
```

- Object.freeze()

Замораживает объект: другой код не сможет удалить или изменить никакое свойство.

```
const person = {
    name: 'Petya',
};
person.age = 5;
const person1 = Object.freeze(person);
person1.test = '123';
console.log(person1); // {  name: 'Petya', age: 5  }. Свойство test не записалось
```

- Object.getOwnPropertyNames()

Возвращает массив, содержащий имена всех переданных объекту **собственных** перечисляемых и не перечисляемых свойств

```
const object1 = {
  a: 1,
  b: 2,
  c: 3
};
console.log(Object.getOwnPropertyNames(object1));
// expected output: Array ["a", "b", "c"]
```

- Object.keys()

Возвращает массив, содержащий имена всех **собственных** перечислимых свойств переданного объекта.

```
const arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // консоль: ['0', '1', '2']
const person = {
 name: 'Test',
 age: '100'
};
console.log(Object.keys(person)); // консоль: ['name', 'age']
```

- Object.values()

Возвращает массив, содержащий value всех **собственных** перечислимых свойств переданного объекта.

```
const person = {
    name: 'Petya',
    age: 20
};
console.log(Object.values(person)); // ['Petya', 20]
```

<h1>Coffee break</h1>

# Конструкторы, создание объектов через "new"

Обычный синтаксис {...} позволяет создать только один объект.

Но зачастую нам нужно создать множество однотипных объектов, таких как пользователи, элементы меню и т.д.

Это можно сделать при помощи функции-конструктора и оператора "new".


# Функция-конструктор

Функции-конструкторы являются обычными функциями. Но есть два соглашения:

- Имя функции - конструктора должно начинаться с большой буквы.
- Функция - конструктор должна вызываться при помощи оператора "new".

```
function Person(name, lastName, age, dream) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.dream = dream;
};
const firstUser = new Person('Vova', 'Testovich', '22', 'Become a ninja');
firstUser.name; // Vova
firstUser.nlastNameame; // Testovich
firstUser.dream; // Become a ninja
```

Когда функция вызывается как new Person(...), происходит следующее:

- Создаётся новый пустой объект, и он присваивается this.
- Выполняется код функции. Обычно он модифицирует this, добавляет туда новые свойства.
- Возвращается значение this.

Другими словами, вызов new User(...) делает примерно вот что:

```
function Person(name, lastName, age, dream) {
  // this = {};  (неявно)
  // добавляет свойства к this
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.dream = dream;
  // return this;  (неявно)
}
```

# new.target

Используя специальное свойство new.target внутри функции, мы можем проверить, вызвана ли функция при помощи оператора new или без него.

```
function Person() {
    alert(new.target);
}
// без "new":
Person(); // undefined
// с "new":
new Person(); // function User { ... }
```

# Свойство constructor

Свойство constructor - содержит ссылку на конструктор, которым объект был создан.

```
[].constructor; //Array;
({}).constructor; //Object;
function User() {};
new User().constructor; //User
```


```
function User() {};
alert(User.prototype.constructor); //User
User.prototype = {
	sayHi: function(){}
};
alert(User.prototype.constructor); //Object
```


# Оператор instanceof

Оператор instanceof позволяет проверить, с помощью какого конструктора создан объект.

Если объект создан с помощью определенного конструктора, то оператор возвращает true:

```
function User(...) {...}
const tom = new User("Том", 26);
 
const isUser = tom instanceof User;
const isCar = tom instanceof Car;
console.log(isUser);    // true
console.log(isCar);     // false
```

# Добавление метода к конструктору объекта

Функция конструктора также может определять методы:

```
function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
    this.name = function() {return this.firstName + " " + this.lastName;};
}
```

Нельзя добавлять новые методы к конструктору объекта тем же способом, как это делается в случае с существующим объектом.

Добавление методов к объекту должно происходить внутри функции конструктора:

```
function Person(firstName, lastName, age, eyeColor) {
    this.firstName = firstName;  
    this.lastName = lastName;
    this.age = age;
    this.eyeColor = eyeColor;
    this.changeAge = function (newAge) {
        this.age = newAge;
    };
} 
const person1 = new Person('Vova', 'Testovich', 10, grey);
person1.age; // 10
person1.changeName(11);
person1.age; // 11
```

JavaScript знает, о каком объекте идет речь, "подставляя" в ключевое слово this объект

# F.prototype

```
let animal = {
  eats: true
};
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype = animal;
let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
alert( rabbit.eats ); // true
```

Если в F.prototype содержится объект, оператор new устанавливает его в качестве [[Prototype]] для нового объекта.

Обратите внимание, что F.prototype означает обычное свойство с именем "prototype" для F.

Это ещё не «прототип объекта», а обычное свойство F с таким именем.

Установка Rabbit.prototype = animal буквально говорит интерпретатору следующее:

"При создании объекта через new Rabbit() запиши ему animal в [[Prototype]]".

F.prototype используется только в момент вызова new F()


# F.prototype по умолчанию, свойство constructor

У каждой функции по умолчанию уже есть свойство "prototype".

По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.

```
function Rabbit() {}
/* прототип по умолчанию
Rabbit.prototype = { constructor: Rabbit };
*/
```

Проверим это:

```
function Rabbit() {}
// по умолчанию:
// Rabbit.prototype = { constructor: Rabbit }
alert( Rabbit.prototype.constructor == Rabbit ); // true
```

Соответственно, если мы ничего не меняем, то свойство constructor будет доступно всем кроликам через [[Prototype]]:

```
function Rabbit() {}
// по умолчанию:
// Rabbit.prototype = { constructor: Rabbit }
let rabbit = new Rabbit(); // наследует от {constructor: Rabbit}
alert(rabbit.constructor == Rabbit); // true (свойство получено из прототипа)
```

**JavaScript сам по себе не гарантирует правильное значение свойства "constructor".**

```
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};
let rabbit = new Rabbit();
alert(rabbit.constructor === Rabbit); // false
```

# Возврат значения из конструктора return

Обычно конструкторы ничего не возвращают явно. Их задача – записать все необходимое в this, который в итоге станет результатом.

Но если return всё же есть, то применяется простое правило:

- При вызове return с объектом, будет возвращён объект, а не this.
- При вызове return с примитивным значением, примитивное значение будет отброшено.

```
function Person() {
  this.name = "Вася";
  return { name: "Godzilla" };  // <-- возвращает этот объект
}
alert( new Person().name );  // Godzilla, получили этот объект
function Person1() {
  this.name = "Вася";
  return; // <-- возвращает this
}
alert( new Person1().name );  // Вася
```

# Отсутствие скобок

```
let user = new User; // <-- без скобок
// то же, что и
let user = new User();
```


# Prototype для нативных объектов

Через prototype мы можем создавать свои методы для нативных объектов таких как Array, Object и т.д.

Давайте сделать свой метод для массива

```
Array.prototype.sayHello = function () {
    console.log('Hello! Im array');
};
const arr = [1, 2, 3];
arr.sayHello(); // Hello! Im array
```

Давайте сделаем свой метод для объекта

```
Object.prototype.getName = function (params) {
    console.log('Hello! Im object');
};
const person = {
    test1: 1,
    test2: 2,
};
person.getName();
```
