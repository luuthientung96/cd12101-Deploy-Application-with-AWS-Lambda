import { saveTodo, deleteTodo, getTodos, updateTodo } from '../dataAccessService/todosAccess.mjs';


// Define the generateId function
function generateId() {
  return Math.random().toString(36).substring(2, 15); // Generates a random string
}

export async function createTodoItem(userId, newTodo) {
    const todo = {
      userId,
      todoId: generateId(),
      createdAt: new Date().toISOString(),
      ...newTodo,
    };
    return saveTodo(todo);
  }

export async function deleteTodoItem(userId, todoId) {
  return deleteTodo(userId, todoId);
}

export async function getTodosByUserId(userId) {
    return getTodos(userId);
}

export async function updateTodoItem(userId, todoId, updatedTodo) {
    return updateTodo(userId, todoId, updatedTodo);
  }