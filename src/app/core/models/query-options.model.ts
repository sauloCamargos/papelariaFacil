export interface QueryBuilder {
    toQueryMap: () => Map<string, string>;
    toQueryString: () => string;
}

export class QueryOptions {
    public static toQueryMap(objectFilter?: object) {
        const queryMap = new Map<string, string>();

        if (objectFilter) {
            for (const key in objectFilter) {
                if (objectFilter.hasOwnProperty(key)) {
                    const element = objectFilter[key];
                    if (typeof element === "boolean") {
                        queryMap.set(key, `${element}`);
                    } else {
                        if (!!element) {
                            queryMap.set(key, `${element}`);
                        }
                        if (element == null) {
                            queryMap.set(key, `null`);
                        }
                    }
                }
            }
        }

        return queryMap;
    }

    public static toQueryString(objectFilter?: any) {
        let queryString = '';

        QueryOptions.toQueryMap(objectFilter).forEach((value: string, key: string) => {
            queryString = queryString.concat(`${key}=${value}&`);
        });
        return queryString.substring(0, queryString.length - 1);
    }

    constructor() { }
}
