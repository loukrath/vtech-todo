'use client'

import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from "react-hook-form";

import { addNewTask } from '@/utils/api'
import Modal from '@/app/components/bases/Modal'
import Conditional from "@/app/components/bases/Conditional";

type Inputs = {
  todo: string
}

const AddTaskBtn = () => {
  const router = useRouter();
  const [isShowModal, setModalOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      todo: '',
    }
  })

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    await addNewTask(data)

    setModalOpen(false)
    reset();
    router.refresh()
  }

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary text-white uppercase">
        Add new
        <AiOutlinePlus className='ml-1' size={16} />
      </button>

      <Modal isShowModal={isShowModal} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className='font-bold text-lg text-center text-primary'>
            Add new task
          </h3>

          <div className='modal-action'>
            <div className='flex flex-col w-full space-y-2'>
              <input
                className="input input-bordered w-full max-w-full text-black bg-white"
                { ...register("todo", { required: true }) }
              />
              <Conditional showWhen={!!errors.todo}>
                <span className='text-xs text-red-500'>This field is required</span>
              </Conditional>
            </div>

            <button
              type='submit'
              className='btn btn-primary text-white'
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTaskBtn
