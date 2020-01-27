import Faker from "faker"
import React, { MouseEvent } from "react"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { RowRendererProps } from "Renderer/components/core/table-old/table.interface"

// Fake columns
export const columnsBasic = [
  {
    label: "name",
    permanent: true,
    size: "3fr",
    renderTemplate: ({ firstName, lastName }: RowRendererProps<SingleRow>) => (
      <p>
        {firstName} {lastName}
      </p>
    ),
  },
  {
    label: "phone",
    size: "2fr",
    renderTemplate: ({ phoneNumber }: RowRendererProps<SingleRow>) => (
      <p>{phoneNumber}</p>
    ),
  },
  {
    size: "3rem",
    renderTemplate: ({ _uid }: RowRendererProps<SingleRow>) => {
      const onClick = (e: MouseEvent) => {
        e.stopPropagation()
        alert(`clicked actions button for row with ID: ${_uid}`)
      }
      return <div onClick={onClick}>• • •</div>
    },
  },
]

export const columnsWithoutLabels = columnsBasic.map(({ label, ...col }) => col)

export const columnsSelectable = [
  {
    permanent: true,
    size: "4rem",
    renderTemplate: ({
      _selected,
      _selectMode,
      _toggleSelection,
    }: RowRendererProps<SingleRow>) => {
      const onChange = () => _toggleSelection()
      const onClick = (e: MouseEvent) => e.stopPropagation()
      return (
        <div>
          <InputCheckbox
            onChange={onChange}
            onClick={onClick}
            checked={_selected}
          />
          {_selectMode && <span>avatar</span>}
        </div>
      )
    },
  },
  {
    label: "name",
    permanent: true,
    size: "3fr",
    renderTemplate: ({ firstName, lastName }: RowRendererProps<SingleRow>) => (
      <p>
        {firstName} {lastName}
      </p>
    ),
  },
  {
    label: "phone",
    size: "2fr",
    renderTemplate: ({ phoneNumber }: RowRendererProps<SingleRow>) => (
      <p>{phoneNumber}</p>
    ),
  },
  {
    size: "3rem",
    renderTemplate: ({ _uid }: RowRendererProps<SingleRow>) => {
      const onClick = (e: MouseEvent) => {
        e.stopPropagation()
        alert(`clicked actions button for row with ID: ${_uid}`)
      }
      return <div onClick={onClick}>• • •</div>
    },
  },
]

export const columnsStructured = [
  {
    permanent: true,
    size: "4rem",
    renderTemplate: ({
      _selected,
      _indeterminate,
      _toggleSelection,
    }: RowRendererProps<StructuredSingleRow>) => {
      const onChange = () => _toggleSelection()
      const onClick = (e: MouseEvent) => e.stopPropagation()
      return (
        <InputCheckbox
          onChange={onChange}
          onClick={onClick}
          checked={_selected}
          indeterminate={_indeterminate}
        />
      )
    },
  },
  {
    label: "file type",
    permanent: true,
    size: "3fr",
    renderTemplate: ({
      fileType,
      _uid,
      _selected,
      _indeterminate,
    }: RowRendererProps<StructuredSingleRow>) => (
      <>
        <span>{fileType}</span>
        <br />
        <span>{_uid}</span>
      </>
    ),
  },
  {
    label: "last backup",
    size: "2fr",
    renderTemplate: ({ lastBackup }: RowRendererProps<StructuredSingleRow>) => (
      <span>{new Date(lastBackup).toLocaleString()}</span>
    ),
  },
  {
    label: "size",
    size: "4rem",
    renderTemplate: ({ size }: RowRendererProps<StructuredSingleRow>) => (
      <span>{size}</span>
    ),
  },
]

// Generate rows data
export const basicRows = Array.from({
  length: Math.round(15 + Math.random() * 25),
}).map(() => ({
  id: Faker.random.uuid(),
  firstName: Faker.name.firstName(),
  lastName: Faker.name.lastName(),
  phoneNumber: Faker.phone.phoneNumber(),
  address: {
    zip: Faker.address.zipCode(),
    city: Faker.address.city(),
    country: Faker.address.country(),
  },
  _uid: Faker.random.uuid(),
}))

export const labeledRows = Array.from({
  length: 15,
})
  .map((_, index) => {
    const favourite = index === 0 ? true : Math.random() < 0.2
    const firstName = Faker.name.firstName()
    const group = firstName.charAt(0)
    return {
      id: Faker.random.uuid(),
      firstName,
      lastName: Faker.name.lastName(),
      phoneNumber: Faker.phone.phoneNumber(),
      favourite,
      address: {
        zip: Faker.address.zipCode(),
        city: Faker.address.city(),
        country: Faker.address.country(),
      },
      _group: group,
      _uid: Faker.random.uuid(),
    }
  })
  .sort((a, b) => {
    return a.firstName > b.firstName ? 1 : -1
  })

