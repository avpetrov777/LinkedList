class LinkedList {
  constructor(elements) {
    //создаёт список из массива элементов
    this.head = null;
    this.length = 0;

    for (let el of elements) {
      this.add(el);
    }
  }

  add(elem) {
    //добавляет элемент в конец списка
    let node = {
      value: elem,
      next: null,
    };

    if (this.head) {
      if (this.head.next === null) {
        this.head.next = node;
      } else {
        const prevNode = this.getNode(this.length - 1);
        prevNode.next = node;
      }
    } else {
      this.head = node;
    }
    this.length++;
  }

  insert(i, elem) {
    //i >= 0
    //вставляет элемент в нужную позицию, если позиция больше чем есть элементов тогда в конец
    // i элемент сдвигаем вправо, новый элемент занимает его место
    console.log("insert ", i);
    if (i < 0) {
      throw new Error("Некорректный индекс");
    }

    let node = {
      value: elem,
      next: null,
    };
    let prevNode = null;
    let nextNode = null;

    if (i === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      if (i < this.length) {
        prevNode = this.getNode(i - 1);
        nextNode = prevNode.next;
      } else {
        prevNode = this.getNode(this.length - 1);
      }

      prevNode.next = node;
      node.next = nextNode;
    }
    this.length++;
    return;
  }

  remove(i) {
    //удаляет элемент на заданной позиции
    //если индекс больше, чем размер списка, то выкинуть ошибку
    //вернуть удалённый элемент

    if (i < 0 || i > this.length - 1) {
      throw new Error("Некорректный индекс");
    }

    let node = null;

    if (i === 0) {
      if (this.length === 1) {
        const node = this.head;
        this.head = null;
        this.length = 0;
        return node;
      }
      node = this.head;
      this.head = node.next;
    } else {
      let prevNode = this.getNode(i - 1);
      node = prevNode.next;
      prevNode.next = node.next;
    }

    this.length--;
    return node.value;
  }

  indexOf(elem) {
    //возвращает индекс элемента в списке если он там есть, если нет то -1

    let node = this.head;
    let i = 0;

    while (node) {
      if (node.value === elem) {
        return i;
      }
      node = node.next;
      i++;
    }

    return -1;
  }

  getNode(i) {
    // находим узел
    console.log("getNode");
    if (i < 0 || i > this.length - 1) {
      throw new Error("индекс находится вне диапазона списка");
    }

    let j = 0;
    let node = this.head;
    while (j < i) {
      //   console.log("j , node.value : ", j,node.value);
      node = node.next;
      j++;
    }
    // console.log("node.value : ", node.value);
    return node;
  }

  get(i) {
    //возвращает элемент по индексу
    return this.getNode(i).value;
  }

  getFirst() {
    return this.head.value;
  }

  getLast() {
    return this.getNode(this.length - 1).value;
  }

  forEach(fn) {
    //проходит по списку и вызывает для каждого элемента ф-цию fn
    let node = this.head;

    while (node) {
      fn(node.value);
      node = node.next;
    }
  }

  size() {
    //возвращает размер списка
    return this.length;
  }
}

//*********************

class DoubleLinkedList {
  //те же методы что и LinkedList
  constructor(elements) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    if (elements) {
      for (let el of elements) {
        this.add(el);
      }
    }
  }

  add(el) {
    this.insert(this.length, el);
  }

  insert(i, el) {
    //i >= 0
    //вставляет элемент в нужную позицию, если позиция больше чем есть элементов тогда в конец
    console.log("insert : ", i);
    if (i < 0) {
      throw new Error("Некорректный индекс");
    }

    if (i > this.length - 1) {
      const node = {
        value: el,
        prev: null,
        next: null,
      };

      if (this.tail) {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      } else {
        this.head = this.tail = node;
      }

      this.length++;
      return;
    }

    let newNode = {
      value: el,
      prev: null,
      next: null,
    };

    if (i === 0) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else {
      let prevNode = this.getNode(i - 1);
      let nextNode = prevNode.next;
      console.log("prev,next : ", prevNode.value, nextNode.value);
      prevNode.next = newNode;
      newNode.next = nextNode;
      nextNode.prev = newNode;
      newNode.prev = prevNode;
    }

    this.length++;
  }

  remove(i) {
    //удаляет элемент на заданной позиции
    //если индекс больше, чем размер списка, то выкинуть ошибку
    //вернуть удалённый элемент
    if (i < 0) {
      throw new Error("Некорректный индекс");
    }
    const node = this.getNode(i);

    if (node === this.head) {
      if (this.length === 1) {
        this.head = null;
        this.length = 0;
        return node;
      }
      this.head = this.head.next;
      this.head.prev = null;
    } else if (node === this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      let prevNode = node.prev;
      let nextNode = node.next;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
    }
    this.length--;
    return node.value;
  }

  indexOf(el) {
    //возвращает индекс элемента в списке если он там есть, если нет то -1

    let node = this.head;
    let i = 0;
    while (node) {
      if (node.value === el) {
        return i;
      }
      node = node.next;
      i++;
    }
    return -1;
  }

  getNode(i) {
    // даёт элемент по индексу
    console.log("getNode");
    if (i < 0 || i > this.length - 1) {
      throw new Error("Индекс находится вне диапазона списка");
    }

    let node = this.head;
    let j = 0;
    while (j <= this.length) {
      if (i === j) {
        return node;
      }
      node = node.next;
      j++;
    }
  }

  get(i) {
    //возвращает элемент по индексу
    return this.getNode(i).value;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    return this.tail;
  }

  forEach(fn) {
    let node = this.head;
    while (node) {
      fn(node.value);
      node = node.next;
    }
  }

  size() {
    return this.length;
  }
}

class Stack {
  constructor(elements) {
    this.stack = new DoubleLinkedList(elements);
  }

  push(elem) {
    //добавляет в стэк элемент
    this.stack.add(elem);
  }
  pop() {
    //достает верхний элемент и возвращает его, если стэк пустой то ошибку выкинуть
    if (this.stack.length === 0) {
      return new Error("пустой стэк");
    }
    return this.stack.remove(this.stack.length - 1);
  }
  peak() {
    //просто возвращает верхний элемент, но он остается в стэке
    return this.stack.getLast().value;
  }
  size() {
    //возвращает размер стэка
    return this.stack.length;
  }
}

class Queue {
  constructor(elements) {
    this.queue = new DoubleLinkedList(elements);
  }

  enqueue(elem) {
    //добавляет элемент в очередь
    this.queue.add(elem);
  }
  dequeue() {
    //достает элемент из очереди
    //если очередь пустая то бросить ошибку
    if (this.queue.length === 0) {
      return new Error("Очередь пуста");
    }
    return this.queue.remove(0);
  }
  size() {
    //возвращает размер очереди
    return this.queue.length;
  }
}
