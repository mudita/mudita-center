import { FunctionComponent } from "react"

export type Size = number | string

export type GenericComponent<T> = FunctionComponent<{
  childrenKeys: string[]
} & T>
