/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Calls from "App/__deprecated__/renderer/modules/phone/tabs/calls.component"
import { VisibilityFilter } from "App/__deprecated__/renderer/models/calls/calls.interface"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import { TmpDispatch, select, ReduxRootState } from "App/__deprecated__/renderer/store"
import { isThreadOpenedSelector } from "App/messages/selectors"
import { getContactSelector } from "App/contacts/selectors/get-contact.selector"
import { isContactCreatedSelector } from "App/contacts/selectors/is-contact-created.selector"

const selection = select(({ calls }) => ({
  calls: calls.filteredList,
}))

const mapStateToProps = (state: RootModel & ReduxRootState) => ({
  ...selection(state, {}),
  isContactCreated: (id: string) => isContactCreatedSelector(id)(state),
  getContact: (id: string) => getContactSelector(id)(state),
  isThreadOpened: (phoneNumber: string) =>
    isThreadOpenedSelector(phoneNumber)(state),
})

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch.calls.changeVisibilityFilter(filter),
  deleteCall: (ids: string[]) => dispatch.calls.deleteCall(ids),
})

export default connect(mapStateToProps, mapDispatchToProps)(Calls)
