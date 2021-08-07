import { generateRGB, generateHEX, generateHSL } from './generate-values.js';
import { getRGB, getHEX, getHSL, getName } from './get-strings.js';
import { getAnalogous, getMonoOrComp, getSplitComp, alterHue, getRectangle } from './generate-schemes.js';
import { strToArr_rgb, allowRapidClicks } from './utilities-convert.js';


// window.addEventListener('load', () => window.scrollTo(0, 870));


// ASSIGNS COMMON INITIAL VALUES FOR DOCUMENT OBJECT
const nameValue = document.getElementById('name-value');
const hexValue = document.getElementById('hex-value');
const rgbValue = document.getElementById('rgb-value');
const hslValue = document.getElementById('hsl-value');
const baseColorDisplays = document.querySelectorAll('.base-color--primary, .base-color--secondary');
const colorHistory = document.getElementById('color-history');
const colors = colorHistory.childNodes;


// INITIALIZES RGB ARRAY
let rgb_array = generateRGB();


// ASSIGNS VALUES
setValues(rgb_array);
setColorSchemes(rgb_array);
setColorHistory(rgb_array);
allowRapidClicks();


function setValues(rgb_array) {
    let rgb = getRGB(rgb_array);
    let hex = getHEX(generateHEX(rgb_array));
    let hsl = getHSL(generateHSL(rgb_array));

    nameValue.textContent = getName(hex);
    hexValue.textContent = hex;
    rgbValue.textContent = rgb;
    hslValue.textContent = hsl;
    baseColorDisplays.forEach((baseColor) => baseColor.style.background = hex);
}


function setColorSchemes(rgb_array) {
    setAnalogous(rgb_array);
    setMonochromatic(rgb_array);
    setComplementary(rgb_array);
    setSplitComp(rgb_array);
    setTriadic(rgb_array);
    setSquare(rgb_array);
    setRectangle(rgb_array);
};


function setColorHistory(rgb_array) {
    let newColor = document.createElement('span');
    let newColorCount = colorHistory.childNodes.length;

    newColor.classList.add('fas', 'fa-bookmark', 'color-item');
    newColor.style.color = getRGB(rgb_array);
    colorHistory.prepend(newColor);

    // Small windows - limit nodes to 5
    if (window.innerWidth < 600 && newColorCount === 5) {
        colorHistory.removeChild(colorHistory.lastChild);
    };

    // Large windows - limit nodes to 10
    if (window.innerWidth > 600 && newColorCount === 10) {
        colorHistory.removeChild(colorHistory.lastChild);
    };
};


// PLUGIN | NEW INSTANCE OF VANILLA JS COLOR PICKER
// https://github.com/luncheon/reinvented-color-wheel
const colorPicker = new ReinventedColorWheel({
    appendTo: document.querySelector('.color-picker'),
    rgb: rgb_array,
    wheelDiameter: 200,
    wheelThickness: 17,
    handleDiameter: 30,
    wheelReflectsSaturation: false,

    onChange: function (color) {
        rgb_array = color._rgb;
        
        setValues(rgb_array);
        setColorSchemes(rgb_array);
    },
});


// EVENT HANDLER | EYE-DROPPER ICON | OPEN POPUP DRAWER
const colorPickerBtn = document.querySelector('.fa-eye-dropper');
const infoPopup = document.querySelector('.info-popup');
colorPickerBtn.addEventListener('click', function (e) {
    infoPopup.style.display === 'block' ? infoPopup.style.display = 'none'
        : infoPopup.style.display = 'block';
});


// EVENT HANDLER | SHUFFLE ICON | RANDOM COLOR BUTTON
const randomColorBtn = document.querySelectorAll('.fa-random');
randomColorBtn.forEach((e, i) => randomColorBtn[i].addEventListener('click', function (e) {
    rgb_array = generateRGB();
    colorPicker.rgb = rgb_array;

    setValues(rgb_array);
    setColorSchemes(rgb_array);
    setColorHistory(rgb_array)
}));


// EVENT HANDLER | RECENT COLOR ITEMS | SELECT PREVIOUS COLOR
colorHistory.addEventListener('click', function (e) {
    let selectedColor = e.target.style.color;
    let rgb_array = strToArr_rgb(selectedColor);
    colorPicker.rgb = rgb_array;
    setValues(rgb_array);
    setColorSchemes(rgb_array);
});


// EVENT HANDLER | X ICON | CLOSE POPUP DRAWER
const closePopup = document.getElementById('close-btn');
closePopup.addEventListener('click', () => infoPopup.style.display = 'none');


