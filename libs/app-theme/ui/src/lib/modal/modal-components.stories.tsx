/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import {
  ButtonTextModifier,
  ButtonType,
  IconSize,
  IconType,
  ModalSize,
} from "app-theme/models"
import { storybookHelper } from "app-theme/utils"
import { ModalContent } from "./modal-content"
import { Modal } from "./modal"
import styled from "styled-components"
import { Button } from "../button/button"
import { Description, Stories, Subtitle, Title } from "@storybook/blocks"
import { FunctionComponent, PropsWithChildren, ReactElement } from "react"
import { action } from "@storybook/addon-actions"
import { Icon } from "app-theme/ui"

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
          "The `<Modal>` component is a wrapper around the `react-modal` library. " +
          "It provides a set of subcomponents that can be used to build a modal.",
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
      source: {
        code: "<Modal.TitleIcon type={IconType.Spinner} />",
      },
      description: {
        story:
          "This component is used to display the icon of the modal It accepts `type` prop, which is an `IconType` enum.",
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
      source: {
        code:
          "<Modal.Title text={'Lorem Ipsum'} />\n" +
          "// or\n" +
          "<Modal.Title>Lorem Ipsum</Modal.Title>",
      },
      description: {
        story:
          "This component is used to display the title of the modal. " +
          "It accepts `children` prop, which is a standard React's children component. " +
          "Alternatively, it can accept a `text` prop of type `string` that will be displayed as a title, " +
          "but the `children` prop must be empty to make the `text` prop work.",
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
      source: {
        code: "<Modal.CloseButton onClick={closeFunction} />",
      },
      description: {
        story:
          "This component is used to display the close button of the modal. " +
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
      source: {
        code:
          "<Modal.Buttons>\n" +
          "  <Button type={ButtonType.Secondary}>Lorem</Button>\n" +
          "</Modal.Buttons>",
      },
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
        <Button type={ButtonType.Secondary}>Lorem</Button>
      </Modal.Buttons>
    )
  },
}

export const ModalButtonsMultiple: StoryObj<typeof Modal.Buttons> = {
  name: "<Modal.Buttons /> (with two buttons)",
  parameters: {
    docs: {
      source: {
        code:
          "<Modal.Buttons>\n" +
          "  <Button type={ButtonType.Secondary}>Lorem</Button>\n" +
          "  <Button type={ButtonType.Primary}>Ipsum</Button>\n" +
          "</Modal.Buttons>",
      },
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
        <Button type={ButtonType.Secondary}>Lorem</Button>
        <Button type={ButtonType.Primary}>Ipsum</Button>
      </Modal.Buttons>
    )
  },
}

export const ModalScrollableContent: StoryObj<typeof Modal.ScrollableContent> =
  {
    name: "<Modal.ScrollableContent />",
    parameters: {
      docs: {
        source: {
          code:
            "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit:</p>\n" +
            "<Modal.ScrollableContent {...args}>\n" +
            "  <ul>\n" +
            "    <li>\n" +
            "      Ullamcorper diam at mauris egestas malesuada. Aliquam erat\n" +
            "      volutpat.\n" +
            "    </li>\n" +
            "    <li>\n" +
            "      Nullam in ligula euismod, bibendum nisi a, fringilla enim. Donec\n" +
            "      ac nunc nec felis bibendum varius.\n" +
            "    </li>\n" +
            "    <li>\n" +
            "      Proin in nunc nec enim fringilla efficitur. Integer nec nunc ut\n" +
            "      enim bibendum tincidunt.\n" +
            "    </li>\n" +
            "    <li>\n" +
            "      Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n" +
            "      Vestibulum ullamcorper diam at mauris egestas malesuada.\n" +
            "    </li>\n" +
            "    <li>\n" +
            "      Ullamcorper diam at mauris egestas malesuada. Aliquam erat\n" +
            "      volutpat.\n" +
            "    </li>\n" +
            "    <li>\n" +
            "      Nullam in ligula euismod, bibendum nisi a, fringilla enim. Donec\n" +
            "      ac nunc nec felis bibendum varius.\n" +
            "    </li>\n" +
            "    <li>\n" +
            "      Proin in nunc nec enim fringilla efficitur. Integer nec nunc ut\n" +
            "      enim bibendum tincidunt.\n" +
            "    </li>\n" +
            "  </ul>\n" +
            "</Modal.ScrollableContent>",
        },
        description: {
          story:
            "This component is used to display the content of the modal that can become scrollable in case of exceeding the maximum height of the modal.",
        },
      },
    },
    render: (args) => {
      return (
        <>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit:</p>
          <Modal.ScrollableContent {...args}>
            <ul>
              <li>
                Ullamcorper diam at mauris egestas malesuada. Aliquam erat
                volutpat.
              </li>
              <li>
                Nullam in ligula euismod, bibendum nisi a, fringilla enim. Donec
                ac nunc nec felis bibendum varius.
              </li>
              <li>
                Proin in nunc nec enim fringilla efficitur. Integer nec nunc ut
                enim bibendum tincidunt.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum ullamcorper diam at mauris egestas malesuada.
              </li>
              <li>
                Ullamcorper diam at mauris egestas malesuada. Aliquam erat
                volutpat.
              </li>
              <li>
                Nullam in ligula euismod, bibendum nisi a, fringilla enim. Donec
                ac nunc nec felis bibendum varius.
              </li>
              <li>
                Proin in nunc nec enim fringilla efficitur. Integer nec nunc ut
                enim bibendum tincidunt.
              </li>
            </ul>
          </Modal.ScrollableContent>
        </>
      )
    },
  }

