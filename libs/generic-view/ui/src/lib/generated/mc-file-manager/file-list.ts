/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, IconType } from "generic-view/utils"
import { generateDeleteFiles } from "./delete-files"
import { McFileManagerConfig } from "generic-view/models"

interface FileListConfig {
  id: string
  name: string
  entitiesType: string
  supportedFileTypes?: string[]
  storagePath?: string
  internalStorage?: boolean
}

const CONFIG_MAP: Record<string, Omit<FileListConfig, "id">> = {
  audioFiles: {
    name: "Music",
    entitiesType: "audioFiles",
    supportedFileTypes: [
      "3gp",
      "mp4",
      "m4a",
      "aac",
      "ts",
      "amr",
      "flac",
      "mid",
      "xmf",
      "mxmf",
      "rtttl",
      "rtx",
      "ota",
      "imy",
      "mp3",
      "mkv",
      "wav",
      "ogg",
    ],
    storagePath: "/storage/emulated/0/Music",
  },
  imageFiles: {
    name: "Photos",
    entitiesType: "imageFiles",
    supportedFileTypes: [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "webp",
      "heic",
      "heif",
      "avif",
    ],
    storagePath: "/storage/emulated/0/Pictures",
  },
  ebookFiles: {
    name: "E-books",
    entitiesType: "ebookFiles",
    supportedFileTypes: ["epub", "pdf"],
    storagePath: "/storage/emulated/0/Documents",
  },
  applicationFiles: {
    name: "Apps",
    entitiesType: "applicationFiles",
  },
}

const getConfigByEntityType = (
  entityType: string,
  id: string
): FileListConfig | undefined => {
  return { ...CONFIG_MAP[entityType], id } || undefined
}