// Copy rows with favourite key equal to true
// to the beginning of array and change their's labels to "Favourite"
labeledRows.unshift(
  ...labeledRows
    .filter(row => row.favourite)
    .map(row => {
      return {
        ...row,
        _group: "Favourite",
      }
    })
)

export const structuredRows = [
  {
    _uid: Faker.random.uuid(),
    fileType: "Messages",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    _uid: Faker.random.uuid(),
    fileType: "Contacts",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    _uid: Faker.random.uuid(),
    fileType: "Files",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
    _children: [
      {
        _uid: Faker.random.uuid(),
        fileType: "Music files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
      {
        _uid: Faker.random.uuid(),
        fileType: "Recorded files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
        _children: [
          {
            _uid: Faker.random.uuid(),
            fileType: "Music files",
            lastBackup: Faker.date.past(),
            size: `${Faker.random.number(64)}.${Faker.random.number(
              9
            )}${Faker.random.number(9)} MB`,
          },
          {
            _uid: Faker.random.uuid(),
            fileType: "Recorded files",
            lastBackup: Faker.date.past(),
            size: `${Faker.random.number(64)}.${Faker.random.number(
              9
            )}${Faker.random.number(9)} MB`,
          },
          {
            _uid: Faker.random.uuid(),
            fileType: "Storage files",
            lastBackup: Faker.date.past(),
            size: `${Faker.random.number(64)}.${Faker.random.number(
              9
            )}${Faker.random.number(9)} MB`,
            _children: [
              {
                _uid: Faker.random.uuid(),
                fileType: "Music files",
                lastBackup: Faker.date.past(),
                size: `${Faker.random.number(64)}.${Faker.random.number(
                  9
                )}${Faker.random.number(9)} MB`,
              },
              {
                _uid: Faker.random.uuid(),
                fileType: "Recorded files",
                lastBackup: Faker.date.past(),
                size: `${Faker.random.number(64)}.${Faker.random.number(
                  9
                )}${Faker.random.number(9)} MB`,
                _children: [
                  {
                    _uid: Faker.random.uuid(),
                    fileType: "Music files",
                    lastBackup: Faker.date.past(),
                    size: `${Faker.random.number(64)}.${Faker.random.number(
                      9
                    )}${Faker.random.number(9)} MB`,
                  },
                  {
                    _uid: Faker.random.uuid(),
                    fileType: "Recorded files",
                    lastBackup: Faker.date.past(),
                    size: `${Faker.random.number(64)}.${Faker.random.number(
                      9
                    )}${Faker.random.number(9)} MB`,
                  },
                  {
                    _uid: Faker.random.uuid(),
                    fileType: "Storage files",
                    lastBackup: Faker.date.past(),
                    size: `${Faker.random.number(64)}.${Faker.random.number(
                      9
                    )}${Faker.random.number(9)} MB`,
                  },
                ],
              },
              {
                _uid: Faker.random.uuid(),
                fileType: "Storage files",
                lastBackup: Faker.date.past(),
                size: `${Faker.random.number(64)}.${Faker.random.number(
                  9
                )}${Faker.random.number(9)} MB`,
                _children: [
                  {
                    _uid: Faker.random.uuid(),
                    fileType: "Music files",
                    lastBackup: Faker.date.past(),
                    size: `${Faker.random.number(64)}.${Faker.random.number(
                      9
                    )}${Faker.random.number(9)} MB`,
                  },
                  {
                    _uid: Faker.random.uuid(),
                    fileType: "Recorded files",
                    lastBackup: Faker.date.past(),
                    size: `${Faker.random.number(64)}.${Faker.random.number(
                      9
                    )}${Faker.random.number(9)} MB`,
                  },
                  {
                    _uid: Faker.random.uuid(),
                    fileType: "Storage files",
                    lastBackup: Faker.date.past(),
                    size: `${Faker.random.number(64)}.${Faker.random.number(
                      9
                    )}${Faker.random.number(9)} MB`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        _uid: Faker.random.uuid(),
        fileType: "Storage files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
    ],
  },
  {
    _uid: Faker.random.uuid(),
    fileType: "Notes",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    _uid: Faker.random.uuid(),
    fileType: "Meditation timer data",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
]

export type SingleRow = typeof basicRows[number]

export type LabeledSingleRow = typeof labeledRows[number]

export type StructuredSingleRow = typeof structuredRows[number]
