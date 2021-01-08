import { PureV1Formatter } from "./pure-v1.formatter"
import { Formatter } from "./formatter"

const formatterMap: { [key: number]: Formatter } = {
  0: new PureV1Formatter(),
}

export class FormatterFactory {
  create(version: number): Formatter | undefined {
    return formatterMap[version]
  }
}
