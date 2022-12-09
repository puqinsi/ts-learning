/* 递归复用做循环 */

// promise
type DeepPromiseValueType<T extends Promise<unknown>> = T extends Promise<
    infer ValueType
>
    ? ValueType extends Promise<unknown>
        ? DeepPromiseValueType<ValueType>
        : ValueType
    : never;
type DeepPromiseValueTypeRes = DeepPromiseValueType<
    Promise<Promise<Promise<Record<string, number>>>>
>;

// 不约束必须为 Promise 类型
type DeepPromiseValueType2<T> = T extends Promise<infer ValueType>
    ? DeepPromiseValueType2<ValueType>
    : T;
type DeepPromiseValueTypeRes2 = DeepPromiseValueType2<
    Promise<Promise<Promise<Record<string, number>>>>
>;

// 数组
type ReverseArr<Arr extends unknown[]> = Arr extends [
    infer First,
    ...infer Rest,
]
    ? [...ReverseArr<Rest>, First]
    : Arr;
type ReverseArrResult = ReverseArr<[1, 2, 3, 4, 5]>;

type IsEqual<A, B> = (A extends B ? true : false) &
    (B extends A ? true : false);
type Includes<Arr extends unknown[], FindItem> = Arr extends [
    infer First,
    ...infer Rest,
]
    ? IsEqual<First, FindItem> extends true
        ? true
        : Includes<Rest, FindItem>
    : false;
type IncludesResult = Includes<[1, 2, 3, 4, 5], 3>;
type IncludesResult2 = Includes<[1, 2, 3, 4, 5], 6>;

type RemoveItem<
    Arr extends unknown[],
    Item,
    Result extends unknown[] = [],
> = Arr extends [infer First, ...infer Rest]
    ? IsEqual<First, Item> extends true
        ? RemoveItem<Rest, Item, Result>
        : RemoveItem<Rest, Item, [...Result, First]>
    : Result;
type RemoveItemResult = RemoveItem<[1, 2, 3, 3, 4, 5], 3, []>;

type BuildArray<
    Length extends number,
    Ele = unknown,
    Arr extends unknown[] = [],
> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type BuildArrayResult = BuildArray<5, 3, [1, 2]>;
type BuildArrayResult2 = BuildArray<5>;

// 字符串
type ReplaceAll<
    Str extends string,
    From extends string,
    To extends string,
> = Str extends `${infer Left}${From}${infer Right}`
    ? `${Left}${To}${ReplaceAll<Right, From, To>}`
    : Str;
type ReplaceAllRes = ReplaceAll<'abcdbeb', 'b', 'c'>;

type StringToUnion<Str extends string> =
    Str extends `${infer Left}${infer Right}`
        ? Left | StringToUnion<Right>
        : never;
type StringToUnionRes = StringToUnion<'puqinsi'>;

type ReverseStr<Str extends string> = Str extends `${infer Left}${infer Right}`
    ? `${ReverseStr<Right>}${Left}`
    : Str;
type ReverseStr1<
    Str extends string,
    Result extends string = '',
> = Str extends `${infer Left}${infer Right}`
    ? ReverseStr1<Right, `${Left}${Result}`>
    : Result;
type ReverseStrResult = ReverseStr<'puqinsi'>;
type ReverseStrResult1 = ReverseStr1<'puqinsi'>;

// 对象
type DeepReadonly<Obj extends Record<string, any>> = {
    readonly [Key in keyof Obj]: Obj[Key] extends object
        ? Obj[Key] extends Function
            ? Obj[Key]
            : DeepReadonly<Obj[Key]>
        : Obj[Key];
};
type DeepReadonly1<Obj extends Record<string, any>> = Obj extends any
    ? {
          readonly [Key in keyof Obj]: Obj[Key] extends object
              ? Obj[Key] extends Function
                  ? Obj[Key]
                  : DeepReadonly1<Obj[Key]>
              : Obj[Key];
      }
    : never;
type Obj = {
    a: {
        b: {
            c: 1;
            d: () => 'd';
        };
    };
};
type DeepReadonlyResult = DeepReadonly<Obj>;
type DeepReadonlyResult2 = DeepReadonlyResult['a'];
type DeepReadonlyResult3 = DeepReadonlyResult2['b'];
type DeepReadonlyResult1 = DeepReadonly1<Obj>;

export type { BuildArray };
