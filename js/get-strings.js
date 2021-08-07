
// CONVERTS RGB, HEX, & HSL RAW VALUES TO STRINGS //


/**
 * Converts RGB array to RGB string
 * @param rgb_array RGB array
 * @returns RGB string 'rgb(RRR, GGG, BBB)'
 */
 export const getRGB = (rgb_array) => {
    return `rgb(${rgb_array[0]}, ${rgb_array[1]}, ${rgb_array[2]})`;
}


/**
 * Converts HEX array to HEX string
 * @param hex_array HEX array
 * @returns "#RRGGBB"
 */
export const getHEX = (hex_array) => {
    hex_array.unshift('#');
    return hex_array.join('');
}


/**
 * Converts an HSL array to HSL string
 * @param hsl_array HSL array
 * @returns "hsl(HHH, SSS%, LLL%)"
 */
export const getHSL = (hsl_array) => {
    let [h, s, l] = hsl_array;
    h = parseFloat(h).toFixed(0);
    s = parseFloat(s * 100).toFixed(0);
    l = parseFloat(l * 100).toFixed(0);
    return `hsl(${h}, ${s}%, ${l}%)`
}


/**
 * Fetches the estimated name for a given HEX string
 * https://chir.ag/projects/ntc/ntc.js
 * @param hex string
 * @returns name string
 */
 export const getName = (hex) => {
    let n_match = ntc.name(hex);
    let n_rgb = n_match[0];
    let n_name = n_match[1];
    let n_exactmatch = n_match[2];
    return n_name;
};