export const ModalDenseContent: StoryObj<typeof Modal.DenseContent> = {
  name: "<Modal.DenseContent />",
  parameters: {
    docs: {
      source: {
        code:
          "<Modal.DenseContent>\n" +
          "  <p>Dense content paragraph 1</p>\n" +
          "  <Icon type={IconType.MuditaLogo} />\n" +
          "  <p>Dense content paragraph 2</p>\n" +
          "  <p>Dense content paragraph 3</p>\n" +
          "</Modal.DenseContent>\n" +
          "<p>Paragraph outside dense content 1</p>\n" +
          "<Icon type={IconType.MuditaLogo} />\n" +
          "<p>Paragraph outside dense content 2</p>" +
          "<p>Paragraph outside dense content 3</p>",
      },
      description: {
        story:
          "By default, subcomponents inside the modal are 24px apart from each other.\n\n" +
          "This does not apply to `p`, `ul`, `ol` and `li` tags, but only when they follow one another. " +
          "Separating them with any other component will restore the default gap between the text and that component.\n\n" +
          "The `DenseContent` subcomponent allows creating a denser layout by reducing the gap between its children to 14px, " +
          "just like they all would be text-like components.",
      },
    },
  },
  render: () => {
    return (
      <>
        <Modal.DenseContent>
          <p>Dense content paragraph 1</p>
          <Icon type={IconType.MuditaLogo} />
          <p>Dense content paragraph 2</p>
          <p>Dense content paragraph 3</p>
        </Modal.DenseContent>
        <p>Paragraph outside dense content 1</p>
        <Icon type={IconType.MuditaLogo} />
        <p>Paragraph outside dense content 2</p>
        <p>Paragraph outside dense content 3</p>
      </>
    )
  },
}

export const ModalTextContent: StoryObj<FunctionComponent<PropsWithChildren>> =
  {
    name: "Text content",
    argTypes: {
      children: storybookHelper.disableControl().apply(),
    },
    parameters: {
      docs: {
        source: {
          code:
            "<p>Lorem ipsum dolor sit amet, consectetur:</p>\n" +
            "<ul>\n" +
            "  <li>Lorem ipsum dolor sit amet dolor sit amet</li>\n" +
            "  <li>Consectetur adipiscing elit</li>\n" +
            "</ul>\n" +
            "<p>Vestibulum ullamcorper diam at mauris egestas:</p>\n" +
            "<ol>\n" +
            "  <li>Lorem ipsum dolor sit amet</li>\n" +
            "  <li>Consectetur adipiscing elit</li>\n" +
            "  <li>Vestibulum ullamcorper diam at mauris egestas malesuada</li>\n" +
            "</ol>",
        },
        description: {
          story:
            "There's no specific component for pure text content. For best styling support, it's recommended to use the following HTML tags:\n" +
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
      source: {
        code: "<Modal.SizeController size={ModalSize.Large} />",
      },
      description: {
        story:
          "This component is used to manipulate the size of the modal based on the internal logic. " +
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
    size: ModalSize.Large,
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
      source: {
        code:
          "<Modal.VisibilityController visible />\n" +
          "// or\n" +
          "<Modal.VisibilityController visible={false} />",
      },
      description: {
        story:
          "This component is used to manipulate the visibility of the modal based on the internal logic.\n\n" +
          "It accepts the `visibility` prop\n\n" +
          "⚠️ This does not physically close the modal, it just hides it. To close the modal, set the `opened` prop of `<Modal>` to `false`",
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
