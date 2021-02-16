/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ModalProps } from "Renderer/components/core/modal/modal.component"

export interface ErrorModalProps extends ModalProps {
  title: string
  subtitle?: string
  body?: string
}
