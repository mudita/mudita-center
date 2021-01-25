import { ModalProps } from "Renderer/components/core/modal/modal.component"

export interface ErrorModalProps extends ModalProps {
  title: string
  subtitle?: string
  body?: string
}