// EVENT HANDLER | CHECK ICON | SAVE COLOR TO RECENTS
const confirmBtn = document.querySelector('.confirm-btn');
confirmBtn.addEventListener('click', () => {
    setColorHistory(rgb_array);
});


// EVENT HANDLER | STAR ICONS | DISPLAY SELECTED APP RATING
const feedback = document.querySelector('.feedback-wrapper');
const stars = document.querySelectorAll('.fa-star');
stars.forEach((star, i) => {
    feedback.addEventListener('mouseleave', resetRating);
    star.addEventListener('click', handleClick);

    // If cursor moves outside of specified div - wipe all color fill
    function resetRating(e) {
        for (let j = 0; j <= i; j++) {
            stars[j].classList.remove('fas');
        };
    }

    // Remove prior fill - reset based on clicked index
    function handleClick(e) {
        stars.forEach(star => star.classList.remove('fas'));
        for (let j = 0; j <= i; j++) {
            stars[j].classList.add('fas');
        };
    }
});


// EVENT HANDLER | DOUBLE ARROW UP ICON | SCROLL TO TOP OF WINDOW
const returnTop = document.getElementById('return-top');
returnTop.addEventListener('click', () => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
});


// SET CURRENT DATE FOR FOOTER COPYRIGHT
let year = new Date().getFullYear();
document.getElementById('date').textContent = year;


// SET UP EVENT PROPAGATION TO REDUCE REDUNDANT FUNCTION CALLS, MAYBE?
// LEARN MORE ABOUT IT. CAPTURE, TARGET, AND BUBBLE PHASE.

// COLOR SCHEME | ANALOGOUS
function setAnalogous(rgb_array) {
    let palettes = document.querySelectorAll('.analogous');
    let colorSet = getAnalogous(generateHSL(rgb_array));
    for (let i = 0; i < palettes.length; i++) {
        palettes[i].style.background = getHSL(colorSet[i]);
    };
};


// COLOR SCHEME | MONOCHROMATIC
function setMonochromatic(rgb_array) {
    let palettes = document.querySelectorAll('.monochromatic');
    let colorSet = getMonoOrComp(generateHSL(rgb_array), 0);
    for (let i = 0; i < palettes.length; i++) {
        palettes[i].style.background = getHSL(colorSet[i]);
        // palettes[i].textContent = `${hslToHex(colorSet[i])} ${getHSL(colorSet[i])} `;
    };
};


// COLOR SCHEME | COMPLEMENTARY
function setComplementary(rgb_array) {
    let palettes = document.querySelectorAll('.complementary');
    let colorSet = getMonoOrComp(generateHSL(rgb_array), 180);
    for (let i = 0; i < palettes.length; i++) {
        palettes[i].style.background = getHSL(colorSet[i]);
        // palettes[i].textContent = `${hslToHex(colorSet[i])} ${getHSL(colorSet[i])} `;
    };
};


// COLOR SCHEME | SPLIT-COMPLEMENTARY
function setSplitComp(rgb_array) {
    let palettes = document.querySelectorAll('.sp-complementary');
    let colorSet = getSplitComp(generateHSL(rgb_array));
    for (let i = 0; i < palettes.length; i++) {
        palettes[i].style.background = getHSL(colorSet[i]);
        // palettes[i].textContent = `${hslToHex(colorSet[i])} ${getHSL(colorSet[i])} `;
    };
};


// COLOR SCHEME | TRIADIC
function setTriadic(rgb_array) {
    let palettes = document.querySelectorAll('.triadic');
    let colorSet = alterHue(generateHSL(rgb_array), 120);
    for (let i = 0; i < palettes.length; i++) {
        palettes[i].style.background = getHSL(colorSet[i]);
        // palettes[i].textContent = `${hslToHex(colorSet[i])} ${getHSL(colorSet[i])} `;
    }
}


// COLOR SCHEME | SQUARE
function setSquare(rgb_array) {
    let palettes = document.querySelectorAll('.square');
    let colorSet = alterHue(generateHSL(rgb_array), 90);
    for (let i = 0; i < palettes.length; i++) {
        palettes[i].style.background = getHSL(colorSet[i]);
        // palettes[i].textContent = `${hslToHex(colorSet[i])} ${getHSL(colorSet[i])} `;
    }
}


// COLOR SCHEME | RECTANGLE
function setRectangle(rgb_array) {
    let palettes = document.querySelectorAll('.rectangle');
    let colorSet = getRectangle(generateHSL(rgb_array));
    for (let i = 0; i < palettes.length; i++) {
        palettes[i].style.background = getHSL(colorSet[i]);
        // palettes[i].textContent = `${hslToHex(colorSet[i])} ${getHSL(colorSet[i])} `;
    }
}