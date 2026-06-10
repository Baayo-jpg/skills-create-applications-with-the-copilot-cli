#!/usr/bin/env node

/**
 * CLI Calculator
 * Supported operations:
 *  - addition (+, add, plus)
 *  - subtraction (-, sub, minus)
 *  - multiplication (*, x, mul, times)
 *  - division (/ , div, divide)
 *
 * Usage examples:
 *  node src/cli-calculator.js 4 + 2
 *  node src/cli-calculator.js add 4 2
 *  node src/cli-calculator.js (interactive mode)
 */

const readline = require('readline');
const { toNumber, calculate } = require('./calculator');

function printUsage() {
  console.log('CLI Calculator - supports: +, -, *, / (addition, subtraction, multiplication, division)');
  console.log('Usage: node src/cli-calculator.js <left> <operator> <right>');
  console.log('Examples:');
  console.log('  node src/cli-calculator.js 7 + 3');
  console.log('  node src/cli-calculator.js mul 4 6');
  console.log('Run without arguments for interactive mode.');
}

async function interactiveMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = (q) => new Promise(resolve => rl.question(q, resolve));
  try {
    console.log('Interactive CLI Calculator');
    console.log('Supported operations: +, -, *, /');
    const leftRaw = await question('Left operand: ');
    const left = toNumber(leftRaw);
    if (left === null) { console.error('Invalid number'); rl.close(); return; }
    const op = await question('Operator (+, -, *, /): ');
    const rightRaw = await question('Right operand: ');
    const right = toNumber(rightRaw);
    if (right === null) { console.error('Invalid number'); rl.close(); return; }
    try {
      const res = calculate(left, op, right);
      console.log(`Result: ${res}`);
    } catch (err) {
      console.error('Error:', err.message);
    }
  } finally {
    rl.close();
  }
}

// Main
(async function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    await interactiveMode();
    return;
  }

  // Accept two forms:
  // 1) node src/cli-calculator.js <left> <operator> <right>
  // 2) node src/cli-calculator.js <operator> <a> <b>   (matches issue examples: add 2 3)
  if (argv.length !== 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [a, b, c] = argv;
  let left, right, op;

  const maybeOpFirst = String(a).toLowerCase();
  const knownOps = ['+', 'add', 'plus', '-', 'sub', 'minus', '*', 'x', '×', 'mul', 'times', '/', 'div', 'divide'];

  if (knownOps.includes(maybeOpFirst)) {
    // form: <operator> <a> <b>
    op = a;
    left = toNumber(b);
    right = toNumber(c);
  } else {
    // form: <left> <operator> <right>
    left = toNumber(a);
    op = b;
    right = toNumber(c);
  }

  if (left === null || right === null) {
    console.error('Both operands must be valid numbers');
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(left, op, right);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 1;
  }
})();
