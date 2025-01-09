export interface ICustomPalette {
  name: string,
  colors: Array<ICustomPaletteColor>,
  created_at: string,
  updated_at: string,
  uid: string,
  id: number,
}

export interface ICustomPaletteColor {
  name: string,
  color: string,
}
