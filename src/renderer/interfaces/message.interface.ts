import { PrimitiveType } from "intl-messageformat"

type Chunks = (chunks: any) => JSX.Element

export interface Message {
  readonly id: string
  readonly values?: Record<string, string | number>
  readonly defaultMessage?: string
  readonly description?: object | string
  readonly values?: Record<string, PrimitiveType | Chunks>
}
