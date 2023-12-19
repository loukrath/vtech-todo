import { ITask } from "@/types/tasks";

const baseUrl = 'http://localhost:3001';

export const getAllTodos = async (): Promise<ITask[]> => {
  const response = await fetch(`${baseUrl}/todos`, { cache: 'no-cache' });
  const data = await response.json();

  return data;
}

export const addNewTask = async (task: ITask): Promise<ITask> => {
  const response = await fetch(`${baseUrl}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();

  return data;
}
