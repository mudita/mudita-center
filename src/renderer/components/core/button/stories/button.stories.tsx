import { storiesOf } from "@storybook/react"
import ButtonFixed from "./button-fixed"
import ButtonFixedWithIcon from "./button-fixed-with-icon"
import ButtonIcon from "./button-icon"
import ButtonLink from "./button-link"

storiesOf("Components|Button", module)
  .add("Standard/fixed width", ButtonFixed)
  .add("Standard/fixed width with icon", ButtonFixedWithIcon)
  .add("Icon only", ButtonIcon)
  .add("Links", ButtonLink)
