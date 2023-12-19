import React from "react"

import { ITask } from "@/types/tasks"
import Task from "@/app/components/Task"


interface TodoListProps {
  tasks: ITask[]
}

const TodoListTable: React.FC<TodoListProps> = ({ tasks }) => {
  return (
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
            { tasks.map((task) => <Task key={task.id} task={task} />) }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TodoListTable
