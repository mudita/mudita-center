import moment from "moment"
import React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size as ButtonSize,
} from "Renderer/components/core/button/button.config"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { Size as CheckboxSize } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  Col,
  EmptyState,
  Labels,
  RowSize,
  TableSortButton,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Checkbox } from "Renderer/components/rest/calls/calls-table.styled"
import { NotesTestIds } from "Renderer/modules/tools/tabs/notes.enum"
import {
  FiltersWrapper,
  Row,
  NewNoteButton,
  SearchInput,
  SelectionManager,
  NotesSidebar,
  TextPreview,
  Table,
  TextCut,
  DeleteCol,
  TextInfo,
} from "Renderer/modules/tools/tabs/notes.styled"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { intl, textFormatters } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import useTableSidebar from "Renderer/utils/hooks/use-table-sidebar"
import {
  normalizeText,
  useTextEditor,
} from "Renderer/components/core/text-editor/text-editor.hook"
import { defineMessages } from "react-intl"
import TextEditor from "Renderer/components/core/text-editor/text-editor.component"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"
import { isToday } from "Renderer/utils/is-today"
import { NoteCallback } from "Renderer/models/notes/notes"
import { makeNewNote } from "Renderer/models/notes/make-new-note"
import { SortOrder } from "Common/enums/sort-order.enum"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { Message } from "Renderer/interfaces/message.interface"

const messages = defineMessages({
  searchPlaceholder: {
    id: "view.name.tools.notes.searchPlaceholder",
  },
  searchNotes: {
    id: "view.name.tools.notes.searchNotes",
  },
  emptyListTitle: {
    id: "view.name.tools.notes.emptyList.title",
  },
  emptyListNoNotes: {
    id: "view.name.tools.notes.emptyList.noNotes",
  },
  emptyListNotFound: {
    id: "view.name.tools.notes.emptyList.notFound",
  },
  newNote: {
    id: "view.name.tools.notes.newNote",
  },
  unsavedNote: {
    id: "view.name.tools.notes.unsavedNote",
  },
  note: {
    id: "view.name.tools.notes.note",
  },
  edited: {
    id: "view.name.tools.notes.edited",
  },
  today: {
    id: "view.generic.today",
  },
  selectionsNumber: {
    id: "view.name.tools.notes.selectionsNumber",
  },
  newButton: {
    id: "view.name.tools.notes.newButton",
  },
  deleteButton: {
    id: "view.name.tools.notes.deleteButton",
  },
  charactersNumber: { id: "view.name.tools.notes.editor.charactersNumber" },
  emptyNoteText: { id: "view.name.tools.notes.emptyNote" },
  deleteModalTitle: { id: "view.name.tools.notes.deleteModal.title" },
  deleteModalSingleThreadText: {
    id: "view.name.tools.notes.deleteModal.singleThreadText",
  },
  deleteModalMultipleThreadText: {
    id: "view.name.tools.notes.deleteModal.multipleThreadText",
  },
})

export interface Note {
  date: Date
  content: string
  id: string
}

interface NotesProps {
  notes: Note[]
  newNoteId?: string
  createNewNote: (noteCallback: NoteCallback) => void
  saveNote: (note: Note) => void
  onRemoveNotes: (ids: string[]) => void
  sortOrder: SortOrder
  changeSortOrder: (sortOrder: SortOrder) => void
}

