const { calculate, modulo, power, squareRoot } = require('../calculator');

describe('Calculator - basic operations', () => {
  test('2 + 3 = 5 (infix symbol)', () => {
    expect(calculate(2, '+', 3)).toBe(5);
  });

  test('add 2 3 = 5 (operator name)', () => {
    expect(calculate(2, 'add', 3)).toBe(5);
  });

  test('10 - 4 = 6', () => {
    expect(calculate(10, '-', 4)).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(calculate(45, '*', 2)).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(calculate(20, '/', 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => calculate(5, '/', 0)).toThrow('Division by zero');
  });

  test('unknown operator throws', () => {
    expect(() => calculate(1, 'unknown', 2)).toThrow('Unsupported operator');
  });
});

describe('Calculator - extended operations', () => {
  test('modulo: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
    expect(calculate(5, 'mod', 2)).toBe(1);
    expect(calculate(5, '%', 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow('Modulo by zero');
    expect(() => calculate(5, 'mod', 0)).toThrow('Modulo by zero');
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
    expect(calculate(2, 'pow', 3)).toBe(8);
    expect(calculate(2, 'power', 3)).toBe(8);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
    expect(calculate(16, 'sqrt', null)).toBe(4);
    expect(calculate(16, '√', null)).toBe(4);
  });

  test('squareRoot of negative throws', () => {
    expect(() => squareRoot(-4)).toThrow('Square root of negative number');
    expect(() => calculate(-4, 'sqrt', null)).toThrow('Square root of negative number');
  });
});
