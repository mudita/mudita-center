/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const checkIsAnyOtherModalPresent = (modalId: string) => {
  return Array.from(document.querySelectorAll(".ReactModalPortal")).some(
    (modal) => {
      const childWithId = modal.querySelector("[data-modal-id]")
      const id = childWithId?.getAttribute("data-modal-id")
      return id !== modalId && modal.children.length > 0
    }
  )
}
