/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect, ConnectedProps } from "react-redux"
import {
  ReduxRootState,
  TmpDispatch,
  RootState,
} from "App/__deprecated__/renderer/store"
import { getContactByPhoneNumberSelector } from "App/contacts/selectors/get-contact-by-phone-number.selector"
import { resendMessage } from "App/messages/actions/resend-message.action"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  results: state.messages.data.searchResult.message ?? [],
  resultsState: state.messages.data.threadsState,
  getContactByPhoneNumber: (phoneNumber: string) =>
    getContactByPhoneNumberSelector(phoneNumber)(state),
  language: state.settings.language,
})

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  resendMessage: (messageId: string) => dispatch(resendMessage(messageId)),
})

export const connector = connect(mapStateToProps, mapDispatchToProps)

export type MessagesSearchResultsReduxProps = ConnectedProps<typeof connector>
