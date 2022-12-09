/* 重新构造做变换 */
export default {};

// 数组类型
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type PushResult = Push<[1, 2, 3], 4>;

type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];
type UnshiftResult = Unshift<[1, 2, 3], 0>;

type tuple1 = [1, 2];
type tuple2 = ['a', 'b'];
type Zip<
    One extends [unknown, unknown],
    Two extends [unknown, unknown],
> = One extends [infer OneFirst, infer OneSecond]
    ? Two extends [infer TwoFirst, infer TwoSecond]
        ? [[OneFirst, TwoFirst], [OneSecond, TwoSecond]]
        : []
    : [];
type ZipResult = Zip<tuple1, tuple2>;

type Zip2<One extends unknown[], Other extends unknown[]> = One extends [
    infer OneFirst,
    ...infer OneRest,
]
    ? Other extends [infer OtherFirst, ...infer OtherRest]
        ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>]
        : []
    : [];
type Zip2Result = Zip2<[1, 2, 3, 4], ['a', 'b', 'c', 'd']>;

// 字符串类型
type CapitalizeStr<Str extends string> =
    Str extends `${infer First}${infer Rest}`
        ? `${Uppercase<First>}${Rest}`
        : Str;
type CapitalizeStrResult = CapitalizeStr<'puqinsi'>;

type CamelCase<Str extends string> =
    Str extends `${infer One}_${infer Two}${infer Rest}`
        ? `${One}${Uppercase<Two>}${CamelCase<Rest>}`
        : Str;
type CamelCaseResult = CamelCase<'pu_qin_si'>;

type DropSubStr<
    Str extends string,
    SubStr extends string,
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
    ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
    : Str;
type DropSubStrResult = DropSubStr<'puqinsi-----', '-'>;

// 函数类型
type AppendArgument<Func extends Function, Arg extends unknown> = Func extends (
    ...args: infer Args
) => infer ReturnType
    ? (...args: [...Args, Arg]) => ReturnType
    : never;
type AppendArgumentResult = AppendArgument<(arg: string) => string, number>;

// 索引类型
type Mapping<Obj extends object> = {
    [Key in keyof Obj]: [Obj[Key], Obj[Key]];
};

type MappingResult = Mapping<{ a: 1; b: 2 }>;

// type UppercaseKey<Obj extends object> = {
//     [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
// };
type UppercaseKey<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};
type UppercaseKeyResult = UppercaseKey<{ a: 1; b: 2 }>;

type ToReadonly<T> = {
    readonly [Key in keyof T]: T[Key];
};
type ToReadonlyRes = ToReadonly<{ a: 1; b: 2 }>;

type ToPartial<T> = {
    [Key in keyof T]?: T[Key];
};
type ToPartialRes = ToPartial<{ a: 1; b: 2 }>;

type ToMutable<T> = {
    -readonly [Key in keyof T]: T[Key];
};
type ToMutableRes = ToMutable<{ readonly a: 1; b: 2 }>;

type ToRequired<T> = {
    [Key in keyof T]-?: T[Key];
};
type ToRequiredRes = ToRequired<{ readonly a: 1; b?: 2 }>;

type FilterByValueType<
    Obj extends Record<string, any>,
    ValueType extends any,
> = {
    [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};
interface Person {
    name: string;
    age: number;
}
type FilterByValueTypeRes = FilterByValueType<Person, number>;

export type { CamelCase };
