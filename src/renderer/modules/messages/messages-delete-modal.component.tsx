import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { intl, textFormatters } from "Renderer/utils/intl"
import { createFullName } from "Renderer/models/phone/phone.utils"
import { Topic } from "Renderer/models/messages/messages.interface"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  title: { id: "view.name.messages.deleteModal.title" },
  text: { id: "view.name.messages.deleteModal.text" },
  uniqueText: { id: "view.name.messages.deleteModal.uniqueText" },
})

interface Props {
  deleting: boolean
  uniqueSelectedRows: Topic[]
  selectedConversationsIdsCount: number
  onDelete: () => void
  resetRows?: UseTableSelect<Topic>["resetRows"]
}

const MessagesDeleteModal: FunctionComponent<Props> = ({
  deleting,
  uniqueSelectedRows,
  selectedConversationsIdsCount,
  onDelete,
  resetRows,
  ...rest
}) => {
  const caller = uniqueSelectedRows[0].caller
  const nameAvailable = isNameAvailable(caller)
  const text =
    uniqueSelectedRows.length > 1
      ? intl.formatMessage(messages.text, {
          num: selectedConversationsIdsCount,
          ...textFormatters,
        })
      : intl.formatMessage(messages.uniqueText, {
          caller: nameAvailable
            ? createFullName(caller)
            : caller.primaryPhoneNumber,
          num: selectedConversationsIdsCount,
          ...textFormatters,
        })

  return (
    <>
      {deleting ? (
        <DeleteModal
          deleting
          title={intl.formatMessage(messages.title)}
          text={text}
          {...rest}
        />
      ) : (
        <DeleteModal
          onDelete={onDelete}
          title={intl.formatMessage(messages.title)}
          text={text}
          onClose={resetRows}
          {...rest}
        />
      )}
    </>
  )
}

export default MessagesDeleteModal
