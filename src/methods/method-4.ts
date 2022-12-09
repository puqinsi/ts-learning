import { BuildArray } from './method-3';

/* 数组长度做计数 */
export default {};

// add
type Add<num1 extends number, num2 extends number> = [
    ...BuildArray<num1>,
    ...BuildArray<num2>,
]['length'];
type AddResult = Add<10, 12>;

// subtract
type Subtract<num1 extends number, num2 extends number> = BuildArray<
    num1,
    unknown,
    []
> extends [...BuildArray<num2>, ...infer Rest]
    ? Rest['length']
    : never;
type SubtractResult = Subtract<20, 9>;

// multiply
type Multiply<
    num1 extends number,
    num2 extends number,
    ResultArr extends unknown[] = [],
> = num2 extends 0
    ? ResultArr['length']
    : Multiply<num1, Subtract<num2, 1>, [...BuildArray<num1>, ...ResultArr]>;
type MultiplyResult = Multiply<3, 6>;

type Divide<
    num1 extends number,
    num2 extends number,
    CountArr extends unknown[] = [],
> = num1 extends 0
    ? CountArr['length']
    : Divide<Subtract<num1, num2>, num2, [unknown, ...CountArr]>;
type DivideResult = Divide<30, 5>;

// Strlen
type Strlen<
    Str extends string,
    CountArr extends unknown[] = [],
> = Str extends `${string}${infer Rest}`
    ? Strlen<Rest, [...CountArr, unknown]>
    : CountArr['length'];
type StrlenResult = Strlen<'abcde'>;

// GreaterThan
type GreaterThan<
    Num1,
    Num2,
    CountArr extends unknown[] = [],
> = Num1 extends Num2
    ? false
    : CountArr['length'] extends Num1
    ? false
    : CountArr['length'] extends Num2
    ? true
    : GreaterThan<Num1, Num2, [...CountArr, unknown]>;

type GreaterThanRes = GreaterThan<2, 4>;
type GreaterThanRes2 = GreaterThan<2, 2>;
type GreaterThanRes3 = GreaterThan<6, 4>;

// FibonacciLoop
type FibonacciLoop<
    PrevArr extends unknown[],
    CurrentArr extends unknown[],
    IndexArr extends unknown[],
    Num extends number = 1,
> = IndexArr['length'] extends Num
    ? CurrentArr['length']
    : FibonacciLoop<
          CurrentArr,
          [...PrevArr, ...CurrentArr],
          [...IndexArr, unknown],
          Num
      >;

type FibonacciLoopRes = FibonacciLoop<[1], [], [], 4>; // 1, 1, 2, 3
