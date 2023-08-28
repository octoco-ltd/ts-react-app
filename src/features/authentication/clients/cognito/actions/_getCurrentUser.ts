import { CognitoUser } from 'amazon-cognito-identity-js';
import { _getCognitoPool } from './_getCognitoPool'

export const _getCurrentUser = () => {
    const currentUser = _getCognitoPool().getCurrentUser()
    return currentUser;
}