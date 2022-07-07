# Флаги и дескрипторы свойств

Как мы знаем, объекты могут содержать свойства.

До этого момента мы рассматривали свойство только как пару «ключ-значение». Но на самом деле свойство объекта гораздо мощнее и гибче.

# Флаги свойств

Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).

- writable – если true, свойство можно изменить, иначе оно только для чтения.

- enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.

- configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

**Метод Object.getOwnPropertyDescriptor позволяет получить полную информацию о свойстве.**

```
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

- obj

Объект, из которого мы получаем информацию.

- propertyName

Имя свойства


Возвращаемое значение – это объект, так называемый «дескриптор свойства»: он содержит значение свойства и все его флаги.


# Чтобы изменить флаги, мы можем использовать метод Object.defineProperty.

```
Object.defineProperty(obj, propertyName, descriptor)
```

- obj, propertyName

Объект и его свойство, для которого нужно применить дескриптор.

- descriptor

Применяемый дескриптор.

```
let user = {};
Object.defineProperty(user, "name", {
    value: "John"
});
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
console.log(descriptor)
// OUTPUT
{
    value: "John", 
    writable: false, 
    enumerable: false, 
    configurable: false
}
```

# Только для чтения

Сделаем свойство user.name доступным только для чтения. Для этого изменим флаг writable:

```
let user = {
  name: "John"
};
Object.defineProperty(user, "name", {
  writable: false
});
user.name = "Pete"; // Ошибка: Невозможно изменить доступное только для чтения свойство 'name'
```

Ошибки появляются только в строгом режиме

# Неперечислимое свойство

Теперь добавим собственный метод toString к объекту user.

```
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};
// По умолчанию оба свойства выведутся:
for (let key in user) alert(key); // name, toString
```

Если мы этого не хотим, можно установить для свойства enumerable:false.

Тогда оно перестанет появляться в цикле for..in аналогично встроенному toString:

```
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};
Object.defineProperty(user, "toString", {
  enumerable: false
});
// Теперь наше свойство toString пропало из цикла:
for (let key in user) alert(key); // name
```

Неперечислимые свойства также не возвращаются Object.keys:

```
alert(Object.keys(user)); // name
```

# Метод Object.defineProperties

Существует метод Object.defineProperties(obj, descriptors), который позволяет определять множество свойств сразу.

```
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

Пример:

```
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```




# Классы

Классы — это функции

Класс JavaScript — это вид функции. Для декларирования классов используется ключевое слово class.

Мы используем синтаксис выражения функции для инициализации функции и синтаксис выражения класса для инициализации класса.

```
// Initializing a function with a function expression
const x = function() {}
// Initializing a class with a class expression
const y = class {}
```

Мы можем получить доступ к [[Prototype]] объекта с помощью метода Object.getPrototypeOf(). Давайте протестируем созданную нами пустую функцию.

```
Object.getPrototypeOf(x);
Output
ƒ () { [native code] }
```

Также мы можем использовать этот метод для только что созданного нами класса.

```
Object.getPrototypeOf(y);
Output
ƒ () { [native code] }
```

Программный код, декларированный с помощью function и class, возвращает функцию [[Prototype]].

При использовании прототипов любую функцию можно превратить в экземпляр конструктора с помощью ключевого слова new.

```
const x = function() {}
// Initialize a constructor from a function
const constructorFromFunction = new x();
console.log(constructorFromFunction);
Output
x {}
constructor: ƒ ()
```

Это также относится и к классам.

```
const y = class {}
// Initialize a constructor from a class
const constructorFromClass = new y();
console.log(constructorFromClass);
Output
y {}
constructor: class
```

# Определение класса

- Пример через функцию

```
function Hero(name, level) {
    this.name = name;
    this.level = level;
}
// Adding a method to the constructor
Hero.prototype.greet = function() {
    return `${this.name} says hello.`;
}
```

- Пример через класс

```
class Hero {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }
    // Adding a method to the constructor
    greet() {
        return `${this.name} says hello.`;
    }
}
```

Давайте посмотрим на эти свойства и методы в действии.

Мы создадим новый экземпляр Hero, используя ключевое слово new, и присвоим некоторые значения.

```
const hero1 = new Hero('Varg', 1);
Output
Hero {name: "Varg", level: 1}
__proto__:
  ▶ constructor: class Hero
  ▶ greet: ƒ greet()
```

# Расширение класса

Функции конструктора и классы можно расширять на новые планы объекта на основе родительского экземпляра.

Это позволяет не повторять код для похожих объектов, для которых нужно просто добавить дополнительные или более детальные характеристики.

Новые функции конструктора можно создавать на основе родительского экземпляра с помощью метода call().

