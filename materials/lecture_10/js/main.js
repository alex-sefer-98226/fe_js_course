console.log("hi");
// Cross-Origin resourse sharing

// front-end: http://www.mywebsite.com/
// back-end: http://www.mywebsite.com:8080/api/
// back-end: http://www.api.mywebsite.com/

// const cookies = document.cookie;
// console.log("Our cookies", cookies);
// document.cookie = "user=John";
// console.log("Our cookies", cookies);
// const str = "Hi! This how /cookies works!";

// document.cookie = `string=${str}; expires=Fri Jul 01 2022 19:41:00 GMT+0300`;
// const encoded = encodeURIComponent(str);

// console.log(encoded);

// console.log(decodeURIComponent(encoded));

// const listItems = document.getElementsByTagName("li");

// console.log(listItems.item(75));
// console.log(listItems.namedItem("test").innerText);

// const obj = {
//   a: 2,
//   b: 4,
// };

// type CustomObj = {
//   a: Number // integer (1,2,3,4) float(3.14, 5.55)
//   b: Number // integer (1,2,3,4) float(3.14, 5.55)
// }

// const arr = [1, 2, 3, 1, 2, 0, 4, 5];
// console.log([...new Set(arr)]);
// console.log(new Set(arr));

function Stack() {
  this.count = 0;
  this.storage = {};

  this.push = function (value) {
    this.storage[this.count] = value;
    this.count++;
  };

  this.pop = function () {
    if (this.count === 0) return undefined;
    this.count--;
    let result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  };

  this.peek = function () {
    return this.storage[this.count - 1];
  };

  this.size = function () {
    return this.count;
  };
}

// const stack = new Stack();
// console.log(stack);
// stack.push(2);
// console.log(stack);
// stack.push(5);
// stack.push(8);
// stack.push(10);

// console.log(stack.size());

// console.log(stack.peek());
// console.log(stack.peek());
// console.log(stack.peek());
// console.log("Deleting 'top' element");
// stack.pop();

// console.log(stack.peek());

function Queue() {
  let collection = [];
  this.print = function () {
    console.log(collection);
  };
  this.enqueue = function (element) {
    collection.push(element);
  };
  this.dequeue = function () {
    return collection.shift();
  };
  this.front = function () {
    return collection[0];
  };
  this.isEmpty = function () {
    return collection.length === 0;
  };
  this.size = function () {
    return collection.length;
  };
}

const queue = new Queue();

// queue.print();
// console.log(queue.isEmpty());
// console.log(queue.size());

queue.enqueue(2);
queue.enqueue(5);
queue.enqueue(7);
queue.enqueue(11);
queue.enqueue(13);
queue.enqueue(17);

// queue.print();
// console.log(queue.front());

queue.dequeue();
// console.log(queue.front());
queue.dequeue();
// console.log(queue.front());
queue.dequeue();
// console.log(queue.front());
// queue.print();

function PriorityQueue() {
  let collection = [];
  this.print = function () {
    console.log(collection);
  };
  this.dequeue = function () {
    return collection.shift();
  };
  this.front = function () {
    return collection[0];
  };
  this.isEmpty = function () {
    return collection.length === 0;
  };
  this.size = function () {
    return collection.length;
  };
  this.enqueue = function (element) {
    if (this.isEmpty()) {
      collection.push(element);
    } else {
      let added = false;
      for (let i = 0; i < collection.length; i++) {
        if (element[1] < collection[i][1]) {
          collection.splice(i, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        collection.push(element);
      }
    }
  };
}

const queueWithPriority = new PriorityQueue();
// console.log(queueWithPriority);

// queueWithPriority.print();
// 1 - child
// 2 - women
// 3 - man
queueWithPriority.enqueue(["gannicus", 2]);
queueWithPriority.enqueue(["spartacus", 2]);
queueWithPriority.enqueue(["crixus", 2]);
queueWithPriority.enqueue(["oenomaus", 2]);
queueWithPriority.enqueue(["Hi, I'm child", 1]);
// queueWithPriority.print();

// console.log(queueWithPriority.front());

// const arr = [1, undefined, undefined, undefined, undefined, undefined];

// List

// узел
function Node(element) {
  // данные
  this.element = element;
  // указатель на следующий узел
  this.next = null;
}
function LinkedList() {
  let length = 0;
  let head = null;
  this.size = function () {
    return length;
  };
  this.head = function () {
    return head;
  };
  this.add = function (element) {
    let node = new Node(element);
    if (head === null) {
      head = node;
    } else {
      let currentNode = head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
    length++;
  };
  this.remove = function (element) {
    let currentNode = head;
    let previousNode;
    if (currentNode.element !== element) {
      head = currentNode.next;
    } else {
      while (currentNode.element !== element) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    length--;
  };
  this.isEmpty = function () {
    return length === 0;
  };
  this.indexOf = function (element) {
    let currentNode = head;
    let index = -1;
    while (currentNode) {
      index++;
      if (currentNode.element === element) {
        return index;
      }
      currentNode = currentNode.next;
    }
    return -1;
  };
  this.elementAt = function (index) {
    let currentNode = head;
    let count = 0;
    while (count < index) {
      count++;
      currentNode = currentNode.next;
    }
    return currentNode.element;
  };
  this.addAt = function (index, element) {
    let node = new Node(element);
    let currentNode = head;
    let previousNode;
    let currentIndex = 0;
    if (index > length) return false;
    if (index === 0) {
      node.next = currentNode;
      head = node;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      node.next = currentNode;
      previousNode.next = node;
    }
    length++;
  };
  this.removeAt = function (index) {
    let currentNode = head;
    let previousNode;
    let currentIndex = 0;
    if (index < 0 || index >= length) return null;
    if (index === 0) {
      head = currentIndex.next;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    length--;
    return currentNode.element;
  };
}

const list = new LinkedList();

// console.log(list);

// const node1 = new Node(2);
// const node2 = new Node(322);
// const node3 = new Node(568);
// const node4 = new Node(732);

// list.add(node1);

// list.add(node2);
// list.add(node3);
// list.add(node4);

// console.log(list.head());
// console.log(new Set());
