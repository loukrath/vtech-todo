'use client'

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from '@/app/components/bases/Modal'
import { useState } from 'react'

const AddTaskBtn = () => {
  const [isShowModal, setModalOpen] = useState<boolean>(false)
  const [newTask, setNewTask] = useState<string>('')  
  const handleSubmitNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('new task', newTask)

    // setModalOpen(false)
  }

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full text-white uppercase">
        Add new task
        <AiOutlinePlus className='ml-1' size={16} />
      </button>

      <Modal isShowModal={isShowModal} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmitNewTask}>
          <h3 className='font-bold text-lg text-center'>
            Add new task
          </h3>

          <div className='modal-action'>
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              type="text"
              placeholder="New task"
              className="input input-bordered w-full max-w-full"
            />

            <button type='submit' className='btn btn-primary'>
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTaskBtn
