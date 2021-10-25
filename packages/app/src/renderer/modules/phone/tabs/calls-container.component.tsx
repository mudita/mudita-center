/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Calls from "Renderer/modules/phone/tabs/calls.component"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"
import { RootModel } from "Renderer/models/models"
import { TmpDispatch, select, ReduxRootState } from "Renderer/store"
import { isThreadOpenedSelector } from "App/messages/selectors"

const selection = select(({ calls, messages, contacts }) => ({
  calls: calls.filteredList,
  isContactCreated: contacts.isContactCreatedDeprecated,
  getContact: contacts.getContact,
}))

const mapStateToProps = (state: RootModel & ReduxRootState) => ({
  ...selection(state, {}),
  isThreadOpened: (phoneNumber: string) =>
    isThreadOpenedSelector(phoneNumber)(state),
})

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch.calls.changeVisibilityFilter(filter),
  deleteCall: (ids: string[]) => dispatch.calls.deleteCall(ids),
})

export default connect(mapStateToProps, mapDispatchToProps)(Calls)
