const { calculate } = require('../calculator');

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
    expect(() => calculate(1, 'pow', 2)).toThrow('Unsupported operator');
  });
});
