/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"

enum Event {
  ItemFinished = "itemFinished",
  ItemsAdded = "itemsAdded",
  AbortCurrentItems = "abortCurrentItems",
}

interface QueueItem {
  id: string
  task: (abortController: AbortController) => Promise<void>
}

export class Queue {
  private processing = false
  private eventEmitter = new EventEmitter()

  private items: QueueItem[] = []

  constructor() {
    this.eventEmitter.on(Event.ItemFinished, () => {
      void this.processNext()
    })

    this.eventEmitter.on(Event.ItemsAdded, () => {
      void this.processNext()
    })
  }

  clear() {
    this.eventEmitter.emit(Event.AbortCurrentItems)
    this.items = []
    this.processing = false
  }

  destroy() {
    this.clear()
    this.eventEmitter.removeAllListeners()
  }

  add(items: QueueItem[]) {
    if (this.items.length !== 0) {
      this.eventEmitter.emit(Event.AbortCurrentItems)
    }
    this.items = items
    this.eventEmitter.emit(Event.ItemsAdded)
  }

  remove(itemId: QueueItem["id"]) {
    this.items = this.items.filter((i) => i.id !== itemId)
  }

  private processNext = async () => {
    if (this.items.length === 0 || this.processing) {
      return
    }

    const abortController = new AbortController()

    const abortListener = () => {
      abortController.abort()
      this.eventEmitter.removeListener(Event.AbortCurrentItems, abortListener)
    }
    this.eventEmitter.once(Event.AbortCurrentItems, abortListener)

    if (abortController.signal.aborted) {
      return
    }

    this.processing = true
    const nextItem = this.items.shift()
    if (nextItem) {
      try {
        await nextItem.task(abortController)
      } finally {
        this.processing = false
        this.eventEmitter.removeListener(Event.AbortCurrentItems, abortListener)
        this.eventEmitter.emit(Event.ItemFinished)
      }
    }
  }
}
