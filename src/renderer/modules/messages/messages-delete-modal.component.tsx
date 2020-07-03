import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { intl, textFormatters } from "Renderer/utils/intl"
import { createFullName } from "Renderer/models/phone/phone.utils"
import { Author } from "Renderer/models/messages/messages.interface"

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
                    caller: createFullName(
                      uniqueSelectedRows.values().next().value
                    ),
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
                    caller: createFullName(
                      uniqueSelectedRows.values().next().value
                    ),
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
