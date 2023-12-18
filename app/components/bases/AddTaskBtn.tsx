import { AiOutlinePlus } from 'react-icons/ai'

const AddTaskBtn = () => {
  return (
    <div>
      <button className="btn btn-primary w-full text-white uppercase">
        Add new task
        <AiOutlinePlus className='ml-1' size={16} />
      </button>
    </div>
  )
}

export default AddTaskBtn
