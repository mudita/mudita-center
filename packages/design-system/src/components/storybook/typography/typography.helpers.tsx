import React, { ComponentProps } from "react"
import { Story } from "@storybook/react"
import {
  Text,
  getColor,
  getFontSize,
  getFontWeight,
  theme,
  TextDecorator,
  TextVariant,
} from "../../.."
import { textVariants } from "../../text/text.helpers"

const Template: Story<ComponentProps<typeof Text>> = (props) => (
  <Text {...props} />
)

const createCode = (props: ComponentProps<typeof Text>): string => {
  let variant = ""
  let decorators = ""

  if (props.variant !== undefined) {
    variant = `variant={TextVariant.${TextVariant[props.variant]}}`
  }

  if (props.decorators !== undefined) {
    decorators = `decorators={[`

    for (const decorator of props.decorators) {
      decorators += `TextDecorator.${TextDecorator[decorator]}, `
    }

    decorators = decorators.slice(0, -2)
    decorators += `]}`
  }

  const tag = props.tag ? `tag="${props.tag}"` : ""
  const size = props.size ? `size="${props.size}"` : ""
  const color = props.color ? `color="${props.color}"` : ""
  const weight = props.weight ? `weight="${props.weight}"` : ""

  const propsToDisplay = [variant, decorators, tag, size, color, weight].filter(
    Boolean
  )

  let html = propsToDisplay.filter(Boolean).join("\n")

  if (propsToDisplay.length > 1) {
    html = ("\n" + html).replace(/\n/g, "\n\r  ") + "\n"
  }

  return `<Text ${html}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Text>`
}

const createDescription = (props: ComponentProps<typeof Text>): string => {
  const { tag = "p", size = "16", color = "black", weight = "normal" } = {
    ...(props.variant !== undefined ? textVariants[props.variant] : {}),
    ...props,
  }

  return `tag: \`"${tag}"\`,
        font size: \`${getFontSize(size)({ theme })}\`,
        font weight: \`${getFontWeight(weight)({ theme })}\`,
        color: \`${getColor(color)({ theme })}\``
}

export const storyCreator = ({
  ...props
}: ComponentProps<typeof Text> = {}): Story => {
  const Story = Template.bind({})
  Story.args = {
    ...props,
  }

  Story.parameters = {
    docs: {
      description: {
        story: createDescription(props),
      },
      source: {
        code: createCode(props),
      },
    },
  }
  return Story
}
