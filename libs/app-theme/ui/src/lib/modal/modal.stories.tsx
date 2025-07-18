/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import {
  ButtonType,
  IconType,
  ModalLayer,
  ModalSize,
  TypographyAlign,
} from "app-theme/models"
import { storybookHelper } from "app-theme/utils"
import styled from "styled-components"
import { ModalContent } from "./modal-content"
import { Modal } from "./modal"
import { Button } from "../button/button"
import { Description, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks"
import { Typography } from "../typography/typography"

const Decorator = styled.div`
  min-height: 54rem;
`

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Decorator className={"story-decorator no-padding"}>
        <Story />
      </Decorator>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "The `<Modal>` component is a wrapper around the `react-modal` library. It also provides a set of subcomponents that can be used to build the fully functional modal:\n\n" +
          "- `<Modal.TitleIcon>` - displays an icon in the title bar of the modal.\n" +
          "- `<Modal.Title>` - displays the title of the modal.\n" +
          "- `<Modal.CloseButton>` - displays a close button in the modal.\n" +
          "- `<Modal.Buttons>` - creates a buttons wrapper in the modal.\n" +
          "- `<Modal.ScrollableContent>` - creates a scrollable area in the modal.\n\n" +
          "- `<Modal.SizeController>` - manages the size of the modal.\n" +
          "- `<Modal.VisibilityController>` - manages the visibility of the modal.\n\n" +
          "\n\n" +
          "## Usage\n" +
          "```tsx\n" +
          "import { Modal } from 'app-theme/ui'\n" +
          "\n" +
          "const App = () => {\n" +
          "  const [opened, setOpened] = useState(true)\n" +
          "  const closeFunction = useCallback(() => setOpened(false), [])\n" +
          "\n" +
          "  return (\n" +
          "    <Modal opened={opened}>\n" +
          "    // ...\n" +
          "    </Modal>\n" +
          "  )\n" +
          "}\n" +
          "```\n\n",
      },
    },
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Stories />
      </>
    ),
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  name: "Composed modal",
  argTypes: {
    opened: storybookHelper
      .assignCategory("Functional")
      .addDescription("Decides whether the modal is opened or closed.")
      .apply(),
    overlayHidden: storybookHelper
      .assignCategory("Functional")
      .addDescription("Decides whether the overlay is hidden or not.")
      .apply(),
    layer: storybookHelper
      .assignCategory("Styles")
      .addDescription("Defines the layer of the modal in the z-index stack.")
      .generateEnumSelector(ModalLayer, "ModalLayer")
      .setType("ModalLayer")
      .apply(),
    size: storybookHelper
      .assignCategory("Styles")
      .addDescription("Defines the size of the modal.")
      .generateEnumSelector(ModalSize, "ModalSize")
      .apply(),
    customStyles: storybookHelper
      .assignCategory("Styles")
      .addDescription("Allows to overwrite some of the default styles.")
      .setType("object")
      .apply({
        control: { type: "object" },
      }),
  },
  args: {
    opened: true,
    overlayHidden: false,
    layer: ModalLayer.Default,
    size: ModalSize.Small,
    customStyles: {
      maxHeight: undefined,
      width: undefined,
      padding: undefined,
      gap: undefined,
    },
  },
  parameters: {
    docs: {
      source: {
        code:
          "<Modal\n" +
          "  opened={true}\n" +
          "  customStyles={{\n" +
          "    maxHeight: 500,\n" +
          "  }}\n" +
          ">\n" +
          "  <Modal.CloseButton />\n" +
          "  <Modal.TitleIcon type={IconType.Spinner} />\n" +
          '  <Modal.Title text={"Lorem Ipsum"} />\n' +
          "  <Typography.P1 textAlign={TypographyAlign.Justify}>\n" +
          "    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum\n" +
          "    ullamcorper diam at mauris egestas malesuada.\n" +
          "  </Typography.P1>\n" +
          "  <Modal.ScrollableContent>\n" +
          "    <Typography.P1>\n" +
          "      Lorem ipsum dolor sit amet, consectetur:\n" +
          "    </Typography.P1>\n" +
          '    <Typography.P1 as={"ul"}>\n' +
          "      <Typography.LI>\n" +
          "        Lorem ipsum dolor sit amet dolor sit amet\n" +
          "      </Typography.LI>\n" +
          "      <Typography.LI>\n" +
          "        Consectetur adipiscing elit\n" +
          "      </Typography.LI>\n" +
          "    </Typography.P1>\n" +
          "    <Typography.P1>\n" +
          "      Vestibulum ullamcorper diam at mauris egestas:\n" +
          "    </Typography.P1>\n" +
          '    <Typography.P1 as={"ol"}>\n' +
          "      <Typography.LI>\n" +
          "        Lorem ipsum dolor sit amet\n" +
          "      </Typography.LI>\n" +
          "      <Typography.LI>\n" +
          "        Consectetur adipiscing elit\n" +
          "      </Typography.LI>\n" +
          "      <Typography.LI>\n" +
          "        Vestibulum ullamcorper diam at mauris egestas malesuada\n" +
          "      </Typography.LI>\n" +
          "    </Typography.P1>\n" +
          "  </Modal.ScrollableContent>\n" +
          "  <Modal.Buttons>\n" +
          "    <Button type={ButtonType.Secondary}>Lorem</Button>\n" +
          "    <Button type={ButtonType.Primary}>Ipsum</Button>\n" +
          "  </Modal.Buttons>" +
          "</Modal>",
      },
    },
  },
  render: (args, context) => {
    return (
      <Modal
        appElement={context.canvasElement}
        parentSelector={() => {
          return context.canvasElement.querySelector(
            ".story-decorator"
          ) as HTMLElement
        }}
        {...args}
        customStyles={{
          maxHeight: 500,
        }}
      >
        <Modal.CloseButton />
        <Modal.TitleIcon type={IconType.Spinner} />
        <Modal.Title text={"Lorem Ipsum"} />
        <Typography.P1 textAlign={TypographyAlign.Justify}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          ullamcorper diam at mauris egestas malesuada.
        </Typography.P1>
        <Modal.ScrollableContent>
          <Typography.P1>
            Lorem ipsum dolor sit amet, consectetur:
          </Typography.P1>
          <Typography.P1 as={"ul"}>
            <Typography.LI>
              Lorem ipsum dolor sit amet dolor sit amet
            </Typography.LI>
            <Typography.LI>Consectetur adipiscing elit</Typography.LI>
          </Typography.P1>
          <Typography.P1>
            Vestibulum ullamcorper diam at mauris egestas:
          </Typography.P1>
          <Typography.P1 as={"ol"}>
            <Typography.LI>Lorem ipsum dolor sit amet</Typography.LI>
            <Typography.LI>Consectetur adipiscing elit</Typography.LI>
            <Typography.LI>
              Vestibulum ullamcorper diam at mauris egestas malesuada
            </Typography.LI>
          </Typography.P1>
        </Modal.ScrollableContent>
        <Modal.Buttons>
          <Button type={ButtonType.Secondary}>Lorem</Button>
          <Button type={ButtonType.Primary}>Ipsum</Button>
        </Modal.Buttons>
      </Modal>
    )
  },
}
