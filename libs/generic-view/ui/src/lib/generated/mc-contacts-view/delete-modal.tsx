/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, IconType } from "generic-view/utils"

interface OtherFilesListItemConfig {
  id: string
  contactsToDelete: string
  singleContact?: boolean
}

const generateDeleteModal = ({
  id,
  contactsToDelete,
  singleContact,
}: OtherFilesListItemConfig): Subview => {
  return {
    [`${id}DeleteModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        `${id}DeleteModalIcon`,
        `${id}DeleteModalTitle`,
        `${id}DeleteModalContent`,
        `${id}DeleteModalButtons`,
      ],
    },
    [`${id}DeleteModalIcon`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.Exclamation,
      },
    },
    [`${id}DeleteModalTitle`]: {
      component: "modal.title",
      childrenKeys: [`${id}DeleteModalTitleText`],
    },
    [`${id}DeleteModalContent`]: {
      component: "p1-component",
      config: {
        text: "This can't be undone so please make a copy of any important information first.",
      },
    },
    [`${id}DeleteModalButtons`]: {
      component: "modal.buttons",
      childrenKeys: [
        `${id}DeleteModalCancelButton`,
        `${id}DeleteModalConfirmButton`,
      ],
    },
    [`${id}DeleteModalCancelButton`]: {
      component: "button-secondary",
      config: {
        text: "Cancel",
        actions: [
          {
            type: "close-modal",
            modalKey: "DeleteModal",
          },
        ],
      },
    },
    [`${id}DeleteModalConfirmButton`]: {
      component: "button-primary",
      config: {
        actions: [
          {
            type: "open-modal",
            modalKey: "deleteProgressModal",
            domain: "contacts-delete",
          },
          {
            type: "entities-delete",
            entitiesType: "contacts",
            ids: [],
            postActions: {
              success: [
                {
                  type: "close-domain-modals",
                  domain: "contacts-delete",
                },
                {
                  type: "open-toast",
                  toastKey: `${id}ContactsDeletedToast`,
                },
              ],
            },
          },
        ],
      },
      childrenKeys: [`${id}DeleteModalConfirmButtonText`],
      layout: {
        flexLayout: {
          direction: "row",
          justifyContent: "center",
        },
      },
      dataProvider: {
        source: "form-fields",
        formKey: "contactsForm",
        fields: [
          {
            providerField: contactsToDelete,
            componentField: singleContact
              ? "config.actions[1].ids[0]"
              : "config.actions[1].ids",
          },
        ],
      },
    },
    [`${id}DeleteModalConfirmButtonText`]: {
      component: "format-message",
      config: {
        messageTemplate: singleContact
          ? "Delete contact"
          : "Delete {contactsToDelete, plural, one {contact} other {contacts}}",
      },
      dataProvider: {
        source: "form-fields",
        formKey: "contactsForm",
        fields: [
          {
            providerField: contactsToDelete,
            componentField: "data.fields.contactsToDelete",
            modifier: "length",
          },
        ],
      },
    },
    [`${id}DeleteModalTitleText`]: {
      component: "format-message",
      config: {
        messageTemplate: singleContact
          ? "Delete contact"
          : "Delete {contactsToDelete, plural, one {contact} other {# contacts}}?",
      },
      dataProvider: {
        source: "form-fields",
        formKey: "contactsForm",
        fields: [
          {
            providerField: contactsToDelete,
            componentField: "data.fields.contactsToDelete",
            modifier: "length",
          },
        ],
      },
    },
    [`${id}ContactsDeletedToast`]: {
      component: "toast",
      childrenKeys: [
        `${id}ContactsDeletedToastIcon`,
        `${id}ContactsDeletedToastText`,
      ],
    },
    [`${id}ContactsDeletedToastIcon`]: {
      component: "icon",
      config: {
        type: IconType.Success,
      },
    },
    [`${id}ContactsDeletedToastText`]: {
      component: "p1-component",
      childrenKeys: [`${id}ContactsDeletedToastMessage`],
    },
    [`${id}ContactsDeletedToastMessage`]: {
      component: "format-message",
      config: {
        messageTemplate: singleContact
          ? "1 contact deleted"
          : "{contactsToDelete} {contactsToDelete, plural, one {contact} other {contacts}} deleted",
      },
      dataProvider: {
        source: "form-fields",
        formKey: "contactsForm",
        fields: [
          {
            providerField: contactsToDelete,
            componentField: "data.fields.contactsToDelete",
            modifier: "length",
          },
        ],
      },
    },
  }
}

export const generateDeleteModals = ({
  configs,
}: {
  configs: OtherFilesListItemConfig[]
}): Subview => {
  const initialDeleteModalConfig: Subview = {}

  return configs.reduce((previousValue, config) => {
    previousValue = {
      ...previousValue,
      ...generateDeleteModal(config),
    }
    return previousValue
  }, initialDeleteModalConfig)
}