В примере ниже мы создадим более конкретный класс персонажа Mage и присвоим ему свойства Hero с помощью метода call(), а также добавим дополнительное свойство.

 ```
 function Hero(name, level) {
    this.name = name;
    this.level = level;
}
Hero.prototype.greet = function() {
    return `${this.name} says hello.`;
}
 
 
 // Creating a new constructor from the parent
function Mage(name, level, spell) {
    // Chain constructor with call
    Hero.call(this, name, level);
    this.spell = spell;
}
 ```

Сейчас мы можем создать новый экземпляр Mage, используя те же свойства, что и Hero ,а также добавленное свойство.

**Для классов ES6 ключевое слово super используется вместо call для доступа к родительским функциям.**

Мы будем использовать extends для обозначения родительского класса.


```
class Hero {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }
    greet() {
        return `${this.name} says hello.`;
    }
}
// Creating a new class from the parent
class Mage extends Hero {
    constructor(name, level, spell) {
        // Chain constructor with super
        super(name, level);
        // Add a new property
        this.spell = spell;
    }
}
```

Теперь мы можем точно так же создать новый экземпляр Mage.

```
const hero2 = new Mage('Lejon', 2, 'Magic');
Output
Mage {name: "Lejon", level: 2, spell: "Magic"}
__proto__: Hero
    ▶ constructor: class Mage
```


Ниже приводится полное сравнение процесса инициализации, добавления методов и наследования между функцией конструктора и классом.

constructor.js

```
function Hero(name, level) {
    this.name = name;
    this.level = level;
}
// Adding a method to the constructor
Hero.prototype.greet = function() {
    return `${this.name} says hello.`;
}
// Creating a new constructor from the parent
function Mage(name, level, spell) {
    // Chain constructor with call
    Hero.call(this, name, level);
    this.spell = spell;
}
```


class.js

```
// Initializing a class
class Hero {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }
    // Adding a method to the constructor
    greet() {
        return `${this.name} says hello.`;
    }
}
// Creating a new class from the parent
class Mage extends Hero {
    constructor(name, level, spell) {
        // Chain constructor with super
        super(name, level);
        // Add a new property
        this.spell = spell;
    }
}
```

# Не просто синтаксический сахар

Говорят, что class – это просто «синтаксический сахар» в JavaScript (синтаксис для улучшения читаемости кода, но не делающий ничего принципиально нового), потому что мы можем сделать всё то же самое без конструкции class:

```
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}
// класс - это функция
alert(typeof User); // function
// ...или, если точнее, это метод constructor
alert(User === User.prototype.constructor); // true
// Методы находятся в User.prototype, например:
alert(User.prototype.sayHi); // alert(this.name);
// в прототипе ровно 2 метода
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```


```
// перепишем класс User на чистых функциях
// 1. Создаём функцию constructor
function User(name) {
  this.name = name;
}
// каждый прототип функции имеет свойство constructor по умолчанию,
// поэтому нам нет необходимости его создавать
// 2. Добавляем метод в прототип
User.prototype.sayHi = function() {
  alert(this.name);
};
// Использование:
let user = new User("Иван");
user.sayHi();
```

# Однако есть важные отличия:

- Во-первых, функция, созданная с помощью class, помечена специальным внутренним свойством [[FunctionKind]]:"classConstructor".

Поэтому это не совсем то же самое, что создавать её вручную.

В отличие от обычных функций, конструктор класса не может быть вызван без new:

```
class User {
  constructor() {}
}
alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'
```

Кроме того, строковое представление конструктора класса в большинстве движков JavaScript начинается с «class …»

```
class User {
  constructor() {}
}
alert(User); // class User { ... }
```

- Методы класса являются неперечислимыми.

Определение класса устанавливает флаг enumerable вfalse для всех методов в "prototype".

И это хорошо, так как если мы проходимся циклом for..in по объекту, то обычно мы не хотим при этом получать методы класса.

- Классы всегда используют use strict. Весь код внутри класса автоматически находится в строгом режиме.

# Class Expression

Как и функции, классы можно определять внутри другого выражения, передавать, возвращать, присваивать и т.д.

Пример Class Expression (по аналогии с Function Expression):

```
let User = class {
  sayHi() {
    alert("Привет");
  }
};
```

Аналогично Named Function Expression, Class Expression может иметь имя.

Если у Class Expression есть имя, то оно видно только внутри класса:

```
// "Named Class Expression"
// (в спецификации нет такого термина, но происходящее похоже на Named Function Expression)
let User = class MyClass {
  sayHi() {
    alert(MyClass); // имя MyClass видно только внутри класса
  }
};
new User().sayHi(); // работает, выводит определение MyClass
alert(MyClass); // ошибка, имя MyClass не видно за пределами класса
```

