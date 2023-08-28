import { CognitoUser } from 'amazon-cognito-identity-js'
import { _getCognitoPool } from './_getCognitoPool'

export const _getCognitoUser = (username: string) => {
    const userData = {
      Username: username,
      Pool: _getCognitoPool(),
    }
    const cognitoUser = new CognitoUser(userData)
    return cognitoUser
  }