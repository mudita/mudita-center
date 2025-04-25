/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { ButtonType, IconType, ModalLayer, ModalSize } from "app-theme/models"
import { storybookHelper } from "app-theme/utils"
import styled from "styled-components"
import { ModalContent } from "./modal-content"
import { Modal } from "./modal"
import { Button } from "../button/button"

const Decorator = styled.div`
  width: 100%;
  height: 100%;

  .ReactModalPortal {
    width: 100%;
    height: 100%;
  }

  .ReactModal__Overlay {
    width: 100%;
    height: 100%;
    position: relative !important;
    padding: 2rem !important;
    box-sizing: border-box !important;
  }
`

const meta: Meta<typeof ModalContent> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Decorator className={"story-decorator"}>
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
          "  <p>\n" +
          "    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum\n" +
          "    ullamcorper diam at mauris egestas malesuada.\n" +
          "  </p>\n" +
          "  <Modal.ScrollableContent>\n" +
          "    <p>Lorem ipsum dolor sit amet, consectetur:</p>\n" +
          "    <ul>\n" +
          "      <li>Lorem ipsum dolor sit amet dolor sit amet</li>\n" +
          "      <li>Consectetur adipiscing elit</li>\n" +
          "    </ul>\n" +
          "    <p>Vestibulum ullamcorper diam at mauris egestas:</p>\n" +
          "    <ol>\n" +
          "      <li>Lorem ipsum dolor sit amet</li>\n" +
          "      <li>Consectetur adipiscing elit</li>\n" +
          "      <li>Vestibulum ullamcorper diam at mauris egestas malesuada</li>\n" +
          "    </ol>\n" +
          "  </Modal.ScrollableContent>\n" +
          "  <Modal.Buttons>\n" +
          "    <Button type={ButtonType.Secondary}>Lorem</Button>\n" +
          "    <Button type={ButtonType.Primary}>Ipsum</Button>\n" +
          "  </Modal.Buttons>\n" +
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          ullamcorper diam at mauris egestas malesuada.
        </p>
        <Modal.ScrollableContent>
          <p>Lorem ipsum dolor sit amet, consectetur:</p>
          <ul>
            <li>Lorem ipsum dolor sit amet dolor sit amet</li>
            <li>Consectetur adipiscing elit</li>
          </ul>
          <p>Vestibulum ullamcorper diam at mauris egestas:</p>
          <ol>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Consectetur adipiscing elit</li>
            <li>Vestibulum ullamcorper diam at mauris egestas malesuada</li>
          </ol>
        </Modal.ScrollableContent>
        <Modal.Buttons>
          <Button type={ButtonType.Secondary}>Lorem</Button>
          <Button type={ButtonType.Primary}>Ipsum</Button>
        </Modal.Buttons>
      </Modal>
    )
  },
}
