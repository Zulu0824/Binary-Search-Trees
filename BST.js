class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sorted = [...new Set(array)].toSorted((a, b) => a - b);
    this.root = this.#buildTree(sorted);
  }

  #buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = this.#buildTree(array, start, mid - 1);
    root.right = this.#buildTree(array, mid + 1, end);
    return root;
  }

  #insert(value, node = this.root) {
    if (node === null) return new Node(value);
    if (value === node.data) return node;
    if (value > node.data) {
      node.right = this.#insert(value, node.right);
    } else {
      node.left = this.#insert(value, node.left);
    }
    return node;
  }

  insert(value) {
    this.root = this.#insert(value);
  }

  deleteItem(value, node = this.root) {
    if (node === null) return null;
    if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
      return node;
    }
    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
      return node;
    }
    if (node.left === null && node.right === null) return null;
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    let successor = node.right;
    while (successor.left !== null) successor = successor.left;
    node.data = successor.data;
    node.right = this.deleteItem(successor.data, node.right);
    return node;
  }

  delete(value) {
    this.root = this.deleteItem(value);
  }

  includes(value, node = this.root) {
    if (node === null) return false;
    if (value === node.data) return true;
    return value > node.data
      ? this.includes(value, node.right)
      : this.includes(value, node.left);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");
    if (this.root === null) return;
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  preorderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");
    const traverse = (node) => {
      if (node === null) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
  }

  inorderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };
    traverse(this.root);
  }

  postorderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };
    traverse(this.root);
  }

  height(value) {
    const findNode = (node) => {
      if (node === null) return null;
      if (value === node.data) return node;
      return value > node.data ? findNode(node.right) : findNode(node.left);
    };
    const heightOf = (node) => {
      if (node === null) return -1;
      return 1 + Math.max(heightOf(node.left), heightOf(node.right));
    };
    const target = findNode(this.root);
    if (target === null) return undefined;
    return heightOf(target);
  }

  depth(value, node = this.root, edges = 0) {
    if (node === null) return undefined;
    if (value === node.data) return edges;
    return value > node.data
      ? this.depth(value, node.right, edges + 1)
      : this.depth(value, node.left, edges + 1);
  }

  isBalanced(node = this.root) {
    const check = (node) => {
      if (node === null) return { height: -1, balanced: true };
      const left = check(node.left);
      if (!left.balanced) return { height: 0, balanced: false };
      const right = check(node.right);
      if (!right.balanced) return { height: 0, balanced: false };
      const balanced = Math.abs(left.height - right.height) <= 1;
      const height = 1 + Math.max(left.height, right.height);
      return { height, balanced };
    };
    return check(node).balanced;
  }

  rebalance() {
    const values = [];
    this.inorderForEach((value) => values.push(value));
    this.root = this.#buildTree(values);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

module.exports = { Node, Tree };
