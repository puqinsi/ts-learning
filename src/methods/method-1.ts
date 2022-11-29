/* 模式匹配做提取 */
export default {};
// 疑问：怎么类型都是具体值呢？

// demo1
type p = Promise<'zhao'>;

type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
type GetValueResult = GetValueType<p>;

// demo2-数组
type arr = [1, 2, 3, 4];
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
    ? First
    : never;
type GetFirstResult = GetFirst<arr>;

type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
    ? Last
    : never;
type GetLastResult = GetLast<arr>;

type PopArr<Arr extends unknown[]> = Arr extends []
    ? []
    : Arr extends [...infer Rest, unknown]
    ? Rest
    : unknown;
type PopArrResult = PopArr<arr>;

type ShiftArr<Arr extends unknown[]> = Arr extends []
    ? []
    : Arr extends [unknown, ...infer Rest]
    ? Rest
    : unknown;
type ShiftArrResult = ShiftArr<arr>;

// demo3-字符串
type str = 'puqinsi';
type StartWith<
    Str extends string,
    Prefix extends string,
> = Str extends `${Prefix}${string}` ? true : false;
type StartWithResult = StartWith<str, 'pu'>;

type ReplaceStr<
    Str extends string,
    From extends string,
    To extends string,
> = Str extends `${infer Prefix}${From}${infer Suffix}`
    ? `${Prefix}${To}${Suffix}`
    : Str;
type ReplaceStrResult = ReplaceStr<str, 'qin', 'ce'>;

type TrimStrRight<Str extends string> = Str extends `${infer Rest}${
    | ' '
    | '\n'
    | '\t'}`
    ? TrimStrRight<Rest>
    : Str;
type TrimStrRightResult = TrimStrRight<'puqinsi  '>;

type TrimStrLeft<Str extends string> = Str extends `${
    | ' '
    | '\n'
    | '\t'}${infer Rest}`
    ? TrimStrLeft<Rest>
    : Str;
type TrimStrLeftResult = TrimStrLeft<'   puqinsi '>;

type TrimStr<Str extends string> = TrimStrRight<TrimStrLeft<Str>>;
type TrimStrResult = TrimStr<' puqinsi '>;

// 函数
type GetParams<Fun extends Function> = Fun extends (
    ...args: infer Args
) => unknown
    ? Args
    : never;
type GetParamsResult = GetParams<(name: string, age: number) => string>;

type GetReturnType<Fun extends Function> = Fun extends (
    ...args: any[]
) => infer ReturnTYpe
    ? ReturnTYpe
    : never;
type GetReturnTypeResult = GetReturnType<(name: string, age: number) => string>;

// 构造函数
interface Person {
    name: string;
}
interface PersonConstructor {
    new (name: string): Person;
}

type GetInstanceType<ConstructorType extends new (...args: any) => any> =
    ConstructorType extends new (...args: any) => infer InstanceType
        ? InstanceType
        : any;
type GetInstanceTypeRes = GetInstanceType<PersonConstructor>;

type GetConstructorParams<ConstructorType extends new (...args: any) => any> =
    ConstructorType extends new (...args: infer ParamsType) => any
        ? ParamsType
        : any;
type GetConstructorParamsRes = GetConstructorParams<PersonConstructor>;

// 索引类型
type GetRefProps<Props> = 'ref' extends keyof Props
    ? Props extends { ref?: infer Value; name: 'puqinsi' }
        ? Value
        : never
    : never;
type GetRefPropsRes = GetRefProps<{ ref?: 1; name: 'puqinsi' }>;
type GetRefPropsRes2 = GetRefProps<{ ref?: 1; name: 'ce' }>;
type GetRefPropsRes3 = GetRefProps<{ ref?: undefined; name: 'puqinsi' }>;
