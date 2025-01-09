export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const addHashIfNeeded = (color: string|null): string|null => {
  if (!color) {
    return null
  }
  
  if (color.length === 3 || color.length === 6 || color.length === 8) {
    return `#${color}`
  } else {
    return color
  }
}