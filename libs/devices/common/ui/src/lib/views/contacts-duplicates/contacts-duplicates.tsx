/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent, useMemo } from "react"
import { Header } from "./header"
import { Empty } from "./empty"
import { List } from "./list"
import { LoadingModal } from "./loading-modal"

type Props = Pick<ComponentProps<typeof Header>, "onMergeAll"> &
  Pick<ComponentProps<typeof List>, "contacts" | "onMerge"> & {
    loading?: boolean
  }

export const ContactsDuplicates: FunctionComponent<Props> = ({
  contacts,
  onMerge,
  onMergeAll,
  loading = false,
}) => {
  const header = useMemo(() => {
    return (
      <Header
        duplicatesCount={contacts.length}
        onMergeAll={onMergeAll}
        loading={loading}
      />
    )
  }, [contacts.length, loading, onMergeAll])

  const list = useMemo(() => {
    return <List contacts={contacts} onMerge={onMerge} />
  }, [contacts, onMerge])

  const loadingModal = useMemo(() => {
    return <LoadingModal opened={loading} />
  }, [loading])

  if (contacts.length === 0) {
    return <Empty />
  }

  return (
    <>
      {header}
      {list}
      {loadingModal}
    </>
  )
}
