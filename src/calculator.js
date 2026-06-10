#!/usr/bin/env node

/**
 * Calculator module
 * Supported operations:
 *  - addition: add, +, plus
 *  - subtraction: sub, -, minus
 *  - multiplication: mul, *, times
 *  - division: div, /, divide (throws on division by zero)
 */

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
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
    default:
      throw new Error('Unsupported operator: ' + op);
  }
}

module.exports = { toNumber, calculate };

// If run directly, act as a small CLI that accepts: node src/calculator.js <op> <a> <b>
if (require.main === module) {
  function printUsageAndExit(code = 1) {
    console.error('Usage: node src/calculator.js <op> <a> <b>');
    console.error('Where <op> is one of: add, sub, mul, div');
    process.exit(code);
  }

  const args = process.argv.slice(2);
  if (args.length !== 3) {
    printUsageAndExit(2);
  }

  const [op, aStr, bStr] = args;
  const a = Number(aStr);
  const b = Number(bStr);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
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
