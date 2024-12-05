import { saveImageUrl } from '../dataAccessService/dataImageAccess.mjs'
import { getS3SignUrl } from '../dataAccessService/s3BucketSuccess.mjs'
import { getUserId } from '../lambda/utils.mjs'
import { environments } from '../utils/enviroments.mjs'
import { createLogger} from '../utils/logger.mjs'

const logger = createLogger('createUrlUploadService')

const createUrlUpload = async (event) => {
  logger.info('CreateUrlUpload Event: ', event)
  const todoId = event.pathParameters.todoId;
  logger.info('CreateUrlUpload todoId: ', todoId)
  const userId = getUserId(event);
  logger.info('CreateUrlUpload userId: ', userId)
  const imageUrl = await getS3SignUrl(`${userId}${todoId}`,environments.signedUrlExpiration)
  logger.info('Uploaded Image Url: ', imageUrl);

  logger.info('Update image to database')
  const todo = await saveImageUrl({
    TableName: environments.todosTableName,
    Key: {
      todoId,
      userId
    },
    UpdateExpression:
      'SET attachmentUrl = :attachmentUrl, createAt = :createAt',
    ExpressionAttributeValues: {
      ':attachmentUrl': imageUrl.split('?')[0],
      ':createAt': new Date().toISOString()
    },
    ReturnValues: 'UPDATED_NEW'
  })

  logger.info('Successfully saved Image URL', todo)

  return imageUrl;
}

export default createUrlUpload
