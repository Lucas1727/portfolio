import moment from "moment";

/** Get date string from timestamp
 * @param date - The date to convert
 * @param format - The format to use */
export const getDateString = function (date: number, format: string = 'DD-MM-YYYY HH:mm:ss') {
    return moment(date).format(format)
}

/** Fetch url function that returns a promise
 * @param requestType - The request type ( POST / GET / PUT / DELETE )
 * @param url - The url to fetch
 * @param headers (Optional) - The headers to send ( [{"Accept": "application/json"}] )
 * @param payload (Optional) - The payload to send ( {"token": "abc123"} ) */
export const urlFetch = function (requestType: 'GET' | 'POST' | 'DELETE' | 'PUT', url: string, headers?: Record<string, string | null>[], payload?: any) {
    return new Promise<any>(async (resolve, reject) => {
        const {data, error} = await useFetch(url, {
            method: requestType,
            body: payload,
            headers: createHeaders(headers)
        });

        if (error.value === null) resolve(toRaw(data.value)); else reject(error)
    })
}

/** Returns the headers object
 * @param headers (Optional) - The headers to send ( [{"Accept": "application/json"}] ) */
export const createHeaders = function (headers?: Record<string, string | null>[]) {

    if (headers) {
        let object = {}

        headers.map((header) => {
            object = {...object, ...header}
        })

        return object = {...object}
    }
}

/** Shuffle an array
 * @param array - The array to shuffle */
export const shuffleArray = function (array: []) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}
