
// HSL MANIPULATION TO RETURN COLOR SCHEME SET //


/**
 * Retrieves analogous color scheme
 * where each hue value is +- 30 & 60 from the base hue
 * @param rgbToHsl HSL array
 * @returns set of HSL arrays with altered hue values
 */
export const getAnalogous = (rgbToHsl) => {
    let [h, s, l] = rgbToHsl;
    let alteredHue = [h - 60, h - 30, h + 30, h + 60];
    let set = alteredHue.map(alteredHue => [alteredHue, s, l]);
    return set;
};


/**
 * Retrieves monochromatic or complementary color scheme
 * where each hue value is constant with alterations to tone, shade, and tint.
 * @param rgbToHsl HSL array
 * @param value to set new constent hue
 * @returns set of HSL arrays
 */
export const getMonoOrComp = (rgbToHsl, value) => {
    let [h, s, l] = rgbToHsl;
    let alteredS, alteredL;
    let set = [];
    h += value;

    let s_max = 1 - s;
    switch (true) {
        case s > 0.80:
            alteredS = [
                s + (s_max * (0.10)),
                s + (s_max * (0.05)),
                s - (s * (0.20)),
                s - (s * (0.40))
            ];
            break;
        case s < 0.20:
            alteredS = [
                s + (s * (0.40)),
                s + (s * (0.20)),
                s - (s_max * (0.05)),
                s - (s_max * (0.10))
            ];
            break;
        default:
            alteredS = [
                s + (s * (0.20)),
                s + (s * (0.10)),
                s - (s * (0.10)),
                s - (s * (0.20))
            ];
    };
    
    let l_max = 1 - l;
    switch (true) {
        case l > 0.80:
            alteredL = [
                l + (l_max * (0.10)),
                l + (l_max * (0.05)),
                l - (l * (0.20)),
                l - (l * (0.40))
            ];
            break;
        case l < 0.20:
            alteredL = [
                l + (l * (0.40)),
                l + (l * (0.20)),
                l - (l_max * (0.05)),
                l - (l_max * (0.10))
            ];
            break;
        default:
            alteredL = [
                l + (l * (0.20)),
                l + (l * (0.10)),
                l - (l * (0.10)),
                l - (l * (0.20))
            ];
    };

    for (let i = 0; i < 5; i++) {
        set.push([h, alteredS[i], alteredL[i]])
    }
    return set;
};


/**
 * Retrieves split-complementary color scheme
 * @param rgbToHsl HSL array
 * @returns set of HSL arrays with altered hue values
 */
export const getSplitComp = (rgbToHsl) => {
    let [h, s, l] = rgbToHsl;
    h += 180;
    let alteredHue = [h - 40, h - 20, h + 20, h + 40];

    let set = alteredHue.map(alteredHue => [alteredHue, s, l]);
    return set;
}


/**
 * Retrieves color schemes that consist of only three unique color palettes.
 * @param rgbToHsl HSL array
 * @param value to increment hue by (constant value)
 * @returns set of HSL arrays with altered hue values
 */
 export const alterHue = (rgbToHsl, value) => {
    let [h, s, l] = rgbToHsl;
    let set = [];

    while (set.length < 3) {
        h += value;
        set.push([h, s, l]);
    }
    return set;
}


/**
 * Retrieves rectangle color scheme
 * where each hue value is 60, 180, and 240 degrees from the base hue
 * @param rgbToHsl HSL array
 * @returns set of HSL arrays with altered hue values
 */
export const getRectangle = (rgbToHsl) => {
    let [h, s, l] = rgbToHsl;
    let alteredHue = [h + 60, h + 180, h + 240];

    let set = alteredHue.map(alteredHue => [alteredHue, s, l]);
    return set;
};