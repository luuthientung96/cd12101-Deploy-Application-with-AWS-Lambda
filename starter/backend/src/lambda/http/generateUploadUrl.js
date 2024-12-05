import { corsResponseHeader } from '../../utils/enviroments.mjs'
import createUrlUpload from '../../business/createUrlUploadService.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('createUrlUpload')
export const handler = async (event) => {
  let httpResponse = {}
  try {
    logger.info('Starting creating URL upload')
    const urlImage = await createUrlUpload(event)
    logger.info('Successfuly create url image', urlImage)

    httpResponse = {
      ...corsResponseHeader,
      statusCode: 200,
      body: JSON.stringify({ uploadUrl: urlImage })
    }
  } catch (error) {
    logger.error('Error create URL Upload: ', error)
    httpResponse = {
      ...corsResponseHeader,
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }

  return httpResponse
}
