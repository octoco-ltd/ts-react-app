import { env } from 'src/env';
import { IUserSlice } from 'src/store/user/userSlice.contracts';

const setAuthStorage = (userSlice: IUserSlice) => {
    localStorage.setItem(env.REACT_APP_APP_NAME ?? 'octocoApp', JSON.stringify(userSlice));
}

const getAuthStorage = () => {
    return localStorage.getItem(env.REACT_APP_APP_NAME ?? 'octocoApp');
}

const removeAuthStorage = () => {
    return localStorage.removeItem(env.REACT_APP_APP_NAME ?? 'octocoApp');
}

export { setAuthStorage, getAuthStorage, removeAuthStorage }