/* 内置类型 */
export default {};

// Record 创建
type RecordResult = Record<'a' | 'b', any>;
type RecordResult2 = Record<string, any>;

// Exclude
type ExcludeResult = Exclude<'a' | 'b' | 'c', 'a'>;

// Extract
type ExtractResult = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c'>;

// Pick 过滤
type PickResult = Pick<{ a: 1; b: 2; c: 3; d: 4 }, 'a' | 'c'>;

// Omit
type OmitResult = Omit<{ a: 1; b: 2; c: 3; d: 4 }, 'a' | 'c'>;

// Awaited
type AwaitedResult = Awaited<Promise<Promise<Promise<string>>>>;

// NonNullable
type NonNullableRes = NonNullable<null>;
type NonNullableRes1 = NonNullable<string>;

// Uppercase
type UppercaseRes = Uppercase<'aaa'>;

// Lowercase
type LowercaseRes = Lowercase<'AAA'>;

// Capitalize
type CapitalizeRes = Capitalize<'aaa'>;

// Uncapitalize
type UncapitalizeRes = Uncapitalize<'Aaa'>;
