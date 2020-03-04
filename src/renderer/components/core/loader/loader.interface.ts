import { ImgHTMLAttributes } from "react"

export interface LoaderProps {
  size?: number
}

export enum LoaderType {
  Gif,
  Css,
}

export interface LoaderResolverProp {
  type: LoaderType
  loaderProps?: LoaderProps & ImgHTMLAttributes<HTMLImageElement>
}
