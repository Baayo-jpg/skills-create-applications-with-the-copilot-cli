#!/usr/bin/env node

/**
 * Simple Node.js CLI Calculator
 * Supported operations:
 *  - add <a> <b>  : addition (a + b)
 *  - sub <a> <b>  : subtraction (a - b)
 *  - mul <a> <b>  : multiplication (a * b)
 *  - div <a> <b>  : division (a / b)  (errors on division by zero)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3   # 5
 *   node src/calculator.js sub 5 2   # 3
 *   node src/calculator.js mul 4 3   # 12
 *   node src/calculator.js div 10 2  # 5
 */

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

let result;
switch (op) {
  case 'add':
    result = a + b;
    break;
  case 'sub':
    result = a - b;
    break;
  case 'mul':
    result = a * b;
    break;
  case 'div':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(4);
    }
    result = a / b;
    break;
  default:
    console.error(`Error: unknown operation '${op}'.`);
    printUsageAndExit(5);
}

// Print the numeric result to stdout
if (Number.isInteger(result)) {
  console.log(result);
} else {
  // For non-integer results, print up to 12 significant digits to avoid floating noise
  console.log(parseFloat(result.toPrecision(12)));
}

process.exit(0);
