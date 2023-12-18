import { ITask } from "@/types/tasks"
import React from "react"

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <tr key={task.id} className="border-b-gray-200">
      <th className="text-center">
        <label>
          <input type="checkbox" className="checkbox checkbox-error" />
        </label>
      </th>
      <td>{task.title}</td>
      <td>ACTION</td>
    </tr>
  )
}

export default Task
