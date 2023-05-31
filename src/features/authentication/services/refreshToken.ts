import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import store from 'src/store/store'

const queryReAuthWrapper = (baseQuery: any) => {
    const baseQueryWithReauth: BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    > = async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions)
        if (result.error && result.error.status === 401) {
            console.log('Token Expired. Trying to renew.')
            // try to get a new token
            const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
            if (refreshResult.data) {
                // store the new token
                //   api.dispatch(tokenReceived(refreshResult.data))
                // retry the initial query
                // result = await baseQuery(args, api, extraOptions)
            } else {
                //   api.dispatch(loggedOut())
            }
        }
        return result
    }
    return baseQueryWithReauth;
}

export default queryReAuthWrapper;