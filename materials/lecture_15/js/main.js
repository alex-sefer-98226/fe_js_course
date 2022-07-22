const func = () => {
  //
  return 32;
};

const func2 = () => {
  //  Потребитель (клиент)
  const secretValue = func();
  // console.log("secret", secretValue);
};

// Adapter

// old interface
class OldCalculator {
  constructor() {
    this.operations = function (term1, term2, operation) {
      switch (operation) {
        case "add":
          return term1 + term2;
        case "sub":
          return term1 - term2;
        default:
          return NaN;
      }
    };
  }
}

const oldCalculator = new OldCalculator();
// console.log(oldCalculator.operations(1, 3, "add"));

class NewCalculator {
  constructor() {
    this.add = function (term1, term2) {
      return term1 + term2;
    };
    this.sub = function (term1, term2) {
      return term1 - term2;
    };
  }
}
const newCalculator = new NewCalculator();
// console.log(newCalculator.add(1, 3));
// console.log("Hello!");
// Adapter Class
class AdapterNewToOldCalc {
  // работает newCalculator под интерфейсом OldCalculator
  constructor() {
    const newCalc = new NewCalculator();
    this.operations = function (term1, term2, operation) {
      switch (operation) {
        case "add":
          // using the new implementation under the hood
          return newCalc.add(term1, term2);
        case "sub":
          return newCalc.sub(term1, term2);
        case "pow":
          if (newCalc.pow) {
            return newCalc.pow(term1, term2);
          }
          console.error("using old method");
          return Math.pow(term1, term2);

        default:
          return NaN;
      }
    };
  }
}

const adapter = new AdapterNewToOldCalc();

// console.log(adapter.operations(2, 5, "add"));
// console.log(adapter.operations(2, 5, "pow"));

// Bridge (Мост)

// Основная иерархия (абстракция)
class interface_Pages {
  getContent() {
    throw new Error(`В ${this.constructor.name} не описан метод getContent()`);
  }
  setTheme() {
    throw new Error(`В ${this.constructor.name} не описан метод setTheme()`);
  }
}
// console.log("Hello!");
class About extends interface_Pages {
  //страница о нас
  constructor(theme) {
    super();
    this.theme = theme;
  }
  getContent() {
    return "About page in " + this.theme.getColor();
  }
  setTheme(theme) {
    this.theme = theme;
  }
}

class Careers extends interface_Pages {
  // страница карьера
  constructor(theme) {
    super();
    this.theme = theme;
  }
  getContent() {
    return "Careers page in " + this.theme.getColor();
  }
  setTheme(theme) {
    this.theme = theme;
  }
}

// Вспомогательная иерархия (реализация)
class DarkTheme {
  // темная тема оформления
  getColor() {
    return "Dark Black";
  }
}
class LightTheme {
  // светлая тема
  getColor() {
    return "Off white";
  }
}
class AquaTheme {
  // голубая тема
  getColor() {
    return "Light blue";
  }
}

const darkTheme = new DarkTheme();

const about = new About(darkTheme);

// console.log(about.getContent());
const setLightTheme = () => {
  const lightTheme = new LightTheme();
  about.setTheme(lightTheme);
};

// immitation of click
setLightTheme();

// console.log(about.getContent());

// DRY - Don't repeat yourself

function log(...mesages) {
  console.error(...mesages);
}

log("Hello!");

// KISS - Keep it stupid & simple

async function makeRequest(url) {
  console.log("Sending analytics...");
  // added some logs
  return fetch(url).catch((e) => {});
}

const createElement = (name) => {
  const el = document.createElement(name);
  el.classList.add("created");
  return el;
};

const li = createElement("li");
document.body.append(li);

const responseProccessor = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    if (response.status == "403") {
      throw new Error(`Access denied`);
    }
    throw new Error(`Network Error ${response.status}`);
  }
};

const errorHandler = (err) => {
  // alert("unssuccessfully");
  // console.log(err);
};

fetch("")
  .then(responseProccessor)
  .then((value) => {
    console.log(value);
  })
  .catch(errorHandler);

fetch("")
  .then(responseProccessor)
  .then((items) => {
    items.forEach((element) => {
      // creation of DOM nodes according items
    });
  })
  .catch(errorHandler);

// SOLID

// Single responsibility (S)

// class UserSettings {
//   constructor(user) {
//     this.user = user;
//   }
//   changeSettings(settings) {
//     if (this.verifyCredentials()) {
//       // ...
//     }
//   }
//   verifyCredentials() {
//     // ...
//   }
// }

