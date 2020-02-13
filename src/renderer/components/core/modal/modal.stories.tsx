import { button, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react"
import * as React from "react"
import { useEffect, useState } from "react"
import modalService from "Renderer/components/core/modal/modal.service"
import { LANGUAGE } from "Renderer/constants/languages"
import store from "Renderer/store"
import FunctionComponent from "Renderer/types/function-component.interface"
import Modal, {
  ModalSize,
} from "Renderer/components/core/modal/modal.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

export const ModalExample: FunctionComponent = () => {
  const [closable, setClosableState] = useState(false)

  const toggle = () => {
    setClosableState(!closable)
  }

  useEffect(() => {
    closable
      ? modalService.allowClosingModal()
      : modalService.preventClosingModal()
  }, [closable])

  return (
    <div>
      <h2>Hi, I'm Modal Two</h2>
      <p>I'm an advanced modal</p>
      <div>
        <input
          id="closable"
          type="checkbox"
          defaultChecked={!closable}
          onChange={toggle}
        />
        <label htmlFor="closable">
          {" "}
          Closing: {closable ? "Allowed" : "Not allowed"}
        </label>
        <p>You can also close mi with force close button</p>
      </div>
    </div>
  )
}

export const ModalUsage: FunctionComponent = () => {
  modalService.bindStore(store)
  modalService.setDefaultLocale(LANGUAGE.default)

  const modalClosable = <ModalExample />

  const modelComponentSmall = (
    <Modal
      heading={<Text displayStyle={TextDisplayStyle.SmallText}>Heading</Text>}
      size={ModalSize.Small}
    >
      <h1>lala</h1>
    </Modal>
  )

  const modelComponentMedium = (
    <Modal
      heading={<Text displayStyle={TextDisplayStyle.SmallText}>Heading</Text>}
      size={ModalSize.Medium}
    >
      <h1>lala</h1>
    </Modal>
  )

  const modelComponentLarge = (
    <Modal
      heading={<Text displayStyle={TextDisplayStyle.SmallText}>Heading</Text>}
      size={ModalSize.Large}
    >
      <h1>lala</h1>
    </Modal>
  )

  const modelComponentWithoutCloseButton = (
    <Modal
      heading={<Text displayStyle={TextDisplayStyle.SmallText}>Heading</Text>}
      size={ModalSize.Small}
      renderCloseButton={false}
    >
      <h1>lala</h1>
    </Modal>
  )

  const openModalClosable = () => {
    modalService.openModal(modalClosable)
  }

  const openSmallModal = () => {
    modalService.openModal(modelComponentSmall)
  }

  const openMediumModal = () => {
    modalService.openModal(modelComponentMedium)
  }

  const openLargeModal = () => {
    modalService.openModal(modelComponentLarge)
  }

  const openModalWithoutCloseButton = () => {
    modalService.openModal(modelComponentWithoutCloseButton)
  }

  const forceOpenModalClosable = async () => {
    await modalService.openModal(modalClosable, true)
  }

  const forceOpenSmallModal = async () => {
    await modalService.openModal(modelComponentSmall, true)
  }

  const forceOpenMediumModal = async () => {
    await modalService.openModal(modelComponentMedium, true)
  }

  const forceOpenLargeModal = async () => {
    await modalService.openModal(modelComponentLarge, true)
  }

  const forceOpenModalWithoutCloseButton = async () => {
    await modalService.openModal(modelComponentWithoutCloseButton, true)
  }

  const closeModal = async () => {
    await modalService.closeModal()
  }

  const forceCloseModal = async () => {
    await modalService.closeModal(true)
  }

  const checkIfModalOpen = () => {
    alert(`Modal is ${modalService.isModalOpen() ? "open" : "closed"}`)
  }

  button("open closable modal", openModalClosable)
  button("open small modal component", openSmallModal)
  button("open medium modal component", openMediumModal)
  button("open large modal component", openLargeModal)
  button(
    "open modal component without close button",
    openModalWithoutCloseButton
  )
  button("force open closable modal", forceOpenModalClosable)
  button("force open small modal", forceOpenSmallModal)
  button("force open medium modal", forceOpenMediumModal)
  button("force open large modal", forceOpenLargeModal)
  button(
    "force open modal without close button",
    forceOpenModalWithoutCloseButton
  )
  button("close modal", closeModal)
  button("force close modal", forceCloseModal)
  button("check modal", checkIfModalOpen)

  return <h2>Modal functions are available in knobs</h2>
}

storiesOf("Components|Modal", module)
  .add("Modal", () => {
    return <ModalUsage />
  })
  .addDecorator(withKnobs)
