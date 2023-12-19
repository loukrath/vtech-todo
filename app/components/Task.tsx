"use client"

import { useState } from "react"
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

import Modal from '@/app/components/bases/Modal'
import { ITask } from "@/types/tasks";
import { updateTask, deleteTask } from '@/utils/api'


interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [taskToEdit, setTaskToEdit] = useState<string>(task.title)

  // Booleans
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false)
  const [isShowDeleteModale, setIsShowDeleteModale] = useState<boolean>(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

  /**
   * Functions
   */
  const router = useRouter();

  // Functions for handle edit task
  const handleUpdateTask = async (newTask: ITask) => {
    return await updateTask(newTask)
  }

  const handleSubmitEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoadingUpdate(true)

      const newTask = {
        id: task.id,
        title: taskToEdit,
        isCompleted: task.isCompleted
      }

      await handleUpdateTask(newTask)

      setIsShowEditModal(false)
      router.refresh()
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoadingUpdate(false)
    }
  }

  const handleUpdateTaskStatus = async () => {
    try {
      setIsLoadingUpdate(true)
      const newTask = {
        id: task.id,
        title: task.title,
        isCompleted: !task.isCompleted
      }
  
      await handleUpdateTask(newTask)
  
      router.refresh()
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoadingUpdate(false)
    }
  }

  const handleDeleteTask = async () => {
    try {
      setIsLoadingDelete(true)

      await deleteTask(task.id)

      setIsShowDeleteModale(false)
      router.refresh()
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return (
    <>
      <tr key={task.id} className="border-b-gray-200 group">
        <td>{task.title}</td>
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
          <FiEdit onClick={() => setIsShowEditModal(true)} cursor="pointer" className="text-blue-500" size={25} />

          <FiTrash2
            onClick={() => setIsShowDeleteModale(true)}
            cursor="pointer"
            className="text-red-500"
            size={25}
          />
        </td>
      </tr>

      {/* Edit modal */}
      <Modal
        isShowModal={isShowEditModal}
        setModalOpen={setIsShowEditModal}
        >
        <form onSubmit={handleSubmitEditTask}>
          <h3 className='font-bold text-lg text-center text-primary'>
            Edit task
          </h3>

          <div className='modal-action'>
            <input
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              type="text"
              placeholder="New task"
              className="input input-bordered w-full max-w-full bg-white"
            />

            <button type='submit' className='btn btn-primary text-white'>
              { isLoadingUpdate && <span className="loading loading-sm"></span> }
              Update
            </button>
          </div>
        </form>
      </Modal>
      {/* !! Edit modal */}

      {/* Delete modal */}
      <Modal
        isShowModal={isShowDeleteModale}
        setModalOpen={setIsShowDeleteModale}
      >
        <h3 className='font-bold text-lg text-center text-primary'>
          Are you sure you want to delete this task?
        </h3>

        <div className="modal-action">
          <div className="space-x-2 w-full flex">
            <button
              onClick={() => setIsShowDeleteModale(false)}
              className="btn btn-ghost flex-1"
            >
              Cancel
            </button>

            <button
              onClick={handleDeleteTask}
              className="btn btn-error flex-1 text-white"
            >
              { isLoadingDelete && <span className="loading loading-sm"></span> }
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      {/* !! Delete modal */}
    </>
  )
}

export default Task
