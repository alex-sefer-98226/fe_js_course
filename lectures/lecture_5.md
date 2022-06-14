# parseInt parseFloat

Функция parseFloat() принимает строку в качестве аргумента и возвращает десятичное число (число с плавающей точкой)

```
parseFloat(3.14);
parseFloat('3.14');
parseFloat('314e-2');
parseFloat('0.0314E+2');
parseFloat('3.14какие-нибудь не цифровые знаки');
// 3.14
```

Функция parseInt() принимает строку в качестве аргумента и возвращает целое число в соответствии с указанным основанием системы счисления.

```
parseInt(" 0xF", 16);
parseInt(" F", 16);
parseInt("17", 8);
parseInt(021, 8);
parseInt("015", 10);  //parseInt(015, 10); вернёт 15
parseInt(15.99, 10);
parseInt("FXX123", 16);
parseInt("1111", 2);
parseInt("15*3", 10);
parseInt("15e2", 10);
parseInt("15px", 10);
parseInt("12", 13);
// 15
```

```
parseInt("Hello", 8); // Не является числом
parseInt("546", 2);   // Неверное число в двоичной системе счисления
// все NaN
```


# Браузерное окружение, спецификации

Окружение предоставляет свои объекты и дополнительные функции, в дополнение базовым языковым. Браузеры, например, дают средства для управления веб-страницами. Node.js делает доступными какие-то серверные возможности и так далее.

На картинке ниже в общих чертах показано, что доступно для JavaScript в браузерном окружении:

