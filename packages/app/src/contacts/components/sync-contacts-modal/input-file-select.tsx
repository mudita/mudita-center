/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { SyncContactsModalTestIds } from "App/contacts/components/sync-contacts-modal/sync-contacts-modal-test-ids.enum"

export interface Props {
  accept?: string
  onManualImportClick: (inputElement: HTMLInputElement) => void
  onCancelManualImportClick: () => void
}

const InputFileSelect = React.forwardRef<HTMLInputElement, Props>(
  ({ accept = ".vcf", onCancelManualImportClick }, fileInputRef) => {
    const handleFocusBack = () => {
      onCancelManualImportClick()
      window.removeEventListener("focus", handleFocusBack)
    }

    return (
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        hidden
        multiple
        data-testid={SyncContactsModalTestIds.FileInput}
        onClick={() => {
          window.addEventListener("focus", handleFocusBack)
        }}
        onChange={() => {
          window.removeEventListener("focus", handleFocusBack)
        }}
      />
    )
  }
)

export default InputFileSelect
