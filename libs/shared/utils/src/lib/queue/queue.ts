/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"

enum ItemEvent {
  Finished = "finished",
}

interface Item {
  id: string
  task: (task: Omit<Item, "task" | "abortController">) => Promise<void>
  priority: number
  abortController: AbortController
}

type ResponseItem = Omit<Item, "abortController"> & {
  reason?: "removed" | "aborted" | Error
}

/**
 * Queue class that manages a list of tasks to be processed in order of priority.
 * It allows adding, removing, and processing tasks with a specified interval.
 * Each task can be aborted, and the queue can handle a maximum capacity.
 */
export class Queue {
  private queue: Item[] = []
  private eventEmitter = new EventEmitter()
  private currentItem?: Item
  private processing = false
  private scheduledStart = false
  private readonly interval: number
  private readonly capacity?: number

  /**
   * Creates a new Queue instance.
   * @param options - Configuration options for the queue.
   * @param options.interval - Time in milliseconds to wait between processing next tasks. Defaults to 0.
   * @param options.capacity - Maximum number of items in the queue. If exceeded, the lowest-priority items will be aborted and removed. Defaults to no limit.
   */
  constructor(
    options: {
      interval?: number
      capacity?: number
    } = {}
  ) {
    this.interval = options.interval || 0
    this.capacity = options.capacity
  }

  private async processQueue() {
    this.processing = true
    while (this.queue.length > 0) {
      const item = this.queue.shift()!
      this.currentItem = item
      const { signal } = item.abortController
      await new Promise<void>((resolve) => setTimeout(resolve, 0))
      if (signal.aborted) continue
      try {
        await item.task({ id: item.id, priority: item.priority })
        this.eventEmitter.emit(ItemEvent.Finished, item.id)
      } catch (error) {
        item.abortController.abort(
          error instanceof Error ? error : new Error(String(error))
        )
      }
      await new Promise((resolve) => {
        return setTimeout(resolve, this.interval)
      })
    }
    this.currentItem = undefined
    this.processing = false
  }

  /**
   * Adds a new item to the queue or updates an existing one.
   * If the item already exists, it updates its priority and reorders the queue.
   * @param newItem - The item to add or update in the queue.
   * @param newItem.id - Unique identifier for the item.
   * @param newItem.task - The task function to be executed, which should return a promise.
   * @param newItem.priority - The priority of the item, where higher values indicate higher priority. Defaults to 0 if not provided.
   * @returns A promise that resolves to an object containing the item's id, task, priority, and any reason for abortion if applicable.
   */
  async add(
    newItem: Pick<Item, "id" | "task"> & Partial<Pick<Item, "priority">>
  ) {
    const existingItem = this.queue.find((i) => i.id === newItem.id)
    const abortController =
      existingItem?.abortController || new AbortController()

    if (existingItem) {
      existingItem.priority = newItem.priority ?? existingItem.priority
      this.queue.sort((a, b) => b.priority - a.priority)
      return {
        id: existingItem.id,
        task: existingItem.task,
        priority: existingItem.priority,
      }
    }
    const item: Item = {
      id: newItem.id,
      task: async (props) => {
        await newItem.task(props)
      },
      priority: newItem.priority ?? 0,
      abortController,
    }
    this.queue.push(item)

    this.queue.sort((a, b) => b.priority - a.priority)
    if (this.capacity !== undefined) {
      const overflow = this.queue.length - this.capacity
      for (let i = 0; i < overflow; i++) {
        const removed = this.queue.pop()!
        removed.abortController.abort("removed")
      }
    }
    if (!this.processing && !this.scheduledStart) {
      this.scheduledStart = true
      setTimeout(() => {
        this.scheduledStart = false
        this.processQueue()
      }, 0)
    }

    return new Promise<ResponseItem>((resolve) => {
      abortController.signal.addEventListener(
        "abort",
        () => {
          const { id, task, priority } = item
          resolve({ id, task, priority, reason: abortController.signal.reason })
        },
        { once: true }
      )
      const onFinished = (finishedId: Item["id"]) => {
        if (finishedId === item.id) {
          this.eventEmitter.off(ItemEvent.Finished, onFinished)
          const { id, task, priority } = item
          resolve({ id, task, priority })
        }
      }
      this.eventEmitter.on(ItemEvent.Finished, onFinished)
    })
  }

  /**
   * Removes an item from the queue by its ID.
   * If the item is currently being processed, it will be aborted.
   * @param itemId
   */
  remove(itemId: Item["id"]) {
    if (this.currentItem?.id === itemId) {
      this.currentItem.abortController.abort("removed")
    } else {
      this.queue = this.queue.filter((item) => {
        if (item.id === itemId) {
          item.abortController.abort("removed")
          return false
        }
        return item.id !== itemId
      })
    }
  }

  /**
   * Clears the queue and aborts all currently processing items.
   * This will stop any ongoing tasks and remove all items from the queue.
   */
  clear() {
    for (const item of [this.currentItem, ...this.queue]) {
      item?.abortController.abort("removed")
    }
    this.queue = []
    this.currentItem = undefined
    this.processing = false
  }
}
