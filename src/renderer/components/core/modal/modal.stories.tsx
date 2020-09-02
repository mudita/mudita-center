import { storiesOf } from "@storybook/react"
import * as React from "react"
import Modal from "Renderer/components/core/modal/modal.component"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import { noop } from "Renderer/utils/noop"
import {
  ModalSize,
  TitleOrder,
} from "Renderer/components/core/modal/modal.interface"
import Story from "Renderer/components/storybook/story.component"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import { css } from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const storyContainerStyle = css`
  align-items: flex-start;
`

storiesOf("Components/Core/Modal", module)
  .add("Default (large)", () => {
    return (
      <>
        <StoryContainer title="Types" customStyle={storyContainerStyle} column>
          <Story title="With title" transparentMode>
            <StoryModalWrapper>
              <Modal title={"Title"}>
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With title and subtitle" transparentMode>
            <StoryModalWrapper>
              <Modal title={"Title"} subtitle={"Subtitle"}>
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With titles reversed" transparentMode>
            <StoryModalWrapper>
              <Modal
                title={"Title"}
                subtitle={"Subtitle"}
                titleOrder={TitleOrder.SubtitleFirst}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With action button" transparentMode>
            <StoryModalWrapper>
              <Modal
                title={"Title"}
                subtitle={"Subtitle"}
                actionButtonLabel={"Done"}
                onActionButtonClick={noop}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
        </StoryContainer>
      </>
    )
  })
  .add("Medium", () => {
    return (
      <>
        <StoryContainer title="Types" customStyle={storyContainerStyle} column>
          <Story title="With title" transparentMode>
            <StoryModalWrapper>
              <Modal size={ModalSize.Medium} title={"Title"}>
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With title and subtitle" transparentMode>
            <StoryModalWrapper>
              <Modal
                size={ModalSize.Medium}
                title={"Title"}
                subtitle={"Subtitle"}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With titles reversed" transparentMode>
            <StoryModalWrapper>
              <Modal
                size={ModalSize.Medium}
                title={"Title"}
                subtitle={"Subtitle"}
                titleOrder={TitleOrder.SubtitleFirst}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With action button" transparentMode>
            <StoryModalWrapper>
              <Modal
                size={ModalSize.Medium}
                title={"Title"}
                subtitle={"Subtitle"}
                actionButtonLabel={"Done"}
                onActionButtonClick={noop}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
        </StoryContainer>
      </>
    )
  })
  .add("Small", () => {
    return (
      <>
        <StoryContainer title="Types" customStyle={storyContainerStyle} column>
          <Story title="With title" transparentMode>
            <StoryModalWrapper>
              <Modal size={ModalSize.Small} title={"Title"}>
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With title and subtitle" transparentMode>
            <StoryModalWrapper>
              <Modal
                size={ModalSize.Small}
                title={"Title"}
                subtitle={"Subtitle"}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With titles reversed" transparentMode>
            <StoryModalWrapper>
              <Modal
                size={ModalSize.Small}
                title={"Title"}
                subtitle={"Subtitle"}
                titleOrder={TitleOrder.SubtitleFirst}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With action button" transparentMode>
            <StoryModalWrapper>
              <Modal
                size={ModalSize.Small}
                title={"Title"}
                subtitle={"Subtitle"}
                actionButtonLabel={"Done"}
                onActionButtonClick={noop}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
        </StoryContainer>
      </>
    )
  })
  .add("Very small", () => {
    return (
      <>
        <StoryContainer title="Types" customStyle={storyContainerStyle} column>
          <Story title="With title" transparentMode>
            <StoryModalWrapper>
              <Modal size={ModalSize.VerySmall} title={"Title"}>
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With title and subtitle" transparentMode>
            <StoryModalWrapper>
              <Modal
                size={ModalSize.VerySmall}
                title={"Title"}
                subtitle={"Subtitle"}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With titles reversed" transparentMode>
            <StoryModalWrapper>
              <Modal
                size={ModalSize.VerySmall}
                title={"Title"}
                subtitle={"Subtitle"}
                titleOrder={TitleOrder.SubtitleFirst}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
          <Story title="With action button" transparentMode>
            <StoryModalWrapper>
              <Modal
                size={ModalSize.VerySmall}
                title={"Title"}
                subtitle={"Subtitle"}
                actionButtonLabel={"Done"}
                onActionButtonClick={noop}
              >
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  Lorem ipsum dolor sit amet
                </Text>
              </Modal>
            </StoryModalWrapper>
          </Story>
        </StoryContainer>
      </>
    )
  })
