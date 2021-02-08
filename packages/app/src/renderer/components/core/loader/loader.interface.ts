import { ImgHTMLAttributes } from "react"

export interface LoaderSpinnerProps {
  size?: number
}

export enum LoaderType {
  Logo,
  Spinner,
}

export interface LoaderProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: number
  type: LoaderType
}
