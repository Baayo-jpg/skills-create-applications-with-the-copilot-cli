#!/usr/bin/env node

/**
 * Calculator module
 * Supported operations:
 *  - addition: add, +, plus
 *  - subtraction: sub, -, minus
 *  - multiplication: mul, *, times
 *  - division: div, /, divide (throws on division by zero)
 *  - modulo: mod, % (throws on modulo by zero)
 *  - power: pow, power (base ** exponent)
 *  - square root: sqrt, √ (unary, errors on negative)
 */

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function modulo(a, b) {
  if (b === 0) throw new Error('Modulo by zero');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('Square root of negative number');
  return Math.sqrt(n);
}

function calculate(a, op, b) {
  const symbol = String(op).toLowerCase();
  switch (symbol) {
    case '+': case 'add': case 'plus':
      return a + b;
    case '-': case 'sub': case 'minus':
      return a - b;
    case '*': case 'x': case '×': case 'mul': case 'times':
      return a * b;
    case '/': case 'div': case 'divide':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    case 'mod': case '%':
      return modulo(a, b);
    case 'pow': case 'power':
      return power(a, b);
    case 'sqrt': case '√':
      // sqrt is unary: use the first argument and ignore b
      return squareRoot(a);
    default:
      throw new Error('Unsupported operator: ' + op);
  }
}

module.exports = { toNumber, calculate, modulo, power, squareRoot };

// If run directly, act as a small CLI that accepts: node src/calculator.js <op> <a> <b>
if (require.main === module) {
  function printUsageAndExit(code = 1) {
    console.error('Usage: node src/calculator.js <op> <a> <b>');
    console.error('Where <op> is one of: add, sub, mul, div, mod, pow, sqrt');
    process.exit(code);
  }

  const args = process.argv.slice(2);
  // allow unary sqrt (1 arg) or binary ops (3 args)
  if (args.length !== 1 && args.length !== 3) {
    printUsageAndExit(2);
  }

  let op, aStr, bStr;
  if (args.length === 1) {
    // expecting: sqrt <a>
    op = args[0];
    aStr = undefined;
    bStr = undefined;
    console.error('Error: unary usage requires operator first, e.g. "sqrt 16"');
    printUsageAndExit(2);
  } else {
    [op, aStr, bStr] = args;
  }

  const a = aStr !== undefined ? Number(aStr) : undefined;
  const b = bStr !== undefined ? Number(bStr) : undefined;

  if ((a === undefined || !Number.isFinite(a)) || (b === undefined || !Number.isFinite(b)) && String(op).toLowerCase() !== 'sqrt') {
    console.error('Error: both operands must be valid numbers.');
    printUsageAndExit(3);
  }

  try {
    const result = calculate(a, op, b);
    if (Number.isInteger(result)) {
      console.log(result);
    } else {
      console.log(parseFloat(result.toPrecision(12)));
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(4);
  }
}
