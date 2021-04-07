/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Meta } from "@storybook/react"
import Story from "Renderer/components/storybook/story.component"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import * as React from "react"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import {
  ModalSize,
  TitleOrder,
} from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"
import { Story as StoryInterface } from "@storybook/react"

const Template: StoryInterface<
  React.ComponentProps<typeof ModalDialog> & { storyTitle: string }
> = (args) => {
  return (
    <Story title={args.storyTitle} transparentMode>
      <StoryModalWrapper>
        <ModalDialog
          title={args.title}
          subtitle={args.subtitle}
          titleOrder={args.titleOrder}
          actionButtonLabel={args.actionButtonLabel}
          onActionButtonClick={args.onActionButtonClick}
          size={args.size}
          isOpen
        >
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  )
}

export default {
  title: "Components|Core/ModalDialog",
  component: ModalDialog,
} as Meta

export const LargeWithTitle = Template.bind({})
LargeWithTitle.args = {
  title: "Title",
}

export const LargeWithTitleAndSubtitle = Template.bind({})
LargeWithTitleAndSubtitle.args = {
  title: "Title",
  subtitle: "Subtitle",
}

export const LargeWithTitleReversed = Template.bind({})
LargeWithTitleReversed.args = {
  title: "Title",
  subtitle: "Subtitle",
  titleOrder: TitleOrder.SubtitleFirst,
}

export const LargeWithActionButton = Template.bind({})
LargeWithActionButton.args = {
  title: "Title",
  subtitle: "Subtitle",
  actionButtonLabel: "Done",
  onActionButtonClick: noop,
}

export const MediumWithTitle = Template.bind({})
MediumWithTitle.args = {
  title: "Title",
  size: ModalSize.Medium,
}

export const MediumWithTitleAndSubtitle = Template.bind({})
MediumWithTitleAndSubtitle.args = {
  title: "Title",
  subtitle: "Subtitle",
  size: ModalSize.Medium,
}

export const MediumWithTitleReversed = Template.bind({})
MediumWithTitleReversed.args = {
  title: "Title",
  subtitle: "Subtitle",
  titleOrder: TitleOrder.SubtitleFirst,
  size: ModalSize.Medium,
}

export const MediumWithActionButton = Template.bind({})
MediumWithActionButton.args = {
  title: "Title",
  subtitle: "Subtitle",
  actionButtonLabel: "Done",
  onActionButtonClick: noop,
  size: ModalSize.Medium,
}

export const SmallWithTitle = Template.bind({})
SmallWithTitle.args = {
  title: "Title",
  size: ModalSize.Small,
}

export const SmallWithTitleAndSubtitle = Template.bind({})
SmallWithTitleAndSubtitle.args = {
  title: "Title",
  subtitle: "Subtitle",
  size: ModalSize.Small,
}

export const SmallWithTitleReversed = Template.bind({})
SmallWithTitleReversed.args = {
  title: "Title",
  subtitle: "Subtitle",
  titleOrder: TitleOrder.SubtitleFirst,
  size: ModalSize.Small,
}

export const SmallWithActionButton = Template.bind({})
SmallWithActionButton.args = {
  title: "Title",
  subtitle: "Subtitle",
  actionButtonLabel: "Done",
  onActionButtonClick: noop,
  size: ModalSize.Small,
}

export const VerySmallWithTitle = Template.bind({})
VerySmallWithTitle.args = {
  title: "Title",
  size: ModalSize.VerySmall,
}

export const VerySmallWithTitleAndSubtitle = Template.bind({})
VerySmallWithTitleAndSubtitle.args = {
  title: "Title",
  subtitle: "Subtitle",
  size: ModalSize.VerySmall,
}

export const VerySmallWithTitleReversed = Template.bind({})
VerySmallWithTitleReversed.args = {
  title: "Title",
  subtitle: "Subtitle",
  titleOrder: TitleOrder.SubtitleFirst,
  size: ModalSize.VerySmall,
}

export const VerySmallWithActionButton = Template.bind({})
VerySmallWithActionButton.args = {
  title: "Title",
  subtitle: "Subtitle",
  actionButtonLabel: "Done",
  onActionButtonClick: noop,
  size: ModalSize.VerySmall,
}
