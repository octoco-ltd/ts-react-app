import * as Sentry from '@sentry/react';
import React from 'react';
import {
    createRoutesFromChildren,
    matchRoutes,
    useLocation,
    useNavigationType,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { env } from 'src/env';

/**
 * Sentry configuration object for error tracking and monitoring.
 */
export const sentryConfig = {
    dsn: env.REACT_APP_SENTRY_DSN,

    // Redux state context depth for normalization
    normalizeDepth: 5, 

    // Integrations to enhance error tracking and monitoring
    integrations: [
        // Enable browser tracing for distributed tracing
        new Sentry.BrowserTracing({
            // URLs for which distributed tracing should be enabled
            tracePropagationTargets: [
                'localhost',
                env.REACT_APP_APP_BASE_URL,
            ],
            // React Router v6 routing instrumentation
            routingInstrumentation: Sentry.reactRouterV6Instrumentation(
                React.useEffect,
                useLocation,
                useNavigationType,
                createRoutesFromChildren,
                matchRoutes,
            ),
        }),
        // Replay integration for error replay
        new Sentry.Replay(),
    ],

    // Environment label for your application
    environment: env.REACT_APP_DEPLOYMENT_ENV,

    // Performance Monitoring
    tracesSampleRate: env.REACT_APP_DEPLOYMENT_ENV === 'production' ? 0.5 : 1.0, // Capture % of the transactions

    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
};
