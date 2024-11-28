/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentPropsByName } from "generic-view/utils"

interface FileListConfig {
  id: string
  name: string
  entitiesType: string
}

const generateFileList = ({
  id,
  name,
  entitiesType,
}: FileListConfig): {
  [key: string]: ComponentPropsByName
} => {
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
            selectedFiles: [],
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
          rows: ["auto", "1fr"],
          columns: [],
        },
      },
      childrenKeys: [`${id}fileListPanel`, `${id}fileListContent`],
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
    [`${id}fileListContent`]: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: [],
          columns: [],
        },
      },
      childrenKeys: [`${id}fileListEmptyState`],
    },
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
        width: "362px",
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
        actions: [],
      },
    },
  }
}

export const generateFileListWrapper = ({
  configs,
}: {
  configs: FileListConfig[]
}): {
  [key: string]: ComponentPropsByName
} => {
  const initialListConfig: { [key: string]: ComponentPropsByName } = {
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

  return configs.reduce((previousValue, config) => {
    const categoryItemKey = `${config.id}fileListContainer`
    previousValue["fileListWrapper"]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateFileList(config),
    }
    return previousValue
  }, initialListConfig)
}
