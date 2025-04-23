/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { IconType, ModalSize } from "app-theme/models"
import { storybookHelper } from "app-theme/utils"
import { ModalContent } from "./modal-content"
import { Modal } from "./modal"
import styled from "styled-components"
import { Button } from "../button/button"
import { Description, Stories, Subtitle, Title } from "@storybook/blocks"
import { FunctionComponent, PropsWithChildren, ReactElement } from "react"
import { withActions } from "@storybook/addon-actions/decorator"
import { action } from "@storybook/addon-actions"

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
  title: "UI/Modal/Components",
  tags: ["autodocs"],
  decorators: [
    (Story, context) => (
      <Decorator className={"story-decorator"}>
        <Modal
          appElement={context.canvasElement}
          parentSelector={() => {
            return context.canvasElement.querySelector(
              ".story-decorator"
            ) as HTMLElement
          }}
          opened
          customStyles={{
            maxHeight: 400,
          }}
        >
          <Story />
        </Modal>
      </Decorator>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories />
        </>
      ),
    },
  },
}

export default meta

export const Default: StoryObj<typeof Modal.TitleIcon> = {
  name: "Modal Title Icon",
  parameters: {
    docs: {
      description: {
        story:
          "The `<Modal.TitleIcon />` component is used to display the icon of the modal.\n\n" +
          "It accepts `type` prop, which is an `IconType` enum.",
      },
    },
  },
  argTypes: {
    type: storybookHelper.generateEnumSelector(IconType, "IconType").apply(),
  },
  args: {
    type: IconType.Spinner,
  },
  render: (args) => {
    return <Modal.TitleIcon {...args} />
  },
}

export const ModalTitleIcon: StoryObj<typeof Modal.Title> = {
  name: "Modal Title",
  parameters: {
    docs: {
      description: {
        story:
          "The `<Modal.Title />` component is used to display the title of the modal.\n\n" +
          "It accepts `children` prop, which is a React component. " +
          "Alternatively, it can accept a `text` prop that will be displayed as a title, but the `children` prop must be empty to make the `text` prop work.",
      },
    },
  },
  args: {
    text: "Lorem Ipsum",
  },
  render: (args) => {
    return <Modal.Title {...args} />
  },
}

export const ModalCloseButton: StoryObj<typeof Modal.CloseButton> = {
  name: "Close button",
  parameters: {
    docs: {
      description: {
        story:
          "The `<Modal.CloseButton />` component is used to display the close button of the modal.\n\n" +
          "It accepts the `onClick` prop, which is called when the button is clicked.",
      },
    },
  },
  args: {
    onClick: action("Modal close button clicked"),
  },
  render: (args) => {
    return (
      <>
        <Modal.CloseButton {...args} />
        <div style={{ height: "4rem" }} />
      </>
    )
  },
}

export const ModalButtonsSingle: StoryObj<typeof Modal.Buttons> = {
  name: "Modal Buttons (with single button)",
  parameters: {
    docs: {
      description: {
        story:
          "The `<Modal.Buttons />` component is a predefined helper to ensure consistency in handling buttons inside modals.\n\n" +
          "It can be used to display single or two buttons.",
      },
    },
  },
  render: (args) => {
    return (
      <Modal.Buttons {...args}>
        <Button type={"secondary"}>Lorem</Button>
      </Modal.Buttons>
    )
  },
}

export const ModalButtonsMultiple: StoryObj<typeof Modal.Buttons> = {
  name: "Modal Buttons (with two buttons)",
  parameters: {
    docs: {
      description: {
        story:
          "The `<Modal.Buttons />` component is a predefined helper to ensure consistency in handling buttons inside modals.\n\n" +
          "It can be used to display single or two buttons.",
      },
    },
  },
  render: (args) => {
    return (
      <Modal.Buttons {...args}>
        <Button type={"secondary"}>Lorem</Button>
        <Button type={"primary"}>Ipsum</Button>
      </Modal.Buttons>
    )
  },
}

export const ModalScrollableContent: StoryObj<typeof Modal.ScrollableContent> =
  {
    name: "Scrollable content",
    parameters: {
      docs: {
        description: {
          story:
            "The `<Modal.ScrollableContent />` component is used to display modal content that can be scrolled " +
            "if it exceeds the maximum height of the modal.\n\n",
        },
      },
    },
    render: (args) => {
      return (
        <Modal.ScrollableContent {...args}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>
            Ullamcorper diam at mauris egestas malesuada. Aliquam erat volutpat.
          </p>
          <p>
            Nullam in ligula euismod, bibendum nisi a, fringilla enim. Donec ac
            nunc nec felis bibendum varius.
          </p>
          <p>
            Proin in nunc nec enim fringilla efficitur. Integer nec nunc ut enim
            bibendum tincidunt.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ullamcorper diam at mauris egestas malesuada.
          </p>
          <p>
            Ullamcorper diam at mauris egestas malesuada. Aliquam erat volutpat.
          </p>
          <p>
            Nullam in ligula euismod, bibendum nisi a, fringilla enim. Donec ac
            nunc nec felis bibendum varius.
          </p>
          <p>
            Proin in nunc nec enim fringilla efficitur. Integer nec nunc ut enim
            bibendum tincidunt.
          </p>
        </Modal.ScrollableContent>
      )
    },
  }

export const ModalTextContent: StoryObj<FunctionComponent<PropsWithChildren>> =
  {
    name: "Text content",
    argTypes: {
      children: {
        control: {
          type: "text",
        },
        description: "The text to display in the modal.",
      },
    },
    parameters: {
      docs: {
        description: {
          story:
            "There's no specific component for text content. For best styling support, it's recommended to use the following HTML tags:\n" +
            "- `<p>` for paragraphs\n" +
            "- `<ul>` with `<li>` for unordered lists\n\n" +
            "- `<ol>` with `<li>` for orderd lists\n\n" +
            "or one of the predefined components from this UI library.",
        },
      },
    },
    args: {
      children: (
        <>
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
        </>
      ),
    },
    render: (args) => {
      return args?.children as ReactElement
    },
  }

export const ModalSizeController: StoryObj<typeof Modal.SizeController> = {
  name: "Size controller",
  parameters: {
    docs: {
      description: {
        story:
          "The `<Modal.SizeController />` component is used to manipulate the size of the modal.\n\n" +
          "It accepts the same `size` prop as the modal itself. Its purpose is to set the size of the modal dynamically based on internal logic.",
      },
    },
  },
  argTypes: {
    size: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the size of the modal.")
      .generateEnumSelector(ModalSize, "ModalSize")
      .apply(),
  },
  args: {
    size: ModalSize.Small,
  },
  render: (args) => {
    return <Modal.SizeController {...args} />
  },
}

export const ModalVisibilityController: StoryObj<
  typeof Modal.VisibilityController
> = {
  name: "Visibility controller",
  parameters: {
    docs: {
      description: {
        story:
          "The `<Modal.VisibilityController />` component is used to manipulate the visibility of the modal.\n\n" +
          "It accepts the `visibility` prop. Its purpose is to set the visibility of the modal dynamically based on internal logic.",
      },
    },
  },
  argTypes: {},
  args: {
    visible: false,
  },
  render: (args) => {
    return <Modal.VisibilityController {...args} />
  },
}
