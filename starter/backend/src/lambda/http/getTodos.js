import { getTodosByUserId } from '../../business/todos.mjs';
import { createLogger } from '../../utils/logger.mjs';
import { getUserId } from '../utils.mjs';
const logger = createLogger('todos');

export async function handler(event) {
  logger.info('Processing GetTodos request', { event });
  // TODO: Get all TODO items for a current user
  const userId = getUserId(event);
  const todos = await getTodosByUserId(userId);
  logger.info('Fetched todos successfully');
  return {
    statusCode: 200,
    body: JSON.stringify({
      items: todos,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
  };
}
