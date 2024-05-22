/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const getOpenModals = () => {
  return Array.from(document.querySelectorAll(".ReactModalPortal")).filter(
    ({ children }) => children.length > 0
  )
}

export const checkIsAnyModalPresent = (): boolean => {
  return getOpenModals().length > 0
}

export const checkIsAnyOtherModalPresent = (modalId: string): boolean => {
  return getOpenModals().some(
    (modal) => {
      const childWithId = modal.querySelector("[data-modal-id]")
      const id = childWithId?.getAttribute("data-modal-id")
      return id !== modalId
    }
  )
}