// class UserAuth {
//   constructor(user) {
//     this.user = user;
//   }
//   verifyCredentials() {
//     // ...
//   }
// }

// class UserSettings {
//   constructor(user) {
//     this.user = user;
//     this.auth = new UserAuth(user);
//   }
//   changeSettings(settings) {
//     if (this.auth.verifyCredentials()) {
//       // ...
//     }
//   }
// }

// Open-Close (O)
class Adapter {}

class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = "ajaxAdapter"; // browser
  }
}
class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = "nodeAdapter"; // server (node)
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }
  fetch(url) {
    if (this.adapter.name === "ajaxAdapter") {
      return makeAjaxCall(url).then((response) => {
        // transform response and return
      });
    } else if (this.adapter.name === "httpNodeAdapter") {
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

// good

// class AjaxAdapter extends Adapter {
//   constructor() {
//     super();
//     this.name = "ajaxAdapter";
//   }
//   request(url) {
//     //  ==  makeAjaxCall
//     // request and return promise
//   }
// }
// class NodeAdapter extends Adapter {
//   constructor() {
//     super();
//     this.name = "nodeAdapter";
//   }
//   request(url) {
//     // == makeHttpCall
//     // request and return promise
//   }
// }
// class HttpRequester {
//   constructor(adapter) {
//     this.adapter = adapter;
//   }
//   fetch(url) {
//     return this.adapter.request(url).then((response) => {
//       // transform response and return
//     });
//   }
// }

// L - Liskov Substitution Principe

// class Person {}

// class Member extends Person {
//   access() {
//     console.log("У тебя есть доступ");
//   }
// }

// class Guest extends Person {
//   isGuest = true;
// }

// class Frontend extends Member {
//   canCreateFrontend() {}
// }

// class Backend extends Member {
//   canCreateBackend() {}
// }

// class PersonFromDifferentCompany extends Guest {
//   access() {
//     throw new Error("У тебя нет доступа! Иди к себе!");
//   }
// }

// function openSecretDoor(member) {
//   member.access();
// }

// openSecretDoor(new Frontend());
// openSecretDoor(new Backend());
// openSecretDoor(new PersonFromDifferentCompany()); // There should be member!

// class Human {
//   hands = 2;
//   walk() {
//     console.log("Idu");
//   }
// }

// class Man extends Human {}

// class Component {
//   isComponent = true;
// }

// class ComponentWithTemplate extends Component {
//   render() {
//     return `<div>Component</div>`;
//   }
// }
// class HigherOrderComponent extends Component {}

// class HeaderComponent extends ComponentWithTemplate {
//   onInit() {}
// }
// class FooterComponent extends ComponentWithTemplate {
//   afterInit() {}
// }
// class HOC extends HigherOrderComponent {
//   render() {
//     throw new Error("Render is impossible here");
//   }
//   wrapComponent(component) {
//     component.wrapped = true;
//     return component;
//   }
// }
// function renderComponent(component) {
//   console.log(component.render());
// }
// renderComponent(new HeaderComponent());
// renderComponent(new FooterComponent());

// I - interface segregation principe

// class DOMTraverser {
//   constructor(settings) {
//     this.settings = settings;
//     this.setup();
//   }
//   setup() {
//     this.rootNode = this.settings.rootNode;
//     this.settings.animationModule.setup();
//   }
//   traverse() {
//     // ...
//   }
// }

// const $ = new DOMTraverser({
//   rootNode: document.getElementsByTagName("body"),
//   animationModule() {} // В большинстве случаев
//   // нам не нужно анимировать при перемещении.
//   // ...
// });

// class DOMTraverser {
//   constructor(settings) {
//     this.settings = settings;
//     this.options = settings.options;
//     this.setup();
//   }
//   setup() {
//     this.rootNode = this.settings.rootNode;
//     this.setupOptions();
//   }
//   setupOptions() {
//     if (this.options.animationModule) {
//       // ...
//     }
//   }
//   traverse() {
//     // ...
//   }
// }
// const $ = new DOMTraverser({
//   rootNode: document.getElementsByTagName("body"),
//   options: {
//     animationModule() {}
//   }
// });

// D - dependency inversion

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
    // Нам просто нужно, чтобы requestItems зависели от метода запроса:
    // `request`
    this.requester = new InventoryRequester();
  }
  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

const inventoryTracker = new InventoryTracker(["apples", "bananas"]);
inventoryTracker.requestItems();
// good

class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }
  requestItems() {
    this.items.forEach((item) => {
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
