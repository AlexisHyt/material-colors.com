// ====================================
//
//     Converters
//
// ====================================
export const rgbToHex = (rgb: [number, number, number]): string => {
  // Validate input values
  if (!rgb.every(value => value >= 0 && value <= 255)) {
    return `#000000`
  }

  // Convert each color component to a two-digit hex value
  const hexColor = rgb
    .map(value => {
      // Convert to hex and pad with zero if necessary
      const hex = value.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('');

  return `#${hexColor}`;
}
export const rgbToHexString = (rgbString: string) => {
  if (!rgbString) {
    return
  }

  // Extract the numbers from the "rgb(r, g, b)" format
  let rgbValues: any = rgbString.match(/\d+/g);

  if (!rgbValues) {
    return
  }

  rgbValues = rgbValues.map(Number)

  return rgbToHex(rgbValues)
}
export const hexToRgb = (hex: string, addAlpha = false) => {
  // Parse the hex string into integers for R, G, and B values
  const [r, g, b] = hexToRgbArray(hex)

  if (addAlpha) {
    return `rgba(${r}, ${g}, ${b}, 1.0)`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}
export const hexToHsl = (hex: string, addAlpha = false): string => {
  // Convert hex to RGB first
  let rgb = hexToRgbArray(hex);
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  // Find the min and max values to get lightness
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;

    // Calculate saturation
    s = l > 0.5
      ? d / (2 - max - min)
      : d / (max + min);

    // Calculate hue
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else if (max === b) {
      h = (r - g) / d + 4;
    }

    h /= 6;

    // Normalize hue to 0-360 range
    h = (h * 360 + 360) % 360;
  }

  // Convert to percentages
  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  // Return in appropriate format
  if (addAlpha) {
    return `hsla(${h}, ${s}%, ${l}%, 1.0)`;
  }
  return `hsl(${h}, ${s}%, ${l}%)`;
};
export const hslToHex = (hsl: [number, number, number, number?]): string => {
  // Validate input values
  const [h, s, l, alpha] = hsl;
  if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
    return '#000000'
  }

  // Convert HSL to RGB
  const normalizedH = h / 360;
  const normalizedS = s / 100;
  const normalizedL = l / 100;

  const chroma = (1 - Math.abs(2 * normalizedL - 1)) * normalizedS;
  const x = chroma * (1 - Math.abs((normalizedH * 6) % 2 - 1));
  const m = normalizedL - chroma / 2;

  let r = 0, g = 0, b = 0;

  if (normalizedH < 1/6) {
    r = chroma; g = x; b = 0;
  } else if (normalizedH < 2/6) {
    r = x; g = chroma; b = 0;
  } else if (normalizedH < 3/6) {
    r = 0; g = chroma; b = x;
  } else if (normalizedH < 4/6) {
    r = 0; g = x; b = chroma;
  } else if (normalizedH < 5/6) {
    r = x; g = 0; b = chroma;
  } else {
    r = chroma; g = 0; b = x;
  }

  // Convert to 0-255 range and round
  const rgbValues: [number, number, number] = [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];

  // Convert RGB to hex
  const hexColor = rgbValues
    .map(value => {
      const hex = value.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('');

  // Handle alpha channel
  if (alpha !== undefined) {
    // Convert alpha to 2-digit hex
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `#${hexColor}${alphaHex}`;
  }

  return `#${hexColor}`;
}


// ====================================
//
//     Parsers
//
// ====================================
export const parseRgbString = (rgbString: string): [number, number, number] => {
  // Normalize the string by removing all whitespace
  const cleanedString = rgbString.replace(/\s+/g, '');

  let match: RegExpMatchArray | null;

  // Try matching "rgb(R,G,B)" format
  if (match = cleanedString.match(/^rgb\((\d+),(\d+),(\d+)\)$/)) {
    return [
      parseInt(match[1], 10),
      parseInt(match[2], 10),
      parseInt(match[3], 10)
    ];
  }

  // Try matching "R,G,B" format
  if (match = cleanedString.match(/^(\d+),(\d+),(\d+)$/)) {
    return [
      parseInt(match[1], 10),
      parseInt(match[2], 10),
      parseInt(match[3], 10)
    ];
  }

  return [
    0,
    0,
    0
  ]
}
export const parseHslString = (hslString: string): [number, number, number, number?] => {
  // Normalize the string by removing extra whitespace
  const cleanedString = hslString.trim().replace(/\s+/g, ' ');

  // Comprehensive regex for various HSL formats
  const hslRegex = /^hsl\((\S+)(?:\s+(\S+))?(?:\s+(\S+))(?:\s*\/\s*(\S+))?\)$/;

  const match = cleanedString.match(hslRegex);

  if (!match) {
    return [
      0,
      0,
      0
    ]
  }

  // Parse hue with potential angle units
  const hueMatch = match[1].match(/^(-?[\d.]+)(\w*)?$/);
  if (!hueMatch) {
    return [
      0,
      0,
      0
    ]
  }
  const hue = convertAngleToDegrees(hueMatch[1], hueMatch[2]);

  // Parse saturation
  const saturation = parsePercentageOrNumber(match[2]);

  // Parse lightness
  const lightness = parsePercentageOrNumber(match[3]);

  // Parse optional alpha (if present)
  const alpha = match[4]
    ? match[4].includes('%')
      ? parseFloat(match[4]) / 100
      : parseFloat(match[4])
    : undefined;

  // Validate ranges
  if (hue < 0 || hue > 360) {
    return [
      0,
      0,
      0
    ]
  }
  if (saturation < 0 || saturation > 100) {
    return [
      0,
      0,
      0
    ]
  }
  if (lightness < 0 || lightness > 100) {
    return [
      0,
      0,
      0
    ]
  }
  if (alpha !== undefined && (alpha < 0 || alpha > 1)) {
    return [
      0,
      0,
      0
    ]
  }

  // Return parsed values (with optional alpha)
  return alpha !== undefined
    ? [hue, saturation, lightness, alpha]
    : [hue, saturation, lightness];
}


// ====================================
//
//     Helpers
//
// ====================================
export const hexAddSharp = (hex: string) => {
  if (hex.startsWith('#')) {
    return hex;
  }
  return '#' + hex
}
export const hexAddAlpha = (hex: string) => {
  if (hex.length === 6 || hex.length === 7) {
    return hex + 'FF';
  }
  return hex
}



// ====================================
//
//     Private utilities
//
// ====================================
const hexToRgbArray = (hex: string): [number, number, number] => {
  // Remove the hash if present
  hex = hex.replace(/^#/, '');

  // Handle 3-digit and 6-digit hex codes
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  if (hex.length !== 6) {
    return [0, 0, 0]
  }

  // Parse hex to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return [r, g, b];
}
const convertAngleToDegrees = (value: string, unit?: string): number => {
  const numValue = parseFloat(value);
  switch (unit) {
    case 'deg':
    case undefined:
      return numValue;
    case 'turn':
      return numValue * 360;
    case 'rad':
      return numValue * (180 / Math.PI);
    case 'grad':
      return numValue * (360 / 400);
    default:
      return 0;
  }
}
const parsePercentageOrNumber = (value: string): number => {
  const numValue = parseFloat(value);
  return value.includes('%') ? numValue : numValue * 100;
}