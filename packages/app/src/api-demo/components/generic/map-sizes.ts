import { PrimitiveValue } from "./layout.types"

export const mapSizes = (sizes: PrimitiveValue[]) => {
  return sizes
    .map((size) => {
      if (typeof size === "number") {
        return `${size}fr`
      }
      return size
    })
    .join(" ")
}
