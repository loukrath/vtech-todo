import { ITask } from "@/types/tasks";

const baseUrl = 'http://localhost:3001';

export const getAllTodos = async (): Promise<ITask[]> => {
  const response = await fetch(`${baseUrl}/todos`);
  const data = await response.json();

  return data;
}