import { CognitoUserPool } from 'amazon-cognito-identity-js';
import cognitoConfig from '../config/cognitoConfig';

export const _getCognitoPool = () => {
    const poolData = cognitoConfig.poolData;
    const userPool: CognitoUserPool = new CognitoUserPool(poolData)
    return userPool
  }