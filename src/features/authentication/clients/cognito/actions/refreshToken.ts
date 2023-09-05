import {
    CognitoRefreshToken,
    CognitoUser
} from 'amazon-cognito-identity-js';
import store from 'src/store/store';
import { _getCognitoUser } from './_getCognitoUser';

const asyncRefreshUser = (
    cognitoUser: CognitoUser,
    refreshAccessToken: CognitoRefreshToken
): Promise<any> => {
    return new Promise(function (resolve, reject) {
        cognitoUser.refreshSession(refreshAccessToken, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

export default async function refreshAccessToken() {
    const cognitoUser = _getCognitoUser(store.getState().user.user.email)
    const newRefreshToken = new CognitoRefreshToken({
        RefreshToken: store.getState().user.refreshToken ?? '',
    });

    const refreshedSession: any = await asyncRefreshUser(
        cognitoUser,
        newRefreshToken
    );

    return {
        refreshToken: refreshedSession.refreshToken.token, // this will be added to the session (done within 'callbacks' object)
        accessToken: refreshedSession.accessToken.jwtToken, // this will be added to the session (done within 'callbacks' object)
    };
}