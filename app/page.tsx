import Image from 'next/image'
import AddTaskBtn from './components/bases/AddTaskBtn'
import TodoListTable from './components/TodoListTable'

export default function Home() {
  return (
    <main className='p-5'>
      <div className='container mx-auto'>
        <div className='mb-5'>
          <Image className='mx-auto' src="vtech-logo.svg" alt="me" width="128" height="128" />
        </div>

        <h1 className='text-center text-2xl text-primary mb-10'>
          Vtech Todo List
        </h1>


        <AddTaskBtn />

        <TodoListTable />
      </div>
    </main>
  )
}
