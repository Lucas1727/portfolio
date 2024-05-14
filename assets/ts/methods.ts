import moment from "moment";

/** Get date string from timestamp
 * @param date - The date to convert
 * @param format - The format to use */
export const getDateString = function (date: number, format: string = 'DD-MM-YYYY HH:mm:ss') {
  return moment(date).format(format)
}