Мы даже можем динамически создавать классы «по запросу»:

```
function makeClass(phrase) {
  // объявляем класс и возвращаем его
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}
// Создаём новый класс
let User = makeClass("Привет");
new User().sayHi(); // Привет
```




# Приватное свойство ( Новая возможность )

Эта возможность была добавлена в язык недавно. В движках JavaScript пока не поддерживается или поддерживается частично, нужен полифил.

Есть новшество в языке JavaScript, которое почти добавлено в стандарт: оно добавляет поддержку приватных свойств и методов.

Приватные свойства и методы должны начинаться с #. Они доступны только внутри класса.

Например, в классе ниже есть приватное свойство #waterLimit и приватный метод #checkWater для проверки количества воды:

```
class CoffeeMachine {
  #waterLimit = 200;
  #checkWater(value) {
    if (value < 0) throw new Error("Отрицательный уровень воды");
    if (value > this.#waterLimit) throw new Error("Слишком много воды");
  }
}
let coffeeMachine = new CoffeeMachine();
// снаружи  нет доступа к приватным методам класса
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error
```

На уровне языка # является специальным символом, который означает, что поле приватное.

Мы не можем получить к нему доступ извне или из наследуемых классов.

Например, давайте сделаем аксессор waterAmount для #waterAmount:

```
class CoffeeMachine {
  #waterAmount = 0;
  get waterAmount() {
    return this.#waterAmount;
  }
  set waterAmount(value) {
    if (value < 0) throw new Error("Отрицательный уровень воды");
    this.#waterAmount = value;
  }
}
let machine = new CoffeeMachine();
machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

Но если мы унаследуем от CoffeeMachine, то мы не получим прямого доступа к #waterAmount.

Мы будем вынуждены полагаться на геттер/сеттер waterAmount:

```
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
  }
}
```


Задание:

Давайте создадим class Document, у которого будет констурктор (он будет принимать DOM) и будет метод, который добавляем div в конец DOM :)

Еще можем добавить методы, для настройки нашего div (текст в нем, цвет, размеры и т.д.)


```
class DIV {
    newDiv = {};
    constructor(dom) {
        this.dom = dom
    }
    spawnDiv() {
        this.newDiv = this.dom.createElement('div');
        this.dom.body.append(this.newDiv);
    }
    setDivText(text) {
        console.log(this.newDiv)
        this.newDiv.innerText = text;
    }
}
const customDiv = new DIV(document);
customDiv.spawnDiv();
customDiv.setDivText('TEST');
```


# Свойства - геттеры и сеттеры

Есть два типа свойств объекта.

- Первый тип это свойства-данные (data properties).

Мы уже знаем, как работать с ними. Все свойства, которые мы использовали до текущего момента, были свойствами-данными.

- Второй это свойства-аксессоры (accessor properties).

По своей сути это функции, которые используются для присвоения и получения значения, но во внешнем коде они выглядят как обычные свойства объекта.


# Геттеры и сеттеры

Свойства-аксессоры представлены методами: «геттер» – для чтения и «сеттер» – для записи. При литеральном объявлении объекта они обозначаются get и set:

```
let obj = {
  get propName() {
    // геттер, срабатывает при чтении obj.propName
  },
  set propName(value) {
    // сеттер, срабатывает при записи obj.propName = value
  }
};
```


Геттер срабатывает, когда obj.propName читается, сеттер – когда значение присваивается.

Например, у нас есть объект user со свойствами name и surname:

```
let user = {
  name: "John",
  surname: "Smith"
};
```

А теперь добавим свойство объекта fullName для полного имен

```
let user = {
  name: "John",
  surname: "Smith",
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};
alert(user.fullName); // John Smith
```

Снаружи свойство-аксессор выглядит как обычное свойство. В этом и заключается смысл свойств-аксессоров.

Мы не вызываем user.fullName как функцию, а читаем как обычное свойство: геттер выполнит всю работу за кулисами.

```
let user = {
  get fullName() {
    return `...`;
  }
};
user.fullName = "Тест"; // Ошибка (у свойства есть только геттер)
```

Давайте исправим это, добавив сеттер для user.fullName:

```
let user = {
  name: "John",
  surname: "Smith",
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};
// set fullName запустится с данным значением
user.fullName = "Alice Cooper";
alert(user.name); // Alice
alert(user.surname); // Cooper
```

# Дескрипторы свойств доступа


Дескрипторы свойств-аксессоров отличаются от «обычных» свойств-данных.

Свойства-аксессоры не имеют value и writable, но взамен предлагают функции get и set.

То есть, дескриптор аксессора может иметь:

- get – функция без аргументов, которая сработает при чтении свойства,

- set – функция, принимающая один аргумент, вызываемая при присвоении свойства,

- enumerable – то же самое, что и для свойств-данных,

- configurable – то же самое, что и для свойств-данных.

```
let user = {
  name: "John",
  surname: "Smith"
};
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },
  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});
alert(user.fullName); // John Smith
for(let key in user) alert(key); // name, surname
```

При попытке указать и get, и value в одном дескрипторе будет ошибка:

```
// Error: Invalid property descriptor.
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },
  value: 2
});
```

# Умные геттеры/сеттеры

Геттеры/сеттеры можно использовать как обёртки над «реальными» значениями свойств, чтобы получить больше контроля над операциями с ними.

Например, если мы хотим запретить устанавливать короткое имя для user, мы можем использовать сеттер name для проверки, а само значение хранить в отдельном свойстве _name:


```
let user = {
  get name() {
    return this._name;
  },
  set name(value) {
    if (value.length < 4) {
      alert("Имя слишком короткое, должно быть более 4 символов");
      return;
    }
    this._name = value;
  }
};
user.name = "Pete";
alert(user.name); // Pete
user.name = ""; // Имя слишком короткое...
```

Таким образом, само имя хранится в _name, доступ к которому производится через геттер и сеттер.

Существует широко известное соглашение о том, что свойства, которые начинаются с символа _, являются внутренними, и к ним не следует обращаться из-за пределов объекта.

# Геттеры и Сеттеры в классах

Как и в литеральных объектах, в классах можно объявлять вычисляемые свойства, геттеры/сеттеры и т.д.

Вот пример user.name, реализованного с использованием get/set:

```
class User {
  constructor(name) {
    // вызывает сеттер
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      alert("Имя слишком короткое.");
      return;
    }
    this._name = value;
  }
}
let user = new User("Иван");
alert(user.name); // Иван
user = new User(""); // Имя слишком короткое.
```

# Статические свойства и методы

Мы можем присвоить метод самой функции-классу, а не её "prototype". Такие методы называются статическими.

В классе такие методы обозначаются ключевым словом static, например:

```
class User {
  static staticMethod() {
    alert(this === User);
  }
}
User.staticMethod(); // true
```

Это фактически то же самое, что присвоить метод напрямую как свойство функции:

```
class User { }
User.staticMethod = function() {
  alert(this === User);
};
```

Значением this при вызове User.staticMethod() является сам конструктор класса User (правило «объект до точки»).

Обычно статические методы используются для реализации функций, принадлежащих классу, но не к каким-то конкретным его объектам.

Например, есть объекты статей Article, и нужна функция для их сравнения. Естественное решение – сделать для этого метод Article.compare:

```
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}
// использование
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];
articles.sort(Article.compare);
alert( articles[0].title ); // CSS
```

Здесь метод Article.compare стоит «над» статьями, как способ их сравнения. Это метод не отдельной статьи, а всего класса.

**Другим примером может быть так называемый «фабричный» метод. Представим, что нам нужно создавать статьи различными способами:**

- Создание через заданные параметры (title, date и т. д.).

- Создание пустой статьи с сегодняшней датой.

- …или как-то ещё

Первый способ может быть реализован через конструктор. А для второго можно использовать статический метод класса.

Такой как Article.createTodays() в следующем примере:

```
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static createTodays() {
    return new this("Сегодняшний дайджест", new Date());
  }
}
let article = Article.createTodays();
alert( article.title ); // Сегодняшний дайджест
```

# Статические свойства

Эта возможность была добавлена в язык недавно. Примеры работают в последнем Chrome.

Статические свойства также возможны, они выглядят как свойства класса, но с static в начале:

```
class Article {
  static publisher = "Илья Кантор";
}
alert( Article.publisher ); // Илья Кантор
```

# Наследование статических свойств и методов

Статические свойства и методы наследуются.

Например, метод Animal.compare в коде ниже наследуется и доступен как Rabbit.compare:

```
class Animal {
  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }
  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} бежит со скоростью ${this.speed}.`);
  }
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}
// Наследует от Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} прячется!`);
  }
}
let rabbits = [
  new Rabbit("Белый кролик", 10),
  new Rabbit("Чёрный кролик", 5)
];
rabbits.sort(Rabbit.compare);
rabbits[0].run(); // Чёрный кролик бежит со скоростью 5.
```

Мы можем вызвать Rabbit.compare, при этом будет вызван унаследованный Animal.compare.

Как это работает? Снова с использованием прототипов.

**Как вы уже могли предположить, extends даёт Rabbit ссылку [[Prototype]] на Animal**

![help](https://learn.javascript.ru/article/static-properties-methods/animal-rabbit-static.svg)