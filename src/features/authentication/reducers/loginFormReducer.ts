import { IRegexField, RegexPatterns } from '../../../constants/regex';

interface FieldTypes {
    value: string;
    valid: boolean;
    error: string;
    name: string;
    regex?: IRegexField
}

interface IInitialState {
    email: FieldTypes;
    password: FieldTypes;
}

export const initialState: IInitialState = {
    email: { value: '', valid: true, error: '', name: 'Email', regex: RegexPatterns.email },
    password: { value: '', valid: true, error: '', name: 'Password', regex: RegexPatterns.password },
};

export enum actionTypes {
    EMAIL = 'EMAIL',
    PASSWORD = 'PASSWORD',
}

interface IAction {
    type: actionTypes;
    payload: string;
}

export const loginFormReducer = (state: typeof initialState, action: IAction) => {
    const payload = action.payload;
    let errorObj = { valid: true, error: '' };
    if (!payload) {
        errorObj = { valid: false, error: 'Field is required' };
    }
    let regex;
    switch (action.type) {
        case actionTypes.EMAIL:
            regex = state.email.regex;
            if (regex?.pattern) {
                const regexp = new RegExp(regex.pattern);
                if (!regexp.test(payload)) {
                    errorObj = { valid: false, error: regex.message ?? 'Field is invalid' };
                }
            }
            return { ...state, email: { ...state.email, ...errorObj, value: payload } };
            break;
        case actionTypes.PASSWORD:
            regex = state.password.regex;
            if (regex?.pattern) {
                const regexp = new RegExp(regex.pattern);
                if (!regexp.test(payload)) {
                    errorObj = { valid: false, error: regex.message ?? 'Field is invalid' };
                }
            }
            return { ...state, password: { ...state.password, ...errorObj, value: payload } };
    }
};