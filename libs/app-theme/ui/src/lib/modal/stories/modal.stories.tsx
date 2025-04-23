/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { IconType, ModalLayer, ModalSize } from "app-theme/models"
import { storybookHelper } from "app-theme/utils"
import { ModalContent } from "../modal-content"
import { Modal } from "../modal"
import styled from "styled-components"
import { Button } from "../../button/button"

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
  subcomponents: {
    "Modal.TitleIcon": Modal.TitleIcon,
    "Modal.Title": Modal.Title,
    "Modal.ScrollableContent": Modal.ScrollableContent,
    "Modal.Buttons": Modal.Buttons,
    "Modal.CloseButton": Modal.CloseButton,
    "Modal.SizeController": Modal.SizeController,
    "Modal.VisibilityController": Modal.VisibilityController,
  },
  decorators: [
    (Story) => (
      <Decorator className={"story-decorator"}>
        <Story />
      </Decorator>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  name: "With basic elements",
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
      >
        <Modal.CloseButton />
        <Modal.TitleIcon type={IconType.Spinner} />
        <Modal.Title text={"Lorem Ipsum"} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          ullamcorper diam at mauris egestas malesuada.
        </p>
        <Modal.Buttons>
          <Button type={"secondary"}>Lorem</Button>
          <Button type={"primary"}>Ipsum</Button>
        </Modal.Buttons>
      </Modal>
    )
  },
}

export const WithSingleButton: Story = {
  ...Default,
  name: "With single button",
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
      >
        <Modal.CloseButton />
        <Modal.TitleIcon type={IconType.Spinner} />
        <Modal.Title text={"Lorem Ipsum"} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          ullamcorper diam at mauris egestas malesuada.
        </p>
        <Modal.Buttons>
          <Button type={"secondary"}>Lorem</Button>
        </Modal.Buttons>
      </Modal>
    )
  },
}

export const WithScrollableContent: Story = {
  ...Default,
  name: "With scrollable content",
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
      >
        <Modal.CloseButton />
        <Modal.TitleIcon type={IconType.Spinner} />
        <Modal.Title text={"Lorem Ipsum"} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          ullamcorper diam at mauris egestas malesuada.
        </p>
        <Modal.ScrollableContent>
          <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Consectetur adipiscing elit</li>
            <li>Vestibulum ullamcorper diam at mauris egestas malesuada</li>
            <li>Aliquam erat volutpat</li>
            <li>Nullam in ligula euismod, bibendum nisi a, fringilla enim</li>
            <li>Donec ac nunc nec felis bibendum varius</li>
            <li>Proin in nunc nec enim fringilla efficitur</li>
            <li>Integer nec nunc ut enim bibendum tincidunt</li>
          </ul>
        </Modal.ScrollableContent>
        <Modal.Buttons>
          <Button type={"secondary"}>Lorem</Button>
          <Button type={"primary"}>Ipsum</Button>
        </Modal.Buttons>
      </Modal>
    )
  },
}

export const WithSizeController: Story = {
  ...Default,
  name: "With size controller",
  parameters: {
    docs: {
      description: {
        story:
          "The size of the modal can be defined using the `size` prop.\n\n" +
          "However, there is also a helper component `<Modal.SizeController />` that can be used to set the size of the modal dynamically, by simply rendering it inside a given modal.\n\n" +
          "This can be helpful when you want to have a modal that can be resized depending on internal state.",
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
      >
        <Modal.SizeController size={"medium"} />
        <Modal.CloseButton />
        <Modal.TitleIcon type={IconType.Spinner} />
        <Modal.Title text={"Lorem Ipsum"} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          ullamcorper diam at mauris egestas malesuada.
        </p>
        <Modal.Buttons>
          <Button type={"secondary"}>Lorem</Button>
          <Button type={"primary"}>Ipsum</Button>
        </Modal.Buttons>
      </Modal>
    )
  },
}

export const WithVisibilityController: Story = {
  ...Default,
  name: "With visibility controller",
  parameters: {
    docs: {
      description: {
        story:
          "The visibility of the modal can be defined using the `opened` prop.\n\n" +
          "However, there is also a helper component `<Modal.VisibilityController />` that can be used to set the visibility of the modal dynamically, by simply rendering it inside a given modal.\n\n" +
          "This can be helpful when you want to have a modal that disappears depending on internal state.",
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
      >
        <Modal.VisibilityController visible={false} />
        <Modal.CloseButton />
        <Modal.TitleIcon type={IconType.Spinner} />
        <Modal.Title text={"Lorem Ipsum"} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          ullamcorper diam at mauris egestas malesuada.
        </p>
        <Modal.Buttons>
          <Button type={"secondary"}>Lorem</Button>
          <Button type={"primary"}>Ipsum</Button>
        </Modal.Buttons>
      </Modal>
    )
  },
}