const generateFileList = ({
  id,
  name,
  entitiesType,
  storagePath,
  supportedFileTypes,
  internalStorage = true,
}: FileListConfig): Subview => {
  return {
    [`${id}fileListContainer`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "form-fields",
        formKey: "fileManagerForm",
        fields: [
          {
            providerField: "activeFileCategoryId",
            componentField: "data.render",
            condition: "eq",
            value: id,
          },
        ],
      },
      childrenKeys: [`${id}fileListForm`],
    },
    [`${id}fileListForm`]: {
      component: "form",
      config: {
        formOptions: {
          defaultValues: {
            selectedItems: [],
            allItems: [],
          },
        },
      },
      childrenKeys: [`${id}fileList`],
    },
    [`${id}fileList`]: {
      component: "block-plain",
      config: {
        borderLeft: "1px solid #d2d6db",
      },
      layout: {
        width: "656px",
        gridLayout: {
          rows: [],
          columns: [],
        },
      },
      childrenKeys: [`${id}fileListContent`],
    },
    [`${id}fileListContent`]: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: ["auto", "1fr"],
          columns: [],
        },
      },
      childrenKeys: [
        `${id}fileListEmptyStateWrapper`,
        `${id}fileListEmptyTableWrapper`,
      ],
    },
    [`${id}fileListEmptyStateWrapper`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "entities-metadata",
        entitiesType,
        fields: [
          {
            modifier: "length",
            providerField: "totalEntities",
            componentField: "data.render",
            condition: "eq",
            value: 0,
          },
        ],
      },
      childrenKeys: [`${id}fileListPanel`, `${id}fileListEmptyState`],
    },
    [`${id}fileListEmptyTableWrapper`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "entities-metadata",
        entitiesType,
        fields: [
          {
            modifier: "length",
            providerField: "totalEntities",
            componentField: "data.render",
            condition: "gt",
            value: 0,
          },
        ],
      },
      childrenKeys: [`${id}fileListPanelManager`, `${id}fileListEmptyTable`],
    },

    [`${id}fileListPanelManager`]: {
      component: "block-plain",
      childrenKeys: [
        `${id}fileListPanelDefaultMode`,
        `${id}fileListPanelSelectMode`,
      ],
      layout: {
        gridPlacement: {
          row: 1,
          column: 1,
          width: 1,
          height: 1,
        },
      },
    },
    [`${id}fileListPanelDefaultMode`]: {
      component: "conditional-renderer",
      childrenKeys: [`${id}fileListPanel`],
      dataProvider: {
        source: "form-fields",
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.render",
            modifier: "length",
            condition: "eq",
            value: 0,
          },
        ],
      },
    },
    [`${id}fileListPanel`]: {
      component: "block-plain",
      layout: {
        margin: "28px 32px",
        height: "40px",
        gridLayout: {
          rows: [],
          columns: ["auto", "auto"],
          alignItems: "center",
          justifyContent: "space-between",
        },
      },
      childrenKeys: [
        `${id}fileListPanelHeaderWrapper`,
        `${id}fileListEmptyStateAddFileButtonWrapper`,
      ],
    },
    [`${id}fileListPanelHeaderWrapper`]: {
      component: "h3-component",
      childrenKeys: [`${id}fileListPanelHeader`],
    },
    [`${id}fileListPanelHeader`]: {
      component: "format-message",
      config: {
        messageTemplate: `${name} {totalEntities, plural, =0 {} other { (#)}}`,
      },
      dataProvider: {
        source: "entities-metadata",
        entitiesType,
        fields: [
          {
            providerField: "totalEntities",
            componentField: "data.fields.totalEntities",
          },
        ],
      },
    },
    [`${id}fileListEmptyStateAddFileButtonWrapper`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "entities-metadata",
        entitiesType,
        fields: [
          {
            modifier: "length",
            providerField: "totalEntities",
            componentField: "data.render",
            condition: "gt",
            value: 0,
          },
        ],
      },
      childrenKeys: [`${id}fileListEmptyStateAddFileButton`],
    },
    [`${id}fileListPanelSelectMode`]: {
      component: "conditional-renderer",
      childrenKeys: [`${id}fileListPanelSelector`],
      dataProvider: {
        source: "form-fields",
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.render",
            modifier: "length",
            condition: "gt",
            value: 0,
          },
        ],
      },
    },
    [`${id}fileListPanelSelector`]: {
      component: "selection-manager",
      childrenKeys: [
        `${id}selectAllCheckbox`,
        `${id}selectedItemsCounter`,
        `${id}deleteButton`,
      ],
      layout: {
        margin: "28px 32px",
        padding: "8px 24px 8px 12px",
        gridLayout: {
          rows: ["auto"],
          columns: ["auto", "1fr", "auto"],
          alignItems: "center",
          columnGap: "14px",
        },
      },
    },
    [`${id}selectAllCheckbox`]: {
      component: "form.checkboxInput",
      config: {
        name: "selectedItems",
        size: "small",
      },
      dataProvider: {
        source: "form-fields",
        fields: [
          {
            providerField: "allItems",
            componentField: "config.multipleValues",
          },
        ],
      },
    },
    [`${id}selectedItemsCounter`]: {
      component: "p4-component",
      childrenKeys: [`${id}selectedItemsCounterText`],
    },
    [`${id}selectedItemsCounterText`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "{selectedItems} {selectedItems, plural, one {file} other {files}} selected",
      },
      dataProvider: {
        source: "form-fields",
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${id}deleteButton`]: {
      component: "button-text",
      config: {
        text: "Delete",
        icon: IconType.Delete,
        actions: [
          {
            type: "open-modal",
            modalKey: `${id}deleteModal`,
            domain: "files-delete",
          },
        ],
        modifiers: ["uppercase"],
      },
    },
    ...generateDeleteFiles(id, entitiesType),
    [`${id}fileListEmptyState`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        padding: "0 0 96px 0",
      },
      childrenKeys: [
        `${id}fileListEmptyStateHeader`,
        `${id}fileListEmptyStateDescription`,
        `${id}fileListEmptyStateAddFileButton`,
      ],
    },
    [`${id}fileListEmptyStateHeader`]: {
      component: "h4-component",
      layout: {
        margin: "0 0 8px 0",
      },
      config: {
        text: "We couldn't find any files",
      },
    },
    [`${id}fileListEmptyStateDescription`]: {
      component: "p3-component",
      layout: {
        margin: "0 auto 24px auto",
        width: "388px",
      },
      config: {
        text: "Add music files from your computer and they’ll transfer\nto your device automatically.",
        textAlign: "center",
      },
    },
    [`${id}fileListEmptyStateAddFileButton`]: {
      component: "button-primary",
      layout: {
        width: "156px",
      },
      config: {
        text: "Add file",
        actions:
          storagePath && supportedFileTypes
            ? [
                {
                  type: "file-upload",
                  storagePath,
                  fileTypes: supportedFileTypes,
                  entitiesType,
                },
              ]
            : [],
      },
    },
    [`${id}fileListEmptyTable`]: {
      component: "table",
      config: {
        formOptions: {
          selectedIdsFieldName: "selectedItems",
          allIdsFieldName: "allItems",
        },
      },
      dataProvider: {
        entitiesType,
        source: "entities-array",
        sort: [
          {
            field: "fileName",
            priority: 1,
            direction: "asc",
            orderingPatterns: ["/^[a-zA-Z0-9]/u", "/^[^a-zA-Z0-9]/u"],
            sensitivity: "base",
          },
        ],
        filters: [
          {
            field: "isInternal",
            patterns: [internalStorage ? "/^true$/m" : "/^false$/m"],
          },
        ],
      },
      childrenKeys: [
        `${id}headerCellCheckbox`,
        `${id}headerCellName`,
        `${id}headerCellType`,
        `${id}headerCellSize`,
        `${id}columnCheckbox`,
        `${id}columnName`,
        `${id}columnType`,
        `${id}columnSize`,
      ],
    },
    [`${id}headerCellCheckbox`]: {
      component: "table.headerCell",
      config: {
        width: "74",
      },
      layout: {
        padding: "14px 0 12px 32px",
      },
    },
    [`${id}headerCellName`]: {
      component: "table.headerCell",
      config: {
        width: "394px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`${id}headerCellNameText`],
    },
    [`${id}headerCellNameText`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Name",
      },
    },
    [`${id}headerCellType`]: {
      component: "table.headerCell",
      config: {
        width: "94px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`${id}headerCellTypeText`],
    },
    [`${id}headerCellTypeText`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Type",
      },
    },
    [`${id}headerCellSize`]: {
      component: "table.headerCell",
      config: {
        width: "88px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`${id}headerCellSizeText`],
    },
    [`${id}headerCellSizeText`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Size",
      },
    },
    [`${id}columnCheckbox`]: {
      component: "table.cell",
      config: {
        width: "74",
      },
      layout: {
        padding: "0 0 0 32px",
      },
      childrenKeys: [`${id}columnCheckboxTooltip`],
    },
    [`${id}columnCheckboxTooltip`]: {
      component: "tooltip",
      config: {
        offset: {
          x: 16,
          y: 14,
        },
        placement: "bottom-right",
      },
      childrenKeys: [
        `${id}contactCheckboxTooltipAnchor`,
        `${id}contactCheckboxTooltipContent`,
      ],
    },
    [`${id}contactCheckboxTooltipAnchor`]: {
      component: "tooltip.anchor",
      childrenKeys: [`${id}contactCheckbox`],
    },
    [`${id}contactCheckboxTooltipContent`]: {
      component: "tooltip.content",
      childrenKeys: [`${id}contactCheckboxTooltipContentTextWrapper`],
    },
    [`${id}contactCheckboxTooltipContentTextWrapper`]: {
      component: "p5-component",
      config: {
        color: "grey1",
      },
      childrenKeys: [`${id}contactCheckboxTooltipContentText`],
    },
    [`${id}contactCheckboxTooltipContentText`]: {
      component: "format-message",
      config: {
        messageTemplate: "Select",
      },
    },
    [`${id}contactCheckbox`]: {
      component: "form.checkboxInput",
      config: {
        name: "selectedItems",
        size: "small",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType,
        fields: [
          {
            providerField: "id",
            componentField: "config.value",
          },
        ],
      },
    },
    [`${id}columnName`]: {
      component: "table.cell",
      config: {
        width: "394px",
      },
      layout: {
        padding: "0 32px 0 0",
      },
      childrenKeys: [`${id}columnNameText`],
    },
    [`${id}columnNameText`]: {
      component: "p1-component",
      config: {
        color: "black",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType,
        fields: [
          {
            providerField: "fileName",
            componentField: "config.text",
          },
        ],
      },
    },
    [`${id}columnType`]: {
      component: "table.cell",
      config: {
        width: "94px",
      },
      childrenKeys: [`${id}columnTypeText`],
    },
    [`${id}columnTypeText`]: {
      component: "p3-component",
      config: {
        color: "black",
        textTransform: "uppercase",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType,
        fields: [
          {
            providerField: "extension",
            componentField: "config.text",
          },
        ],
      },
    },
    [`${id}columnSize`]: {
      component: "table.cell",
      config: {
        width: "88px",
      },
      childrenKeys: [`${id}columnSizeText`],
    },
    [`${id}columnSizeText`]: {
      component: "p3-component",
      config: {
        color: "black",
        textTransform: "format-bytes",
        textTransformOptions: {
          minUnit: "KB",
        },
      },
      dataProvider: {
        source: "entities-field",
        entitiesType,
        fields: [
          {
            providerField: "fileSize",
            componentField: "config.text",
          },
        ],
      },
    },
  }
}

export const generateFileListWrapper = (
  entities: McFileManagerConfig["entities"]
): Subview => {
  const initialListConfig: Subview = {
    fileListWrapper: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: [],
          columns: [],
        },
      },
      childrenKeys: [],
    },
  }

  return entities.reduce((previousValue, entity, index) => {
    const config = getConfigByEntityType(entity.entityType, String(index))
    if (!config) {
      return previousValue
    }
    const categoryItemKey = `${config.id}fileListContainer`
    previousValue["fileListWrapper"]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateFileList(config),
    }
    return previousValue
  }, initialListConfig)
}
