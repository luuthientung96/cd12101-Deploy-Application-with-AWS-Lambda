import { updateTodoItem } from '../../business/todos.mjs';
import { getUserId } from '../utils.mjs';
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('todos');

export async function handler(event) {
  logger.info('Processing UpdateTodos request', { event });
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  const userId = getUserId(event);
  await updateTodoItem(userId, todoId, updatedTodo);
  return {
    statusCode: 204, // No content
    body: '',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
}
