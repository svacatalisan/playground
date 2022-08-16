import { reduce, isArray, isObject } from 'lodash';

export function convertCase(
    data: any,
    converter: (key: string) => string
): any {
    if (isArray(data)) {
        return data.map(elem => convertCase(elem, converter));
    }

    if (isObject(data)) {
        return reduce(
            data,
            (converted, value, key) => {
                converted[converter(key)] = convertCase(value, converter);
                return converted;
            },
            {} as Record<string, any>
        );
    }

    return data;
}
