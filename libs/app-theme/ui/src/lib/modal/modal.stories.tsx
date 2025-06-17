/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ButtonType,
  IconType,
  ModalSize,
  TypographyAlign,
} from "app-theme/models"
import { storybookHelper } from "app-theme/utils"
import styled from "styled-components"
import { Modal } from "./modal"
import { Button } from "../button/button"
import { Typography } from "../typography/typography"

const Decorator = styled.div`
  min-height: 54rem;
`

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <Decorator className={"story-decorator no-padding"}>
        <Story />
      </Decorator>
    ),
  ],
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
