/* 练习二 */

import { UnionToIntersection } from './method-6';

export default {};
// 函数重载
// 写法一：声明两个同名函数（注：如果有函数实现，可以不用 declare）
declare function func(param: number): number;
declare function func(param: string): string;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any) {
    return a + b;
}

const res1 = add(1, 2);
const res2 = add('a', 'b');

// 写法二：interface
interface Func {
    (param: number): number;
    (param: string): string;
}

// declare const func2: Func;
const func3: Func = function (a: any): any {
    return a;
};
const res3 = func3(1);
const res4 = func3('a');

// 写法三：交叉类型
type Func2 = ((param: number) => number) & ((param: string) => string);

// declare const func4: Func2;
const func5: Func = function (a: any): any {
    return a;
};
const res5 = func5(1);
const res6 = func5('a');

// UnionToTuple
// 1. 利用函数参数逆变性质，将联合转交叉
// 2. 提取出重载函数的返回值类型，也就是联合类型的最后一个类型
// 3. 递归处理
type UnionToTuple<T> = UnionToIntersection<
    T extends any ? () => T : never
> extends () => infer ReturnType
    ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
    : [];
type UnionToTupleRes = UnionToTuple<'a' | 'b' | 'c'>;
