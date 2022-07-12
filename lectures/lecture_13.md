# Инкапсуляция

Инкапсуляция включает в себя идею о том, что данные объекта не должны быть напрямую доступны.

Нужно вызывать методы вместо прямого доступа к данным.

Инкапсуляция позволяет нам скрывать/показывать свойства функций.

ООП заключаем код в блоки, которые связаны друг с другом, чтобы эти блоки могли просто взаимодействовать друг с другом, используя методы и свойства, которые мы делаем доступными.

Данный принцып делает код проще в обслуживании и более пригодным для повторного использования.

# Инкапсуляция с использованием замыкания

```
const createCounter = () => {
  // Переменная, определенная в области действия фабрики или конструктора
  // является приватной для этой функции.
  let count = 0;
  return ({
    // Любые другие функции, определенные в той же области, являются привилегированными:
    // Они имеют доступ к закрытой переменной `count`
    // определенной в любом месте их цепочки областей видимости (содержащей области действия функции).
    click: () => count += 1,
    getCount: () => count.toLocaleString()
  });
};
const counter = createCounter();
counter.click();
counter.click();
counter.click();
console.log(counter.getCount()); // "3"
```

# Полиморфизм

Полиморфизмом является одним из принципов объектно-ориентированного программирования (ООП).

Это помогает проектировать объекты таким образом, чтобы они могли совместно использовать или переопределять любое поведение с конкретными предоставленными объектами.

Само слово означает много форм.

**Существует много толкований того, что именно оно означает, но идея заключается в способности вызывать один и тот же метод для разных объектов, и при этом каждый объект реагирует по-своему**



# Чтобы это произошло полиморфизм использует наследование.


В следующем примере дочерний объект, такой как Coder, переопределяет метод say, вызванный из родительского объекта Human, и возвращает новую строку соответственно.

Тогда как другой дочерний объект Men, вместо переопределения метода say, наследует его и отображал родительскую строку.


```
class Human {
  constructor(name) {
    this.name = name;
  }
  say() {
    return `Hello, my name is ${this.name}, I like travelling`;
  }
}
class Men extends Human {
  constructor(name) {
    super(name)
  }
  // Берем метод say у родителя.
}
class Coder extends Human {
  constructor(name) {
    super(name)
  }
  say() {
    // Переопределяем метод родителя say для отображения нового значения.
    return `Hello, my name is ${this.name}, I like coding`;
  }
}
const alex = new Men('Alex');
const leo = new Coder('Leo');
alex.say() // "Hello, my name is Alex, I like travelling"
leo.say() // "Hello, my name is Leo, I like coding"
```

# Prototypal Inheritance

Программирование на основе прототипов - это стиль объектно-ориентированного программирования, в котором повторное использование поведения (известное как наследование) выполняется через процесс повторного использования существующих объектов посредством делегирования, которые служат как prototypes.

# Classical Inheritance

Программирование на основе классов, или же, ориентация на классы, - это стиль объектно-ориентированного программирования (ООП), в котором наследование происходит через определение классов объектов, вместо наследования, которое происходит только через объекты.


Tight Coupling (сильная связанность) относится к волновым эффектам, которые могут произойти с подклассами (дочерние классы), когда вносится изменение в суперкласс (родительский класс).


- Tight Coupling может привести ко многим непреднамеренным эффектам для подклассов.

- Tight Coupling может помочь избежать повторений в коде.

- Хрупкая проблема базового класса является фундаментальной архитектурной проблемой систем объектно-ориентированного программирования, в которых базовые классы (суперклассы) считаются «хрупкими», потому что, казалось бы, безопасные модификации базового класса, когда они наследуются производным классом, могут привести к сбоям в работе производных классов.

- Проблема гориллы с бананом относится к проблеме наследования слишком много от суперкласса.

«Будто тебе нужен банан, а ты получаешь банан в придачу с гориллой в джунглях».

- Классическое наследование требует превосходного предвидения, чтобы избежать проблем неправильного наследования.


# Паттерны


# Factory method (Фабричный метод)

Factory method - это порождающий паттерн проектирования, который использует полиморфизм - объекты или классы наследуются от одного абстрактного базового объекта или класса, предназначенного для полиморфного использования.

