import { storiesOf } from "@storybook/react"
import Story from "Renderer/components/storybook/story.component"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import Text, { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import * as React from "react"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalSize, TitleOrder } from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"

storiesOf("Components|Core/ModalDialog/Default (large)", module)
  .add("With title", () => {
    return (
      <Story title="With title" transparentMode>
        <StoryModalWrapper>
          <ModalDialog title={"Title"} isOpen={true}>
            <Text displayStyle={TextDisplayStyle.LargeText}>
              Lorem ipsum dolor sit amet
            </Text>
          </ModalDialog>
        </StoryModalWrapper>
      </Story>
    )
  })
  .add("With title and subtitle", () => (
    <Story title="With title and subtitle" transparentMode>
      <StoryModalWrapper>
        <ModalDialog isOpen={true} title={"Title"} subtitle={"Subtitle"}>
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))
  .add("With titles reversed", () => (
    <Story title="With titles reversed" transparentMode>
      <StoryModalWrapper>
        <ModalDialog
          isOpen={true}
          title={"Title"}
          subtitle={"Subtitle"}
          titleOrder={TitleOrder.SubtitleFirst}
        >
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))
  .add("With action button", () => (
    <Story title="With action button" transparentMode>
      <StoryModalWrapper>
        <ModalDialog
          isOpen={true}
          title={"Title"}
          subtitle={"Subtitle"}
          actionButtonLabel={"Done"}
          onActionButtonClick={noop}
        >
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))


storiesOf("Components|Core/ModalDialog/Medium", module)
  .add("With title", () => {
    return (
      <Story title="With title" transparentMode>
        <StoryModalWrapper>
          <ModalDialog title={"Title"} isOpen={true} size={ModalSize.Medium}>
            <Text displayStyle={TextDisplayStyle.LargeText}>
              Lorem ipsum dolor sit amet
            </Text>
          </ModalDialog>
        </StoryModalWrapper>
      </Story>
    )
  })
  .add("With title and subtitle", () => (
    <Story title="With title and subtitle" transparentMode>
      <StoryModalWrapper>
        <ModalDialog isOpen={true} title={"Title"} subtitle={"Subtitle"}  size={ModalSize.Medium}>
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))
  .add("With titles reversed", () => (
    <Story title="With titles reversed" transparentMode>
      <StoryModalWrapper>
        <ModalDialog
          isOpen={true}
          title={"Title"}
          subtitle={"Subtitle"}
          titleOrder={TitleOrder.SubtitleFirst}
          size={ModalSize.Medium}
        >
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))
  .add("With action button", () => (
    <Story title="With action button" transparentMode>
      <StoryModalWrapper>
        <ModalDialog
          isOpen={true}
          title={"Title"}
          subtitle={"Subtitle"}
          actionButtonLabel={"Done"}
          onActionButtonClick={noop}
          size={ModalSize.Medium}
        >
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))

storiesOf("Components|Core/ModalDialog/Small", module)
  .add("With title", () => {
    return (
      <Story title="With title" transparentMode>
        <StoryModalWrapper>
          <ModalDialog title={"Title"} isOpen={true} size={ModalSize.Small}>
            <Text displayStyle={TextDisplayStyle.LargeText}>
              Lorem ipsum dolor sit amet
            </Text>
          </ModalDialog>
        </StoryModalWrapper>
      </Story>
    )
  })
  .add("With title and subtitle", () => (
    <Story title="With title and subtitle" transparentMode>
      <StoryModalWrapper>
        <ModalDialog isOpen={true} title={"Title"} subtitle={"Subtitle"}  size={ModalSize.Small}>
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))
  .add("With titles reversed", () => (
    <Story title="With titles reversed" transparentMode>
      <StoryModalWrapper>
        <ModalDialog
          isOpen={true}
          title={"Title"}
          subtitle={"Subtitle"}
          titleOrder={TitleOrder.SubtitleFirst}
          size={ModalSize.Small}
        >
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))
  .add("With action button", () => (
    <Story title="With action button" transparentMode>
      <StoryModalWrapper>
        <ModalDialog
          isOpen={true}
          title={"Title"}
          subtitle={"Subtitle"}
          actionButtonLabel={"Done"}
          onActionButtonClick={noop}
          size={ModalSize.Small}
        >
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))

storiesOf("Components|Core/ModalDialog/Very small", module)
  .add("With title", () => {
    return (
      <Story title="With title" transparentMode>
        <StoryModalWrapper>
          <ModalDialog title={"Title"} isOpen={true} size={ModalSize.VerySmall}>
            <Text displayStyle={TextDisplayStyle.LargeText}>
              Lorem ipsum dolor sit amet
            </Text>
          </ModalDialog>
        </StoryModalWrapper>
      </Story>
    )
  })
  .add("With title and subtitle", () => (
    <Story title="With title and subtitle" transparentMode>
      <StoryModalWrapper>
        <ModalDialog isOpen={true} title={"Title"} subtitle={"Subtitle"}  size={ModalSize.VerySmall}>
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))
  .add("With titles reversed", () => (
    <Story title="With titles reversed" transparentMode>
      <StoryModalWrapper>
        <ModalDialog
          isOpen={true}
          title={"Title"}
          subtitle={"Subtitle"}
          titleOrder={TitleOrder.SubtitleFirst}
          size={ModalSize.VerySmall}
        >
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))
  .add("With action button", () => (
    <Story title="With action button" transparentMode>
      <StoryModalWrapper>
        <ModalDialog
          isOpen={true}
          title={"Title"}
          subtitle={"Subtitle"}
          actionButtonLabel={"Done"}
          onActionButtonClick={noop}
          size={ModalSize.VerySmall}
        >
          <Text displayStyle={TextDisplayStyle.LargeText}>
            Lorem ipsum dolor sit amet
          </Text>
        </ModalDialog>
      </StoryModalWrapper>
    </Story>
  ))
