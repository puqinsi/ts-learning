/* 联合分散可简化 */
import { CamelCase } from './method-2';

// 分布式条件类型
type CamelCaseArr<Arr extends unknown[]> = Arr extends [
    infer Item,
    ...infer RestArr,
]
    ? [CamelCase<Item & string>, ...CamelCaseArr<RestArr>]
    : [];
type CamelCaseArrRes = CamelCaseArr<['aa_aa', 'bb_bb', 'cc_cc']>;

// 同 CamelCase
type CamelCaseUnion<Item extends string> =
    Item extends `${infer Left}_${infer Right}${infer Rest}`
        ? `${Left}${Uppercase<Right>}${CamelCaseUnion<Rest>}`
        : Item;
type CamelCaseUnionRes = CamelCaseUnion<'aa_aa' | 'bb_bb' | 'cc_cc'>;

// A extends A 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入。
// [B] extends [A] 这样不直接写 B 就可以避免触发分布式条件类型，那么 B 就是整个联合类型。
// B 是联合类型整体，而 A 是单个类型，自然不成立，而其它类型没有这种特殊处理，A 和 B 都是同一个，怎么判断都成立。
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type IsUnionResult = IsUnion<'a' | 'b' | 'c'>;
type IsUnionResult2 = IsUnion<['a' | 'b' | 'c']>;

// 数组转联合类型
type Union<Arr extends unknown[]> = Arr[number];
type UnionResult = Union<['aaa', 'bbb']>;

type BEM<
    Block extends string,
    Element extends string[],
    Modifiers extends string[],
> = `${Block}__${Element[number]}--${Modifiers[number]}`;
type bemResult = BEM<'puqinsi', ['aaa', 'bbb'], ['ccc', 'ddd']>;

type Combination<A extends string, B extends string = A> =
    | A
    | B
    | `${A}${B}`
    | `${B}${A}`;
// 联合+递归
type AllCombination<A extends string, B extends string = A> = A extends A
    ? Combination<A, AllCombination<Exclude<B, A>>>
    : never;
type AllCombinationResult = AllCombination<'a' | 'b' | 'c'>;

export type { IsUnion };
