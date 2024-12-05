import AWSXRay from 'aws-xray-sdk-core'
import { S3Client } from '@aws-sdk/client-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { environments } from '../utils/enviroments.mjs'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('s3BucketSuccess');

const s3Client = AWSXRay.captureAWSv3Client(
  new S3Client({
    region: environments.region,
    signatureVersion: 'v4'
  })
)

export const getS3SignUrl = async (keyName, expiresTimeIn = 3600) => {
  logger.info('Starting getting S3 sign URL');
  const command = new PutObjectCommand({
    Bucket: environments.s3BucketImage,
    Key: keyName,
    ContentType: 'image/png'
  })
  const signedUrl = await getSignedUrl(s3Client, command, { expiresTimeIn })
  logger.info('Get signed URL sucessfully', signedUrl)

  return signedUrl
}
