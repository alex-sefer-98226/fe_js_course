# Безопасность наглядно: CORS

Во фронтенде часто требуется отобразить данные, которые хранятся в другом месте.

Перед этим браузер должен направить запрос серверу:

- клиент отправляет HTTP-запрос со всей информацией, которая нужна серверу, чтобы вернуть данные.

Представим, что нам надо получить информацию о пользователях для нашего сайта www.mywebsite.com с сервера, который находится по адресу api.website.com.

![help](https://miro.medium.com/max/552/1*YcZzHhIlw-QJlMey8dlENw.gif)

Сработало. Мы отправили HTTP-запрос на сервер, который вернул нужные нам данные в формате JSON.

А теперь давайте попытаемся отправить точно такой же запрос, но с другого домена: вместо www.mywebsite.com возьмём www.anotherdomain.com.

![help](https://miro.medium.com/max/700/1*0NKA-k4-Na_C8xm4LGoubA.gif)

Что произошло?

Мы отправили такой же запрос, но на этот раз браузер выдал странную ошибку.

Мы только что увидели CORS в действии.

Давайте разберёмся, почему возникла эта ошибка, и что она означает.

# Правило одинакового источника (Same-Origin Policy)

В веб внедрено так называемое правило одинакового источника.

По умолчанию мы можем получить доступ к ресурсам только в том случае, если источник этих ресурсов и источник запроса совпадают.

К примеру, мы сможем без проблем загрузить изображение, которое находится по адресу https://mywebsite.com/image1.png.

**Ресурс считается принадлежащим к другому источнику (cross-origin), если он располагается на другом домене/поддомене, протоколе или порте.**

![help](https://miro.medium.com/max/700/1*9_c5qHZhImmawYinJBkDJg.png)

# Зачем оно надо?

Представим, что это правило не работает, а вы случайно нажали на какую-то вирусную ссылку

Ссылка перенаправляет вас на мошеннический сайт, который с помощью фрейма загружает интерфейс сайта вашего банка и успешно залогинивает вас с помощью сохранённых куки.

Разработчики этого мошеннического сайта сделали так, чтобы он имел доступ к фрейму и мог взаимодействовать с DOM сайта вашего банка — так они смогут переводить деньги на свой счёт от вашего имени.

![help](https://miro.medium.com/max/700/1*NWgtgPrtQneKv2Afh_XJNw.gif)

К счастью, здесь приходит на помощь правило одинакового источника:

- оно гарантирует, что мы можем получить доступ только к ресурсам из того же самого источника.

![help](https://miro.medium.com/max/700/1*MNhe3ThgKySQs8I1XuSAQw.gif)

# CORS на стороне клиента

Несмотря на то, что правило одинакового источника применяется исключительно к скриптам, браузеры распространили его и на JavaScript-запросы: по умолчанию можно получить доступ к ресурсам только из одинакового источника.

![help](https://miro.medium.com/max/2400/1*GFSFIWzD6ndsdgYd1rwE-A.gif)

# Запросы

Чтобы обеспечить безопасность запросов к другим источникам, браузеры используют механизм под названием CORS.

Аббревиатура CORS расшифровывается как Cross-Origin Resource Sharing (Технология совместного использования ресурсов между разными источниками)

Несмотря на то, что браузеры не позволяют получать доступ к ресурсам из разных источников, можно использовать CORS, чтобы внести небольшие коррективы в эти ограничения

**Пользовательские агенты (к примеру, браузеры) на основе значений определённых заголовков для CORS в HTTP-запросе могут проводить запросы к другим источникам, которые без CORS были бы заблокированы.**

Чтобы разрешить запросы из других источников, можем добавить в HTTP-ответ дополнительные заголовки, начинающиеся с Access-Control-* (на стороне бэка)

Существует несколько CORS-заголовков, но браузеру нужен всего один из них, чтобы разрешить доступ к ресурсам из разных источников —Access-Control-Allow-Origin.


# Куки, document.cookie

Cookies - это технология, позволяющая сайтам сохранять в браузере небольшую порцию данных (до 4Кбайт).

Обычно эти данные используются на сайте для того, чтобы:

- "узнать" (идентифицировать) пользователя (эмулировать постоянное соединение с сервером);

- сохранить информацию о просмотренных страницах или товаров;

- осуществить простую защиту счётчиков и системы голосования от накрутки;

- запомнить настройки интерфейса, расположение блоков, товара, добавленного в корзину и много другого.

# Как работают cookies

![help](https://itchief.ru/assets/images/js/principle-of-operation-with-cookies.png)

- Клиент (веб-браузер) посылает серверу запрос (запрашивает у него страницу). Если в браузере есть cookies, связанные с этим сайтом, то он их посылает серверу в составе этого запроса.

- Сервер получает запрос от клиента. Если в составе запроса есть куки, то их можно использовать для выполнения некоторой логики на сервере, подготовки пользователю персонализированной страницы или для чего-то другого. После этого отправляем клиенту ответ. В заголовке ответа отправляем веб-браузеру (клиенту) cookies, которые ему нужно будет сохранить.

- Веб-браузер (клиент) получает ответ от сервера (страницу) и выводит его пользователю. Куки, которые пришли с сервера, браузер сохраняет в своё хранилище.

# JavaScript - document.cookie

Но прочитать и установить cookies можно не только на стороне сервера, но и на клиенте - с помощью JavaScript.

Осуществляется это посредством свойства cookie объекта document.

```
// получить значения всех cookies страницы
const cookies = document.cookie;
// выведем куки в консоль браузера
console.log(cookies);
// выведем с помощью функции alert
alert(cookies);
```

# Запись в document.cookie

Запись в document.cookie обновит только упомянутые в ней куки, но при этом не затронет все остальные.

Например, этот вызов установит куки с именем user и значением John:

```
document.cookie = "user=John"; // обновляем только куки с именем 'user'
alert(document.cookie); // показываем все куки
```

Технически, и имя и значение куки могут состоять из любых символов, для правильного форматирования следует использовать встроенную функцию encodeURIComponent:

```
// специальные символы (пробелы), требуется кодирование
let name = "my name";
let value = "John Smith"
// кодирует в my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
alert(document.cookie); // ...; my%20name=John%20Smith
```

# Ограничения

Существует несколько ограничений:

- После encodeURIComponent пара name=value не должна занимать более 4Кб. Таким образом, мы не можем хранить в куки большие данные.

- Общее количество куки на один домен ограничивается примерно 20+. Точное ограничение зависит от конкретного браузера.

Эти настройки указываются после пары ключ=значение и отделены друг от друга разделителем **;**, вот так:

```
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

- path

path=/mypath

URL-префикс пути, куки будут доступны для страниц под этим путём. Должен быть абсолютным. По умолчанию используется текущий путь.

- domain

domain=site.com

По умолчанию куки доступно лишь тому домену, который его установил.

**Так что куки, которые были установлены сайтом site.com, не будут доступны на сайте other.com.**

```
// на site.com
document.cookie = "user=John"
// на forum.site.com
alert(document.cookie); // нет user
```

- expires, max-age

По умолчанию, если куки не имеют ни одного из этих параметров, то они удалятся при закрытии браузера.

Такие куки называются сессионными («session cookies»).

Чтобы помочь куки «пережить» закрытие браузера, мы можем установить значение опций expires или max-age.

```
expires=Tue, 19 Jan 2038 03:14:07 GMT
```

- max-age=3600

Альтернатива expires, определяет срок действия куки в секундах с текущего момента.

```
// куки будет удалено через 1 час
document.cookie = "user=John; max-age=3600";
// удалим куки (срок действия истекает прямо сейчас)
document.cookie = "user=John; max-age=0";
```


# HTMLCollection и метод namedItem

Интерфейс HTMLCollection является обобщённой коллекцией (объектом, ведущим себя подобно массиву) элементов (в порядке упоминания в документе) и предоставляет методы и свойства для получения хранящихся в нём элементов.

HTMLCollection, хранящая элементы DOM, является динамической.

При изменении документа она моментально отражает все произведённые изменения.

# Свойства

- HTMLCollection.length

Только для чтения

Возвращает количество элементов в коллекции.

# Методы

- HTMLCollection.item()

Возвращает узел с порядковым номером index; отсчёт ведётся от нуля.

Возвращает null, если index выходит за границы допустимого диапазона.

- HTMLCollection.namedItem()

Возвращает узел, идентификатор или имя (в целях совместимости) которого совпадает со строкой, переданной в аргументе name.

Соответствие имени проверяется в самую последнюю очередь, только для HTML элементов и только для тех из них, которые поддерживают свойство name.

Возвращает null , если искомый элемент отсутствует.


# Использование

```
<p id="myElement">The namedItem() method returns the element with the specified ID or name.</p>
<p>Click the button to return the content of the P element with ID "myElement":</p>
<button onclick="myFunction()">Alert innerHTML of P</button>
<script>
  function myFunction() {
    const x = document.getElementsByTagName("P").namedItem("myElement"); // сработает только если есть id или name
    alert(x.innerHTML);
  }
</script>
```

# Cтруктур данных на примере JavaScript

- Стек (вызовов) (Stack)

![help](https://habrastorage.org/webt/et/lm/i8/etlmi8bd7ikmj10ru5sunqry-q8.png)

Стек следует принципу LIFO (Last In First Out — последним вошел, первым вышел).

Если вы сложили книги друг на друга, и захотели взять самую нижнюю книгу, то сначала возьмете верхнюю, затем следующую и т.д.

Стек имеет следующие методы:

- push: добавить новый элемент

- pop: удалить верхний элемент, вернуть его

- peek: вернуть верхний элемент

- length: вернуть количество элементов в стеке

Массив в JS имеет атрибуты стека, но мы построим его с нуля с помощью function Stack():

```
function Stack() {
    this.count = 0
    this.storage = {}
    this.push = function(value) {
        this.storage[this.count] = value
        this.count++
    }
    this.pop = function() {
        if (this.count === 0) return undefined
        this.count--
        let result = this.storage[this.count]
        delete this.storage[this.count]
        return result
    }
    this.peek = function() {
        return this.storage[this.count - 1]
    }
    this.size = function() {
        return this.count
    }
}
```


# Очередь (кью) (Queue)

![help](https://habrastorage.org/webt/rm/zr/q2/rmzrq2vlgafekeqbytdik-pc86o.png)

Очередь напоминает стек. Разница состоит в том, что очередь следует принципу FIFO (First In First Out — первым вошел, первым вышел).

Когда вы стоите в очереди, первый в ней всегда будет первым.

Очередь имеет следующие методы:

- enqueue: войти в очередь, добавить элемент в конец

- dequeue: покинуть очередь, удалить первый элемент и вернуть его

- front: получить первый элемент

- isEmpty: проверить, пуста ли очередь

- size: получить количество элементов в очереди

Массив в JS имеет некоторые атрибуты очереди, поэтому мы можем использовать его для демонстрации:

```
function Queue() {
    let collection = []
    this.print = function() {
        console.log(collection)
    }
    this.enqueue = function(element) {
        collection.push(element)
    }
    this.dequeue = function() {
        return collection.shift()
    }
    this.front = function() {
        return collection[0]
    }
    this.isEmpty = function() {
        return collection.length === 0
    }
    this.size = function() {
        return collection.length
    }
}
```

Порядок очередности (приоритет)

Очередь имеет продвинутую версию.

Присвойте каждому элементу приоритет, и элементы будут отсортированы соответствующим образом:

```
function PriorityQueue() {
    ...
    this.enqueue = function(element) {
        if (this.isEmpty()) {
            collection.push(element)
        } else {
            let added = false
            for (let i = 0; i < collection.length; i++) {
                if (element[1] < collection[i][1]) {
                    collection.splice(i, 0, element)
                    added = true
                    break;
                }
            }
            if (!added) {
                collection.push(element)
            }
        }
    }
}
```

Тестируем:

```
let pQ = new PriorityQueue()
pQ.enqueue([gannicus, 3])
pQ.enqueue([spartacus, 1])
pQ.enqueue([crixus, 2])
pQ.enqueue([oenomaus, 4])
pQ.print()
```

Результат:

```
[
    [spartacus, 1],
    [crixus, 2],
    [gannicus, 3],
    [oenomaus, 4]
]
```

# Связный список (связанный, список узлов и ссылок или указателей) (Linked List)

![help](https://habrastorage.org/webt/ng/o1/oz/ngo1ozxdcnboo-74qdqyyos0nim.png)

Буквально, связный список — это цепочечная структура данных, где каждый узел состоит из двух частей: данных узла и указателя на следующий узел.

Связный список и условный массив являются линейными структурами данных с сериализованным хранилищем.

Отличия состоят в следующем:

| Attempt | Массив | Список |
| :---: | :---: | :---: |
| Выделение памяти | Статическое, происходит последовательно во время компиляции | Динамическое, происходит асинхронно во время запуска (выполнения) |
| Получение элементов | Поиск по индексу, высокая скорость | Поиск по всем узлам очереди, скорость менее высокая |
| Добавление/удаление элементов | В связи с последовательным и статическим распределением памяти скорость ниже | В связи с динамическим распределением памяти скорость выше |
| Структура | Одно или несколько направлений | 	Однонаправленный, двунаправленный или циклический |

# Односвязный список имеет следующие методы:

- size: вернуть количество узлов

- head: вернуть первый элемент (head — голова)

- add: добавить элемент в конец (tail — хвост)

- remove: удалить несколько узлов

- indexOf: вернуть индекс узла

- elementAt: вернуть узел по индексу

- addAt: вставить узел в определенное место (по индексу)

- removeAt: удалить определенный узел (по индексу)


```
// узел
function Node(element) {
    // данные
    this.element = element
    // указатель на следующий узел
    this.next = null
}
function LinkedList() {
    let length = 0
    let head = null
    this.size = function() {
        return length
    }
    this.head = function() {
        return head
    }
    this.add = function(element) {
        let node = new Node(element)
        if (head === null) {
            head = node
        } else {
            let currentNode = head
            while (currentNode.next) {
                currentNode = currentNode.next
            }
            currentNode.next = node
        }
        length++
    }
    this.remove = function(element) {
        let currentNode = head
        let previousNode
        if (currentNode.element !== element) {
            head = currentNode.next
        } else {
            while (currentNode.element !== element) {
                previousNode = currentNode
                currentNode = currentNode.next
            }
            previousNode.next = currentNode.next
        }
        length--
    }
    this.isEmpty = function() {
        return length === 0
    }
    this.indexOf = function(element) {
        let currentNode = head
        let index = -1
        while (currentNode) {
            index++
            if (currentNode.element === element) {
                return index
            }
            currentNode = currentNode.next
        }
        return -1
    }
    this.elementAt = function(index) {
        let currentNode = head
        let count = 0
        while (count < index) {
            count++
            currentNode = currentNode.next
        }
        return currentNode.element
    }
    this.addAt = function(index, element) {
        let node = new Node(element)
        let currentNode = head
        let previousNode
        let currentIndex = 0
        if (index > length) return false
        if (index === 0) {
            node.next = currentNode
            head = node
        } else {
            while (currentIndex < index) {
                currentIndex++
                previousNode = currentNode
                currentNode = currentNode.next
            }
            node.next = currentNode
            previousNode.next = node
        }
        length++
    }
    this.removeAt = function(index) {
        let currentNode = head
        let previousNode
        let currentIndex = 0
        if (index < 0 || index >= length) return null
        if (index === 0) {
            head = currentIndex.next
        } else {
            while (currentIndex < index) {
                currentIndex++
                previousNode = currentNode
                currentNode = currentNode.next
            }
            previousNode.next = currentNode.next
        }
        length--
        return currentNode.element
    }
}
```

# Коллекция (значений) (Set)

![help](https://habrastorage.org/webt/oa/zs/gs/oazsgspwphkxkrd5gbojwee_v_m.png)

Коллекция (множество) — одна из основных концепций математики: набор хорошо определенных и обособленных объектов.

ES6 представил коллекцию, которая имеет некоторое сходство с массивом.

**Тем не менее, коллекция не допускает включения повторяющихся элементов и не содержит индексов.**

Стандартная коллекция имеет следующие методы:

- values: вернуть все элементы в коллекции

- size: вернуть количество элементов

- has: проверить, имеется ли элемент в коллекции

- add: добавить элемент

- remove: удалить элемент

- union: вернуть область пересечения двух коллекций

- difference: вернуть отличия двух коллекций

- subset: проверить, является ли одна коллекция подмножеством другой

```
function MySet() {
    let collection = []
    this.has = function(element) {
        return (collection.indexOf(element) !== -1)
    }
    this.values = function() {
        return collection
    }
    this.size = function() {
        return collection.length
    }
    this.add = function(element) {
        if (!this.has(element)) {
            collection.push(element)
            return true
        }
        return false
    }
    this.remove = function(element) {
        if (this.has(element)) {
            index = collection.indexOf(element)
            collection.splice(index, 1)
            return true
        }
        return false
    }
    this.union = function(otherSet) {
        let unionSet = new MySet()
        let firstSet = this.values()
        let secondSet = otherSet.values()
        firstSet.forEach(i => unionSet.add(i))
        secondSet.forEach(i => unionSet.add(i))
    }
    this.intersection = function(otherSet) {
        let intersectionSet = new MySet()
        let firstSet = this.values()
        firstSet.forEach(function(e) {
            if (otherSet.has(e)) {
                intersectionSet.add(e)
            }
        })
        return intersectionSet
    }
    this.difference = function(otherSet) {
        let differenceSet = new MySet()
        let firstSet = this.values()
        firstSet.forEach(function(e) {
            if (!otherSet.has(e)) {
                differenceSet.add(e)
            }
        })
        return differenceSet
    }
    this.subset = function(otherSet) {
        lat firstSet = this.values()
        return firstSet.every(value => otherSet.has(value))
    }
}
```

# Blob

Объект Blob состоит из необязательной строки type и blobParts – последовательности других объектов Blob, строк и BufferSource.

![help](https://learn.javascript.ru/article/blob/blob.svg)

Благодаря type мы можем загружать и скачивать Blob-объекты, где type естественно становится Content-Type в сетевых запросах.

Конструктор имеет следующий синтаксис:

```
new Blob(blobParts, options);
```

- blobParts – массив значений Blob/BufferSource/String.

- options – необязательный объект с дополнительными настройками:

type – тип объекта. Например. image/png,

endings – если указан, то окончания строк создаваемого Blob будут изменены в соответствии с текущей операционной системой (\r\n или \n). По умолчанию "transparent" (ничего не делать), но также может быть "native" (изменять).

```
// создадим Blob из строки
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// обратите внимание: первый аргумент должен быть массивом [...]
```

```
// создадим Blob из типизированного массива и строк
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "hello" в бинарной форме
let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```

Мы можем получить срез Blob, используя:

```
blob.slice([byteStart], [byteEnd], [contentType]);
```

- byteStart – стартовая позиция байта, по умолчанию 0.

- byteEnd – последний байт, по умолчанию до конца.

- contentType – тип type создаваемого Blob-объекта, по умолчанию такой же, как и исходный.

**Blob не изменяем (immutable)**

# Blob как URL

Blob может быть использован как URL для <a>, <img> или других тегов, для показа содержимого.


По нажатию скачаем файлик

```
<!-- download атрибут указывает браузеру делать загрузку вместо навигации -->
<a download="hello.txt" href='#' id="link">Загрузить</a>
<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});
link.href = URL.createObjectURL(blob);
</script>
```

Мы также можем создать ссылку динамически, используя только JavaScript, и эмулировать на ней клик, используя link.click(), тогда загрузка начнётся автоматически.

Далее простой пример создания «на лету» и загрузки Blob-объекта, без использования HTML:

```
let link = document.createElement('a');
link.download = 'hello.txt';
let blob = new Blob(['Hello, world!'], {type: 'text/plain'});
link.href = URL.createObjectURL(blob);
link.click();
URL.revokeObjectURL(link.href);
```

URL.createObjectURL берёт Blob и создаёт уникальный URL для него в формате blob:<origin>/<uuid>.

Вот как выглядит сгенерированный URL:

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

# FileReader

FileReader объект, цель которого читать данные из Blob

Данные передаются при помощи событий, так как чтение с диска может занять время.

Конструктор:

```
let reader = new FileReader(); // без аргументов
```

Основные методы:

- readAsArrayBuffer(blob) – считать данные как ArrayBuffer

- readAsText(blob, [encoding]) – считать данные как строку (кодировка по умолчанию: utf-8)

- readAsDataURL(blob) – считать данные как base64-кодированный URL.

- abort() – отменить операцию.

Выбор метода для чтения зависит от того, какой формат мы предпочитаем, как мы хотим далее использовать данные.

- readAsArrayBuffer – для бинарных файлов, для низкоуровневой побайтовой работы с бинарными данными.

Для высокоуровневых операций у File есть свои методы, унаследованные от Blob, например, slice, мы можем вызвать их напрямую.


- readAsText - для текстовых файлов, когда мы хотим получить строку.

- readAsDataURL – когда мы хотим использовать данные в src для img или другого тега.

Есть альтернатива – можно не читать файл, а вызвать URL.createObjectURL(file), детали в главе Blob.


В процессе чтения происходят следующие события:

- loadstart – чтение начато.

- progress – срабатывает во время чтения данных.

- load – нет ошибок, чтение окончено.

- abort – вызван abort().

- error – произошла ошибка.

- loadend – чтение завершено (успешно или нет).


Когда чтение закончено, мы сможем получить доступ к его результату следующим образом:

- reader.result результат чтения (если оно успешно)

- reader.error объект ошибки (при неудаче)


Наиболее часто используемые события – это, конечно же, load и error.

Вот пример чтения файла:

```
<input type="file" onchange="readFile(this)">
<script>
function readFile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    console.log(reader.result);
  };
  reader.onerror = function() {
    console.log(reader.error);
  };
}
</script>
```
