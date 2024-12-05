import { createTodoItem } from '../../business/todos.mjs';
import { getUserId } from '../utils.mjs';
import { createLogger } from '../../utils/logger.mjs';

const logger = createLogger('createTodo');
export async function handler(event) {
  logger.info('Createing create', { event });
  const newTodo = JSON.parse(event.body);

  // TODO: Implement creating a new TODO item
  const userId = getUserId(event); // Extract user ID from the JWT
  const createdTodo = await createTodoItem(userId, newTodo);
  return {
    statusCode: 201,
    body: JSON.stringify({
      item: createdTodo,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
}

