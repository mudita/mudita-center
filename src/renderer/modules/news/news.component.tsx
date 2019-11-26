import React from "react"

import modalService from "Renderer/components/modal/modal.service"
import FunctionComponent from "Renderer/types/function-component.interface"

const News: FunctionComponent = () => {
  // TODO: Remove test implementation
  const modalOne = <div>Hi, I'm Modal One</div>
  const modalTwo = <div>Hi, I'm Modal Two</div>

  const openModal = () => {
    modalService.openModal(modalOne)
  }

  const openModalTwo = () => {
    modalService.openModal(modalTwo)
  }

  const forceOpenModalOne = () => {
    modalService.forceModal(modalOne)
  }

  const forceOpenModalTwo = () => {
    modalService.forceModal(modalTwo)
  }

  const closeModal = () => {
    modalService.closeCurrentModal()
  }

  const checkIfModalOpen = () => {
    alert(modalService.isModalOpen())
  }

  return (
    <>
      <div>News</div>
      <button onClick={openModal}>open modal one</button>
      <button onClick={openModalTwo}>open modal two</button>
      <button onClick={forceOpenModalOne}>force open modal one</button>
      <button onClick={forceOpenModalTwo}>force open modal two</button>
      <button onClick={closeModal}>close current modal</button>
      <button onClick={checkIfModalOpen}>check modal</button>
    </>
  )
}

export default News
