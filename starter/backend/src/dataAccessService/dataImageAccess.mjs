import AWS from 'aws-sdk'
import AWSXRay from 'aws-xray-sdk-core'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { environments } from '../utils/enviroments.mjs'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('dataAccess');

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const dynamoDbClient = AWSXRay.captureAWSv3Client(
  new DynamoDBClient({
    region: environments.region
  })
)

// const documentClient = DynamoDBDocumentClient.from(dynamoDbClient);

export const saveImageUrl = async (params = {}) => {
  logger.info('Starting saving image url with param:', params)
  const result = await dynamoDb.update(params).promise()
  logger.info('Saved Image successfully');
  return result
}