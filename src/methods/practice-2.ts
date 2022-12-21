/* 练习二 */

import { CamelCase } from './method-2';
import { UnionToIntersection } from './method-6';
import { Copy } from './practice-1';

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

// join
// 注意写法
declare function join<Delimiter extends string>(
    delimiter: Delimiter,
): <Items extends string[]>(...args: Items) => JoinType<Items, Delimiter>;

// 提取、递归
type JoinType<
    Items extends any[],
    Delimiter extends string,
    Result extends string = '',
> = Items extends [infer First, ...infer Rest]
    ? JoinType<Rest, Delimiter, `${Result}${Delimiter}${First & string}`>
    : RemoveFirstDelimiter<Result>;

// 提取
type RemoveFirstDelimiter<Str extends string> =
    Str extends `${infer _}${infer Rest}` ? Rest : Str;

const res = join('_')('a', 'b', 'c');

// DeepCamelize
// 提取、变换、递归
type DeepCamelize<Obj extends Record<string, any>> = Obj extends unknown[]
    ? CamelizeArr<Obj>
    : {
          [Key in keyof Obj as Key extends `${infer First}_${infer Rest}`
              ? `${First}${CamelCase<Capitalize<Rest>>}`
              : Key]: DeepCamelize<Obj[Key]>;
      };

// 提取、变换、递归
type CamelizeArr<Arr extends unknown[]> = Arr extends [
    infer First,
    ...infer Rest,
]
    ? [
          First extends Record<string, any> ? DeepCamelize<First> : First,
          ...CamelizeArr<Rest>,
      ]
    : [];

type DeepCamelizeRes = DeepCamelize<{
    aa_aa_aa: { bb_bb_bb: { cc_cc_cc: 1 } };
}>;
type DeepCamelizeRes2 = DeepCamelize<{
    aa_aa_aa: { bb_bb_bb: [{ cc_cc_cc: 1; dd_dd_dd: 2 }] };
}>;

// AllKeyPath
// 映射、变换
// 需要的是 value 部分，所以取 [keyof Obj] 的值。keyof Obj 是 key 的联合类型，那么传入之后得到的就是所有 key 对应的 value 的联合类型。
type AllKeyPath<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Key extends string
        ? Obj[Key] extends Record<string, any>
            ? Key | `${Key}.${AllKeyPath<Obj[Key]>}`
            : Key
        : never;
}[keyof Obj];

type AllKeyPathRes = AllKeyPath<{ a: { b: 1 }; c: 2 }>;

// Defaultize
// 内置高级类型
type Defaultize<A, B> = Pick<A, Exclude<keyof A, keyof B>> &
    Partial<Pick<A, Extract<keyof A, keyof B>>> &
    Partial<Pick<B, Exclude<keyof B, keyof A>>>;
type DefaultizeRes = Defaultize<{ a: 1; b: 2 }, { b: 2; c: 3 }>;
type DefaultizeRes2 = Copy<Defaultize<{ a: 1; b: 2 }, { b: 2; c: 4 }>>;
