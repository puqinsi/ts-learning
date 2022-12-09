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
