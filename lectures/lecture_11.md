# Обработка ошибок, "try..catch"

Обычно скрипт в случае ошибки «падает» (сразу же останавливается), с выводом ошибки в консоль.

Но есть синтаксическая конструкция try..catch, которая позволяет «ловить» ошибки и вместо падения делать что-то более осмысленное.

# Синтаксис «try…catch»

Конструкция try..catch состоит из двух основных блоков: try, и затем catch:

```
try {
  // код...
} catch (err) {
  // обработка ошибки
}
```

Работает она так:

- Сначала выполняется код внутри блока try {...}.

- Если в нём нет ошибок, то блок catch(err) игнорируется: выполнение доходит до конца try и потом далее, полностью пропуская catch.

- Если же в нём возникает ошибка, то выполнение try прерывается, и поток управления переходит в начало catch(err).

Переменная err (можно использовать любое имя) содержит объект ошибки с подробной информацией о произошедшем.

![help](https://learn.javascript.ru/article/try-catch/try-catch-flow.svg)

Таким образом, при ошибке в блоке try {…} скрипт не «падает», и мы получаем возможность обработать ошибку внутри catch.

Давайте рассмотрим примеры.

- Пример без ошибок: выведет alert (1) и (2):

```
try {
  alert('Начало блока try');  // (1) <--
  // ...код без ошибок
  alert('Конец блока try');   // (2) <--
} catch(err) {
  alert('Catch игнорируется, так как нет ошибок'); // (3)
```

- Пример с ошибками: выведет (1) и (3):


```
try {
  alert('Начало блока try');  // (1) <--
  lalala; // ошибка, переменная не определена!
  alert('Конец блока try (никогда не выполнится)');  // (2)
} catch(err) {
  alert(`Возникла ошибка!`); // (3) <--
}
```

# try..catch работает только для ошибок, возникающих во время выполнения кода

Чтобы try..catch работал, код должен быть выполнимым.

Другими словами, это должен быть корректный JavaScript-код.

```
try {
  {{{{{{{{{{{{
} catch(e) {
  alert("Движок не может понять этот код, он некорректен");
}
```

# try..catch работает синхронно

Исключение, которое произойдёт в коде, запланированном «на будущее», например в setTimeout, try..catch не поймает:

```
try {
  setTimeout(function() {
    noSuchVariable; // скрипт упадёт тут
  }, 1000);
} catch (e) {
  alert( "не сработает" );
}
```

Это потому, что функция выполняется позже, когда движок уже покинул конструкцию try..catch.

# Объект ошибки

```
try {
  // ...
} catch(err) { // <-- объект ошибки, можно использовать другое название вместо err
  // ...
}
```


Для всех встроенных ошибок этот объект имеет два основных свойства:

- name

Имя ошибки. Например, для неопределённой переменной это "ReferenceError".

- message

Текстовое сообщение о деталях ошибки.


# Использование «try…catch»


```
let json = "{ некорректный JSON }";
try {
  let user = JSON.parse(json); // <-- тут возникает ошибка...
  alert( user.name ); // не сработает
} catch (e) {
  // ...выполнение прыгает сюда
  alert( "Извините, в данных ошибка, мы попробуем получить их ещё раз." );
  alert( e.name );
  alert( e.message );
}
```

# Генерация собственных ошибок

Что если json синтаксически корректен, но не содержит необходимого свойства

```
let json = '{ "age": 30 }'; // данные неполны
try {
  let user = JSON.parse(json); // <-- выполнится без ошибок
  alert( user.name ); // нет свойства name!
} catch (e) {
  alert( "не выполнится" );
}
```

# Оператор «throw»

Оператор throw генерирует ошибку.

Синтаксис:

```
throw <объект ошибки>
```

Пример:

```
let error = new Error(" Ого, ошибка! o_O");
alert(error.name); // Error
alert(error.message); //  Ого, ошибка! o_O
```

Переделаем прошлый вариант:

```
let json = '{ "age": 30 }'; // данные неполны
try {
  let user = JSON.parse(json); // <-- выполнится без ошибок
  if (!user.name) {
    throw new SyntaxError("Данные неполны: нет имени"); // (*)
  }
  alert( user.name );
} catch(e) {
  alert( "JSON Error: " + e.message ); // JSON Error: Данные неполны: нет имени
}
```

# try…catch…finally

Конструкция try..catch может содержать ещё одну секцию: finally.

Если секция есть, то она выполняется в любом случае:

- после try, если не было ошибок,

- после catch, если ошибки были.

```
try {
   ... пробуем выполнить код...
} catch(e) {
   ... обрабатываем ошибки ...
} finally {
   ... выполняем всегда ...
}
```

Попробуйте запустить такой код:

```
try {
  alert( 'try' );
  if (confirm('Сгенерировать ошибку?')) BAD_CODE();
} catch (e) {
  alert( 'catch' );
} finally {
  alert( 'finally' );
}
```

# Async/await

Существует специальный синтаксис для работы с промисами, который называется «async/await»

Давайте посмотри на примере запросов

```
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => console.log(data));
```

- Делаем запрос, получаем промис.

- После того как промис выполнен успешно, получаем специальный объект ответа. Выполним метод объекта ответа json(), чтобы получить данные.

- Метод json() возвращает промис, так что далее снова вызываем then и в колбеке выводим данные в консоль.

Все просто 😅

Используя Async/Await можем сделать так:

```
async getPost = () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
	const data = await response.json();
	console.log(data);
}
```

Мы обернули наш вызов в асинхронную функцию (async), заменили колбеки (then) на заявление await.

Теперь код останавливает выполнение на ключевых словах await, до выполнения обещания, и продолжает выполнение далее.

Асинхронное программирование как синхронное!

На самом же деле Async/Await это просто синтаксический сахар

Async/Await действительно позволяет писать асинхронный код синхронно, не блокируя стек вызовов.

Мы замораживаем код и ждем пока выполнится промис, а затем продолжаем.

Еще пример:

С использованием промисов

```
const makeRequest = () =>
  getJSON()
    .then(data => {
      console.log(data)
      return "done"
    })
makeRequest()
```

Вот как то же самое делается с использованием async/await:

```
const makeRequest = async () => {
  console.log(await getJSON())
  return "done"
}
makeRequest()
```

У слова async один простой смысл: эта функция всегда возвращает промис. Значения других типов оборачиваются в завершившийся успешно промис автоматически.

Например, эта функция возвратит выполненный промис с результатом 1:


```
async function f() {
  return 1;
}
f().then(alert); // 1
```

Можно и явно вернуть промис, результат будет одинаковым:

```
async function f() {
  return Promise.resolve(1);
}
f().then(alert); // 1
```

# Await

```
// работает только внутри async–функций
let value = await promise;
```

Ключевое слово await заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится.

После чего оно вернёт его результат, и выполнение кода продолжится.

В этом примере промис успешно выполнится через 1 секунду:

```
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("готово!"), 1000)
  });
  let result = await promise; // будет ждать, пока промис не выполнится (*)
  alert(result); // "готово!"
}
f();
```

В данном примере выполнение функции остановится на строке (let result) до тех пор, пока промис не выполнится. Это произойдёт через секунду после запуска функции. После чего в переменную result будет записан результат выполнения промиса

**Обратите внимание, хотя await и заставляет JavaScript дожидаться выполнения промиса, это не отнимает ресурсов процессора. **

**Пока промис не выполнится, JS-движок может заниматься другими задачами: выполнять прочие скрипты, обрабатывать события и т.п.**

Задача:

Давайте напишем промис, который будет генерировать рандомное число. Если это рандомное число меньше чем 0.6, то вызываем resolve('Good'), а если  больше, то вызываем reject('Not Good').

Потом надо создать асинхронную функцию handler, которая будет обрабатывать наш промис:

- Если промис выполнился успешно, то возвращаем 'Good result'

- Если промис выполнился с ошибкой, то возвращаем 'Bad result'

И выводим результат в консоль


Еще пример на обработку ошибки

```
const promise = () => {
    return new Promise((res, rej) => {
        const random = Math.random();
        if (random < .6) {
            setTimeout(() => res('Good'), 1000)
        } else {
            setTimeout(() => rej('Not Good'), 1000)
        }
    })
};
const handler = async () => {
   try {
      await promise();
      return 'Good result'
   } catch (err) {
      return 'Bad result'
   }
};
handler()
    .then(item => {
       console.log(item)
    });
```

Задача:

Делаем все через async/await

Давайте сделаем инпут, в который будет вводить ник юзера с гитхаба (к примеру свой).

Давайте еще сделаем кнопку Search, по нажатию на которую мы отправим запрос.

Эндпоинт на сервер: https://api.github.com/users/НИКНЕЙМ

После получаения данные давайте отобразим на экране аватарку юзера и его статус.

```
const request = async () => {
   try {
      const response = await fetch('https://api.github.com/users/11123dsf');
      const jsonData = await response.json();
      if (jsonData.message === 'Not Found') {
         throw new Error('User Not Found')
      }
      return 'DONE'
   } catch (err) {
      console.log('err: ', err)
      return 'ERROR'
   }
}
const res = request();
res.then(item => console.log(item))
```


# Размеры и прокрутка элементов

Пример:

```
<div id="example">
  ...Текст...
</div>
<style>
  #example {
    width: 300px;
    height: 200px;
    border: 25px solid #E8C48F;
    padding: 20px;
    overflow: auto;
  }
</style>
```

![help](https://learn.javascript.ru/article/size-and-scroll/metric-css.svg)

# Метрики

Вот общая картина с геометрическими свойствами:

![help](https://learn.javascript.ru/article/size-and-scroll/metric-all.svg)

# offsetWidth/Height

Эти два свойства – самые простые. Они содержат «внешнюю» ширину/высоту элемента, то есть его полный размер, включая рамки

![help](https://learn.javascript.ru/article/size-and-scroll/metric-offset-width-height.svg)

# clientTop/Left

Пойдём дальше. Внутри элемента у нас рамки (border).

Для них есть свойства-метрики clientTop и clientLeft.

В нашем примере:

- clientLeft = 25 – ширина левой рамки

- clientTop = 25 – ширина верхней рамки

![help](https://learn.javascript.ru/article/size-and-scroll/metric-client-left-top.svg)

# clientWidth/Height

Эти свойства – размер области внутри рамок элемента.

Они включают в себя ширину области содержимого вместе с внутренними отступами padding, но без прокрутки:

![help](https://learn.javascript.ru/article/size-and-scroll/metric-client-width-height.svg)

Если нет внутренних отступов padding, то clientWidth/Height в точности равны размеру области содержимого внутри рамок и полосы прокрутки (если она есть).

![help](https://learn.javascript.ru/article/size-and-scroll/metric-client-width-nopadding.svg)

# scrollWidth/Height

Эти свойства – как clientWidth/clientHeight, но также включают в себя прокрученную (которую не видно) часть элемента.

![help](https://learn.javascript.ru/article/size-and-scroll/metric-scroll-width-height.svg)

Эти свойства можно использовать, чтобы «распахнуть» элемент на всю ширину/высоту.

```
// распахнуть элемент на всю высоту
element.style.height = `${element.scrollHeight}px`;
