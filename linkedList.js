class LinkedList {
        constructor(elements) {
          //создаёт список из массива элементов
          function list(elements) {
            let list = { value: elements[elements.length - 1], next: null };
            let i = elements.length - 2;

            while (i >= 0) {
              let tmp = Object.assign({}, list);
              list.value = elements[i];
              list.next = tmp;
              i--;
            }

            return list;
          }

          this.length = elements.length;
          this.head = list(elements);
        }

        add(elem) {
          //добавляет элемент в конец списка

          if (this.length === 0) {
            this.head.next = null;
          } else {
            this.head.next = Object.assign({}, this.head);
          }
          this.head.value = elem;
          this.length++;
        }

        insert(i, elem) {
          //i >= 0
          //вставляет элемент в нужную позицию, если позиция больше чем есть элементов тогда в конец

          let node = Object.assign({}, this.head);
          let j = 0;
          let prev = {};
          let result = node;

          if (i > this.length) {
            i = this.length + 1;
          }

          while (j != i) {
            prev = node;
            node = node.next;
            j++;
          }
          let tail = node;
          let newNode = {
            value: elem,
            next: tail,
          };

          prev.next = newNode;
          return result;
        }

        remove(i) {
          //удаляет элемент на заданной позиции
          //если индекс больше, чем размер списка, то выкинуть ошибку
          //вернуть удалённый элемент
          console.log(" length : ", this.length);
          if (i >= this.length) {
            throw new Error(" Индекс больше размеров списка ");
          }

          if (this.length === 0) {
            throw new console.error("Список пуст");
          }

          let node = this.head;
          let j = 0;
          let prev = {};

          if (i === 0) {
            this.head = this.head.next;
            this.length--;
            return node.value;
          }

          while (j < i) {
            prev = node;
            node = node.next;
            j++;
          }
          prev.next = node.next;
          this.length--;
          return node.value;
        }

        indexOf(elem) {
          //возвращает индекс элемента в списке если он там есть, если нет то -1

          let node = this.head;
          let i = 0;
          while (node.next !== null) {
            if (node.value === elem) return i;
            node = node.next;
            i++;
          }

          return -1;
        }

        get(i) {
          //возвращает элемент по индексу
          if (i > this.length - 1 || i < 0) {
            throw new Error("Некорректный индекс");
          }
          let node = this.head;
          let j = 0;
          while (j !== i) {
            node = node.next;
            j++;
          }
          return node.value;
        }

        getFirst() {
          let node = this.head;
          while (node.next !== null) {
            node = node.next;
          }
          return node.value;
        }

        getLast() {
          return this.head.value;
        }

        forEach(fn) {
          //проходит по списку и вызывает для каждого элемента ф-цию fn
          let node = this.head;
          let j = 0;

          while (j !== this.length) {
            fn(node.value);
            node = node.next;
            j++;
          }
          return;
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
          this.length = null;

          if (elements) {
            for (let el of elements) {
              this.add(el);
            }
          }
        }

        add(el) {
          const node = {
            value: el,
            prev: null,
            next: null,
          };

          if (this.head === null) {
            this.head = this.tail = node;
          } else {
            node.prev = this.head;
            this.head.next = node;
            this.head = node;
          }

          this.length++;
        }
        insert(i, el) {
          //i >= 0
          //вставляет элемент в нужную позицию, если позиция больше чем есть элементов тогда в конец

          if (i < 0) {
            return new Error("Некорректный индекс");
          }

          const newNode = {
            value: el,
            prev: null,
            next: null,
          };
          this.length++;

          if (i === 0) {
            this.head.next = newNode;
            newNode.prev = this.head;
            this.head = newNode;
            return;
          }
          
          if (i === this.length-1) {
            this.tail.prev = newNode;
            newNode.next = this.tail;
            this.tail = newNode;
            return;
          }

          let j = 1;
          let node = this.head.prev;
          while (i > j) {
            node = node.prev;
            j++;
          }
  
          let nodePrev = node.prev;

          node.prev = newNode;
          newNode.prev = nodePrev;
          nodePrev.next = newNode;
          newNode.next = node;
        }
        remove(i) {
          //удаляет элемент на заданной позиции
          //если индекс больше, чем размер списка, то выкинуть ошибку
          //вернуть удалённый элемент

          if (i > this.length - 1) {
            throw new Error("Некорректный индекс");
          }

          let node = this.tail;
          if (i === 0) {
            this.tail = this.tail.next;
            this.tail.prev = null;
          }

          if (i === this.length - 1) {
            node = this.head;
            this.head = this.head.prev;
            this.head.next = null;
          }

          let j = 1;
          node = this.head.prev;
          while (j > 0) {
            if (j === i) break;
            node = node.prev;
            j++;
          }
          node.next.prev = node.prev;
          node.prev.next = node.next;

          return node.value;
        }
        indexOf(el) {
          //возвращает индекс элемента в списке если он там есть, если нет то -1
          let j = 0;
          let node = this.head;
          while (j < this.length) {
            if (node.value === el) {
              return j;
            }
            node = node.prev;
            j++;
          }
          return -1;
        }
        get(i) {
          //возвращает элемент по индексу
          if (i > this.length - 1 || i < 0) {
            throw new Error("Некорректный индекс");
          }

          let j = 0;
          let node = this.head;
          while (j !== i) {
            node = node.prev;
            j++;
          }
          return node.value;
        }
        getFirst() {
          return this.head;
        }
        getLast() {
          return this.tail;
        }
        forEach(fn) {
          let i = 0;
          let node = this.head;
          while (i < this.length) {
            fn(node.value);
            node = node.prev;
            i++;
          }
        }
        size() {
          return this.length;
        }
      }


      class Stack {
        constructor() {
          this.head = null;
          this.length = 0;
        }

        push(elem) {
          //добавляет в стэк элемент
          const node = {
            value: elem,
            prev: null
          }

          if (this.length === 0) {
            this.head = node;
          } else {
            node.prev = this.head;
            this.head = node;
          }
          this.length++;
        }
        pop() {
          //достает верхний элемент и возвращает его, если стэк пустой то ошибку выкинуть
          if (this.length === 0) {
            return new Error("Стэк пуст");
          }
          const res = this.head.value;
          this.head = this.head.prev;
          this.length--;
          return res;
        }
        peak() {
          //просто возвращает верхний элемент, но он остается в стэке
          return this.head.value;
        }
        size() {
          //возвращает размер стэка
          return this.length;
        }
      }

      class Queue {
        constructor() {
          this.head = null;
          this.tail = null;
          this.length = 0;
        }

        enqueue(elem) {
          //добавляет элемент в очередь
          const node = {
            value: elem,
            prev: null,
            next: null
          }

          if (this.length === 0) {
            this.head = this.tail = node;
          } else {
            node.prev = this.head;
            this.head.next = node;
            this.head = node;
          }

          this.length++;
        }
        dequeue() {
          //достает элемент из очереди
          //если очередь пустая то бросить ошибку
          if(this.length === 0) {
            return new Error("Очередь пуста");
          }
          const res = this.tail.value;
          this.tail = this.tail.next;
          this.tail.prev = null;
          this.length--;
          return res;
        }
        size() {
          //возвращает размер очереди
          return this.length;
        }
      }
