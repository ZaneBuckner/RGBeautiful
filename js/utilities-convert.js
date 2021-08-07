
// UTILITY FUNCTIONS FOR CONVERSIONS //


/**
 * Parses RGB string to RGB array
 * @param rgb_string string
 * @returns rgb_array array
 */
export const strToArr_rgb = (rgb_string) => {
    let [r, g, b] = rgb_string.replace(/[a-zA-Z,()]/gm, '').split(' ');
    return [r * 1, g * 1, b * 1];
}


// PREVENTS MOBILE ZOOM WITH RAPID BUTTON CLICKS
// https://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari/46624015#46624015
export const allowRapidClicks = () => {
    let preLastTouchStartAt = 0;
    let lastTouchStartAt = 0;
    const delay = 500;

    document.addEventListener('touchstart', () => {
        preLastTouchStartAt = lastTouchStartAt;
        lastTouchStartAt = +new Date();
    });

    document.addEventListener('touchend', (event) => {
        const touchEndAt = +new Date();
        if (touchEndAt - preLastTouchStartAt < delay) {
            event.preventDefault();
            event.target.click();
        }
    });
};


/**
 * Converts HEX string to RGB array
 * @param hex string
 * @returns RGB array
 */
// export const hexToRgb = (hex) => {
//     const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
//     let result = [];
//     let parsedHex = hex.slice(1, 7).split('').map(value => parseInt(value, 16));
//     let multiHex = parsedHex.map((value, i) => {
//         if (i % 2 === 0) { return value * 16; }
//         return value;
//     });

//     result.push(multiHex[0] + multiHex[1]);
//     result.push(multiHex[2] + multiHex[3]);
//     result.push(multiHex[4] + multiHex[5]);

//     return result;
// }