import { FunctionComponent as ReactFunctionComponent } from "react"

export default interface FunctionComponent<P = {}>
  extends ReactFunctionComponent<Readonly<P & { className?: string }>> {}
