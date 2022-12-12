/* 特殊类型特性 */
import { IsEqual } from './method-3';
import { IsUnion } from './method-5';
export default {};

// IsAny
type IsAny<T> = number extends string & T ? true : false;
type IsAnyResult = IsAny<any>;
type IsAnyResult1 = IsAny<string>;

// IsEqual
type IsEqualResult = IsEqual<'a', 'a'>;
type IsEqualResult2 = IsEqual<'a', 1>;
type IsEqualResult3 = IsEqual<'a', any>;

// TODO
type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <
    T,
>() => T extends B ? 1 : 2
    ? true
    : false;
type IsEqualResult4 = IsEqual2<'a', 'a'>;
type IsEqualResult5 = IsEqual2<'a', 1>;
type IsEqualResult6 = IsEqual2<'a', any>;
type IsEqualResult7 = IsEqual2<never, never>;

// IsUnion
type IsUnionResult = IsUnion<'a' | 'b'>;
type IsUnionResult2 = IsUnion<'a'>;

// IsNever
type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverResult = IsNever<never>;
type IsNeverResult2 = IsNever<string>;
type IsNeverResult3 = never & number;

// IsTuple
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
    T,
>() => T extends B ? 1 : 2
    ? false
    : true;

type IsTuple<T> = T extends [...params: infer Eles]
    ? NotEqual<Eles['length'], number>
    : false;
type IsTupleResult = IsTuple<[1, 2, 3]>;
type IsTupleResult2 = IsTuple<number[]>;

// UnionToIntersection
type UnionToIntersection<U> = (
    U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
    ? R
    : never;
type UnionToIntersectionRes = UnionToIntersection<{ a: 1 } | { b: 2 }>;

// GetOptional
type GetOptional<Obj extends Record<string, any>> = {
    [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};
type GetOptionalRes = GetOptional<{ a: 1; b?: 2; c?: 3 }>;

// GetRequired
type GetRequired<Obj extends Record<string, any>> = {
    [Key in keyof Obj as {} extends Pick<Obj, Key> ? never : Key]: Obj[Key];
};
type GetRequiredRes = GetRequired<{ a: 1; b?: 2; c?: 3 }>;

// RemoveIndexSignature
type RemoveIndexSignature<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};
type RemoveIndexSignatureRes = RemoveIndexSignature<{
    a: 1;
    [key: string]: number;
}>;

// ClassPublicProps
type ClassPublicProps<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Obj[Key];
};
class Person {
    public name: string;
    protected age: number;

    constructor() {
        this.name = 'puqinsi';
        this.age = 18;
    }
}
type ClassPublicPropsRes = ClassPublicProps<Person>;

// as const
const obj = { a: 1, b: 2 };
const arr = [1, 2, 3];
type objType = typeof obj;
type arrType = typeof arr;

const obj2 = { a: 1, b: 2 } as const;
const arr2 = [1, 2, 3] as const;
type objType2 = typeof obj2;
type arrType2 = typeof arr2;