В этом объекте или классе определяется единый интерфейс, через который будут происходить операции с конечными объектами или классами.

Паттерн Factory Method подразумевает создание объектов не через оператор new, а через вызов фабричного метода.

Пример реализации Factory method

```
class Factory {
  createEmployee(employeeType) {
    if (employeeType === 'Штатный сотрудник') {
      return new FullTime(employeeType);
    }
    if (employeeType === 'Стажер') {
      return new Trainee(employeeType);
    }
    if (employeeType === 'Подрядчик') {
      return new Contractor(employeeType);
    }
    throw new Error('Такого типа не существует');
  }
}
class AbstractWorker {
  constructor(type, hourly) {
    this.type = type;
    this.hourly = hourly;
  }
  describe() {
    console.log(`Привет, я ${this.type} и моя ставка ${this.hourly}`);
  }
}
class FullTime extends AbstractWorker {
  constructor(type) {
    const hourly = '100';
    super(type, hourly);
  }
}
class Trainee extends AbstractWorker {
  constructor(type) {
    const hourly = '50';
    super(type, hourly);
  }
}
class Contractor extends AbstractWorker {
  constructor(type) {
    const hourly = '200';
    super(type, hourly);
  }
}
// Code for the testing
const testing = () => {
  const employees = [];
  const factory = new Factory();
  employees.push(factory.createEmployee('Штатный сотрудник'));
  employees.push(factory.createEmployee('Стажер'));
  employees.push(factory.createEmployee('Подрядчик'));
  employees.forEach((employee) => employee.describe());
};
testing();
```

# Abstract Factory (Абстрактная Фабрика)

Паттерн Abstract Factory - это порождающий шаблон, который позволяет создавать объекты или классы объединённые общей тематикой, не привязываясь к конкретным объектам или классам создаваемых объектов.

```
// Abstract Factory
function bmwProducer(kind) {
    return kind === 'sport' ? sportCarFactory : familyCarFactory;
}
// Factories
function sportCarFactory() {
    return new Z4();
}
  
function familyCarFactory() {
    return new I3();
}
  
class Z4 {
    info() {
        return "Z4 is a Sport car!";
    }
}
  
class I3 {
    info() {
        return "i3 is a Family car!";
    }
}
```


# Builder (Строитель)

Паттерн Builder - это порождающий паттерн, который позволяет создавать сложные объекты или классы поэтапно

Представим, что у нас есть класс Car, для создания которого требуется большое количество опций.

```
class Car {
  constructor(options) {
    for (const option in options) {
      this[option] = options[option];
    }
  }
  getInfo() {
    console.log(`Это ${this.color} ${this.model} с ${this.transmission} коробкой передач`);
  }
}
class Builder {
  constructor() {
    this.requiredAttrs = ['model', 'color', 'transmission'];
  }
  setModel(model) {
    this.model = model;
    return this;
  }
  setColor(color) {
    this.color = color;
    return this;
  }
  setTransmission(transmission) {
    this.transmission = transmission;
    return this;
  }
  build() {
    const checkMissingAttributes = this.requiredAttrs.some((attr) => !this[attr]);
    if (checkMissingAttributes) {
      throw new Error('Для постройки не хватает обязательных атрибутов!');
    }
    return new Car(this);
  }
}
// Code for the testing
const testing = () => {
  const builder = new Builder();
  const car = builder
    .setModel('Camry')
    .setColor('Красная')
    .setTransmission('Автоматической')
    .build();
  const car2 = builder
    .setTransmission('Ручной')
    .setModel('Corolla')
    .setColor('Синяя')
    .build();
  car.getInfo();
  car2.getInfo();
}
testing();
```

# Singleton (Одиночка)

Паттерн Singleton - это порождающий шаблон, который гарантирует, что в системе существует только единственный экземпляр объекта или класса и предоставляет к нему точку доступа.

Singleton полезен в тех ситуациях, когда дополнительные экземпляры способны нарушить работоспособность приложения.

```
class Singleton {
  constructor(data) {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.data = data;
    return this;
  }
}
// Code for the testing
const testing = () => {
  const a = new Singleton('test1');
  const b = new Singleton('test2');
  if (a === b) {
    console.log('Singleton работает, один экземпляр');
  }
};
testing();
```