// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useSearchTasks } from './searchTasks'
import { TaskStatus, useTasksStore } from '@/store/tasks'

describe('a', () => {
  beforeEach(() => {
    createTestingPinia({
      createSpy: vi.fn,
    })

    const tasksStore = useTasksStore()
    vi.mocked(tasksStore.findAllTasksNotRemoved).mockImplementation(async () => {
      return [{
        id: '0',
        title: '吃饭',
        content: '今天吃什么',
        status: TaskStatus.ACTIVE,
        projectId: '1',
        position: 1,
      }]
    })

    const { resetSearchTasks } = useSearchTasks()

    resetSearchTasks()
  })

  it('b', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()

    await searchTasks('吃饭')

    expect(filteredTasks.value.length).toBe(1)
    // expect(filteredTasks.value[0].item).toEqual({
    //   id: '1',
    //   title: '吃饭',
    //   desc: '今天吃什么',
    //   done: false,
    //   from: undefined,
    // })
  })

  it('c', async () => {
    // const { searchTasks, filteredTasks } = useSearchTasks()

    // await searchTasks('吃什么')

    // expect(filteredTasks.value.length).toBe(1)
  })
})
