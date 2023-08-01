import { Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const rtkQueryMiddleware: Middleware = (api: MiddlewareAPI) => (next) => async (action) => {
    if (isRejectedWithValue(action)) {
        const status = action.payload.originalStatus;
        const message = action?.payload?.data?.message;
        toast.dismiss();
        if (status === 401) {
            toast.error(message ?? 'Your session has expired. Redirecting to the login page.', {
                autoClose: 10000,
            });
        } else if (status === 403) {
            toast.error(message ?? 'User not authorised to perform this action.');
        } else if (status === 500) {
            toast.error(message ?? 'Internal server error.');
        } else if (status === 404) {
            toast.error(message ?? 'Resource not found.');
        } else if (status === 400) {
            toast.error(action?.payload?.data?.errorMessage ?? 'An error has occurred', {
                autoClose: 10000,
            });
            // add more if statements for other explicit status code handling
        } else {
            toast.error(
                action?.payload?.data?.errorMessage ??
                    'An error has occurred and there was no message.',
                { autoClose: 10000 },
            );
        }
    } else if (action?.meta?.arg?.type === 'mutation') {
        if (action.type.endsWith('/fulfilled')) {
            toast.dismiss();
            toast.success(action?.payload?.data?.message ?? 'Success!', { hideProgressBar: true });
        } else if (action.type.endsWith('/pending')) {
            toast.info(`Requesting ${action?.meta?.arg?.endpointName}...`, {
                hideProgressBar: true,
            });
        }
        // add more if statements for other successful actions
    }
    return next(action);
};
