"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { ITask } from "@/types/tasks"
import Task from "@/app/components/Task"
import Modal from "./bases/Modal"
import { updateTask, deleteTask } from "@/utils/api"


interface TodoListProps {
  tasks: ITask[]
}

const TodoListTable: React.FC<TodoListProps> = ({ tasks }) => {
  const router = useRouter();

  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<ITask>({id: '', title: '', isCompleted: false})
  const [idTaskToDelete, setIdTaskToDelete] = useState<string>('')

  /**
   * Functions
   */
  const handleOpenEditModal = (isOpen: boolean, task: ITask) => {
    setTaskToEdit(task)
    setIsShowEditModal(isOpen)
  }

  const handleSubmitEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoadingUpdate(true)

      await updateTask(taskToEdit)

      setIsShowEditModal(false)
      router.refresh()
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoadingUpdate(false)
    }
  }

  const handleOpenDeleteModal = (isOpen: boolean, id: string) => {
    setIdTaskToDelete(id)
    setIsShowDeleteModal(isOpen)
  }

  const handleDeleteTask = async () => {
    try {
      setIsLoadingDelete(true)

      await deleteTask(idTaskToDelete)

      setIsShowDeleteModal(false)
      router.refresh()
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return (
    <>
      <div className="bg-white mt-5 rounded-lg">
        <div className="overflow-x-auto">
          <table className="table text-black">
            <thead>
              <tr className="border-b-0 bg-gray-200 text-black">
                <th>TODO</th>
                <th className="text-center">Status</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              { 
                tasks.map((task) => 
                  <Task
                    key={task.id}
                    task={task}
                    setModalEditOpen={(isOpen, task) => handleOpenEditModal(isOpen, task)}
                    setModalDeleteOpen={(isOpen, id) => handleOpenDeleteModal(isOpen, id)}
                  />)
              }
            </tbody>
          </table>
        </div>
      </div>

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
              value={taskToEdit.title}
              onChange={(e) => setTaskToEdit({ ...taskToEdit, title: e.target.value })}
              type="text"
              placeholder="New task"
              className="input input-bordered w-full max-w-full text-black bg-white"
            />

            <button type='submit' className='btn btn-primary text-white'>
              { isLoadingUpdate && <span className="loading loading-sm"></span> }
              Update
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete modal */}
      <Modal
        isShowModal={isShowDeleteModal}
        setModalOpen={setIsShowDeleteModal}
      >
        <h3 className='font-bold text-lg text-center text-primary'>
          Are you sure you want to delete this task?
        </h3>

        <div className="modal-action">
          <div className="space-x-2 w-full flex">
            <button
              onClick={() => setIsShowDeleteModal(false)}
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
    </>
    
  )
}

export default TodoListTable
