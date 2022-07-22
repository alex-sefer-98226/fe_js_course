# ПАТТЕРН АДАПТЕР

Обеспечивает совместимость классов с разными интерфейсами, т.е. выполняет роль переводчика.

В итоге клиент (тот кто вызывает методы) через адаптер может работать с разными классами с разными интерфейсами, даже не подозревая об этом,
хотя умеет пользоваться только одним интерфейсом.

```
// old interface
class OldCalculator {
    constructor() {
        this.operations = function(term1, term2, operation) {
            switch (operation) {
                case 'add':
                    return term1 + term2;
                case 'sub':
                    return term1 - term2;
                default:
                    return NaN;
            }
        };
    }
}
// new interface
class NewCalculator {
    constructor() {
        this.add = function(term1, term2) {
            return term1 + term2;
        };
        this.sub = function(term1, term2) {
            return term1 - term2;
        };
    }
}
// Adapter Class
class AdapterNewToOldCalc { // работает newCalculator под интерфейсом OldCalculator
    constructor() {
        const newCalc = new NewCalculator();
        this.operations = function(term1, term2, operation) {
            switch (operation) {
                case 'add':
                    // using the new implementation under the hood
                    return newCalc.add(term1, term2);
                case 'sub':
                    return newCalc.sub(term1, term2);
                default:
                    return NaN;
            }
        };
    }
}
// usage
const oldCalc = new OldCalculator();
console.log(oldCalc.operations(10, 5, 'add')); // 15
const newCalc = new NewCalculator();
console.log(newCalc.add(10, 5)); // 15
const adaptedCalc = new AdapterNewToOldCalc();
console.log(adaptedCalc.operations(10, 5, 'add')); // 15;
```

# ПАТТЕРН МОСТ (bridge)

Паттерн МОСТ - отделяет абстракцию от реализации, благодаря чему появляется возможность независимо изменять то и
другое.

Это структурный паттерн проектирования, который разделяет один или несколько классов на две отдельные
иерархии — абстракцию и реализацию, позволяя изменять их независимо друг от друга.

Например у нас есть класс Круг, и мы хотим создавать круги разного цвета, для этого нужно будет создать подклассы
Синий Круг, Желтый круг и т.д. А если потом появятся квадраты и треугольники, то для них тоже нужно будет создавать
большое количество подклассов.

В итоге иерархия будет огромной. Логичнее создать две независимых иерархии -
Формы (круг, квадрат, треугольник) и Цвета (синий, желтый и т.д.) и потом соединить их композицией.

```
// Основная иерархия (абстракция)
class interface_Pages {
    getContent() {
        throw new Error(`В ${this.constructor.name} не описан метод getContent()`)
    }
    setTheme() {
        throw new Error(`В ${this.constructor.name} не описан метод setTheme()`)
    }
}
class About extends interface_Pages { //страница о нас
    constructor(theme) {
        super();
        this.theme = theme
    }
    getContent() {
        return "About page in " + this.theme.getColor()
    }
    setTheme(theme) {
        this.theme = theme
    }
}
class Careers extends interface_Pages { // страница карьера
    constructor(theme) {
        super();
        this.theme = theme
    }
    getContent() {
        return "Careers page in " + this.theme.getColor()
    }
    setTheme(theme) {
        this.theme = theme
    }
}
// Вспомогательная иерархия (реализация)
class DarkTheme { // темная тема оформления
    getColor() {
        return 'Dark Black'
    }
}
class LightTheme { // светлая тема
    getColor() {
        return 'Off white'
    }
}
class AquaTheme { // голубая тема
    getColor() {
        return 'Light blue'
    }
}
const darkTheme = new DarkTheme()
const lightTheme = new LightTheme;
const about = new About(darkTheme); // указываем тему при инициации
const careers = new Careers(darkTheme);
console.log(about.getContent())// "About page in Dark Black"
console.log(careers.getContent())// "Careers page in Dark Black"
about.setTheme(lightTheme); // динамически меняем темы
careers.setTheme(lightTheme);
console.log(about.getContent())// "About page in Off white"
console.log(careers.getContent())// "Careers page in Off white"
```

# Solid

SOLID — это аббревиатура принципов, объектно-ориентированного дизайна.

Впервые была описана Робертом Мартином.

По сути любой из принципов сводится к правильному построению абстракций.

В целом главная цель SOLID — это сделать код легко читаемым и понятным.

- S — SRP -(single responsobility) — Принцип разделения ответственности

- O — OCP — (open-closed) — Принцип открытости-закрытости

- L —  LSP — (Liskov) — Принцип подстановки Барбары Лисков

- I — ISP — (interface segregation) — Принцип разделения интерфейсов

- D — DIP- (dependency injection) — Принцип инверсии зависимостей

# S — Принцип разделения ответственности

Существует лишь одна причина, приводящая к изменению класса

«Сделайте одно и сделайте это хорошо», почти в яблочко.

Каждая функция должна выполнять что-то одно.

Для следования этому принципу можно использовать вот такую стратегию:

Для каждой созданной/создаваемой функции необходимо продумывать, есть ли полезная часть, которую можно извлечь в еще более маленькую функцию

