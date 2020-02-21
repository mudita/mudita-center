import { storiesOf } from "@storybook/react"
import * as React from "react"
import Modal, {
  ModalSize,
  TitleOrder,
} from "Renderer/components/core/modal/modal.component"
import { ModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import { noop } from "Renderer/utils/noop"

storiesOf("Components|Modal/static", module)
  .add("Very small", () => {
    return (
      <ModalWrapper>
        <Modal title={"Title"} size={ModalSize.VerySmall}>
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Very small with subtitle", () => {
    return (
      <ModalWrapper>
        <Modal title={"Title"} subtitle={"Subtitle"} size={ModalSize.VerySmall}>
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Very small with titles reversed", () => {
    return (
      <ModalWrapper>
        <Modal
          title={"Title"}
          subtitle={"Subtitle"}
          size={ModalSize.VerySmall}
          titleOrder={TitleOrder.SubtitleFirst}
        >
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Very small with action button", () => {
    return (
      <ModalWrapper>
        <Modal
          title={"Title"}
          subtitle={"Subtitle"}
          size={ModalSize.VerySmall}
          actionButtonLabel={"Done"}
          onActionButtonClick={noop}
        >
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Small", () => {
    return (
      <ModalWrapper>
        <Modal title={"Title"} subtitle={"Subtitle"} size={ModalSize.Small}>
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Small with subtitle", () => {
    return (
      <ModalWrapper>
        <Modal title={"Title"} subtitle={"Subtitle"} size={ModalSize.Small}>
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Small with titles reversed", () => {
    return (
      <ModalWrapper>
        <Modal
          title={"Title"}
          subtitle={"Subtitle"}
          size={ModalSize.Small}
          titleOrder={TitleOrder.SubtitleFirst}
        >
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Small with action button", () => {
    return (
      <ModalWrapper>
        <Modal
          title={"Title"}
          subtitle={"Subtitle"}
          size={ModalSize.Small}
          actionButtonLabel={"Done"}
          onActionButtonClick={noop}
        >
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Medium", () => {
    return (
      <ModalWrapper>
        <Modal title={"Title"} size={ModalSize.Medium}>
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Medium with subtitle", () => {
    return (
      <ModalWrapper>
        <Modal title={"Title"} subtitle={"Subtitle"} size={ModalSize.Medium}>
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Medium with titles reversed", () => {
    return (
      <ModalWrapper>
        <Modal
          title={"Title"}
          subtitle={"Subtitle"}
          size={ModalSize.Medium}
          titleOrder={TitleOrder.SubtitleFirst}
        >
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Medium with action button", () => {
    return (
      <ModalWrapper>
        <Modal
          title={"Title"}
          subtitle={"Subtitle"}
          size={ModalSize.Medium}
          actionButtonLabel={"Done"}
          onActionButtonClick={noop}
        >
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Large", () => {
    return (
      <ModalWrapper>
        <Modal title={"Title"} size={ModalSize.Large}>
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Large with subtitle", () => {
    return (
      <ModalWrapper>
        <Modal
          title={"Title"}
          subtitle={"Subtitle"}
          size={ModalSize.Large}
          titleOrder={TitleOrder.TitleFirst}
        >
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Large with titles reversed", () => {
    return (
      <ModalWrapper>
        <Modal
          title={"Title"}
          subtitle={"Subtitle"}
          size={ModalSize.Large}
          titleOrder={TitleOrder.SubtitleFirst}
        >
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
  .add("Large with action button", () => {
    return (
      <ModalWrapper>
        <Modal
          title={"Title"}
          subtitle={"Subtitle"}
          size={ModalSize.Large}
          actionButtonLabel={"Done"}
          onActionButtonClick={noop}
        >
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
