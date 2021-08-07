
// GENERATES RGB, HEX, & HSL RAW VALUES //


/**
 * Generates a random RGB array
 * @returns [RRR, GGG, BBB]
 */
export const generateRGB = () => {
    let rgb_array = [];
    while (rgb_array.length < 3) {
        let randomValue = Math.floor(Math.random() * 256);
        rgb_array.push(randomValue);
    }
    return rgb_array;
};


/**
 * Converts RGB array to HEX array
 * @param rgb_array
 * @returns HEX array [R, R, G, G, B, B]
 */
export const generateHEX = (rgb_array) => {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let hex_array = [];
    
    // Performs operation on rgb[]; the result of which is used as index values for digits[]
    let hexDigitCalc = rgb_array.map(value => digits[Math.floor(value / 16)]);
    let hexDigitCalc_remainder = rgb_array.map(value => digits[((value / 16 % 1) * 16)]);

    // "Concat" both arrays for the final hex[]
    for (let i = 0; i < 3; i++) {
        hex_array.push(hexDigitCalc[i]);
        hex_array.push(hexDigitCalc_remainder[i]);
    }
    return hex_array;
};


/**
 * Converts RGB array to HSL array
 * https://donatbalipapp.medium.com/colours-maths-90346fb5abda
 * @param rgb_array
 * @returns HSL array [HHH, SSS, LLL]
 */
export const generateHSL = (rgb_array) => {
    let [r, g, b] = rgb_array;
    if (r === 0 && g === 0 && b === 0) {
        return [0, 0, 0];
    };

    [r, g, b] = rgb_array.map(value => (value / 255));
    let minRGB = Math.min.apply(null, [r, g, b]);
    let maxRGB = Math.max.apply(null, [r, g, b]);

    // Lightness
    let l = (0.5) * (minRGB + maxRGB);

    // Saturation
    let s;
    switch (true) {
        case l < 1:
            s = (maxRGB - minRGB) / (1 - Math.abs(2 * l - 1));
            break;
        case l === 1:
            s = 0;
            break;
    };

    // Hue
    let h;
    switch (true) {
        case r >= g && g >= b:
            h = 60 * ((g - b) / (r - b));
            break;
        case r >= b && b > g:
            h = 60 * (6 - (b - g) / (r - g));
            break;
        case g > r && r >= b:
            h = 60 * (2 - (r - b) / (g - b));
            break;
        case g >= b && b > r:
            h = 60 * (2 + (b - r) / (g - r));
            break;
        case b > g && g > r:
            h = 60 * (4 - (g - r) / (b - r));
            break;
        case b > r && r >= g:
            h = 60 * (4 + (r - g) / (b - g));
            break;
    };

    let hsl_array = Array.from([h, s, l]);
    return hsl_array;
};