function hex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgb(r, g, b) {
  return `rgb(${r},${g},${b})`;
}

console.log(hex(255, 33, 33));

// below is the factory function, it's building up an object. But factory functions are not commonly used. Constructor function is more common.
function makeColor(r, g, b) {
  const color = {};
  color.r = r;
  color.g = g;
  color.b = b;
  color.rgb = function () {
    const { r, g, b } = this;
    return `rgb(${r},${g},${b})`;
  };
  color.hex = function () {
    const { r, g, b } = this;
    return hex(r, g, b);
  };
  return color;
}

// constructor function won't have return statement. Using capital shows that it's not a regular function, but constructor
function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
  //   this.rgb = function (r, g, b) {
  //     const { r, g, b } = this;
  //     return rgb(r, g, b);
  //   };
  //   this.hex = function (r, g, b) {
  //     const { r, g, b } = this;
  //     return hex(r, g.b);
  //   };
}

//if we want to add method to prototype, this is the way to do it, NOT with this as above
Color.prototype.rgb = function () {
  const { r, g, b } = this;
  return rgb(r, g, b);
};
Color.prototype.hex = function () {
  const { r, g, b } = this;
  return hex(r, g, b);
};

Color.prototype.rgba = function (a = 1.0) {
  const { r, g, b } = this;
  return `rgba(${r},${g},${b},${a})`;
};

// when we call this function with new word, it will create JS object!!! If we don't use new, this will refer to window object. And it will have the __proto__ property. So then we can refer to the function multiple times

const color1 = new Color(32, 33, 44);
const color2 = new Color(155, 199, 227);

console.log(color1.hex());
console.log(color2.hex());
color1.hex = color2.hex; // this will return true now

// document.body.style.backgroundColor = color1.rgb();
// document.body.style.backgroundColor = color1.rgba(0.7);
// document.querySelector("h1").style.color = color2.rgba(0.8);

// now with classes it will be even more efficient. You have to have class keyword and you MUST have constructor inside. The constructor func inside class will run immediately once we create a new instance of the class with keyword new.
class ColorClass {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    this.calcHSL();
    // console.log(this);
  }
  greet() {
    return `Hello, Please welcome new color - ${this.name}`;
  }
  rgb() {
    const { r, g, b } = this;
    return rgb(r, g, b);
  }
  hex() {
    const { r, g, b } = this;
    return hex(r, g, b);
  }
  rgba(a = 1.0) {
    const { r, g, b } = this;
    return `rgba(${r},${g},${b},${a})`;
  }
  hsl() {
    const { h, s, l } = this;
    return `hsl(${h},${s}%,${l}%)`;
  }
  opposite() {
    const { h, s, l } = this;
    const newHue = (h + 180) % 360;
    return `hsl(${newHue},${s}%,${l}%)`;
  }
  fullySaturated() {
    const { h, l } = this;
    return `hsl(${h},100%,${l}%)`;
  }
  light() {
    const { h, s } = this;
    return `hsl(${h},${s}%,90%)`;
  }
  calcHSL() {
    let { r, g, b } = this;
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r)
      // Red is max
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      // Green is max
      h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    this.h = h;
    this.s = s;
    this.l = l;
  }
}
// with classes you don't need to do ColorClass.prototype.method = function().  You can declare them all in the class.

const tomatoColor = new ColorClass(243, 15, 17, "tomato");

document.querySelector("h1").style.color = tomatoColor.rgba(0.8);

// ("hsl(230, 50%, 45%)");
