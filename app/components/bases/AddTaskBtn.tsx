'use client'

import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { addNewTask } from '@/utils/api'
import Modal from '@/app/components/bases/Modal'

const AddTaskBtn = () => {
  const router = useRouter();
  const [isShowModal, setModalOpen] = useState<boolean>(false)
  const [newTaskVal, setNewTaskVal] = useState<string>('')  

  const handleSubmitNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTask = {
      id: "7",
      title: newTaskVal,
      isCompleted: false
    }

    await addNewTask(newTask)

    setNewTaskVal('')
    setModalOpen(false)
    router.refresh()
  }

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary text-white uppercase">
        Add new
        <AiOutlinePlus className='ml-1' size={16} />
      </button>

      <Modal isShowModal={isShowModal} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmitNewTask}>
          <h3 className='font-bold text-lg text-center text-primary'>
            Add new task
          </h3>

          <div className='modal-action'>
            <input
              value={newTaskVal}
              onChange={(e) => setNewTaskVal(e.target.value)}
              type="text"
              placeholder="New task"
              className="input input-bordered w-full max-w-full text-black bg-white"
            />

            <button type='submit' className='btn btn-primary text-white'>
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTaskBtn
