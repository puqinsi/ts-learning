/* 练习 */
// 注意在练习中每个方法的使用场景
export default {};

// curring
type CurriedFunc<Params, Return> = Params extends [infer Arg, ...infer Rest]
    ? (arg: Arg) => CurriedFunc<Rest, Return>
    : Return;

declare function curring<Func>(
    fn: Func,
): Func extends (...args: infer Param) => infer Return
    ? CurriedFunc<Param, Return>
    : never;

const CurriedFunc = curring((a: string, b: number) => {});

// KebabCaseToCamelCase 提取、循环
type KebabCaseToCamelCase<Str extends string> =
    Str extends `${infer First}-${infer Rest}`
        ? `${First}${KebabCaseToCamelCase<Capitalize<Rest>>}`
        : Str;
type KebabCaseToCamelCaseRes = KebabCaseToCamelCase<'pu-qin-si'>;

// CamelCaseToKebabCase 提取、变换、循环
// 重点：一个字母一个字母的提取出来，遇到不是小写的就做变换，循环处理
type CamelCaseToKebabCase<Str extends string> =
    Str extends `${infer First}${infer Rest}`
        ? First extends Lowercase<First>
            ? `${First}${CamelCaseToKebabCase<Rest>}`
            : `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
        : Str;
type CamelCaseToKebabCaseRes = CamelCaseToKebabCase<'puQinSi'>;

// Chunk
type Chunk<
    Arr extends unknown[],
    ItemLen extends number,
    CurItem extends unknown[] = [],
    Res extends unknown[] = [],
> = Arr extends [infer First, ...infer Rest]
    ? CurItem['length'] extends ItemLen
        ? Chunk<Rest, ItemLen, [First], [...Res, CurItem]>
        : Chunk<Rest, ItemLen, [...CurItem, First], Res>
    : [...Res, CurItem];

type ChunkResult = Chunk<[1, 2, 3, 4, 5, 6, 7], 3>;

// TupleToNestedObject
// 注意对象键的设置
type TupleToNestedObject<
    Tuple extends unknown[],
    Value extends any,
> = Tuple extends [infer First, ...infer Rest]
    ? {
          [Key in First as Key extends keyof any
              ? Key
              : never]: Rest extends unknown[]
              ? TupleToNestedObject<Rest, Value>
              : Value;
      }
    : Value;
type TupleToNestedObjectRes = TupleToNestedObject<['a', 'b', 'c', 'd'], 'e'>;
type TupleToNestedObjectRes2 = TupleToNestedObject<
    [string, 'b', number, 'd'],
    'e'
>;

// PartialObjectPropByKeys
export type Copy<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Obj[Key];
};

type PartialObjectPropByKeys<
    Obj extends Record<string, any>,
    Key extends keyof Obj = keyof Obj,
> = Copy<Partial<Pick<Obj, Key>> & Omit<Obj, Key>>;

type PartialObjectPropByKeysRes = PartialObjectPropByKeys<
    { a: 1; b: 2; c: 3 },
    'a' | 'b'
>;
type PartialObjectPropByKeysRes2 = PartialObjectPropByKeys<{
    a: 1;
    b: 2;
    c: 3;
}>;
