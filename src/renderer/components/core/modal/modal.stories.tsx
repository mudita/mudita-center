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
  TitleOrder,
} from "Renderer/components/core/modal/modal.component"
import { ModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"

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

  const modelComponentVerySmall = (
    <Modal title={"Title"} size={ModalSize.VerySmall}>
      <h1>lala</h1>
    </Modal>
  )

  const modelComponentSmall = (
    <Modal title={"Title"} size={ModalSize.Small}>
      <h1>lala</h1>
    </Modal>
  )

  const modelComponentMedium = (
    <Modal title={"Title"} size={ModalSize.Medium}>
      <h1>lala</h1>
    </Modal>
  )

  const modelComponentLarge = (
    <Modal title={"Title"} subtitle={"Subtitle"} size={ModalSize.Large}>
      <h1>lala</h1>
    </Modal>
  )

  const modelComponentWithoutCloseButton = (
    <Modal title={"Title"} size={ModalSize.Small} closeable={false}>
      <h1>lala</h1>
    </Modal>
  )

  const openModalClosable = () => {
    modalService.openModal(modalClosable)
  }

  const openVerySmallModal = () => {
    modalService.openModal(modelComponentVerySmall)
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

  const forceOpenVerySmallModal = async () => {
    await modalService.openModal(modelComponentVerySmall, true)
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
  button("open very small modal component", openVerySmallModal)
  button("open small modal component", openSmallModal)
  button("open medium modal component", openMediumModal)
  button("open large modal component", openLargeModal)
  button(
    "open modal component without close button",
    openModalWithoutCloseButton
  )
  button("force open closable modal", forceOpenModalClosable)
  button("force open very small modal", forceOpenVerySmallModal)
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
  .add("Interactive", () => {
    return <ModalUsage />
  })
  .addDecorator(withKnobs)

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
        >
          <h1>lala</h1>
        </Modal>
      </ModalWrapper>
    )
  })
