import { ZodFormattedError, z } from 'zod';


export const clientSchema = z.object({
    REACT_APP_BASE_API_URL:z.string().nonempty(),
    REACT_APP_APP_BASE_URL:z.string().nonempty(),
    REACT_APP_APP_NAME:z.string().nonempty(),
    REACT_APP_DEPLOYMENT_ENV:z.string().nonempty(),
    REACT_APP_REDIRECT_SUCCESS:z.string().nonempty(),
    REACT_APP_REDIRECT_FAILURE:z.string().nonempty(),
    REACT_APP_REDIRECT_CANCEL:z.string().nonempty(),
    REACT_APP_SENTRY_DSN:z.string().nonempty(),
    REACT_APP_SENTRY_AUTH_TOKEN:z.string().nonempty(),
});

const _clientEnv = clientSchema.safeParse(process.env);

export const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
    Object.entries(errors)
        .map(([name, value]) => {
            if (value && '_errors' in value) return `${name}: ${value._errors.join(', ')}\n`;
        })
        .filter(Boolean);

if (!_clientEnv.success) {
    console.error(
        '❌ Invalid environment variables:\n',
        ...formatErrors(_clientEnv.error.format()),
    );
    throw new Error('Invalid environment variables');
}

export const env = _clientEnv.data;