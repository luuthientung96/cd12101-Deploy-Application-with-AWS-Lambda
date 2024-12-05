import axios from 'axios'
import pkg from 'jsonwebtoken'
import { environments } from '../../utils/enviroments.mjs'
import { createLogger } from '../../utils/logger.mjs';
const { verify } = pkg
const jwksUrl = `https://${environments.appAuthDomain}/.well-known/jwks.json`
const logger = createLogger('auth')

async function verifyToken(authHeader) {
  const token = getToken(authHeader)
  logger.info('Token was verified:', token)

  const response = await axios.get(jwksUrl)
  const signKeys = response['data']['keys'][0]['x5c'][0]

  if (!signKeys.length) {
    throw new Error('Sign Keys is not found')
  }

  const certificate = `-----BEGIN CERTIFICATE-----\n${signKeys}\n-----END CERTIFICATE-----`
  logger.info('SignKeys Certificate', certificate)

  const result = verify(token, certificate, { algorithms: ['RS256'] })
  return result;
}

function getToken(authHeader) {
  logger.info('getToken authHeader', authHeader)
  if (!authHeader) {
    throw new Error('No authentication header')
  }

  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    throw new Error('Invalid authentication header')
  }

  const split = authHeader.split(' ')
  const token = split[1]
  logger.info('const token = split[1]', token)

  return token
}

export async function handler(event) {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}
