export interface IRegexField {
  pattern: RegExp;
  message: string
}

interface IRegex {
  email: IRegexField;
  password: IRegexField;
  name: IRegexField;
}

export const RegexPatterns: IRegex = {
  email: {
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Invalid Email Address',
  },
  password: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/, // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    message: 'Must contain at least one number & uppercase letter & at least 6 characters',
  },
  name: {
    pattern: /^[a-zA-Z\w\W]{0,32}$/,
    message: 'Name is invalid',
  }
}