import { ImgHTMLAttributes } from "react"

export interface LoaderSpinnerProps {
  size?: number
}

export enum LoaderType {
  Logo,
  Spinner,
}

export interface LoaderProps {
  type: LoaderType
  loaderProps?: LoaderSpinnerProps & ImgHTMLAttributes<HTMLImageElement>
}
