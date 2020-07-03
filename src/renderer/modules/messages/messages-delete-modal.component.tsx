import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { intl, textFormatters } from "Renderer/utils/intl"
import { createFullName } from "Renderer/models/phone/phone.utils"
import { Author } from "Renderer/models/messages/messages.interface"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"

interface Props {
  deleting: boolean
  uniqueSelectedRows: Set<Author>
  selectedConversationsIdsNumber: number
  onDelete: () => void
}

const MessagesDeleteModal: FunctionComponent<Props> = ({
  deleting,
  uniqueSelectedRows,
  selectedConversationsIdsNumber,
  onDelete,
}) => {
  const caller = uniqueSelectedRows.values().next().value
  const nameAvailable = isNameAvailable(caller)
  return (
    <>
      {deleting ? (
        <DeleteModal
          deleting
          title={intl.formatMessage({
            id: "view.name.contacts",
          })}
          text={
            uniqueSelectedRows.size > 1
              ? intl.formatMessage(
                  {
                    id: "view.name.messages.deleteModal.text",
                  },
                  {
                    num: selectedConversationsIdsNumber,
                    ...textFormatters,
                  }
                )
              : intl.formatMessage(
                  {
                    id: "view.name.messages.deleteModal.uniqueText",
                  },
                  {
                    caller: nameAvailable
                      ? createFullName(uniqueSelectedRows.values().next().value)
                      : caller.primaryPhoneNumber,
                    num: selectedConversationsIdsNumber,
                    ...textFormatters,
                  }
                )
          }
        />
      ) : (
        <DeleteModal
          onDelete={onDelete}
          title={intl.formatMessage({
            id: "view.name.contacts",
          })}
          text={
            uniqueSelectedRows.size > 1
              ? intl.formatMessage(
                  {
                    id: "view.name.messages.deleteModal.text",
                  },
                  {
                    num: selectedConversationsIdsNumber,
                    ...textFormatters,
                  }
                )
              : intl.formatMessage(
                  {
                    id: "view.name.messages.deleteModal.uniqueText",
                  },
                  {
                    caller: nameAvailable
                      ? createFullName(uniqueSelectedRows.values().next().value)
                      : caller.primaryPhoneNumber,
                    num: selectedConversationsIdsNumber,
                    ...textFormatters,
                  }
                )
          }
        />
      )}
    </>
  )
}

export default MessagesDeleteModal
