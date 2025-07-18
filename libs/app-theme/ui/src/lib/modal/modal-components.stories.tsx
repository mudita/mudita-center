/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { ButtonType, IconType, ModalSize } from "app-theme/models"
import { storybookHelper } from "app-theme/utils"
import { ModalContent } from "./modal-content"
import { Modal } from "./modal"
import styled from "styled-components"
import { Button } from "../button/button"
import { Description, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks"
import { FunctionComponent, PropsWithChildren, ReactElement } from "react"
import { action } from "storybook/actions"
import { Icon } from "../icon/icon"
import { Typography } from "../typography/typography"

const DocsStoryWrapper = styled.div`
  .ReactModal__Overlay {
    position: relative !important;
    padding: 2rem !important;
  }
`

const meta: Meta<typeof ModalContent> = {
  title: "UI/Modal/Subcomponents",
  tags: ["autodocs"],
  decorators: [
    (Story, context) => (
      <div className={"story-decorator no-padding"}>
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
      </div>
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
          <DocsStoryWrapper>
            <Stories />
          </DocsStoryWrapper>
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
            "<Typography.P1>\n" +
            "  Lorem ipsum dolor sit amet, consectetur adipiscing elit:\n" +
            "</Typography.P1>\n" +
            "<Modal.ScrollableContent {...args}>\n" +
            '  <Typography.P1 as={"ul"}>\n' +
            "    <Typography.LI>\n" +
            "      Ullamcorper diam at mauris egestas malesuada. Aliquam erat\n" +
            "      volutpat.\n" +
            "    </Typography.LI>\n" +
            "    <Typography.LI>\n" +
            "      Nullam in ligula euismod, bibendum nisi a, fringilla enim. Donec\n" +
            "      ac nunc nec felis bibendum varius.\n" +
            "    </Typography.LI>\n" +
            "    <Typography.LI>\n" +
            "      Proin in nunc nec enim fringilla efficitur. Integer nec nunc ut\n" +
            "      enim bibendum tincidunt.\n" +
            "    </Typography.LI>\n" +
            "    <Typography.LI>\n" +
            "      Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n" +
            "      Vestibulum ullamcorper diam at mauris egestas malesuada.\n" +
            "    </Typography.LI>\n" +
            "    <Typography.LI>\n" +
            "      Ullamcorper diam at mauris egestas malesuada. Aliquam erat\n" +
            "      volutpat.\n" +
            "    </Typography.LI>\n" +
            "    <Typography.LI>\n" +
            "      Nullam in ligula euismod, bibendum nisi a, fringilla enim. Donec\n" +
            "      ac nunc nec felis bibendum varius.\n" +
            "    </Typography.LI>\n" +
            "    <Typography.LI>\n" +
            "      Proin in nunc nec enim fringilla efficitur. Integer nec nunc ut\n" +
            "      enim bibendum tincidunt.\n" +
            "    </Typography.LI>\n" +
            "  </Typography.P1>\n" +
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
          <Typography.P1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit:
          </Typography.P1>
          <Modal.ScrollableContent {...args}>
            <Typography.P1 as={"ul"}>
              <Typography.LI>
                Ullamcorper diam at mauris egestas malesuada. Aliquam erat
                volutpat.
              </Typography.LI>
              <Typography.LI>
                Nullam in ligula euismod, bibendum nisi a, fringilla enim. Donec
                ac nunc nec felis bibendum varius.
              </Typography.LI>
              <Typography.LI>
                Proin in nunc nec enim fringilla efficitur. Integer nec nunc ut
                enim bibendum tincidunt.
              </Typography.LI>
              <Typography.LI>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum ullamcorper diam at mauris egestas malesuada.
              </Typography.LI>
              <Typography.LI>
                Ullamcorper diam at mauris egestas malesuada. Aliquam erat
                volutpat.
              </Typography.LI>
              <Typography.LI>
                Nullam in ligula euismod, bibendum nisi a, fringilla enim. Donec
                ac nunc nec felis bibendum varius.
              </Typography.LI>
              <Typography.LI>
                Proin in nunc nec enim fringilla efficitur. Integer nec nunc ut
                enim bibendum tincidunt.
              </Typography.LI>
            </Typography.P1>
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
          "  <Typography.P1>Dense content paragraph 1</Typography.P1>\n" +
          "  <Icon type={IconType.MuditaLogo} />\n" +
          "  <Typography.P1>Dense content paragraph 2</Typography.P1>\n" +
          "  <Typography.P1>Dense content paragraph 3</Typography.P1>\n" +
          "</Modal.DenseContent>\n" +
          "<Typography.P1>Paragraph outside dense content 1</Typography.P1>\n" +
          "<Icon type={IconType.MuditaLogo} />\n" +
          "<Typography.P1>Paragraph outside dense content 2</Typography.P1>\n" +
          "<Typography.P1>Paragraph outside dense content 3</Typography.P1>",
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
          <Typography.P1>Dense content paragraph 1</Typography.P1>
          <Icon type={IconType.MuditaLogo} />
          <Typography.P1>Dense content paragraph 2</Typography.P1>
          <Typography.P1>Dense content paragraph 3</Typography.P1>
        </Modal.DenseContent>
        <Typography.P1>Paragraph outside dense content 1</Typography.P1>
        <Icon type={IconType.MuditaLogo} />
        <Typography.P1>Paragraph outside dense content 2</Typography.P1>
        <Typography.P1>Paragraph outside dense content 3</Typography.P1>
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
        description: {
          story:
            "This is a simple example of how to use the `Modal` component with text content. " +
            "It uses the `Typography` component to display the text inside the modal.",
        },
        source: {
          code:
            "<Typography.P1>\n" +
            "  Lorem ipsum dolor sit amet, consectetur:\n" +
            "</Typography.P1>\n" +
            '<Typography.P1 as={"ul"}>\n' +
            "  <Typography.LI>\n" +
            "    Lorem ipsum dolor sit amet dolor sit amet\n" +
            "  </Typography.LI>\n" +
            "  <Typography.LI>\n" +
            "    Consectetur adipiscing elit\n" +
            "  </Typography.LI>\n" +
            "</Typography.P1>\n" +
            "<Typography.P1>\n" +
            "  Vestibulum ullamcorper diam at mauris egestas:\n" +
            "</Typography.P1>\n" +
            '<Typography.P1 as={"ol"}>\n' +
            "  <Typography.LI>\n" +
            "    Lorem ipsum dolor sit amet\n" +
            "  </Typography.LI>\n" +
            "  <Typography.LI>\n" +
            "    Consectetur adipiscing elit\n" +
            "  </Typography.LI>\n" +
            "  <Typography.LI>\n" +
            "    Vestibulum ullamcorper diam at mauris egestas malesuada\n" +
            "  </Typography.LI>\n" +
            "</Typography.P1>",
        },
      },
    },
    args: {
      children: (
        <>
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
