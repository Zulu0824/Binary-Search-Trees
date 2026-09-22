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

  deleteItem(value, node = this.root) {
    if (node === null) {
      return null;
    }
    if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
      return node;
    }
    if (value < node.data) {
      node.right = this.deleteItem(value, node.left);
      return node;
    }
    if (node.left === null && node.right === null) {
      return null;
    }
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }

    let successor = node.right;
    while (successor.left !== null) {
      successor = successor.left;
    }

    node.data = successor.data;
    node.right = this.deleteItem(successor.data, node.right);
    return node;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (this.root === null) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }
}
