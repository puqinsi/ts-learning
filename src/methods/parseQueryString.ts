/* ParseQueryString */
// a=1&b=2&c=3 => {a:1,b:2,c:3}
type ParseQueryString<Str extends string> =
    Str extends `${infer Param}&${infer Rest}`
        ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
        : ParseParam<Str>;

// 注意：Key 在两个对象中写法
type MergeParams<
    OneParams extends Record<string, any>,
    OtherParams extends Record<string, any>,
> = {
    [Key in keyof OneParams | keyof OtherParams]: Key extends keyof OneParams
        ? Key extends keyof OtherParams
            ? MergeValues<OneParams[Key], OtherParams[Key]>
            : OneParams[Key]
        : Key extends keyof OtherParams
        ? OtherParams[Key]
        : never;
};

type MergeValues<One, Other> = One extends Other
    ? One
    : Other extends unknown[]
    ? [One, ...Other]
    : [One, Other];

// 注意：Key 的写法
type ParseParam<Param extends string> =
    Param extends `${infer Key}=${infer Value}`
        ? { [K in Key]: Value }
        : Record<string, any>;

type ParseQueryStringRes = ParseQueryString<'a=1&b=2&c=3'>;
type ParseQueryStringRes2 = ParseQueryString<'a=1&b=2&c=3&a=2'>;

// 实际应用
function parseQueryString<Str extends string>(
    queryStr: Str,
): ParseQueryString<Str>;
function parseQueryString(queryStr: string) {
    if (!queryStr || !queryStr.length) {
        return {};
    }
    const queryObj: Record<string, any> = {};
    const items = queryStr.split('&');
    items.forEach(item => {
        const [key, value] = item.split('=');
        if (queryObj[key]) {
            if (Array.isArray(queryObj[key])) {
                queryObj[key].push(value);
            } else {
                queryObj[key] = [queryObj[key], value];
            }
        } else {
            queryObj[key] = value;
        }
    });
    return queryObj;
}

const res = parseQueryString('a=1&b=2&c=3');

export default ParseQueryString;
