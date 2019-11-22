import { storiesOf } from "@storybook/react"
import * as React from "react"
import useModal from "Renderer/components/modal/modal.component"

const CounterModal = () => (
  <div>
    <p>This is counter modal</p>
  </div>
)

const ModalUsage = () => {
  const { open, close } = useModal(<CounterModal />)

  return (
    <div>
      <button onClick={open}>open modal</button>
      <button onClick={close}>close modal</button>
    </div>
  )
}

storiesOf("Components|Modal", module).add("Modal", () => {
  return <ModalUsage />
})
