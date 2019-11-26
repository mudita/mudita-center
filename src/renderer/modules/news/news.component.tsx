import React from "react"

import modalService from "Renderer/components/modal/modal.service"
import FunctionComponent from "Renderer/types/function-component.interface"

const News: FunctionComponent = () => {
  const modal = <div>Hi, my name is Modal</div>

  const openModal = () => {
    modalService.openModal(modal)
  }

  const forceOpenModal = () => {
    modalService.forceModal(modal)
  }

  const closeModal = () => {
    modalService.closeCurrentModal()
  }

  return (
    <>
      <div>News</div>
      <button onClick={openModal}>open modal</button>
      <button onClick={forceOpenModal}>force open modal</button>
      <button onClick={closeModal}>close modal</button>
    </>
  )
}

export default News
