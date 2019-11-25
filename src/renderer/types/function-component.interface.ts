import { FunctionComponent as ReactFunctionComponent } from "react"

type CommonProps<P> = ReactFunctionComponent<
  Readonly<P> & Readonly<{ className?: string }>
>

export default interface FunctionComponent<P = {}> extends CommonProps<P> {}
