import { ImgHTMLAttributes } from "react"

export interface LoaderSpinnerProps {
  size?: number
}

export enum LoaderType {
  Gif,
  Css,
}

export interface LoaderProps {
  type: LoaderType
  loaderProps?: LoaderSpinnerProps & ImgHTMLAttributes<HTMLImageElement>
}
