import { ITask } from "@/types/tasks";
import axios from "@/libs/axios"

const baseUrl = process.env.apiUrl;

export const getAllTodos = async (): Promise<ITask[]> => {
  const { data } = await axios.get('todo');

  return data;
}

export const addNewTask = async (task: ITask): Promise<ITask> => {
  const { data } = await axios.post(`${baseUrl}/todo`, task);

  return data;
}

export const updateTask = async (task: ITask): Promise<ITask> => {
  const { data } = await axios.put(`${baseUrl}/todo/${task.id}`, task);

  return data;
}

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/todo/${id}`);
}
