export interface IPalette {
  name: string,
  colors: Array<IPaletteColor>
}

export interface IPaletteColor {
  tint: string|null,
  color: string|null,
}