![help](https://learn.javascript.ru/article/browser-environment/windowObjects.svg)

Как мы видим, имеется корневой объект window, который выступает в 2 ролях:

- Во-первых, это глобальный объект для JavaScript-кода, об этом более подробно говорится в главе Глобальный объект.
- Во-вторых, он также представляет собой окно браузера и располагает методами для управления им.

# window

```
function sayHi() {
  alert("Hello");
}
// глобальные функции доступны как методы глобального объекта:
window.sayHi();
```

А здесь мы используем window как объект окна браузера, чтобы узнать его высоту:

```
alert(window.innerHeight); // внутренняя высота окна браузера
```

# BOM (Browser Object Model)

Объектная модель браузера (Browser Object Model, BOM) – это дополнительные объекты, предоставляемые браузером (окружением), чтобы работать со всем, кроме документа.

- Объект navigator даёт информацию о самом браузере и операционной системе.

Среди множества его свойств самыми известными являются: navigator.userAgent – информация о текущем браузере, и navigator.platform – информация о платформе (может помочь в понимании того, в какой ОС открыт браузер – Windows/Linux/Mac и так далее).

- Объект location позволяет получить текущий URL и перенаправить браузер по новому адресу.


```
alert(location.href); // показывает текущий URL
if (confirm("Перейти на Wikipedia?")) {
  location.href = "https://wikipedia.org"; // перенаправляет браузер на другой URL
}
```

Функции **alert/confirm/prompt** тоже являются частью BOM: они не относятся непосредственно к странице, но представляют собой методы объекта окна браузера для коммуникации с пользователем.

# DOM (Document Object Model)

Document Object Model, сокращённо DOM – объектная модель документа, которая представляет все содержимое страницы в виде объектов, которые можно менять.

Объект document – основная «входная точка». С его помощью мы можем что-то создавать или менять на странице.

```
// заменим цвет фона на красный,
document.body.style.background = "red";
```

# Простейший DOM

```
<html>
  <head>
    <title>Заголовок</title>
  </head>
  <body>
     Прекрасный документ
   </body>
</html>
```

Самый внешний тег - <html>, поэтому дерево начинает расти от него.

Внутри `<html>` находятся два узла:
- `<head>` и `<body>` - они становятся дочерними узлами для `<html>`.

![help](https://javascript.ru/files/upload/jsintro/dom0.png)

Теги образуют узлы-элементы (element node).

Текст представлен текстовыми узлами (text node). И то и другое - равноправные узлы дерева DOM.

# Пример посложнее

Рассмотрим теперь более жизненную страничку:

```
<html>
    <head>
        <title>
            О лосях
        </title>
    </head>
    <body>
        Правда о лосях.
        <ol>
            <li>
                Лось - животное хитрое
            </li>
            <li>
                .. И коварное
            </li>
        </ol>
    </body>
</html>
```

Корневым элементом иерархии является html.

У него есть два потомка. Первый - head, второй - body.

И так далее, каждый вложенный тег является потомком тега выше:

![help](https://javascript.ru/files/learn/start/Losi.png)

На этом рисунке синим цветом обозначены элементы-узлы, черным - текстовые элементы.

Дерево образовано за счет синих элементов-узлов - тегов HTML.

А вот так выглядит дерево, если изобразить его прямо на HTML-страничке:

![help](https://javascript.ru/files/upload/jsintro/losi-dom.png)


# Поиск в DOM: getElement*, querySelector*, getElementsBy*

- document.getElementById или просто id

```
<span id="firstID">Hello World</span>
<script>
// Получить элемент в переменную
const mySpan = document.getElementById('firstID');
// сделать его фон красным
mySpan.style.background = 'red';
</script>
```
Только document.getElementById, а не anyElem.getElementById

Метод getElementById можно вызвать только для объекта document. Он осуществляет поиск по id по всему документу.

- getElementsBy

Возвращает элементы, которые имеют данный CSS-класс. **Возвращаем коллекцию**

```
<span class="className"></span>
<span class="className"></span>
<span class="className"></span>
<span class="className"></span>
// получить все элементы c классом "className" в документе
let spans = document.getElementsByclassName('className');
```

- getElementsByTagName(tag)

Ищет элементы с данным тегом и возвращает их коллекцию.

```
// получить все элементы div в документе
let divs = document.getElementsByTagName('div');
```

- querySelectorAll

Метод для поиска элементов в DOM по селектору


```
<ul>
  <li>Этот</li>
  <li>тест</li>
</ul>
<ul>
  <li>полностью</li>
  <li>пройден</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');
  for (let elem of elements) {
    alert(elem.innerHTML); // "тест", "пройден"
  }
</script>
```

# Типы DOM-элементов

У каждого элемента в DOM-модели есть тип.

Его номер хранится в атрибуте elem.nodeType

Всего в DOM различают **12 типов элементов**.

Обычно используется только один:

- Node.ELEMENT_NODE, номер которого равен 1. Элементам этого типа соответствуют HTML-теги.

[Список типов тут](https://developer.mozilla.org/ru/docs/Web/API/Node/nodeType)

Иногда полезен еще тип Node.TEXT_NODE, который равен 3. Это текстовые элементы.

# Изменение документа

Создание элемента

DOM-узел можно создать двумя методами:

- document.createElement(tag)

Создаёт новый элемент с заданным тегом:

```
let div = document.createElement('div');
```

- document.createTextNode(text)

Создаёт новый текстовый узел с заданным текстом:

```
let textNode = document.createTextNode('А вот и я');
```

# Методы вставки

Чтобы наш div появился, нам нужно вставить его где-нибудь в document. Например, в document.body.

Для этого есть метод append, в нашем случае: document.body.append(div).

Вот полный пример:

```
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>
<script>
  let div = document.createElement('div');
  div.className = "alert";
  document.body.append(div);
</script>
```

Вот методы для различных вариантов вставки:

- node.append(...nodes or strings) – добавляет узлы или строки в конец node,

- node.prepend(...nodes or strings) – вставляет узлы или строки в начало node,

- node.before(...nodes or strings) –- вставляет узлы или строки до node,

- node.after(...nodes or strings) –- вставляет узлы или строки после node,

- node.replaceWith(...nodes or strings) –- заменяет node заданными узлами или строками.

Вот пример использования этих методов, чтобы добавить новые элементы в список и текст до/после него:

```
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>
<script>
  ol.before('before'); // вставить строку "before" перед <ol>
  ol.after('after'); // вставить строку "after" после <ol>
  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // вставить liFirst в начало <ol>
  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // вставить liLast в конец <ol>
</script>
```

before

1. prepend
2. 0
3. 1
4. 2
5. append

after


Наглядная иллюстрация того, куда эти методы вставляют:

![help](https://learn.javascript.ru/article/modifying-document/before-prepend-append-after.svg)


# Удаление узлов

Для удаления узла есть методы node.remove().

```
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>
<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";
  document.body.append(div);
  div.remove();
</script>
```

# data-аттрибуты
HTML спроектирован с возможностью расширения данных ассоциированных с каким-либо элементом, но в то же время необязательно
имеющих определённое значение. data-* атрибуты позволяют хранить дополнительную информацию в стандартных элементах HTML,
без хаков вроде нестандартных атрибутов, лишних DOM-свойств

Синтаксис прост — любой атрибут, чьё имя начинается с data-, является data-* атрибутом. Предположим у нас имеется 
статья и мы хотим сохранить дополнительную информацию без визуального представления. Для этого можно использовать data-атрибуты:
```
...
<p id="test" data-item="0" data-test="parapragh" data-color="red">Lorem ipsum dolor 
sit, amet consectetur adipisicing elit. Quasi expedita qui aliquam.</p>
...
```

```
console.log(test.dataset) // { item: 0, test: paragraph, color:red } 
```