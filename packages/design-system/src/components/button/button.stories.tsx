import { Button } from "Components/button/button.component"
import { templateForComponent } from "App/helper"

const template = templateForComponent(Button)

const meta = {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: {
      control: "color",
      label: { description: "description" },
    },
  },
}

export default meta

// const Template = (args) => <Button {...args} />

export const Primary = template({
  primary: true,
  label: "Button",
})

export const Secondary = template({
  label: "Button",
})

export const Large = template({
  label: "Button",
  size: "large",
})

export const Small = template({
  label: "Button",
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
