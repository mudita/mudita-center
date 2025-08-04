/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Queue } from "./queue"

const delayTask = () => new Promise((resolve) => setTimeout(resolve, 100))

describe("Queue E2E Tests", () => {
  let queue: Queue

  beforeEach(() => {
    queue = new Queue({ interval: 100 })
  })

  it("should process items in the order they were added", async () => {
    const results: string[] = []

    const p1 = queue.add({
      id: "task1",
      task: async () => {
        await delayTask()
        results.push("task1")
      },
    })

    const p2 = queue.add({
      id: "task2",
      task: async () => {
        await delayTask()
        results.push("task2")
      },
    })

    const p3 = queue.add({
      id: "task3",
      task: async () => {
        await delayTask()
        results.push("task3")
      },
    })

    await Promise.all([p1, p2, p3])
    expect(results).toEqual(["task1", "task2", "task3"])

    const p4 = queue.add({
      id: "task4",
      task: async () => {
        await delayTask()
        results.push("task4")
      },
    })

    await p4
    expect(results).toEqual(["task1", "task2", "task3", "task4"])
  })

  it("should process items in the order of priorities", async () => {
    const results: string[] = []

    const p1 = queue.add({
      id: "task1",
      task: async () => {
        await delayTask()
        results.push("task1")
      },
    })

    const p2 = queue.add({
      id: "task2",
      task: async () => {
        await delayTask()
        results.push("task2")
      },
    })

    const p3 = queue.add({
      id: "task3",
      task: async () => {
        await delayTask()
        results.push("task3")
      },
      priority: 2,
    })

    await Promise.all([p1, p2, p3])

    const p4 = queue.add({
      id: "task4",
      task: async () => {
        await delayTask()
        results.push("task4")
      },
      priority: 3,
    })

    await p4

    expect(results).toEqual(["task3", "task1", "task2", "task4"])
  })

  it("should override only item's priority when adding an item with same id", async () => {
    const results: string[] = []

    const p1 = queue.add({
      id: "task1",
      task: async () => {
        await delayTask()
        results.push("task1")
      },
    })

    const p2 = queue.add({
      id: "task2",
      task: async () => {
        await delayTask()
        results.push("task2")
      },
      priority: 2,
    })

    const p3 = queue.add({
      id: "task3",
      task: async () => {
        await delayTask()
        results.push("task3")
      },
      priority: 1,
    })

    const p4 = queue.add({
      id: "task3",
      task: async () => {
        await delayTask()
        results.push("task3 (updated)")
      },
      priority: 3,
    })

    const [_r1, _r2, r3, r4] = await Promise.all([p1, p2, p3, p4])

    expect(results).toEqual(["task3", "task2", "task1"])
    expect(r3.priority).toEqual(3)
    expect(r4.priority).toEqual(3)
  })

  it("should continue processing after certain task failure", async () => {
    const results: string[] = []

    const p1 = queue.add({
      id: "task1",
      task: async () => {
        await delayTask()
        results.push("task1")
      },
    })

    const p2 = queue.add({
      id: "task2",
      task: async () => {
        await delayTask()
        results.push("task2")
      },
    })

    const p3 = queue.add({
      id: "task3",
      task: async () => {
        await Promise.reject("Failure in task3")
        results.push("task3")
      },
    })

    const p4 = queue.add({
      id: "task4",
      task: async () => {
        await delayTask()
        results.push("task4")
      },
    })

    const [_r1, _r2, r3] = await Promise.all([p1, p2, p3, p4])

    expect(results).toEqual(["task1", "task2", "task4"])
    expect(r3.reason).toEqual(new Error("Failure in task3"))
  })

  it("should handle removed items correctly", async () => {
    const results: string[] = []

    const p1 = queue.add({
      id: "task1",
      task: async () => {
        await delayTask()
        results.push("task1")
      },
    })

    const p2 = queue.add({
      id: "task2",
      task: async () => {
        await delayTask()
        results.push("task2")
      },
    })

    const p3 = queue.add({
      id: "task3",
      task: async () => {
        await delayTask()
        results.push("task3")
      },
    })

    const p4 = queue.add({
      id: "task4",
      task: async () => {
        await delayTask()
        results.push("task4")
      },
    })

    queue.remove("task1")
    queue.remove("task3")

    const p5 = queue.add({
      id: "task5",
      task: async () => {
        await delayTask()
        results.push("task5")
      },
    })

    const [r1, _r2, r3] = await Promise.all([p1, p2, p3, p4, p5])

    expect(results).toEqual(["task2", "task4", "task5"])
    expect(r1.reason).toEqual("removed")
    expect(r3.reason).toEqual("removed")
  })

  it("should clear the queue after calling the `clear` method and finish processing tasks", async () => {
    const results: string[] = []

    const p1 = queue.add({
      id: "task1",
      task: async () => {
        await delayTask()
        results.push("task1")
      },
    })

    const p2 = queue.add({
      id: "task2",
      task: async () => {
        await delayTask()
        results.push("task2")
      },
    })

    queue.clear()

    const [r1, r2] = await Promise.all([p1, p2])
    expect(results).toEqual([])
    expect(r1.reason).toEqual("removed")
    expect(r2.reason).toEqual("removed")
  })

  it("should handle custom interval properly", async () => {
    const results: string[] = []
    const customQueue = new Queue({ interval: 1000 })

    const timestamps: number[] = []

    const p1 = customQueue.add({
      id: "task1",
      task: async () => {
        await delayTask()
        results.push("task1")
        timestamps.push(performance.now())
      },
    })
    const p2 = customQueue.add({
      id: "task2",
      task: async () => {
        timestamps.push(performance.now())
        await delayTask()
        results.push("task2")
      },
    })

    await Promise.all([p1, p2])
    expect(results).toEqual(["task1", "task2"])
    expect(timestamps[1] - timestamps[0]).toBeGreaterThanOrEqual(999)
  })

  it("should enforce capacity correctly", async () => {
    const results: string[] = []
    const capQueue = new Queue({ interval: 0, capacity: 3 })

    const p1 = capQueue.add({
      id: "task1",
      task: async () => {
        results.push("task1")
      },
      priority: 1,
    })
    const p2 = capQueue.add({
      id: "task2",
      task: async () => {
        results.push("task2")
      },
      priority: 2,
    })
    const p3 = capQueue.add({
      id: "task3",
      task: async () => {
        results.push("task3")
      },
      priority: 3,
    })
    const p4 = capQueue.add({
      id: "task4",
      task: async () => {
        results.push("task4")
      },
      priority: 4,
    })
    const p5 = capQueue.add({
      id: "task5",
      task: async () => {
        results.push("task5")
      },
      priority: 5,
    })

    const [r1, r2, r3, r4, r5] = await Promise.all([p1, p2, p3, p4, p5])
    expect(results).toEqual(["task5", "task4", "task3"])
    expect(r1.reason).toEqual("removed")
    expect(r2.reason).toEqual("removed")
    expect(r3.reason).toBeUndefined()
    expect(r3.priority).toEqual(3)
    expect(r4.priority).toEqual(4)
    expect(r5.priority).toEqual(5)
  })
})
