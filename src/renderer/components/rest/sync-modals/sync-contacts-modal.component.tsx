import React from "react"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"

interface SyncContactsModal {
  onClose?: () => void
}

const SyncContactsModal: FunctionComponent<SyncContactsModal> = ({
  onClose = noop,
}) => (
  <Modal size={ModalSize.Small} closeButton={false}>
    lala
  </Modal>
)

export default SyncContactsModal