const Notes: FunctionComponent<NotesProps> = ({
  notes,
  newNoteId,
  createNewNote,
  saveNote,
  onRemoveNotes,
  sortOrder,
  changeSortOrder,
}) => {
  const maxCharacters = 4000
  const {
    getRowStatus,
    toggleRow,
    resetRows,
    noneRowsSelected: noRowsSelected,
    allRowsSelected,
    selectedRows,
    toggleAll,
  } = useTableSelect<Note>(notes)
  const {
    openSidebar,
    closeSidebar,
    activeRow,
    sidebarOpened,
  } = useTableSidebar<Note>()

  const { rejectChanges, ...textEditorHook } = useTextEditor(activeRow)
  const {
    temporaryText: { length: textLength },
  } = textEditorHook

  const getSingleThreadDeleteMessage = (): Message => {
    return {
      ...messages.deleteModalSingleThreadText,
      values: {
        ...textFormatters,
      },
    }
  }

  const getMultipleThreadDeleteMessage = (ids: string[]): Message => {
    return {
      ...messages.deleteModalMultipleThreadText,
      values: {
        num: allRowsSelected ? -1 : ids.length,
        ...textFormatters,
      },
    }
  }

  const remove = (ids: string[]) => {
    const title = intl.formatMessage(messages.deleteModalTitle)
    const message =
      ids.length === 1
        ? getSingleThreadDeleteMessage()
        : getMultipleThreadDeleteMessage(ids)
    const onDelete = () => {
      onRemoveNotes(ids)
      resetRows()
      modalService.closeModal()
    }
    modalService.openModal(
      <DeleteModal
        title={title}
        message={message}
        onClose={resetRows}
        onDelete={onDelete}
      />
    )
  }

  const removeSelectedRows = () => remove(selectedRows.map(({ id }) => id))
  const selectionManagerVisible = selectedRows.length > 0
  const notesAvailable = notes.length > 0

  const onNewButtonClick = () => {
    createNewNote(openSidebar)
  }

  const tryToSave = () => {
    if (activeRow) {
      const content = textEditorHook.temporaryText
      const { id } = activeRow

      saveNote(makeNewNote(id, content))
    }
  }

  const handleChangesReject = () => {
    rejectChanges()
    if (newNoteId && activeRow?.id === newNoteId) {
      onRemoveNotes([newNoteId])
      closeSidebar()
    }
  }

  const toggleSortOrder = () => {
    if (sortOrder === SortOrder.Descending) {
      changeSortOrder(SortOrder.Ascending)
    } else {
      changeSortOrder(SortOrder.Descending)
    }
  }

  return (
    <>
      <FiltersWrapper>
        {selectionManagerVisible ? (
          <SelectionManager
            data-testid={NotesTestIds.SelectionElement}
            selectedItemsNumber={selectedRows.length}
            allItemsSelected={selectedRows.length === notes.length}
            onToggle={toggleAll}
            message={messages.selectionsNumber}
            checkboxSize={CheckboxSize.Small}
            buttons={[
              <ButtonComponent
                key="delete"
                label={intl.formatMessage(messages.deleteButton)}
                displayStyle={DisplayStyle.Link1}
                Icon={Type.Delete}
                onClick={removeSelectedRows}
              />,
            ]}
          />
        ) : (
          <SearchInput
            data-testid={NotesTestIds.SearchElement}
            type={"search"}
            disabled={!notesAvailable}
            label={intl.formatMessage(
              notesAvailable ? messages.searchNotes : messages.emptyListNoNotes
            )}
            outlined
          />
        )}
        <NewNoteButton
          displayStyle={DisplayStyle.Primary}
          size={ButtonSize.FixedBig}
          label={intl.formatMessage(messages.newButton)}
          onClick={onNewButtonClick}
          Icon={Type.PlusSign}
          data-testid={NotesTestIds.NewNoteButton}
          disabled={Boolean(newNoteId)}
        />
      </FiltersWrapper>

      <TableWithSidebarWrapper>
        {notesAvailable ? (
          <Table
            hideColumns={Boolean(activeRow)}
            hideableColumnsIndexes={[2, 3, 4]}
            role="list"
          >
            <Labels size={RowSize.Small}>
              <Col />
              <Col>
                <Text message={messages.note} />
              </Col>
              <Col />
              <Col
                onClick={toggleSortOrder}
                data-testid={NotesTestIds.SortColumn}
              >
                <Text message={messages.edited} />
                <TableSortButton sortOrder={sortOrder} />
              </Col>
              <Col />
            </Labels>
            <div data-testid={NotesTestIds.ItemsWrapper}>
              {notes.map((note) => {
                const { id, content, date } = note
                const { selected } = getRowStatus(note)
                const { getTemporaryValue } = useTemporaryStorage<string>(
                  id,
                  content
                )

                const editedNote =
                  normalizeText(getTemporaryValue()) !== normalizeText(content)

                const newNote = id === newNoteId

                const emptyNote = getTemporaryValue().length === 0
                const text = emptyNote
                  ? intl.formatMessage(messages.emptyNoteText)
                  : (editedNote
                      ? getTemporaryValue()
                      : normalizeText(content)
                    ).substr(0, 250)

                const toggle = () => {
                  if (sidebarOpened) {
                    closeSidebar()
                  }
                  toggleRow(note)
                }

                const handleTextPreviewClick = () => {
                  noRowsSelected ? openSidebar(note) : toggle()
                }

                const removeNote = () => remove([id])

                return (
                  <Row
                    key={id}
                    data-testid={NotesTestIds.Note}
                    active={activeRow?.id === id}
                    role="listitem"
                  >
                    <Col>
                      <Checkbox
                        data-testid={NotesTestIds.Checkbox}
                        checked={selected}
                        onChange={toggle}
                        size={CheckboxSize.Small}
                        visible={!noRowsSelected}
                      />
                    </Col>
                    <TextPreview onClick={handleTextPreviewClick}>
                      <TextCut displayStyle={TextDisplayStyle.LargeText}>
                        {emptyNote ? <em>{text}</em> : text}
                      </TextCut>
                    </TextPreview>
                    <Col>
                      {(editedNote || newNote) && (
                        <TextInfo>
                          {newNote && (
                            <>
                              <em>{intl.formatMessage(messages.newNote)}</em>
                              <br />
                            </>
                          )}
                          <em>{intl.formatMessage(messages.unsavedNote)}</em>
                        </TextInfo>
                      )}
                    </Col>
                    <Col onClick={noop}>
                      <Text displayStyle={TextDisplayStyle.LargeText}>
                        {isToday(date)
                          ? intl.formatMessage(messages.today)
                          : moment(date).format("ll")}
                      </Text>
                    </Col>
                    <DeleteCol onClick={removeNote}>
                      <Icon type={Type.Delete} width={IconSize.Medium} />
                    </DeleteCol>
                  </Row>
                )
              })}
            </div>
          </Table>
        ) : (
          <EmptyState
            title={messages.emptyListTitle}
            description={messages.emptyListNoNotes}
            data-testid={NotesTestIds.Empty}
          />
        )}
        <NotesSidebar
          show={Boolean(activeRow)}
          onClose={closeSidebar}
          data-testid={NotesTestIds.NewNoteSidebar}
        >
          {activeRow && (
            <TextEditor
              {...textEditorHook}
              onChangesReject={handleChangesReject}
              statsInfoError={textLength > maxCharacters}
              statsInfo={intl.formatMessage(messages.charactersNumber, {
                currentCharacters: textLength,
                maxCharacters,
              })}
              autoFocus={newNoteId === activeRow?.id}
              onChangesSave={tryToSave}
            />
          )}
        </NotesSidebar>
      </TableWithSidebarWrapper>
    </>
  )
}

export default Notes
