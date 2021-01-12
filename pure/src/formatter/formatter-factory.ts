import { PureV0Formatter } from "./pure-v0.formatter"
import { Formatter } from "./formatter"

const formatterMap: { [key: number]: Formatter } = {
  0: new PureV0Formatter(),
}

export class FormatterFactory {
  create(version = 1): Formatter {
    return formatterMap[version] ?? formatterMap[1]
  }
}
