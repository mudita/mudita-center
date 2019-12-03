import { button, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react"
import * as React from "react"
import { useEffect, useState } from "react"
import modalService from "Renderer/components/modal/modal.service"
import { LANGUAGE } from "Renderer/constants/languages"
import store from "Renderer/store"
import FunctionComponent from "Renderer/types/function-component.interface"

export const Modal: FunctionComponent = () => {
  const [closable, setClosableState] = useState(false)

  const toggle = () => {
    setClosableState(!closable)
  }

  useEffect(() => {
    modalService.allowClosingModal(closable)
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

  const modalOne = (
    <div>
      <h2>Hi, I'm Modal One</h2>
    </div>
  )
  const modalTwo = <Modal />

  const openModal = () => {
    modalService.openModal(modalOne)
  }

  const openModalTwo = () => {
    modalService.openModal(modalTwo)
  }

  const forceOpenModalOne = async () => {
    await modalService.openModal(modalOne, true)
  }

  const forceOpenModalTwo = async () => {
    await modalService.openModal(modalTwo, true)
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

  button("open modal one", openModal)
  button("open modal two", openModalTwo)
  button("force open modal one", forceOpenModalOne)
  button("force open modal two", forceOpenModalTwo)
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
