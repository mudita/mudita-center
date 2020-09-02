import { FunctionComponent as ReactFunctionComponent } from "react"

export type FunctionComponent<P = {}> = ReactFunctionComponent<
  Readonly<P & { className?: string }>
>
