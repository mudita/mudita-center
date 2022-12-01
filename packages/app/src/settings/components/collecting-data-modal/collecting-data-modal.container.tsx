/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { TmpDispatch } from "App/__deprecated__/renderer/store"
import { CollectingDataModal } from "App/settings/components/collecting-data-modal/collecting-data-modal.component"
import { hideCollectingDataModal } from "App/modals-manager/actions"
import { toggleCollectionData } from "App/settings/actions"

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  closeModal: () => dispatch(hideCollectingDataModal()),
  toggleCollectionData: (value: boolean) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(toggleCollectionData(value)),
})

export const CollectingDataModalContainer = connect(
  undefined,
  mapDispatchToProps
)(CollectingDataModal)
