// import React, { createContext, useContext } from "react"
// import modalService, {
//   ModalService,
// } from "Renderer/components/core/modal/modal.service"
// import FunctionComponent from "Renderer/types/function-component.interface"
//
// const ModalContext = createContext(modalService)
//
// interface Props {
//   service: ModalService
// }
//
// const ModalProvider: FunctionComponent<Props> = ({ service, children }) => {
//   return (
//     <ModalContext.Provider value={service}>{children}</ModalContext.Provider>
//   )
// }
//
// export const useModalServiceContext = () => useContext(ModalContext)
//
// export default ModalProvider
