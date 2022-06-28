# Еще про Промисы

Обещания (promises) в JavaScript – это новый инструмент для работы с отложенными или асинхронными вычислениями, добавленный в ECMAScript 2015 (6-я версия ECMA-262).

До появления «обещаний» асинхронные задачи можно было решать с помощью функций обратного вызова или с помощью обработки событий.

В использовании функций обратного вызова есть существенный недостаток с точки зрения организации кода: "callback hell".

Этот недостаток заключается в том, что в функции обратного вызова есть параметр, который, в свою очередь, также является функцией обратного вызова – и так может продолжаться до бесконечности.

![help](https://habrastorage.org/files/eb6/f44/e8d/eb6f44e8d7664f0f97fd5a4879daa16b.png)

Может образоваться несколько уровней таких вложенностей.

Это приводит к плохому чтению кода и запутанности между вызовами функций обратного вызова.

Это, в свою очередь, приведет к ошибкам. С такой структурой кода найти ошибки очень сложно.


# Состояния промисов

![help](https://habrastorage.org/webt/pk/hr/zz/pkhrzzgtdsgqvtptwn26gmtbjhk.png)

- Нерешенный или Ожидающий — Промис ожидает, если результат не готов.

То есть, ожидает завершение чего-либо(например, завершения асинхронной операции).

- Решенный или Выполненный — Промис решен, если результат доступен.

То есть, что-то завершило свое выполнение(например, асинхронная операция) и все прошло хорошо.

- Отклоненный — Промиc отклонен, если произошла ошибка в процессе выполнения.


# Создаем Промис


Синтаксис:

```
const promise = new Promise((resolve, reject) => {
    ...
});
```

Мы создали новый промис, используя конструктор Промисов, он принимает один аргумент, обратный вызов, также известный как исполнительная функция, которая принимает 2 обратных вызова, resolve и reject.

Исполнительная функция выполняется сразу же после создания промиса.

Промис становится выполненным при помощи вызова resolve(), а отклоненным при помощи reject().

Например:

```
const promise = new Promise((resolve, reject) => {
  if(allWentWell) {
    resolve('Все прошло отлично!');
  } else {
    reject('Что-то пошло не так');
  }
});
```

resolve() и reject() принимают один аргумент, который может быть строкой, числом, логическим выражением, массивом или объектом.

```
const promise = new Promise((resolve, reject) => {
  const randomNumber = Math.random();
  setTimeout(() => {
    if(randomNumber < 0.6) {
      resolve('Все прошло отлично!');
    } else {
      reject('Что-то пошло не так');
    }
  }, 2000);
});
```

Здесь я создал новый промис используя конструктор Промисов.

Промис выполняется или отклоняется через 2 секунды после его создания.

Промис выполняется, если randomNumber меньше, чем .6 и отклоняется в остальных случаях.

Когда промис был создан, он будет в состоянии ожидания и его значение будет undefined.

![help](https://habrastorage.org/webt/cs/wr/c2/cswrc2jdrixhaguff2w9oijiyf4.png)

После 2 секунд таймер заканчивается, промис случайным образом либо выполняется, либо отклоняется, и его значением будет то, которое передано в функцию resolve или reject.

Ниже пример двух случаев:


Успешное выполнение:

![help](https://habrastorage.org/webt/eq/3y/ss/eq3ysskatvuvjnvpoaz9k7zdmvi.png)

Отклонение промиса:

![help](https://habrastorage.org/webt/qn/7v/ee/qn7vee1ebi19qgo4zzv72tgpfjg.png)


# Использование Промиса

Теперь мы знаем как создавать промисы, давайте теперь разберемся как применять уже созданный промис.

Мы используем промисы при помощи методов then() и catch().

# then

then принимает в себя 2 коллбэк функции:

- successCallback вызывается, если промис был успешно выполнен. Принимает один аргумент, который является значением переданным в resolve().

- failureCallback вызывается, если промис был отклонен. Принимает один аргумент, который является значением преданным в reject().

```
const promise = new Promise((resolve, reject) => {
  const randomNumber = Math.random();
  if(randomNumber < 0.7) {
    resolve('Все прошло отлично!');
  } else {
    reject(new Error('Что-то пошло не так'));
  }
});
promise.then(
  (data) => console.log(data), // вывести 'Все прошло отлично!'
  (error) => console.log(error), // вывести ошибку
);
```

Если промис был выполнен, то вызывается successCallback со значением, переданным в resolve().

И если промис был отклонен, то вызывается failureCallback со значением, переданным в reject().

# .catch()

Мы используем catch() для обработки ошибок.

Это более читабельно, нежели обработка ошибок внутри failureCallback внутри обратного вызова метода then().

```
const promise = new Promise((resolve, reject) => {
  reject(new Error('Что-то пошло не так'));
});
promise
  .then((data) => {
     console.log(data);
   })
  .catch((error) => {
     console.log(error); // вывести ошибку
  });
```

# Цепочка промисов

```
const promise1 = new Promise((resolve, reject) => {
  resolve('Promise1 выполнен');
});
const promise2 = new Promise((resolve, reject) => {
  resolve('Promise2 выполнен');
});
const promise3 = new Promise((resolve, reject) => {
  reject('Promise3 отклонен');
});
promise1
  .then((data) => {
    console.log(data);  // Promise1 выполнен
    return promise2;
  })
  .then((data) => {
    console.log(data);  // Promise2 выполнен
    return promise3;
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);  // Promise3 отклонен
  });
```

# Promise.all( )

Этот метод берет массив промисов и возвращает новый промис, который будет выполненным, когда все промисы внутри массива выполнены или отклонен, как только встречается промис, который отклоняется.

Например:


```
const promise1 = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve('Promise1 выполнен');
 }, 2000);
});
const promise2 = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve('Promise2 выполнен');
 }, 1500);
});
Promise.all([promise1, promise2])
  .then((data) => console.log(data[0], data[1])); // Promise1 выполнен Promise2 выполнен
  .catch((error) => console.log(error));
```

Промис отклоняется с причиной отклонения первого промиса в переданном массиве. Например:

```
const promise1 = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve('Promise1 выполнен');
 }, 2000);
});
const promise2 = new Promise((resolve, reject) => {
 setTimeout(() => {
  reject('Promise2 отклонен');
 }, 1500);
});
Promise.all([promise1, promise2])
  .then((data) => console.log(data[0], data[1]))
  .catch((error) => console.log(error));  // Promise2 отклонен
```


# Promise.race( )

Этот метод принимает массив промисов и возвращает один новый промис, который будет выполненным, как только встретится выполненный промис в массиве или же отклоняется, если отклоненный промис встречается раньше.

Например:

```
const promise1 = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve('Promise1 выполнен');
 }, 1000);
});
const promise2 = new Promise((resolve, reject) => {
 setTimeout(() => {
  reject('Promise2 отклонен');
 }, 1500);
});
Promise.race([promise1, promise2])
  .then((data) => console.log(data))  // Promise1 выполнен
  .catch((error) => console.log(error));
```

Тут мы имеем два промиса, где один выполняется через 1 секунду, а другой отклоняется через 1.5 секунды.

Как только первый промис выполнен, возвращенный из Promise.race() промис будет иметь статус выполненного не дожидаясь статуса второго промиса.

Здесь data, которая передается в then() является значением первого, выполненного, промиса.

# Прощай, XMLHttpRequest!

- fetch() позволяет вам делать запросы, схожие с XMLHttpRequest (XHR).

Основное отличие заключается в том, что Fetch API использует Promises (Обещания), которые позволяют использовать более простое и чистое API, избегать катастрофического количества callback'ов и необходимости помнить API для XMLHttpRequest.

# XMLHttpRequest

Пример с XMLHttpRequest потребует от нас установить два обработчика событий на success и error, а так же вызвать два метода: open() и send().

```
function reqListener() {  
  var data = JSON.parse(this.responseText);  
  console.log(data);  
}
function reqError(err) {  
  console.log('Fetch Error :-S', err);  
}
var oReq = new XMLHttpRequest();
oReq.open('get', './api/some.json');  
oReq.send();
oReq.onload = reqListener;  
oReq.onerror = reqError;  
```

# Повторим запросы на XMLHttpRequest

- Пример на POST запрос

```
let xhr = new XMLHttpRequest();
let json = JSON.stringify({
  name: "Вася",
  surname: "Петров"
});
xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhr.send(json);
```

Метод JSON.stringify() преобразует значение JavaScript в строку JSON

Метод setRequestHeader - это метод, который устанавливает заголовок для запроса

Синтаксис:

```
xhr.setRequestHeader('ИМЯ_ЗАГОЛОВКА', 'ЗНАЧЕНИЕ')
```

# Заголовки запроса (headers)

Что это?

Это какая-то глвная информация в запросе. С помощью хедеров мы устанавливаем какую-то важную информация для сервера:

- От куда сделан запрос

- Какой тип запроса

- Какие данные передаем

и т.д.


- Content-Type

Заголовок-сущность Content-Type используется для того, чтобы определить MIME тип ресурса.

В ответах сервера заголовок Content-Type сообщает клиенту, какой будет тип передаваемого контента.

В некоторых случаях браузеры пытаются сами определить MIME тип передаваемого контента, но их результат может быть плохой.

Чтобы предотвратить такие ситуации, Вы можете установить в заголовке X-Content-Type-Options значение nosniff.

В запросах (таких, как POST или PUT), клиент сообщает серверу тип отправляемых данных.


# Fetch

Для сетевых запросов из JavaScript есть широко известный термин «AJAX» (аббревиатура от Asynchronous JavaScript And XML).

XML мы использовать не обязаны, просто термин старый, поэтому в нём есть это слово.

Возможно, вы его уже где-то слышали.


Синтаксис метода fetch:

![help](https://miro.medium.com/max/700/1*uAa8kmaMi2cQfMmLndPfeA.png)

- url – URL, на который сделать запрос.

- options – необязательный объект с настройками запроса.


Свойства options:

- method – метод запроса

- headers – заголовки запроса (объект)

- body – тело запроса: FormData, Blob, строка и т.п

- mode – одно из: «same-origin», «no-cors», «cors», указывает, в каком режиме кросс-доменности предполагается делать запрос

- credentials – одно из: «omit», «same-origin», «include», указывает, пересылать ли куки и заголовки авторизации вместе с запросом

- cache – одно из «default», «no-store», «reload», «no-cache», «force-cache», «only-if-cached», указывает, как кешировать запрос

- redirect – можно поставить «follow» для обычного поведения при коде 30x (следовать редиректу) или «error» для интерпретации редиректа как ошибки


Без options это простой GET-запрос, скачивающий содержимое по адресу url.


# Использование

При вызове fetch возвращает промис, который, когда получен ответ, выполняет коллбэки с объектом Response или с ошибкой, если запрос не удался.

Пример использования:

![help](https://miro.medium.com/max/700/1*LSFacSTT8KIQq49fZnZJ6g.png)

Объект response кроме доступа к заголовкам headers, статусу status и некоторым другим полям ответа, даёт возможность прочитать его тело, в желаемом формате.

Варианты описаны в спецификации Body, они включают в себя:

- response.arrayBuffer()

- response.blob()

- response.formData()

- response.json()

- response.text()

# Пример

Наш fetch GET запрос будет выглядеть так:

```
fetch('/api')
    .then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem');
                console.log(`Status Code: ${response.status}`);
                return;
            }
            return response.json();
        }
    )
    
    .then((data) => {
        console.log('data: ', data)
    })
    
    .catch((err) => {
        console.log('Fetch Error :-S', err);
    });
```


Практика:

Давайте отправим fetch get запрос на сервер с фильмами. И отобразим на страницу картинки фильмов

Сам запрос:

```
fetch('http://api.tvmaze.com/search/shows?q=girls')
```

Теперь надо обработать данные, которые получили с сервера

```
.then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem');
                console.log(`Status Code: ${response.status}`);
                return;
            }
            return response.json();
        }
    )
    
    .then((data) => {
        // что-то делаем с данными
    })
    
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
```


# Fetch POST запрос

Для отправки POST-запроса или запроса с другим методом, нам необходимо использовать fetch параметры:

- method – HTTP метод, например POST,

- body – тело запроса, одно из списка:

- строка (например, в формате JSON),

- объект FormData для отправки данных как form/multipart,

- Blob/BufferSource для отправки бинарных данных,


Чаще всего используется JSON.

Например, этот код отправляет объект user как JSON:

```
let user = {
  name: 'John',
  surname: 'Smith'
};
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
let result = await response.json();
alert(result.message);
```

Заметим, что так как тело запроса body – строка, то заголовок Content-Type по умолчанию будет text/plain;charset=UTF-8.

Но, так как мы посылаем JSON, то используем параметр headers для отправки вместо этого application/json, правильный Content-Type для JSON.

# Итого по fetch

Параметры ответа:

- response.status – HTTP-код ответа

- response.ok – true, если статус ответа в диапазоне 200-299

- response.headers – похожий на Map объект с HTTP-заголовками


Методы для получения тела ответа:

- response.text() – возвращает ответ как обычный текст

- response.json() – преобразовывает ответ в JSON-объект

- response.formData() – возвращает ответ как объект FormData (кодировка form/multipart, см. следующую главу)

- response.blob() – возвращает объект как Blob (бинарные данные с типом)

- response.arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневые бинарные данные)

```
const resp = fetch('api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(someData),
    });
```

При POST запросе почти всегда надо передать тело запроса (body). В body передаем те данные, которые хотим отправить на сервер.

Отправлять надо в том же формате, который указали в 'Content-Type'. Если там application/json, то нам надо привести body к JSON формату


Практика:

Давайте сделаем пару инпутов (можно форму):

- Первый инпут под имя
- Второй под фамилию

Давайте еще сделаем кнопку для отправки данных на сервер

- Эндпоинт на сервер https://api.jsonbin.io/b/5edfbf4e655d87580c46ed7b
- Нужные хэдеры

```
Content-Type: 'application/json',
secret-key: '$2b$10$dgM1SKMKiT9Mwj/qs8/0auCBRW85JrfDfVhdB8uoUfh90.wEpXJcK'
```

При нажатии на кнопку мы отправляем на сервер данные, которые ввели в инпуты)



# Веб-хранилище. localStorage и sessionStorage

Веб-хранилище - это данные, хранящиеся локально в браузере пользователя.

Существует 2 типа веб-хранилищ:

- LocalStorage
- SessionStorage

В них вы можете хранить информацию в формате ключ-значение.

Ключ и значение – это всегда строки.

Если мы попытаемся сохранить в значение элемента хранилища другой тип значений, например, объект, то он будет, перед тем как туда записан, преобразован в строку.

- SessionStorage – выполняет это в течение определённого промежутка времени (сессии).

Закрытие вкладки или браузера приводит их к удалению.

При этом данные в SessionStorage сохраняются при обновлении страницы.

- LocalStorage – осуществляет это в течение неограниченного времени.

Они сохраняются при перезагрузке браузера и компьютера.

Их длительность хранения ничем не ограничена.

Но, хоть эти данные могут храниться бесконечно в браузере, обычный пользователь может их очень просто удалить, например выполнив очистку истории (при включенной опции «файлы cookie и другие данные сайтов»).

# Объекты localStorage и sessionStorage

Работа с веб-хранилищами в JavaScript выполняется через объекты localStorage и sessionStorage.

Объекты localStorage и sessionStorage находятся в глобальном объекте window.


Они имеют одинаковый набор свойств и методов:

- getItem(key) - получить значение элемента хранилища по key

- setItem(key,value) - установить для key указанное значение value (если в хранилище уже есть данные с этим ключом, то они будут переписаны)

- removeItem(key) - удалить элемент по key

- clear() - удалить все элементы

- key(index) - получить элемент по его индексу (в основном используется для перебора)

- length - свойство, с помощью которого можно получить количество элементов в хранилище


1. Пример, в котором добавим элемент в веб-хранилище, получим его значение по ключу, а затем удалим его:

```
// 1 - добавим в LocalStorage элемент с ключом «bgColor» и значением «green»
localStorage.setItem('bgColor', 'green');
// 2 - получим значение по ключу «bgColor» и сохраним его в переменную «bgColor»
var bgColor = localStorage.getItem('bgColor');
// 3 - удалим элемент из хранилища по ключу
localStorage.removeItem('bgColor');
```

2. Пример, в котором удалим все элементы из хранилища:

```
localStorage.clear();
```

3. Пример, в котором переберём все элементы LocalStorage:

```
 for (var i = 0, length = localStorage.length; i < length; i++) {
    // localStorage.key(i) - получение ключа элемента по его индексу
    output += 'Ключ: ' + localStorage.key(i) + "; Значение: " + localStorage.getItem(localStorage.key(i)) + ".&lt;br&gt;";
  }
```

4. Пример, в котором запишем JavaScript объект в LocalStorage:

```
// 1 - JavaScript объект
const obj = {
  prop1: 'value1',
  prop2: 'value2',
  prop3: 'value3'
}
// 2 - Сохраним JavaScript объект в LocalStorage преобразовав его в строку JSON
localStorage.setItem('mykey', JSON.stringify(obj));
// 3 - Получим из LocalStorage значение по ключу «mykey», если он там есть
// (т.е. если его значение не равно null)
if (localStorage.getItem('mykey')) {
  // 4 - Получим из LocalStorage значение по ключу «mykey», преобразуем его 
  // с помощью метода JSON.parse в JavaScript объект
  obj = JSON.parse(localStorage.getItem('mykey'));
}
```
