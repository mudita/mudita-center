import React, { ComponentProps } from "react"
import { Story } from "@storybook/react"
import { Button } from "Components/button/button.component"
import { paths } from "Storybook/paths"

export default {
  title: `${paths.atoms}/Button`,
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "A button component",
      },
    },
  },
  argTypes: {
    backgroundColor: {
      control: "color",
      description: "Vivamus suscipit tortor eget felis porttitor volutpat.",
      table: {
        category: "Colors",
      },
    },
    primary: {
      description: "Bla bla",
      table: {
        category: "Colors",
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    label: "Button",
  },
}

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
)

export const Primary = Template.bind({
  primary: true,
})

export const Secondary = Template.bind({})
Secondary.parameters = {
  docs: {
    description: {
      story: "A secondary button used for other actions",
    },
  },
}

export const Large = Template.bind({
  size: "large",
})

export const Small = Template.bind({
  size: "small",
})
//
// export const Large = Template.bind({})
// Large.args = {
//   size: "large",
//   label: "Button",
// }
//
// export const Small = Template.bind({})
// Small.args = {
//   size: "small",
//   label: "Button",
// }