```
/* 
BAD
class UserSettings {
  constructor(user) {
    this.user = user;
  }
  changeSettings(settings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }
  verifyCredentials() {
    // ...
  }
}
*/
/* GOOD */
class UserAuth {
  constructor(user) {
    this.user = user;
  }
  verifyCredentials() {
    // ...
  }
}
class UserSettings {
  constructor(user) {
    this.user = user;
    this.auth = new UserAuth(user);
  }
  changeSettings(settings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

# O — Принцип открытости-закрытости

«программные сущности должны быть открыты для расширения, но закрыты для модификации.»

Если коротко, то это означает, что написанный код должен иметь возможность расширяться без изменения существующего кода.

В примере существует класс HttpRequester, который не позволяет создавать новые классы, наследуемые от Adapter.

Диспетчеризация предусматривает только 2 варианта: ajaxAdapter и httpNodeAdapter.

```
/*
BAD
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }
}
class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }
}
class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }
  fetch(url) {
    if (this.adapter.name === 'ajaxAdapter') {
      return makeAjaxCall(url).then((response) => {
        // transform response and return
      });
    } else if (this.adapter.name === 'httpNodeAdapter') {
      return makeHttpCall(url).then((response) => {
        // transform response and return
      });
    }
  }
}
function makeAjaxCall(url) {
  // request and return promise
}
function makeHttpCall(url) {
  // request and return promise
}
*/
GOOD
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }
  request(url) {
    // request and return promise
  }
}
class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }
  request(url) {
    // request and return promise
  }
}
class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }
  fetch(url) {
    return this.adapter.request(url).then((response) => {
      // transform response and return
    });
  }
}
```

# L — Принцип подстановки Барбары Лисков

Наследующий класс должен дополнять, а не замещать поведение базового класса.

Что это значит на практике?

Если у нас есть класс A (не виртуальный, а вполне реально используемый в коде) и отнаследованный от него класс B, то если мы заменим все использования класса A на B, ничего не должно измениться в работе программы.

Ведь класс B всего лишь расширяет функционал класса A. Если эта проверка работает, то поздравляю: ваша программа соответствует принципу подстановки Лисков!

Если нет, стоит /* уволить ведущего программиста */ задуматься: «а правильно ли спроектированы классы?».


Надеюсь, всем понятно, что принцип Лисков — это из области теории ООП.

На практике, никто не заставляет следовать ему под дулом пистолета.

Более того, могут быть случаи, когда следовать ему сложно и никому не нужно.

Словом, прям как с валидным HTML: сайт прошёл проверку на W3C валидаторе — плюсадин в карму верстальщика.

Не прошёл — нужно чётко понимать почему он не прошёл: это ошибка или же очередной выкрунтас другими способами реализовать невозможно?

- Подклассы не могут замещать поведение базовых классов.



Из этого можно сделать выводы:
* следование принципу подстановки Лисков делает ваш проект ближе к духу ООП;
* это позволит избежать ряда ошибок (о них ниже).


# I — Принцип разделения интерфейсов

«много интерфейсов, специально предназначенных для клиентов, лучше, чем один интерфейс общего назначения.»

Принцип разделения интерфейсов говорит о том, что слишком «толстые» интерфейсы необходимо разделять на более маленькие и специфические, чтобы клиенты маленьких интерфейсов знали только о методах, которые необходимы им в работе.

BAD:

```
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.setup();
  }
  setup() {
    this.rootNode = this.settings.rootNode;
    this.settings.animationModule.setup();
  }
  traverse() {
    // ...
  }
}
const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName("body"),
  animationModule() {} // В большинстве случаев нам не нужно анимировать при перемещении.
  // ...
});
```
Good:

```
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.options = settings.options;
    this.setup();
  }
  setup() {
    this.rootNode = this.settings.rootNode;
    this.setupOptions();
  }
  setupOptions() {
    if (this.options.animationModule) {
      // ...
    }
  }
  traverse() {
    // ...
  }
}
const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName("body"),
  options: {
    animationModule() {}
  }
});
```


# D — Принцип инверсии зависимостей

«Зависимость на Абстракциях. Нет зависимости на что-то конкретное.»

Это означает, что модуль высокого уровня не должен зависеть от модуля низкого уровня. Только от абстракций.

BAD

```
class InventoryRequester {
  constructor() {
    this.REQ_METHODS = ["HTTP"];
  }
  requestItem(item) {
    // ...
  }
}
class InventoryTracker {
  constructor(items) {
    this.items = items;
    // BAD: Мы создали зависимость от конкретной реализации запроса.
    // Нам просто нужно, чтобы requestItems зависели от метода запроса: `request`
    this.requester = new InventoryRequester();
  }
  requestItems() {
    this.items.forEach(item => {
      this.requester.requestItem(item);
    });
  }
}
const inventoryTracker = new InventoryTracker(["apples", "bananas"]);
inventoryTracker.requestItems();
```

GOOD

```
class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }
  requestItems() {
    this.items.forEach(item => {
      this.requester.requestItem(item);
    });
  }
}
class InventoryRequesterV1 {
  constructor() {
    this.REQ_METHODS = ["HTTP"];
  }
  requestItem(item) {
    // ...
  }
}
class InventoryRequesterV2 {
  constructor() {
    this.REQ_METHODS = ["WS"];
  }
  requestItem(item) {
    // ...
  }
}
// Создавая наши зависимости извне и внедряя их, мы можем легко
// заменяем наш модуль запроса на новый модный, использующий WebSockets.
const inventoryTracker = new InventoryTracker(
  ["apples", "bananas"],
  new InventoryRequesterV2()
);
inventoryTracker.requestItems();
```
