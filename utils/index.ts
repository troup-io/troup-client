export function popSingular<T>(data: T): T {
    if (data) {
        const dataValues = Object.values(data);

        if (dataValues.length === 1) {
            return dataValues.pop() as T;
        }

        return data;
    }

    return data;
}
