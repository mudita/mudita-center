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
  title: "UI/Modal/Subcomponents",
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
      description: {
        component:
          "The `<Modal>` component is a wrapper around the `react-modal` library. It provides a set of subcomponents that can be used to build a modal.\n\n",
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
  },
}

export default meta

export const Default: StoryObj<typeof Modal.TitleIcon> = {
  name: "<Modal.TitleIcon />",
  parameters: {
    docs: {
      description: {
        story:
          "This component is used to display the icon of the modal.\n\n" +
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
  name: "<Modal.Title />",
  parameters: {
    docs: {
      description: {
        story:
          "This component is used to display the title of the modal.\n\n" +
          "It accepts `children` prop, which is a standard React's children component. " +
          "Alternatively, it can accept a `text` prop of type `string` that will be displayed as a title, but the `children` prop must be empty to make the `text` prop work.",
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
  name: "<Modal.CloseButton />",
  parameters: {
    docs: {
      description: {
        story:
          "This component is used to display the close button of the modal.\n\n" +
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
  name: "<Modal.Buttons /> (with single button)",
  parameters: {
    docs: {
      description: {
        story:
          "This component is used to prepare a container for buttons inside the modal. " +
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
  name: "<Modal.Buttons /> (with two buttons)",
  parameters: {
    docs: {
      description: {
        story:
          "This component is used to prepare a container for buttons inside the modal. " +
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
    name: "<Modal.ScrollableContent />",
    parameters: {
      docs: {
        description: {
          story:
            "This component is used to display the content of the modal that can become scrollable " +
            "in case of exceeding the maximum height of the modal.",
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
            "or one of the components from this UI library.",
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
  name: "<Modal.SizeController />",
  parameters: {
    docs: {
      description: {
        story:
          "This component is used to manipulate the size of the modal based on the internal logic.\n\n" +
          "It accepts the same `size` prop as the modal itself.",
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
  name: "<Modal.VisibilityController />",
  parameters: {
    docs: {
      description: {
        story:
          "This component is used to manipulate the visibility of the modal based on the internal logic.\n\n" +
          "It accepts the `visibility` prop\n\n" +
          "⚠️ This does not disable the modal, it just hides it. To close the modal, set the `opened` prop of `<Modal>` to `false`.",
      },
    },
  },
  argTypes: {},
  args: {
    visible: true,
  },
  render: (args) => {
    return <Modal.VisibilityController {...args} />
  },
}
