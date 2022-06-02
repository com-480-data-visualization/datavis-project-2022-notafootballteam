/**
 * 
 * @returns The range of integers from 2005 to 2021 corresponding to years of the data
 */
export function getYearRange() {
    return Array.from(Array(17).keys()).map(e => e + 2005);
}

/**
     * Credits to the online community
     * @param {*} countryCode 
     * @returns Emoji of the country
     */
 export function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}