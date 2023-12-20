"use client"

import { useState } from "react"
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

import Modal from '@/app/components/bases/Modal'
import { ITask } from "@/types/tasks";
import { updateTask } from '@/utils/api'


interface TaskProps {
  task: ITask,
  setModalEditOpen: (open: boolean, task: ITask) => boolean | void,
  setModalDeleteOpen: (open: boolean, id: string) => boolean | void,
}

const Task: React.FC<TaskProps> = ({ task, setModalEditOpen, setModalDeleteOpen }) => {
  // Booleans
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)

  /**
   * Functions
   */
  const router = useRouter();

  const handleUpdateTaskStatus = async () => {
    try {
      setIsLoadingUpdate(true)
      const newTask = {
        id: task.id,
        todo: task.todo,
        isCompleted: !task.isCompleted
      }
  
      await updateTask(newTask)
  
      router.refresh()
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoadingUpdate(false)
    }
  }

  return (
    <>
      <tr key={task.id} className="border-b-gray-200 group">
        <td>{task.todo}</td>
        <td className="text-center">
          {
            task.isCompleted &&
            <button
              onClick={handleUpdateTaskStatus}
              className="btn btn-sm btn-outline btn-success btn-wide text-xs"
            >
              { isLoadingUpdate && <span className="loading loading-sm"></span> }
              Mark as Incomplete
            </button>
          }

          {
            !task.isCompleted &&
            <button
              onClick={handleUpdateTaskStatus}
              className="btn btn-sm btn-outline btn-wide text-xs"
            >
              { isLoadingUpdate && <span className="loading loading-sm"></span> }
              Mark as complete
            </button>
          }
        </td>
        <td className="flex opacity-0 space-x-2 group-hover:opacity-100">
          <FiEdit
            onClick={() => setModalEditOpen(true, task)}
            cursor="pointer"
            className="text-blue-500" size={25} />

          <FiTrash2
            onClick={() => setModalDeleteOpen(true, task.id)}
            cursor="pointer"
            className="text-red-500"
            size={25}
          />
        </td>
      </tr>
    </>
  )
}

export default Task
