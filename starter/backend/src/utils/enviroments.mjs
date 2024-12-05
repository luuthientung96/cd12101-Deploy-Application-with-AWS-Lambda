export const corsResponseHeader = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE'
  }
}

export const environments = {
    region: process.env.REGION,
    appAuthDomain: process.env.AUTH0_DOMAIN,
    s3BucketImage: process.env.IMAGES_S3_BUCKET,
    todosTableName: process.env.TODOS_TABLE,
    imagesTableName: process.env.IMAGES_TABLE,
    todoIndex: process.env.TODOS_CREATED_AT_INDEX,
    signedUrlExpiration: parseInt(process.env.SIGNED_URL_EXPIRATION)
}

  
export default { corsResponseHeader, environments }
  