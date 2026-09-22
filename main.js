const { Tree } = require("./BST.js");

function randomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function printAllOrders(tree, label) {
  console.log(`\n--- ${label} ---`);

  const level = [];
  tree.levelOrderForEach((v) => level.push(v));
  console.log("Level order:", level.join(", "));

  const pre = [];
  tree.preorderForEach((v) => pre.push(v));
  console.log("Pre order:  ", pre.join(", "));

  const post = [];
  tree.postorderForEach((v) => post.push(v));
  console.log("Post order: ", post.join(", "));

  const inOrd = [];
  tree.inorderForEach((v) => inOrd.push(v));
  console.log("In order:   ", inOrd.join(", "));
}

// 1. Build BST from random numbers < 100
const initial = randomArray(15, 100);
console.log("Initial random array (<100):", initial.join(", "));
const tree = new Tree(initial);

console.log("\nTree structure:");
tree.prettyPrint();

// 2. Confirm balanced
console.log("\nisBalanced() after creation:", tree.isBalanced());

// 3. Print all orders
printAllOrders(tree, "Traversals (balanced)");

// 4. Unbalance the tree with values > 100
const bigValues = [150, 200, 175, 300, 250, 400];
console.log("\nInserting values > 100 to unbalance:", bigValues.join(", "));
bigValues.forEach((v) => tree.insert(v));

console.log("\nTree structure after unbalancing:");
tree.prettyPrint();

// 5. Confirm unbalanced
console.log("\nisBalanced() after inserts:", tree.isBalanced());

// 6. Rebalance
tree.rebalance();
console.log("\nCalled rebalance()");

console.log("\nTree structure after rebalance:");
tree.prettyPrint();

// 7. Confirm balanced again
console.log("\nisBalanced() after rebalance:", tree.isBalanced());

// 8. Print all orders again
printAllOrders(tree, "Traversals (rebalanced)");
