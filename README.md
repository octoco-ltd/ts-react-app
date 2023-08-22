# Octoco Front-End Standard #
### ReactJS Template with TypeScript ###

## Get Started
1. run `yarn install`
2. run `yarn start`
3. Ensure your IDE is configured for ESLint using the `eslintrc.json` file
4. run `yarn storybook` in root to run storybook on your localhost (default port: 6006)

### What is this repository for? ###

* The purpose of this repository is to document the general stack which Octoco would like to use when scaffolding new web projects. 
* The goal is to provide guidelines to be followed in terms of frameworks, libraries and architectural standards
* This should serve as a guideline and is not intended to be completely prescriptive in terms of implementation
* There are times where specific projects may differ from this standard (e.g. auth implementations based on client)   

### Current Features
- ESLint and Prettier for code styling and formatting

### What is the stack? ###
* [React](https://reactjs.org/) for the framework
* [Redux](https://redux.js.org/) for state management
* [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) as a API service and caching
* [Formik](https://formik.org/) for form management
* [React Hook Form](https://react-hook-form.com/) for form state management
* [Yup](https://github.com/jquense/yup) for validation
* [Typescript](https://www.typescriptlang.org/) for the language and strong typing
* [Firebase](https://firebase.google.com/) for auth, nosql storage and analytics
* [Auth0](https://firebase.google.com/) for auth
* [AWS Cognito](https://firebase.google.com/) for auth
* [Material UI](https://mui.com/) for styling
* [React Router](https://v5.reactrouter.com/web/guides/quick-start) for routing
* [Toast](https://ireade.github.io/Toast.js/) for messages
* [Axios](https://axios-http.com/docs/intro) for the http client, with a custom base api service as implemented and reused by Octoco
* [Storybook](https://storybook.js.org/) for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.
* [CASL](https://casl.js.org/v6/en/) for RBAC management

### Extras / Variations
* [NextJS](https://nextjs.org/) as the framework where there is a need for server-side rendering, more static sites etc
* Custom Regex Implementation for validation
* Material UI as one package for various functions (styling, forms, wizards, validation, notifications, prebuilt components)

### Contribution guidelines ###
* Anyone can contribute 🥳 more feedback is always better

### Who do I talk to? ###
* heinrich@octoco.ltd
* calvin@octoco.ltd
* christiaan@octoco.ltd
* james@octoco.ltd
* todd@octoco.ltd

### Future Iterations
* Scaffold a project in this repo as a working example
* Add commonly reused helper functions to that project
* Add detailed justification for tech decisions, explain why
* Start building custom 'Octoco Components' for reuse across projects e.g. standard file upload component
* Consider using Material UI as one package for various functions (styling, forms, wizards, validation, notifications, prebuilt components)

### Other Cool Stuff
* [Mzansi Data](https://octoco.mzansidata.co.za) is a white label app octoco built using material ui
* [Infisical](https://infisical.com/) for management of environment variables

TODO:
//protected routes
//index all exports
//rbac -> CASL = fully document
//refresh token //get new token //needed?
//check to see if env vars are correct
//feature flags
//unverified
//login 
//register
//table
//api service (RTK) REST
//api service (RTK) GraphQL
//mobile bottom bar
//breadcrumbs
//useConfirmLeave
//add chromatic docs etc etc
//app config
