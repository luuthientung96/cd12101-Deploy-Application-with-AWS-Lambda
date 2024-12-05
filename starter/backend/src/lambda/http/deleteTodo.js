import { deleteTodoItem } from '../../business/todos.mjs';
import { getUserId } from '../utils.mjs';
import { createLogger } from '../../utils/logger.mjs';

const logger = createLogger('createTodo');

export async function handler(event) {
  logger.info('Processing DeleteTodos request', { event });
  const todoId = event.pathParameters.todoId;

  // TODO: Remove a TODO item by id
  const userId = getUserId(event);
  await deleteTodoItem(userId, todoId);

  return {
    statusCode: 200,
    body: JSON.stringify({}),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
}

