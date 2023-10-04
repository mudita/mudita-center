import { configureStore } from "@reduxjs/toolkit"
import { backupReducer } from "App/backup/reducers/backup.reducer"
import { contactSupportReducer } from "App/contact-support/reducers/contact-support.reducer"
import { contactsReducer } from "App/contacts/reducers/contacts.reducer"
import { crashDumpReducer } from "App/crash-dump/reducers/crash-dump.reducer"
import { dataSyncReducer } from "App/data-sync/reducers/data-sync.reducer"
import { deviceReducer } from "App/device/reducers/device.reducer"
import { filesManagerReducer } from "App/files-manager/reducers/files-manager.reducer"
import { messagesReducer } from "App/messages/reducers/messages.reducer"
import { modalsManagerReducer } from "App/modals-manager/reducers/modals-manager.reducer"
import { newsReducer } from "App/news/reducers/news.reducer"
import { notificationReducer } from "App/notification/reducers/notification.reducer"
import { settingsReducer } from "App/settings/reducers/settings.reducer"
import { templateReducer } from "App/templates/reducers/template.reducer"
import { updateOsReducer } from "App/update/reducers/update-os.reducer"
import { reducers, combinedReducers } from "./reducers"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"

import thunk from "redux-thunk"

export const store = configureStore({
  reducer: {
    news: newsReducer,
    device: deviceReducer,
    // backup: backupReducer,
    // crashDump: crashDumpReducer,
    // messages: messagesReducer,
    // contacts: contactsReducer,
    // dataSync: dataSyncReducer,
    // modalsManager: modalsManagerReducer,
    // contactSupport: contactSupportReducer,
    // filesManager: filesManagerReducer,
    // notification: notificationReducer,
    // templates: templateReducer,
    // settings: settingsReducer,
    // update: updateOsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true,
      actionCreatorCheck: true,
    })
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
