class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    this.array = [...new Set(array)].toSorted((a, b) => a - b);
    this.root = this.buildTree(this.array);
  }

  #buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.#buildTree(array, start, mid - 1);
    root.right = this.#buildTree(array, mid + 1, end);

    return root;
  }

  includes(value, node = this.root) {
    if (node === null) {
      return false;
    } else if (value === node.data) {
      return true;
    } else if (value > node.data) {
      return this.includes(value, node.right);
    } else return this.includes(value, node.left);
  }

  #insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    } else if (value === node.data) {
      return node;
    } else if (value > node.data) {
      node.right = this.#insert(value, node.right);
    } else node.left = this.#insert(value, node.left);
    return node;
  }
  insert(value) {
    this.root = this.#insert(value);
  }
}
