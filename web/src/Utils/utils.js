

/**
 * 
 * @returns The range of integers from 2005 to 2021 corresponding to years of the data
 */
export function getYearRange() {
    return Array.from(Array(17).keys()).map(e => e + 2005);
}